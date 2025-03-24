import { NextRequest } from 'next/server';
import { validateSMTPConfig } from '@/utils/smtp';
import { ContactSchema } from "@/schemas/ContactSchema";
import { sendEmailWithTimeout } from "@/utils/email";
import { createResponse, handleErrorResponse } from '@/utils/response';
import { getTranslation } from "@/lib/translations/getTranslations";
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Define the rate limiter configuration
const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60, // per minute
});

// Define the shape of the request body
interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  lang?: string;
}

// Validate the language and ensure it's supported
function validateLanguage(lang: string): "en" | "pt" {
  const supportedLanguages = ['en', 'pt'] as const;
  const defaultLanguage = "en";

  if (!lang) return defaultLanguage;
  if (!supportedLanguages.includes(lang as typeof supportedLanguages[number])) {
    throw new Error("Unsupported language.");
  }
  return lang as typeof supportedLanguages[number];
}

// Handle POST requests to process the contact form submission
export async function POST(request: NextRequest) {
  try {
    // Get the client's IP address from the request headers
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    await rateLimiter.consume(ip);

    const body: ContactRequestBody = JSON.parse(await request.text());
    const lang = validateLanguage(body.lang || 'en');
    const translations = getTranslation(lang);

    // Validate the request body using the ContactSchema
    const parsedData = ContactSchema(lang).safeParse(body);
    if (!parsedData.success) {
      const formattedErrors = parsedData.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      // Return a validation error response
      return createResponse(false, translations.validationMessage, 400, { errors: formattedErrors });
    }

    // Extract validated data from the parsed request body
    const { name, email, message } = parsedData.data;
    const smtpConfig = validateSMTPConfig();

    // Send the email using the provided SMTP configuration
    await sendEmailWithTimeout({ name, email, message, smtpConfig });

    // Return a success message
    return createResponse(true, translations.validationMessage || "Email sent successfully.", 200);
  } catch (error) {
    if (error && error.constructor && error.constructor.name === 'RateLimiterRes') {
      console.log("Rate limiter triggered: Too many requests.");
      return createResponse(false, "Too many requests. Please try again later.", 429);
    }
    // Handle unexpected errors
    return createResponse(false, "An unexpected error occurred.", 500, handleErrorResponse(error, "An unexpected error occurred."));
  }
}

// Handle GET requests and return a 405 Method Not Allowed response
export async function GET() {
  return createResponse(false, "This endpoint only accepts POST requests", 405);
}
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";
import { ContactSchema } from "@/schemas/ContactSchema";
import { getTranslation } from "@/lib/translations/getTranslations";

// Define the shape of the request body
interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  lang?: string;
}

// Define the shape of the SMTP configuration
interface SMTPConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

// Validate SMTP configuration and return the the credentials
function validateSMTPConfig(): SMTPConfig {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    throw new Error("Missing required SMTP credentials.");
  }

  return { host: smtpHost, port: smtpPort, user: smtpUser, pass: smtpPass };
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

// Handle error responses and return a formatted error message
function handleErrorResponse(error: unknown, defaultMessage: string) {
  return {
    success: false,
    message: error instanceof Error ? error.message : defaultMessage,
    error: process.env.NODE_ENV === 'development' ? error : undefined,
  };
}

function createResponse(success: boolean, message: string, status: number, data?: object) {
  return NextResponse.json({ success, message, ...data }, { status });
}

// Send an email using the provided SMTP configuration
async function sendEmailWithTimeout({ name, email, message, smtpConfig }: {
  name: string;
  email: string;
  message: string;
  smtpConfig: SMTPConfig;
}, timeout = 10000) {
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.port === 465,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  // Wrap the email sending in a timeout
  return Promise.race([
    transporter.sendMail({
      from: `"${name}" <${smtpConfig.user}>`,
      to: smtpConfig.user,
      replyTo: email,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email sending timed out")), timeout)
    ),
  ]);
}

// Handle POST requests to process the contact form submission
export async function POST(request: NextRequest) {
  try {
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
    // Handle unexpected errors
    return createResponse(false, "An unexpected error occurred.", 500, handleErrorResponse(error, "An unexpected error occurred."));
  }
}

// Handle GET requests and return a 405 Method Not Allowed response
export async function GET() {
  return createResponse(false, "This endpoint only accepts POST requests", 405);
}
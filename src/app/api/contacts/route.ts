import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";
import { ContactSchema } from "@/schemas/ContactSchema";
import { getTranslation } from "@/lib/translations/getTranslations";
//import { HttpError } from "@/lib/errors/HttpError";

async function sendEmail({ name, email, message, smtpConfig }: {
  name: string;
  email: string;
  message: string;
  smtpConfig: { host: string; port: number; user: string; pass: string };
}) {
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.port === 465,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${smtpConfig.user}>`,
    to: smtpConfig.user,
    replyTo: email,
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  });

  const result = await transporter.sendMail({
    from: `"${name}" <${smtpConfig.user}>`,
    to: smtpConfig.user,
    replyTo: email,
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  });
  
  return result;
}

// Handler para processar as requisições POST
export async function POST(request: NextRequest) {
  try {
    // log the raw request body
    const rawBody = await request.text();
    console.log('Raw request body:', rawBody);

    // Parse do corpo da requisição
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
    
    // Get the language from the request body or default to "en"
    const lang = body.lang || 'en';
    const translations = getTranslation(lang);
    
    // Validate the request body using the ContactSchema
    const parsedData = ContactSchema(lang).safeParse(body);           

    // Check for missing required fields and throw a 400 Bad Request error if any are missing
    if (!parsedData.success) {
      const formattedErrors = parsedData.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      console.log('Validation errors:', formattedErrors);

      return NextResponse.json(
        { success: false, message: translations.validationMessage, errors: formattedErrors },
        { status: 400 }
      );
    }

    // Extract name, email, and message from the request body
    const { name, email, message } = parsedData.data;

    // Check if required environment variables are defined
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error('Missing SMTP credentials:', { smtpHost, smtpPort, smtpUser: !!smtpUser, smtpPass: !!smtpPass });
      return NextResponse.json(
        { success: false, message: "Missing required SMTP credentials." },
        { status: 500 }
      );
    }

    console.log('Attempting to send email with config:', { 
      smtpHost, 
      smtpPort, 
      smtpUser: smtpUser?.substring(0, 3) + '***', 
      hasPass: !!smtpPass 
    });

    // Send an email using the transporter
    try {
      const emailResult = await sendEmail({
        name,
        email,
        message,
        smtpConfig: { host: smtpHost, port: smtpPort, user: smtpUser, pass: smtpPass },
      });

      console.log('Email sent successfully:', emailResult.messageId);

    // Respond with a success message if the email is sent successfully
    return NextResponse.json(
      { success: true, message: translations.validationMessage }, 
      { status: 200 }
    );
  } catch (emailError) {
    console.error('Error sending email:', emailError);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to send email", 
        error: emailError instanceof Error ? emailError.message : "Unknown email error" 
      },
      { status: 500 }
    );
  }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "An unexpected error occurred.", 
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "This endpoint only accepts POST requests" },
    { status: 405 }
  );
}
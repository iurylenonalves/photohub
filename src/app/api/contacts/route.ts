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
}

// Handler para processar as requisições POST
export async function POST(request: NextRequest) {
  try {
    // Obter o corpo da requisição
    const body = await request.json();
    
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

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { success: false, message: "Missing required SMTP environment variables." },
        { status: 500 }
      );
    }

    // Send an email using the transporter
    await sendEmail({
      name,
      email,
      message,
      smtpConfig: { host: smtpHost, port: smtpPort, user: smtpUser, pass: smtpPass },
    });

    // Respond with a success message if the email is sent successfully
    return NextResponse.json(
      { success: true, message: translations.validationMessage }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "An unexpected error occurred." }, 
      { status: 500 }
    );
  }
}
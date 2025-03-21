import { Handler } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { HttpError } from "../errors/HttpError";
import { ContactSchema } from "../../schemas/ContactSchema";
import { getTranslation } from "../../server/utils/getTranslations";

// Load environment variables from .env file
dotenv.config();

export class ContactsController {
  // Handler to send an email
  sentEmail: Handler = async (req, res) => {
    try {
      // Get the language from the request headers or default to "en"
      const lang = req.body.lang || 'en';

      const translations = getTranslation(lang); // 🔹 Passando o idioma corretamente
      // Validate the request body using the ContactSchema
      const parsedData = ContactSchema(lang).safeParse(req.body);           

      // Check for missing required fields and throw a 400 Bad Request error if any are missing
      if (!parsedData.success) {
        throw new HttpError(400, translations.validationMessage, parsedData.error.format());
      }

      // Extract name, email, and message from the request body
      const { name, email, message } = parsedData.data;

      // Check if required environment variables are defined
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpUser || !smtpPass) {
        throw new HttpError(500, "SMTP_USER or SMTP_PASS is missing in the environment variables.");
      }

      // Create a Nodemailer transporter using SMTP configuration from environment variables
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // Use SSL if the port is 465
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Send an email using the transporter
      await transporter.sendMail({
        from: `"${name}" <${smtpUser}>`,
        to: smtpUser,
        replyTo: email,
        subject: translations.validationSubjectForm,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });

      // Respond with a success message if the email is sent successfully
      res.status(200).json({ success: true, message: translations.validationMessage })
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });    
    }
  } 
}

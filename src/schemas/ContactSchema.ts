import { z } from "zod";
import { getTranslation } from "../server/utils/translations"; // Importando a função getTranslation

export const ContactSchema = (lang: "en" | "pt") => {
  const translations = getTranslation(lang); // Passando o idioma corretamente

  return z.object({
    name: z.string().min(2, { message: translations.validationName }),
    email: z.string().email({ message: translations.validationEmail }),
    message: z.string().min(10, { message: translations.validationMessage }),
  });
};

export type ContactFormData = z.infer<ReturnType<typeof ContactSchema>>;

import { z } from "zod";
import { getTranslation } from "../utils/getTranslations";
import { Language } from "../utils/translations";

export const createContactSchema = (lang: Language) => {
  const t = getTranslation(lang); // Pega o idioma do usuário

  return z.object({
    name: z.string().min(2, t.validationName),
    email: z.string().email(t.validationEmail),
    message: z.string().min(10, t.validationMessage),
  });
};
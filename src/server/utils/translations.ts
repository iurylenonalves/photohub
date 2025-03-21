export const translations = {
  en: {
    validationName: "Name must be at least 2 characters",
    validationEmail: "Invalid email format",
    validationMessage: "Message must be at least 10 characters",
    validationSubjectForm: "New message from contact form",
  },
  pt: {
    validationName: "O nome deve ter pelo menos 2 caracteres",
    validationEmail: "Formato de e-mail inválido",
    validationMessage: "A mensagem deve ter pelo menos 10 caracteres",
    validationSubjectForm: "Nova mensagem do formulário de contato",
  },
} as const; // 🔹 Garante que os valores são constantes

// 🔹 Define um tipo que representa as chaves do objeto de tradução
export type Language = keyof typeof translations; // "en" | "pt"

// 🔹 Define um tipo genérico para a estrutura de um idioma
export type TranslationKeys = keyof (typeof translations)["en"]; // "validationName" | "validationEmail" | "validationMessage"

// 🔹 Tipo que representa qualquer idioma suportado
export type TranslationsType = Record<Language, Record<TranslationKeys, string>>;

// 🔹 Função para pegar as traduções do idioma
export const getTranslation = (lang: Language): Record<TranslationKeys, string> => {
  return translations[lang];
};
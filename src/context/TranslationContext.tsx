'use client'

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../app/locales/en.json";
import pt from "../app/locales/pt.json";

type Translations = typeof en; // Set the type for the translations, based on the JSON file format.

interface TranslationContextType {
  translations: Translations;
  locale: string;
  setLocale: (locale: string) => void;
}

// Set the type for the component's children
interface TranslationProviderProps {
  children: React.ReactNode;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Add the type to the props component
export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<string>("en");

  const [translations, setTranslations] = useState<Translations>(en)

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "en";
    setLocaleState(savedLocale);
    setTranslations(savedLocale === "pt" ? pt : en);
  }, []);

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    setTranslations(newLocale === "pt" ? pt : en);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }
  };

  return (
    <TranslationContext.Provider value={{ translations, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook to use the translations
export const useTranslations = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslations must be used within a TranslationProvider");
  }
  return context;
};
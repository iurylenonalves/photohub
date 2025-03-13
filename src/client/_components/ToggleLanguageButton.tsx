'use client'

import { useTranslations } from "@/context/TranslationContext";
import Image from "next/image";

const ToggleLanguageButton = () => {
  const { locale, setLocale } = useTranslations();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "pt" : "en");
  };

  return (
    <div className="flag-container">
      <button 
      onClick={toggleLanguage} 
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        border: "none",
        background: "none",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      <Image 
        className="flag-icon"
        src={`/images/${locale === "pt" ? "pt" : "en"}.svg`} 
        alt={locale === "en" ? "English Flag" : "Brazilian Flag"} 
        width={56} 
        height={40}
        style={{ objectFit: "contain" }}
      />
      {locale === "en" ? "English" : "Português"}
    </button>
    </div>
  );
};

export default ToggleLanguageButton;
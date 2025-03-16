'use client'

import { useTranslations } from "@/context/TranslationContext";
import Image from "next/image";
import { useEffect, useState } from "react";

const ToggleLanguageButton = () => {
  const { locale, setLocale } = useTranslations();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "pt" : "en");
  };

  const flagToShow = locale === "en" ? "pt" : "en";
  const flagAlt = locale === "en" ? "Brazilian Flag" : "English Flag";
  const languageText = locale === "en" ? "Português" : "English";

  return (
    <div className="flag-container">
      <button 
      onClick={toggleLanguage} 
      aria-label={`Switch language to ${languageText}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? "4px" : "8px",
        border: "none",
        background: "none",
        cursor: "pointer",
        fontSize: isMobile ? "0.8rem" : "1rem",
      }}
    >
      <Image 
        className="flag-icon"
        src={`/images/${flagToShow}.svg`} 
        alt={flagAlt} 
        width={isMobile ? 36 : 56} 
        height={isMobile ? 26 : 40}
        priority={true}
        style={{ objectFit: "contain" }}
      />
      {!isMobile && languageText}
    </button>
    </div>
  );
};

export default ToggleLanguageButton;
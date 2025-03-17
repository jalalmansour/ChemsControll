"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import enTranslations from '../translations/en.json';
import frTranslations from '../translations/fr.json';
import deTranslations from '../translations/de.json';
import esTranslations from '../translations/es.json';
import arTranslations from '../translations/ar.json';
import jaTranslations from '../translations/ja.json';
import cnTranslations from '../translations/cn.json';
import afTranslations from '../translations/af.json';

// Language types
export type LanguageCode = "en" | "fr" | "ar" | "de" | "es" | "ja" | "cn" | "af";

// Interface for translations
interface Translations {
  [key: string]: string;
}

// Interface for context
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
  translations: Record<LanguageCode, Translations>;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language info with code, name and flag
export interface LanguageInfo {
  code: string;
  name: string;
  flag: string;
}

// Create the Language Provider component
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [translations, setTranslations] = useState<Record<LanguageCode, Translations>>({
    en: enTranslations,
    fr: frTranslations,
    de: deTranslations,
    es: esTranslations,
    ar: arTranslations,
    ja: jaTranslations,
    cn: cnTranslations,
    af: afTranslations
  });

  // Load translations on mount
  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language") as LanguageCode;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang && ["en", "fr", "ar", "de", "es", "ja", "cn", "af"].includes(browserLang)) {
        setLanguage(browserLang as LanguageCode);
      }
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    // If language is RTL (Arabic), add the RTL attribute
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  // Type-safe language setter
  const handleSetLanguage = (newLanguage: string) => {
    if (isValidLanguageCode(newLanguage)) {
      setLanguage(newLanguage);
    }
  };

  // Function to check if a string is a valid language code
  const isValidLanguageCode = (code: string): code is LanguageCode => {
    return ["en", "fr", "ar", "de", "es", "ja", "cn", "af"].includes(code);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage as (lang: LanguageCode) => void,
      t,
      translations
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Export the supported languages
export const supportedLanguages: LanguageInfo[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ar", name: "العربية", flag: "🇦🇪" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "cn", name: "中文", flag: "🇨🇳" },
  { code: "af", name: "Afrikaans", flag: "🇿🇦" }
];

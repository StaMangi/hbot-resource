import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "el";

interface LanguageContextType {
  language: Language;
  /** Alias for `language` — convenient for indexing bilingual data objects */
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations are loaded lazily to keep bundle splits clean
import { en } from "@/i18n/en";
import { el } from "@/i18n/el";

const translations: Record<Language, Record<string, string>> = { en, el };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("hbot-lang");
      if (stored === "el" || stored === "en") return stored;
    } catch {}
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("hbot-lang", lang);
    } catch {}
  };

  const t = (key: string): string => {
    return translations[language][key] ?? translations["en"][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, lang: language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

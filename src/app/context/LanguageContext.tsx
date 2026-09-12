"use client";
import { createContext, useContext, useSyncExternalStore } from "react";
import { Language, translations } from "../i18n/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: (typeof translations)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getLanguage = (): Language => localStorage.getItem("language") === "es" ? "es" : "en";
const subscribe = (callback: () => void) => {
  const handleChange = () => callback();
  window.addEventListener("storage", handleChange);
  window.addEventListener("languagechange", handleChange);
  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("languagechange", handleChange);
  };
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getLanguage, (): Language => "en");

  const setLanguage = (next: Language) => {
    localStorage.setItem("language", next);
    document.documentElement.lang = next;
    window.dispatchEvent(new Event("languagechange"));
  };

  return <LanguageContext.Provider value={{ language, setLanguage, copy: translations[language] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

"use client";
import { Languages } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const next = language === "en" ? "es" : "en";

  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}
      title={language === "en" ? "Español" : "English"}
      className="flex h-10 items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-3 text-xs font-semibold uppercase tracking-[0.12em] 
      text-(--foreground) shadow-sm transition hover:scale-[1.03] hover:bg-(--surface-strong) focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-amber-500"
    >
      <Languages size={15} />
      {language === "en" ? "ES" : "EN"}
    </button>
  );
}

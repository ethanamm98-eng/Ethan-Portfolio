"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";

const subscribeToTheme = (callback: () => void) => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const syncSystemTheme = () => {
    if (localStorage.getItem("theme")) return;
    document.documentElement.setAttribute(
      "data-theme",
      media.matches ? "dark" : "light"
    );
    callback();
  };
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  media.addEventListener("change", syncSystemTheme);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", syncSystemTheme);
  };
};

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => "dark");

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-(--surface) text-(--foreground) shadow-sm transition hover:scale-[1.05] hover:bg-(--surface-strong) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

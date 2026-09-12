"use client";
import { CircleStop, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function PageTourButton() {
  const { copy } = useLanguage();
  const [isTouring, setIsTouring] = useState(false);
  const frameRef = useRef<number | null>(null);
  const originalScrollBehaviorRef = useRef("");

  const stopTour = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    document.documentElement.style.scrollBehavior =
      originalScrollBehaviorRef.current;
    setIsTouring(false);
  }, []);

  const startTour = () => {
    if (isTouring) {
      stopTour();
      return;
    }

    const start = window.scrollY;
    const end = document.documentElement.scrollHeight - window.innerHeight;
    const distance = Math.max(0, end - start);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: end, behavior: "auto" });
      return;
    }

    const duration = Math.min(26000, Math.max(14000, distance / 105));
    const startedAt = performance.now();
    originalScrollBehaviorRef.current =
      document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    setIsTouring(true);

    const animateTour = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = progress - Math.sin(progress * Math.PI * 2) / (Math.PI * 2);
      window.scrollTo(0, start + distance * eased);

      if (progress < 1) frameRef.current = requestAnimationFrame(animateTour);
      else {
        frameRef.current = null;
        document.documentElement.style.scrollBehavior =
          originalScrollBehaviorRef.current;
        setIsTouring(false);
      }
    };

    frameRef.current = requestAnimationFrame(animateTour);
  };

  useEffect(() => {
    if (!isTouring) return;

    const stopOnKey = (event: KeyboardEvent) => {
      if (
        [
          "Escape",
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      )
        stopTour();
    };

    window.addEventListener("wheel", stopTour, { passive: true });
    window.addEventListener("touchstart", stopTour, { passive: true });
    window.addEventListener("keydown", stopOnKey);

    return () => {
      window.removeEventListener("wheel", stopTour);
      window.removeEventListener("touchstart", stopTour);
      window.removeEventListener("keydown", stopOnKey);
    };
  }, [isTouring, stopTour]);

  useEffect(() => stopTour, [stopTour]);

  return (
    <button
      type="button"
      onClick={startTour}
      aria-pressed={isTouring}
      className="group inline-flex items-center gap-2 rounded-full border border-[#d7ad55]/35 bg-[linear-gradient(135deg,rgba(215,173,85,0.16),rgba(166,103,61,0.1))] 
      px-5 py-3 text-sm font-medium text-(--foreground) shadow-[0_12px_35px_rgba(177,125,36,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 
      hover:border-[#d7ad55]/60 hover:shadow-[0_16px_42px_rgba(177,125,36,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ad55]"
    >
      {isTouring ? (
        <CircleStop size={16} />
      ) : (
        <Play size={15} className="transition group-hover:translate-x-0.5" />
      )}
      {isTouring ? copy.hero.stopTour : copy.hero.tour}
    </button>
  );
}

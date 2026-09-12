"use client";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function ScrollRocket() {
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const lastProgress = useRef(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "70vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.025, 1], [0, 1, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const difference = latest - lastProgress.current;
    if (latest >= 0.94) setDirection("up");
    else if (latest <= 0.03) setDirection("down");
    else if (Math.abs(difference) > 0.00015)
      setDirection(difference > 0 ? "down" : "up");
    lastProgress.current = latest;
  });

  const handleRocketClick = () => {
    window.scrollTo({
      top: direction === "down" ? document.documentElement.scrollHeight : 0,
      behavior: "smooth",
    });
  };

  const label =
    direction === "down"
      ? language === "es"
        ? "Ir al final de la página"
        : "Fly to the bottom of the page"
      : language === "es"
      ? "Volver al inicio"
      : "Fly back to the top";

  return (
    <motion.div
      style={{ y, opacity }}
      className="fixed right-5 top-24 z-40 hidden lg:block xl:right-8"
    >
      <motion.button
        type="button"
        onClick={handleRocketClick}
        aria-label={label}
        title={label}
        animate={{ rotate: direction === "down" ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 210, damping: 22 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-[#d9b35c]/35 bg-(--nav-bg) 
        shadow-[0_14px_45px_rgba(185,133,40,0.24)] outline-none backdrop-blur-xl transition-colors hover:border-[#d9b35c]/70 focus-visible:ring-2 focus-visible:ring-[#d9b35c] focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)"
      >
        <span className="absolute inset-1.5 rounded-full border border-(--border)" />
        <Image
          src="/projects/rocket-svgrepo-com.svg"
          alt=""
          width={28}
          height={28}
          className="theme-icon relative h-7 w-7"
        />
        <motion.span
          animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [0.7, 1.15, 0.7] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute left-1/2 h-8 w-px -translate-x-1/2 bg-linear-to-b from-[#e8c76b]/80 to-transparent ${
            direction === "down" ? "-top-8" : "-bottom-8 rotate-180"
          }`}
        />
        <span
          className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 hidden w-max -translate-y-1/2 rounded-full border border-(--border) 
        bg-(--nav-bg) px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-(--foreground) opacity-0 shadow-lg backdrop-blur-xl transition-opacity 
        group-hover:opacity-100 xl:block"
        >
          {label}
        </span>
      </motion.button>
    </motion.div>
  );
}

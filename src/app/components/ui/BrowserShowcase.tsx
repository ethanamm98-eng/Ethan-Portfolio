"use client";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { featuredProjects } from "../../data/featuredProjects";
import { useLanguage } from "../../context/LanguageContext";

type BrowserShowcaseProps = {
  mode?: "hero" | "expanded";
  scrollProgress?: MotionValue<number>;
};

export default function BrowserShowcase({
  mode = "hero",
  scrollProgress,
}: BrowserShowcaseProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { copy } = useLanguage();
  const fallbackProgress = useMotionValue(0);
  const progress = scrollProgress ?? fallbackProgress;
  const smoothProgress = useSpring(progress, {
    stiffness: 72,
    damping: 24,
    mass: 0.7,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 110,
    damping: 22,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 110,
    damping: 22,
  });

  const heroScale = useTransform(
    smoothProgress,
    [0, 0.18, 0.78, 1],
    [0.68, 0.7, 1.28, 1.48]
  );
  const heroTop = useTransform(
    smoothProgress,
    [0, 0.2, 0.82, 1],
    ["28vh", "31vh", "112vh", "128vh"]
  );
  const heroRight = useTransform(
    smoothProgress,
    [0, 0.55, 1],
    ["-4vw", "-5vw", "-6.2vw"]
  );
  const heroBorderRadius = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    [28, 22, 12]
  );
  const heroRotate = useTransform(
    smoothProgress,
    [0, 0.35, 1],
    [-1.2, -0.4, 0]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  const activeProject = useMemo(
    () => ({
      ...featuredProjects[activeIndex],
      ...copy.projects[featuredProjects[activeIndex].id - 1],
    }),
    [activeIndex, copy.projects]
  );

  const isHero = mode === "hero";

  return (
    <div
      ref={wrapperRef}
      className="relative z-99 h-full w-full perspective-[1400px]"
    >
      <motion.div
        initial={{ opacity: 0, x: 56 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1.05,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={
          isHero
            ? {
                scale: heroScale,
                top: heroTop,
                right: heroRight,
                borderRadius: heroBorderRadius,
                rotateZ: heroRotate,
                rotateX,
                rotateY,
              }
            : {
                rotateX,
                rotateY,
              }
        }
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
          const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
          mouseX.set(relativeX);
          mouseY.set(relativeY);
        }}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        className={
          isHero
            ? "absolute z-99 w-[92vw] max-w-225 origin-bottom-right will-change-transform"
            : "relative mx-auto w-full max-w-350 will-change-transform"
        }
      >
        <svg
          viewBox="0 0 1200 820"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="browserStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.14)" />
            </linearGradient>
          </defs>
          <rect
            x="8"
            y="8"
            width="1184"
            height="804"
            rx="30"
            fill="rgba(255,255,255,0.03)"
            stroke="url(#browserStroke)"
            strokeWidth="2"
          />
        </svg>

        <div className="relative overflow-hidden rounded-[28px] border border-(--border) bg-(--surface) shadow-[0_30px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors duration-300">
          <div className="flex items-center justify-between border-b border-(--border) bg-(--surface) px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-(--foreground)/35" />
              <span className="h-3 w-3 rounded-full bg-(--foreground)/20" />
              <span className="h-3 w-3 rounded-full bg-(--foreground)/12" />
            </div>

            <div
              className="mx-4 flex-1 max-w-105 rounded-full border border-(--border) bg-(--background)/40 px-4 py-2 text-center text-[10px] uppercase 
            tracking-[0.32em] text-(--muted) sm:text-[11px]"
            >
              {copy.browser.path}
            </div>

            <div className="hidden w-20 justify-end sm:flex">
              <span className="text-[10px] uppercase tracking-[0.28em] text-(--muted)">
                {copy.browser.live}
              </span>
            </div>
          </div>

          <div
            className={`relative overflow-hidden ${
              isHero ? "aspect-16/10" : "aspect-video"
            } bg-(--background)`}
          >
            {featuredProjects.map((project, index) => {
              const localizedProject = {
                ...project,
                ...copy.projects[project.id - 1],
              };
              return (
                <motion.div
                  key={project.id}
                  initial={false}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    scale: index === activeIndex ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`absolute inset-0 ${
                    project.backgroundClass ?? "bg-(--background)"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={localizedProject.title}
                    fill
                    priority={index === 0}
                    sizes={isHero ? "(max-width: 1024px) 92vw, 900px" : "100vw"}
                    className="object-contain p-3 sm:p-5"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85),rgba(0,0,0,0.18),transparent)] dark:bg-[linear-gradient(to_top,rgba(0,0,0,0.85),rgba(0,0,0,0.18),transparent)]" />
                </motion.div>
              );
            })}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%)]" />

            {activeProject.year === "2027" && (
              <motion.div
                key={`coming-soon-${activeProject.id}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-[#e3bd6b]/45 bg-[#11151e]/80 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f0cf86] shadow-lg backdrop-blur-xl sm:right-6 sm:top-6"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#e3bd6b] shadow-[0_0_10px_rgba(227,189,107,0.9)]" />
                {copy.work.comingSoon}
              </motion.div>
            )}

            <div
              className={`absolute inset-x-0 bottom-0 z-10 ${
                isHero ? "p-5 sm:p-7" : "p-6 sm:p-8 md:p-10"
              }`}
            >
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="max-w-xl"
              >
                <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/70 sm:text-[11px]">
                  {activeProject.category} · {activeProject.year}
                </p>
                <h3
                  className={`${
                    isHero
                      ? "text-2xl sm:text-3xl"
                      : "text-3xl sm:text-4xl md:text-5xl"
                  } font-semibold tracking-[-0.03em] text-white`}
                >
                  {activeProject.title}
                </h3>
                <p
                  className={`mt-3 max-w-2xl ${
                    isHero ? "text-sm sm:text-[15px]" : "text-base sm:text-lg"
                  } leading-6 sm:leading-8 text-white/78`}
                >
                  {activeProject.description}
                </p>
              </motion.div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {featuredProjects.map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`${copy.browser.show} ${
                      copy.projects[project.id - 1]?.title ?? project.title
                    }`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-12 bg-white"
                        : "w-2.5 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

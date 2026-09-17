"use client";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { featuredProjects } from "../../data/featuredProjects";
import { useLanguage } from "../../context/LanguageContext";

type BrowserShowcaseProps = {
  mode?: "hero" | "expanded";
  scrollProgress?: MotionValue<number>;
};

function interpolateValue(
  value: number,
  input: number[],
  output: number[]
): number {
  if (value <= input[0]) return output[0];

  if (value >= input[input.length - 1]) {
    return output[output.length - 1];
  }

  for (let index = 0; index < input.length - 1; index += 1) {
    const inputStart = input[index];
    const inputEnd = input[index + 1];

    if (value >= inputStart && value <= inputEnd) {
      const progress = (value - inputStart) / (inputEnd - inputStart);
      const outputStart = output[index];
      const outputEnd = output[index + 1];

      return outputStart + (outputEnd - outputStart) * progress;
    }
  }

  return output[0];
}

export default function BrowserShowcase({
  mode = "hero",
  scrollProgress,
}: BrowserShowcaseProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [supportsPointerMotion, setSupportsPointerMotion] = useState(false);

  const { copy } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const fallbackProgress = useMotionValue(0);
  const viewportWidth = useMotionValue(1440);
  const viewportHeight = useMotionValue(900);
  const wrapperLeft = useMotionValue(0);
  const browserWidth = useMotionValue(900);
  const browserRef = useRef<HTMLDivElement | null>(null);

  const progress = scrollProgress ?? fallbackProgress;

  const smoothProgress = useSpring(progress, {
    stiffness: 72,
    damping: 24,
    mass: 0.7,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawRotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    supportsPointerMotion ? [5, -5] : [0, 0]
  );

  const rawRotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    supportsPointerMotion ? [-6, 6] : [0, 0]
  );

  const rotateX = useSpring(rawRotateX, {
    stiffness: 110,
    damping: 24,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 110,
    damping: 24,
  });

  // offsetWidth is the browser's untransformed width. Scaling around its center
  // keeps the measured center at the same screen coordinate at every zoom level.
  const heroScale = useTransform(
    [smoothProgress, viewportWidth, browserWidth],
    ([currentProgress, currentWidth, measuredWidth]: number[]) => {
      const desired = prefersReducedMotion
        ? 0.72
        : interpolateValue(currentProgress, [0, 0.18, 0.78, 1], [0.68, 0.7, 1.28, 1.48]);
      const safeWidth = Math.max(1, measuredWidth);
      const centerFraction = prefersReducedMotion
        ? 0.5
        : interpolateValue(currentProgress, [0, 0.2, 0.78, 1], [0.735, 0.735, 0.5, 0.5]);
      const horizontalRoom = Math.max(0, 2 * Math.min(centerFraction, 1 - centerFraction) * currentWidth - 32);
      return Math.min(desired, horizontalRoom / safeWidth);
    }
  );

  /*
   * Vertical placement responds to viewport height so short laptops and
   * tall tablets follow the same visual path.
   */
const heroTop = useTransform(
  [smoothProgress, viewportHeight, viewportWidth],
  ([currentProgress, currentHeight, currentWidth]: number[]) => {
    const isTablet = currentWidth < 1280;
    const isShortScreen = currentHeight < 850;

    /*
     * Lower starting position:
     * Increase the first two multipliers.
     *
     * Higher final transition position:
     * Reduce the final three multipliers compared with the previous values.
     */
    if (isTablet) {
      const positions = isShortScreen
        ? [
            currentHeight * 0.32,
            currentHeight * 0.34,
            currentHeight * 0.66,
            currentHeight * 0.93,
            currentHeight * 1.06,
          ]
        : [
            currentHeight * 0.35,
            currentHeight * 0.37,
            currentHeight * 0.69,
            currentHeight * 0.96,
            currentHeight * 1.08,
          ];

      return interpolateValue(
        currentProgress,
        [0, 0.18, 0.52, 0.82, 1],
        positions
      );
    }

    if (currentWidth < 1800) {
      const positions = isShortScreen
        ? [
            currentHeight * 0.34,
            currentHeight * 0.36,
            currentHeight * 0.67,
            currentHeight * 0.95,
            currentHeight * 1.08,
          ]
        : [
            currentHeight * 0.37,
            currentHeight * 0.39,
            currentHeight * 0.7,
            currentHeight * 0.98,
            currentHeight * 1.1,
          ];

      return interpolateValue(
        currentProgress,
        [0, 0.18, 0.52, 0.82, 1],
        positions
      );
    }

    const positions = isShortScreen
      ? [
          currentHeight * 0.35,
          currentHeight * 0.37,
          currentHeight * 0.68,
          currentHeight * 0.96,
          currentHeight * 1.08,
        ]
      : [
          currentHeight * 0.4,
          currentHeight * 0.42,
          currentHeight * 0.72,
          currentHeight * 1,
          currentHeight * 1.12,
        ];

    return interpolateValue(
      currentProgress,
      [0, 0.18, 0.52, 0.82, 1],
      positions
    );
  }
);

  // The first center sits in the hero's right column. By the end of the
  // scroll it reaches the actual viewport center, regardless of container padding.
  const heroX = useTransform(
    [smoothProgress, viewportWidth, wrapperLeft, browserWidth],
    ([currentProgress, currentWidth, currentLeft, measuredWidth]: number[]) => {
      const centerFraction = prefersReducedMotion
        ? 0.5
        : interpolateValue(currentProgress, [0, 0.2, 0.78, 1], [0.735, 0.735, 0.5, 0.5]);
      return currentWidth * centerFraction - currentLeft - measuredWidth / 2;
    }
  );

  const heroBorderRadius = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    [28, 22, 14]
  );

  const heroRotate = useTransform(
    smoothProgress,
    [0, 0.35, 1],
    prefersReducedMotion ? [0, 0, 0] : [-1, -0.35, 0]
  );

  useEffect(() => {
    if (mode !== "hero") return;
    const wrapper = wrapperRef.current;
    const browser = browserRef.current;
    if (!wrapper || !browser) return;

    const updateMeasurements = () => {
      viewportWidth.set(document.documentElement.clientWidth);
      viewportHeight.set(window.innerHeight);
      wrapperLeft.set(wrapper.getBoundingClientRect().left);
      browserWidth.set(browser.offsetWidth);
      setSupportsPointerMotion(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
      );
    };

    const observer = new ResizeObserver(updateMeasurements);
    observer.observe(wrapper);
    observer.observe(browser);
    updateMeasurements();
    window.addEventListener("resize", updateMeasurements, { passive: true });
    // Recheck the wrapper's page position when a parent layout changes on scroll.
    window.addEventListener("scroll", updateMeasurements, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMeasurements);
      window.removeEventListener("scroll", updateMeasurements);
    };
  }, [mode, viewportWidth, viewportHeight, wrapperLeft, browserWidth]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % featuredProjects.length
      );
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

  const activeProject = useMemo(() => {
    const project = featuredProjects[activeIndex];

    return {
      ...project,
      ...copy.projects[project.id - 1],
    };
  }, [activeIndex, copy.projects]);

  const isHero = mode === "hero";

  const handlePointerMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!supportsPointerMotion || prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const relativeX =
      (event.clientX - rect.left) / rect.width - 0.5;

    const relativeY =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const resetPointerMotion = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative z-99 h-full w-full overflow-visible perspective-[1400px] mb-10 bottom-0 mt-10"
    >
      <motion.div
        ref={browserRef}
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 24 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0.25 : 0.9,
          delay: prefersReducedMotion ? 0 : 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={
          isHero
            ? {
                scale: heroScale,
                top: heroTop,
                left: 0,
                x: heroX,
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
        onMouseMove={handlePointerMove}
        onMouseLeave={resetPointerMotion}
        className={
          isHero
            ? `
                absolute z-99
                w-[78vw]
                max-w-225
                origin-center
                will-change-transform
                lg:w-[76vw]
                xl:w-[70vw]
                2xl:w-[64vw]
              `
            : `
                relative mx-auto
                w-full
                max-w-350
                origin-center
                will-change-transform
              `
        }
      >
        <svg
          viewBox="0 0 1200 820"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="browserStroke"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="rgba(255,255,255,0.7)"
              />

              <stop
                offset="100%"
                stopColor="rgba(255,255,255,0.14)"
              />
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

        <div className="relative overflow-hidden rounded-[20px] border border-(--border) bg-(--surface) shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl transition-colors duration-300 sm:rounded-[24px] xl:rounded-[28px] xl:shadow-[0_30px_120px_rgba(0,0,0,0.28)]">
          {/* Browser toolbar */}
          <div className="flex min-w-0 items-center justify-between border-b border-(--border) bg-(--surface) px-3 py-2.5 sm:px-4 sm:py-3 xl:px-5">
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-(--foreground)/35 sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-(--foreground)/20 sm:h-3 sm:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-(--foreground)/12 sm:h-3 sm:w-3" />
            </div>

            <div className="mx-2 min-w-0 flex-1 truncate rounded-full border border-(--border) bg-(--background)/40 px-3 py-1.5 text-center text-[8px] uppercase tracking-[0.18em] text-(--muted) sm:mx-4 sm:max-w-105 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.26em] xl:text-[11px] xl:tracking-[0.32em]">
              <span className="block truncate">
                {copy.browser.path}
              </span>
            </div>

            <div className="hidden w-16 shrink-0 justify-end xl:flex xl:w-20">
              <span className="text-[9px] uppercase tracking-[0.22em] text-(--muted) xl:text-[10px] xl:tracking-[0.28em]">
                {copy.browser.live}
              </span>
            </div>
          </div>

          {/* Browser content */}
          <div
            className={`relative overflow-hidden ${
              isHero
                ? "aspect-[16/10] min-h-70"
                : "aspect-video min-h-75"
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
                    scale: index === activeIndex ? 1 : 1.035,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0.15 : 0.7,
                    ease: "easeOut",
                  }}
                  className={`absolute inset-0 ${
                    project.backgroundClass ?? "bg-(--background)"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={localizedProject.title}
                    fill
                    priority={index === 0}
                    sizes={
                      isHero
                        ? "(max-width: 1279px) 76vw, (max-width: 1535px) 70vw, 64vw"
                        : "(max-width: 1535px) 100vw, 1400px"
                    }
                    className="object-contain p-2.5 sm:p-4 xl:p-5"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.52)_25%,rgba(0,0,0,0.08)_58%,transparent_78%)]" />
                </motion.div>
              );
            })}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%)]" />

            {activeProject.year === "2027" && (
              <motion.div
                key={`coming-soon-${activeProject.id}`}
                initial={{
                  opacity: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-[#e3bd6b]/45 bg-[#11151e]/85 px-2.5 py-1.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-[#f0cf86] shadow-lg backdrop-blur-xl sm:right-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-2 sm:text-[8px] sm:tracking-[0.18em] xl:right-6 xl:top-6 xl:text-[9px] xl:tracking-[0.2em]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#e3bd6b] shadow-[0_0_10px_rgba(227,189,107,0.9)]" />

                {copy.work.comingSoon}
              </motion.div>
            )}

            <div
              className={`absolute inset-x-0 bottom-0 z-10 ${
                isHero
                  ? "p-3 sm:p-4 xl:p-7"
                  : "p-4 sm:p-6 md:p-8 xl:p-10"
              }`}
            >
              <motion.div
                key={activeProject.id}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0.15 : 0.4,
                  ease: "easeOut",
                }}
                className="max-w-[82%] sm:max-w-xl"
              >
                <p className="mb-1 text-[7px] uppercase tracking-[0.16em] text-white/70 sm:mb-2 sm:text-[9px] sm:tracking-[0.22em] xl:text-[11px] xl:tracking-[0.3em]">
                  {activeProject.category} · {activeProject.year}
                </p>

                <h3
                  className={`font-semibold leading-tight tracking-[-0.03em] text-white ${
                    isHero
                      ? "text-base sm:text-xl xl:text-3xl"
                      : "text-xl sm:text-3xl md:text-4xl xl:text-5xl"
                  }`}
                >
                  {activeProject.title}
                </h3>

                <p
                  className={`mt-1.5 max-w-2xl text-white/78 sm:mt-2 xl:mt-3 ${
                    isHero
                      ? "line-clamp-2 text-[9px] leading-4 sm:text-xs sm:leading-5 xl:text-[15px] xl:leading-6"
                      : "line-clamp-2 text-xs leading-5 sm:text-sm md:text-base md:leading-7 xl:text-lg xl:leading-8"
                  }`}
                >
                  {activeProject.description}
                </p>
              </motion.div>

              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2 xl:mt-6">
                {featuredProjects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`${copy.browser.show} ${
                      copy.projects[project.id - 1]?.title ??
                      project.title
                    }`}
                    className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                      index === activeIndex
                        ? "w-7 bg-white sm:w-9 xl:w-12"
                        : "w-1.5 bg-white/35 hover:bg-white/60 sm:w-2"
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
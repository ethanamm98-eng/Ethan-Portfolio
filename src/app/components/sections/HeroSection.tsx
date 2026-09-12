"use client";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import Container from "../ui/Container";
import BrowserShowcase from "../ui/BrowserShowcase";
import MobilePhoneShowcase from "../ui/MobilePhoneShowcase";
import { useLanguage } from "../../context/LanguageContext";

const popupCards = [
  {
    className:
      "top-10 right-4 rotate-[4deg] border-[#c9a45f]/45 bg-[var(--hero-card-champagne)] text-[var(--foreground)] shadow-[#b88835]/20",
    accentClassName: "bg-[#c9a45f]",
    lineClassName:
      "right-[158px] top-[112px] h-[120px] bg-gradient-to-b from-[#c9a45f]/55 to-transparent",
  },
  {
    className:
      "top-36 right-40 -rotate-[6deg] border-slate-400/35 bg-[var(--hero-card-platinum)] text-[var(--foreground)] shadow-slate-500/15",
    accentClassName: "bg-slate-400",
    lineClassName:
      "right-[275px] top-[220px] h-[110px] bg-gradient-to-b from-slate-300/60 to-transparent",
  },
  {
    className:
      "top-56 right-0 rotate-[7deg] border-[#a86f52]/40 bg-[var(--hero-card-bronze)] text-[var(--foreground)] shadow-[#986048]/20",
    accentClassName: "bg-[#a86f52]",
    lineClassName:
      "right-[110px] top-[315px] h-[120px] bg-gradient-to-b from-[#e2b83f]/55 to-transparent",
  },
];

export default function HeroSection() {
  const { copy } = useLanguage();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  return (
    <div className="flex flex-col-reverse">
      <div
        id="showcase"
        className="relative z-0 hidden h-screen w-full min-h-screen scroll-mt-20 bg-(--background-alt) lg:block"
      />

      <section
        ref={heroRef}
        id="top"
        className="relative z-10 min-h-screen overflow-hidden bg-(--background) text-(--foreground) transition-colors duration-300 lg:h-[200vh] lg:min-h-[200vh] 
        lg:overflow-visible"
      >
        <div className="relative min-h-screen lg:sticky lg:top-0 lg:h-screen lg:overflow-visible">
          <Container>
            <div className="relative min-h-screen min-w-full overflow-visible pb-16 pt-32 lg:h-screen lg:pb-10 lg:pt-28">
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* <div className="absolute left-[-10%] top-[-8%] h-[380px] w-[380px] rounded-full bg-white/[0.05] blur-3xl" />
                <div className="absolute right-[-8%] top-[12%] h-[420px] w-[420px] rounded-full bg-cyan-400/[0.08] blur-3xl" />
                <div className="absolute bottom-[-15%] right-[8%] h-[420px] w-[420px] rounded-full bg-indigo-500/[0.09] blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_26%,transparent_74%,rgba(255,255,255,0.02))]" /> */}
              </div>

              <div className="relative z-10 grid h-auto grid-cols-1 lg:h-full lg:grid-cols-12">
                <div className="flex flex-col justify-start lg:col-span-5">
                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="mb-5 text-[11px] uppercase tracking-[0.34em] text-(--muted)"
                  >
                    {copy.hero.eyebrow}
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className="max-w-4xl"
                  >
                    <span className="hero-outline-name block text-[2.65rem] font-semibold uppercase leading-[0.9] tracking-[-0.055em] sm:text-6xl xl:text-7xl">
                      Ethan Angelo
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-5 -mb-2 flex w-full max-w-76 items-center gap-3 sm:max-w-sm"
                    >
                      {/* <span className="h-px flex-1 bg-gradient-to-r from-[var(--hero-accent)] to-[var(--border)]" />
                      <span className="h-1.5 w-1.5 rotate-45 border border-[var(--hero-accent)]" /> */}
                    </span>
                    <span className="uppercase block max-w-2xl text-[2rem] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[2.7rem] xl:text-[3.8rem]">
                      {copy.hero.title.replace(/^Ethan Angelo\s*/, "")}
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.12 }}
                    className="mt-6 max-w-xl text-sm leading-7 text-(--muted) sm:text-base"
                  >
                    {copy.hero.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.18 }}
                    className="mt-8 flex flex-wrap gap-3"
                  >
                    <a
                      href="#showcase"
                      className="hidden rounded-full border border-(--border) bg-(--foreground) px-5 py-3 text-sm font-medium text-(--background) transition 
                      hover:scale-[1.02] lg:inline-flex"
                    >
                      {copy.hero.featured}
                    </a>
                    <a
                      href="#work"
                      className="inline-flex rounded-full border border-(--border) bg-(--foreground) px-5 py-3 text-sm font-medium text-(--background) 
                      transition hover:scale-[1.02] lg:hidden"
                    >
                      {copy.hero.featured}
                    </a>
                    <a
                      href="#about"
                      className="rounded-full border border-(--border) bg-(--surface) px-5 py-3 text-sm font-medium text-(--foreground) transition 
                      hover:bg-(--surface-strong)"
                    >
                      {copy.hero.about}
                    </a>
                    {/* <PageTourButton /> */}
                  </motion.div>

                  <MobilePhoneShowcase />
                </div>

                <div className="relative top-4 z-99 hidden min-h-130 lg:col-span-7 lg:block">
                  {/* floating cards */}
                  <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
                    {popupCards.map((card, index) => (
                      <motion.div
                        key={copy.hero.cards[index].title}
                        initial={{ opacity: 0, y: -30, scale: 0.9 }}
                        animate={{
                          opacity: 1,
                          y: [0, -6, 0],
                          scale: 1,
                        }}
                        transition={{
                          opacity: {
                            duration: 0.55,
                            delay: 0.2 + index * 0.12,
                            ease: "easeOut",
                          },
                          scale: {
                            duration: 0.55,
                            delay: 0.2 + index * 0.12,
                            ease: "easeOut",
                          },
                          y: {
                            duration: 4 + index,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.25,
                          },
                        }}
                        whileHover={{
                          y: -12,
                          scale: 1.055,
                          rotate: 0,
                          zIndex: 80,
                        }}
                        whileTap={{ scale: 1.025, zIndex: 80 }}
                        className={`pointer-events-auto absolute w-58.75 cursor-default rounded-3xl border p-4 shadow-[0_22px_70px_-18px] backdrop-blur-xl ring-1 
                          ring-white/15 transition-[box-shadow,border-color] duration-300 hover:border-(--hero-accent)/55 hover:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.48)] ${card.className}`}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="rounded-full bg-white/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-current">
                            {`0${index + 1}`}
                          </span>
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${card.accentClassName}`}
                          />
                        </div>

                        <h3 className="text-[22px] font-semibold tracking-[-0.03em]">
                          {copy.hero.cards[index].title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 opacity-85">
                          {copy.hero.cards[index].subtitle}
                        </p>

                        <div className="absolute -bottom-8 left-1/2 h-8 w-px -translate-x-1/2 bg-linear-to-b from-white/40 to-transparent" />
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.62 }}
                      className="absolute right-24 top-0 rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-xs uppercase tracking-[0.28em] 
                      text-(--muted) shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                    >
                      {copy.hero.based}
                    </motion.div>
                  </div>

                  {/* connector lines */}
                  <div className="pointer-events-none absolute inset-0 z-15 hidden lg:block">
                    {popupCards.map((card, index) => (
                      <div
                        key={`${index}-line`}
                        className={`absolute w-px ${card.lineClassName}`}
                      />
                    ))}
                  </div>

                  {/* Puerto Rico image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 0.24, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="pointer-events-none absolute left-1/4 top-[46%] z-10 w-162.5 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative">
                      <Image
                        src="/puerto-rico-transparent.png"
                        alt="Puerto Rico outline"
                        width={900}
                        height={450}
                        priority
                        className="h-auto w-full object-contain opacity-70 dark:invert"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_60%)]" />

                      {/* glowing nodes */}
                      <div className="pointer-events-none absolute inset-0">
                        {/* <motion.span
                          animate={{
                            opacity: [0.45, 1, 0.45],
                            scale: [1, 1.18, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[30%] top-[69%] h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.95)]"
                        /> */}
                        <motion.span
                          animate={{
                            opacity: [0.08, 0.22, 0.08],
                            scale: [1, 2.4, 1],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[29%] top-[46%] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-md"
                        />

                        <motion.span
                          animate={{
                            opacity: [0.45, 1, 0.45],
                            scale: [1, 1.18, 1],
                          }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[65%] top-[31%] h-3 w-3 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.95)]"
                        />
                        {/* <motion.span
                          animate={{
                            opacity: [0.45, 1, 0.45],
                            scale: [1, 1.18, 1],
                          }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[30%] top-[60%] h-3 w-3 rounded-full bg-teal-400 shadow-[0_0_20px_rgba(99,102,241,0.95)]"
                        /> */}
                        <motion.span
                          animate={{
                            opacity: [0.08, 0.22, 0.08],
                            scale: [1, 2.4, 1],
                          }}
                          transition={{
                            duration: 2.45,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[51%] top-[43%] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/20 blur-md"
                        />
                        {/* 
                        <motion.span
                          animate={{
                            opacity: [0.45, 1, 0.45],
                            scale: [1, 1.18, 1],
                          }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[60%] top-[30%] h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_20px_rgba(192,132,252,0.95)]"
                        /> */}
                        <motion.span
                          animate={{
                            opacity: [0.08, 0.22, 0.08],
                            scale: [1, 2.4, 1],
                          }}
                          transition={{
                            duration: 2.85,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[75%] top-[48%] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/20 blur-md"
                        />

                        {/* outer glow rings */}
                        <motion.span
                          animate={{
                            opacity: [0.15, 0.35, 0.15],
                            scale: [1, 1.6, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[29%] top-[46%] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/50"
                        />
                        <motion.span
                          animate={{
                            opacity: [0.15, 0.35, 0.15],
                            scale: [1, 1.6, 1],
                          }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[51%] top-[43%] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/50"
                        />
                        <motion.span
                          animate={{
                            opacity: [0.15, 0.35, 0.15],
                            scale: [1, 1.6, 1],
                          }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute left-[75%] top-[48%] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/50"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <BrowserShowcase
                    mode="hero"
                    scrollProgress={scrollYProgress}
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}

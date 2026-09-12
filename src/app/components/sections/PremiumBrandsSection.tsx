"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Gem } from "lucide-react";
import Container from "../ui/Container";
import { useLanguage } from "../../context/LanguageContext";
import { ClientLogo, clients } from "./CreatedForSection";

function chunkArray<T>(array: T[], size: number) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}

export default function PremiumBrandsSection() {
  const { copy } = useLanguage();
  const slides = useMemo(() => chunkArray(clients, 4), []);
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[activeSlide];

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      5600
    );
    return () => window.clearInterval(interval);
  }, [paused, slides.length]);

  const goNext = () =>
    setActiveSlide((current) => (current + 1) % slides.length);
  const goPrev = () =>
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);

  return (
    <section
      id="created-for"
      className="relative overflow-hidden bg-(--background-alt) py-24 text-(--foreground) transition-colors duration-300 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.028] bg-[radial-gradient(var(--foreground)_0.7px,transparent_0.7px)] bg-size-[11px_11px]" />
      <div className="pointer-events-none absolute -left-32 top-20 h-107.5 w-107.5 rounded-full border border-[#b88835]/10" />
      <div className="pointer-events-none absolute -left-16 top-36 h-75 w-75 rounded-full border border-[#b88835]/10" />
      <div className="pointer-events-none absolute -right-40 bottom-[-10%] h-130 w-130 rounded-full bg-[#b88835]/7 blur-3xl" />

      <Container>
        <div className="relative mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.34em] text-[#b88835]"
            >
              <Gem size={14} strokeWidth={1.5} /> {copy.created.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              {copy.created.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 max-w-2xl text-sm leading-7 text-(--muted) sm:text-base text-right md:text-left"
            >
              {copy.created.description}
            </motion.p>
          </div>

          <div className="flex items-center gap-3">
            <span className="mr-2 hidden text-[10px] uppercase tracking-[0.25em] text-(--muted) sm:block">
              {String(activeSlide + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={goPrev}
              aria-label={copy.created.previous}
              className="ml-auto md:ml-0 group flex h-12 w-12 items-center justify-center rounded-full border border-(--foreground)/20 bg-(--surface) 
              transition hover:border-[#b88835] hover:text-[#b88835]"
            >
              <ChevronLeft
                size={18}
                className="transition group-hover:-translate-x-0.5"
              />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={copy.created.next}
              className="mr-auto md:mr-0 group flex h-12 w-12 items-center justify-center rounded-full border border-(--foreground)/20 bg-(--surface) 
              transition hover:border-[#b88835] hover:text-[#b88835]"
            >
              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative overflow-hidden rounded-[38px] border border-(--foreground)/15 bg-(--surface) p-3 shadow-[0_35px_100px_rgba(77,51,19,0.16)] sm:p-5"
        >
          <div className="pointer-events-none absolute inset-3 rounded-[29px] border border-[#b88835]/10" />
          <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-linear-to-r from-transparent via-[#d4ad5c] to-transparent" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-3 lg:min-h-170 lg:grid-cols-12 lg:grid-rows-3"
            >
              <motion.a
                href={slide[0].href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 0.992 }}
                className="group relative text-center flex min-h-125 flex-col justify-between overflow-hidden rounded-[30px] border border-(--foreground)/15 
                bg-(--background) p-7 sm:p-10 lg:col-span-7 lg:row-span-3 lg:min-h-0"
              >
                <span className="pointer-events-none absolute -right-8 -top-14 font-serif text-[190px] italic leading-none text-(--foreground)/[0.035]">
                  01
                </span>
                <div
                  className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] 
                bg-size-[44px_44px]"
                />
                <div className="relative flex items-start justify-between">
                  <span className="rounded-full mx-auto border border-[#b88835]/35 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.25em] text-[#b88835]">
                    {copy.created.marqueeLabel}
                  </span>
                  {/* <ArrowUpRight
                    size={22}
                    strokeWidth={1.4}
                    className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  /> */}
                </div>
                <div className="relative my-10 flex flex-1 items-center justify-center">
                  <div
                    className={`relative flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border-2 border-(--foreground)/60 bg-(--surface-strong) 
                      shadow-[8px_9px_0_rgba(184,136,53,0.18)] transition duration-500 group-hover:rotate-2 group-hover:scale-105 sm:h-64 sm:w-64 ${
                        slide[0].fillCircle ? "p-0" : "p-10"
                      }`}
                  >
                    {!slide[0].fillCircle && (
                      <span className="absolute inset-3 rounded-full border border-[#b88835]/25" />
                    )}
                    <ClientLogo
                      {...slide[0]}
                      src={slide[0].logo}
                      alt={slide[0].logoAlt}
                    />
                  </div>
                </div>
                <div className="relative border-t border-(--foreground)/15 pt-6">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#b88835]">
                    {copy.created.types[slide[0].typeKey]}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                    {slide[0].name}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs text-(--muted)">
                    {copy.created.visit}
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </motion.a>

              {slide.slice(1).map((client, index) => (
                <motion.a
                  key={client.name}
                  href={client.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.07 }}
                  whileHover={{ x: -5 }}
                  className="group relative flex min-h-47.5 items-center gap-5 overflow-hidden rounded-[27px] border border-(--foreground)/15 bg-(--background) p-5 transition hover:border-[#b88835]/50 sm:p-6 lg:col-span-5"
                >
                  <span className="absolute right-5 top-4 font-mono text-[9px] text-(--muted)">
                    0{index + 2}
                  </span>
                  <div
                    className={`relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--foreground)/30 bg-(--surface-strong) 
                      shadow-[4px_5px_0_rgba(184,136,53,0.14)] transition group-hover:scale-105 ${
                        client.fillCircle ? "p-0" : "p-5"
                      }`}
                  >
                    <ClientLogo
                      {...client}
                      src={client.logo}
                      alt={client.logoAlt}
                    />
                  </div>
                  <div className="min-w-0 pr-4">
                    <p className="text-[9px] uppercase tracking-[0.22em] text-[#b88835]">
                      {copy.created.types[client.typeKey]}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold leading-tight tracking-[-0.03em] sm:text-xl">
                      {client.name}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-(--muted) opacity-0 transition group-hover:opacity-100">
                      {copy.created.visit}
                      <ArrowUpRight size={11} />
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`${copy.created.slide} ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "w-12 bg-[#b88835]"
                  : "w-5 bg-(--foreground)/15 hover:bg-(--foreground)/30"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

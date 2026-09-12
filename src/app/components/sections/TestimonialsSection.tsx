"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Container from "../ui/Container";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";

const testimonialContent = {
  en: {
    eyebrow: "Client Perspective",
    title: "Good work is remembered by how the collaboration felt.",
    description:
      "A space for the people behind the projects to share what it was like turning an idea into a polished digital experience.",
    sample: "Sample copy · replace with an approved client quote",
    previous: "Previous testimonial",
    next: "Next testimonial",
    entries: [
      {
        quote:
          "Ethan brings a rare balance of engineering discipline and design sensitivity. Complex ideas become clear, elegant experiences without losing the details that matter.",
        name: "Anonymous Client",
        role: "Product partner · Non-profit organization",
      },
      {
        quote:
          "He listens closely, asks the right questions, and turns operational requirements into interfaces that feel remarkably simple for the people using them every day.",
        name: "Supervisor",
        role: "Department Leader · Synergy LLC",
      },
      {
        quote:
          "The final product felt considered from every angle—from visual hierarchy and motion to responsiveness, performance, and the small moments users remember.",
        name: "Anonymous Co-Worker",
        role: "Senior Lead Back-End Developer · Synergy LLC",
      },
    ],
  },
  es: {
    eyebrow: "Perspectiva del Cliente",
    title:
      "El buen trabajo también se recuerda por cómo se sintió la colaboración.",
    description:
      "Un espacio para que las personas detrás de cada proyecto compartan cómo fue convertir una idea en una experiencia digital pulida.",
    sample: "Texto de muestra · reemplazar con una cita aprobada",
    previous: "Testimonio anterior",
    next: "Próximo testimonio",
    entries: [
      {
        quote:
          "Ethan combina disciplina de ingeniería y sensibilidad de diseño de una forma poco común. Las ideas complejas se convierten en experiencias claras y elegantes sin perder los detalles importantes.",
        name: "Cliente anónimo",
        role: "Socio de producto · Organización sin fines de lucro",
      },
      {
        quote:
          "Escucha con atención, hace las preguntas correctas y transforma requisitos operacionales en interfaces sencillas para quienes las utilizan todos los días.",
        name: "Supervisor",
        role: "Líder de departamento · Synergy LLC",
      },
      {
        quote:
          "El producto final se sintió cuidado desde todos los ángulos: jerarquía visual, movimiento, adaptabilidad, rendimiento y esos pequeños momentos que las personas recuerdan.",
        name: "Compañero de trabajo anónimo",
        role: "Desarollador de Back-End Senior · Synergy LLC",
      },
    ],
  },
};

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const copy = testimonialContent[language];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const testimonial = copy.entries[active];

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(
      () => setActive((current) => (current + 1) % copy.entries.length),
      7000
    );
    return () => window.clearInterval(interval);
  }, [copy.entries.length, paused]);

  const move = (amount: number) =>
    setActive(
      (current) =>
        (current + amount + copy.entries.length) % copy.entries.length
    );

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-(--background-alt) py-24 text-(--foreground) transition-colors duration-300 sm:py-28"
    >
      <div className="pointer-events-none absolute -left-44 top-10 h-110 w-110 rounded-full border border-[#b88835]/10" />
      <div className="pointer-events-none absolute -right-40 bottom-[-25%] h-130 w-130 rounded-full bg-[#b88835]/7 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022] bg-[radial-gradient(var(--foreground)_0.7px,transparent_0.7px)] 
      bg-size-[12px_12px]"
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.28fr_0.72fr] lg:items-end">
          {/* 2nd Section */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative"
          >
            <div className="mb-6 flex items-center justify-center gap-2 lg:justify-start">
              <div className="flex items-center gap-1 rounded-full border border-[#b88835]/30 bg-[#b88835]/8 px-4 py-2 shadow-[0_12px_35px_rgba(184,136,53,0.12)]">
                {Array.from({ length: 5 }, (_, index) => (
                  <Image
                    key={index}
                    src="/star.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="h-4 w-4 filter-[invert(58%)_sepia(43%)_saturate(765%)_hue-rotate(359deg)_brightness(88%)_contrast(86%)]"
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--muted)">
                5.0
              </span>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 translate-x-3 translate-y-3 rounded-[34px] border border-[#b88835]/15" />
              <div className="absolute -inset-1 translate-x-1.5 translate-y-1.5 rounded-4xl bg-[#b88835]/7" />
              <div
                className="testimonial-card relative min-h-107.5 overflow-hidden rounded-4xl border border-(--testimonial-card-line)
                p-6 shadow-(--card-shadow) sm:p-9 lg:p-11"
              >
                <span className="pointer-events-none absolute -right-4 -top-16 font-serif text-[230px] leading-none text-(--testimonial-card-fg)/[0.035]">
                  “
                </span>
                <div className="pointer-events-none absolute inset-4 rounded-3xl border border-(--testimonial-card-line)" />

                <div className="relative flex items-center justify-between gap-4">
                  {/* <span className="rounded-full border border-[#b88835]/30 bg-[#b88835]/8 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#b88835]">
                  {copy.sample}
                </span> */}
                  <span className="font-mono text-[10px] tracking-[0.2em] text-(--testimonial-card-muted)">
                    0{active + 1} / 0{copy.entries.length}
                  </span>
                </div>

                <div className="relative mt-12 flex min-h-57.5 flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${language}-${active}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Quote
                        size={25}
                        strokeWidth={1.35}
                        className="text-[#b88835]"
                      />
                      <blockquote className="mt-7 max-w-3xl font-serif text-2xl leading-[1.35] tracking-[-0.025em] sm:text-3xl lg:text-[2rem]">
                        {testimonial.quote}
                      </blockquote>
                      <div className="mt-9 flex items-center gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b88835]/40 bg-[#b88835]/10 font-serif text-sm italic text-[#b88835]">
                          {String(active + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">
                            {testimonial.name}
                          </p>
                          <p className="mt-1 text-xs text-(--testimonial-card-muted)">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="relative mt-8 flex items-center justify-between border-t border-(--testimonial-card-line) pt-6">
                  <div className="flex gap-2">
                    {copy.entries.map((entry, index) => (
                      <button
                        key={entry.role}
                        type="button"
                        onClick={() => setActive(index)}
                        aria-label={`${copy.eyebrow} ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          index === active
                            ? "w-10 bg-[#b88835]"
                            : "w-5 bg-(--testimonial-card-fg)/15 hover:bg-(--testimonial-card-fg)/30"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => move(-1)}
                      aria-label={copy.previous}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-(--testimonial-card-line) transition hover:border-[#b88835]
                    hover:text-[#b88835]"
                    >
                      <ArrowLeft size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(1)}
                      aria-label={copy.next}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-(--testimonial-card-line) transition hover:border-[#b88835]
                    hover:text-[#b88835]"
                    >
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 1st Section */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.34em] text-[#b88835]"
            >
              {/* <Sparkles size={14} strokeWidth={1.5} />
              {copy.eyebrow} */}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-5 max-w-xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl lg:text-6xl text-right justify-end"
            >
              {copy.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 max-w-lg text-sm leading-7 text-(--muted) sm:text-base text-right justify-end"
            >
              {copy.description}
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}

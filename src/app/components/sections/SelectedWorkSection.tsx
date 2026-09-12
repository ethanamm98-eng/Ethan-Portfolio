"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import { projects } from "../../data/featuredProjects";
import { useLanguage } from "../../context/LanguageContext";
import type { Project } from "../../types/project";

function ProjectSlideshow({
  project,
  title,
  labels,
}: {
  project: Project;
  title: string;
  labels: {
    previous: string;
    next: string;
    slide: string;
    comingSoon: string;
  };
}) {
  const slides = project.images?.length
    ? project.images.slice(0, 2)
    : [project.image];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const changeSlide = (direction: number) => {
    setActiveSlide(
      (current) => (current + direction + slides.length) % slides.length
    );
  };

  return (
    <div
      className={`relative aspect-16/10 shrink-0 overflow-hidden ${
        project.backgroundClass ?? "bg-(--surface-strong)"
      }`}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`${project.id}-${activeSlide}`}
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[activeSlide]}
            alt={`${title} — ${labels.slide} ${activeSlide + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-4 transition duration-700 group-hover:scale-[1.035] sm:p-6"
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-white/10" />

      {project.year === "2027" && (
        <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-[#e3bd6b]/45 bg-[#11151e]/80 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f0cf86] shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e3bd6b] shadow-[0_0_10px_rgba(227,189,107,0.9)]" />

          {labels.comingSoon}
        </div>
      )}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label={labels.previous}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white opacity-0 backdrop-blur-md transition hover:bg-black/55 focus:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            onClick={() => changeSlide(1)}
            aria-label={labels.next}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white opacity-0 backdrop-blur-md transition hover:bg-black/55 focus:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight size={17} />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 backdrop-blur-md">
            {slides.map((_, slideIndex) => (
              <button
                key={slideIndex}
                type="button"
                onClick={() => setActiveSlide(slideIndex)}
                aria-label={`${labels.slide} ${slideIndex + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  slideIndex === activeSlide
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/45 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function SelectedWorkSection() {
  const { copy } = useLanguage();

  return (
    <section
      id="work"
      className="relative z-20 bg-(--background-alt) py-24 text-(--foreground) transition-colors duration-300 sm:py-28"
    >
      <Container>
        <SectionIntro
          eyebrow={copy.work.eyebrow}
          title={copy.work.title}
          description={copy.work.description}
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
            const localizedProject = {
              ...project,
              ...copy.projects[project.id - 1],
            };

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                }}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-(--border) bg-(--surface) shadow-(--card-shadow) transition hover:-translate-y-1 hover:bg-(--surface-strong)"
              >
                <ProjectSlideshow
                  project={project}
                  title={localizedProject.title}
                  labels={{
                    previous: copy.work.previousSlide,
                    next: copy.work.nextSlide,
                    slide: copy.work.slide,
                    comingSoon: copy.work.comingSoon,
                  }}
                />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-(--muted) sm:text-[11px]">
                      {localizedProject.category}
                    </p>

                    <span className="shrink-0 text-sm text-(--muted)">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-(--foreground)">
                    {localizedProject.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-(--muted) sm:text-[15px]">
                    {localizedProject.description}
                  </p>

                  <div className="mb-6 mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-(--border) bg-(--surface-strong) px-3 py-1.5 text-xs text-(--muted)"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {project.by && (
                    <div className="mt-auto flex items-center gap-3 border-t border-(--border) pt-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b88835]/35 bg-[#b88835]/10 font-serif text-xs font-semibold italic text-[#b88835]">
                        {project.by
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-(--muted)">
                          {copy.work.createdBy}
                        </p>

                        <p className="mt-0.5 truncate text-sm font-semibold text-(--foreground)">
                          {project.by}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
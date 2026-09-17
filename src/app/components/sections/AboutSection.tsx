"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import { useLanguage } from "../../context/LanguageContext";

export default function AboutSection() {
  const { copy } = useLanguage();
  return (
    <section
      id="about"
      className="bg-(--background) py-24 text-(--foreground) transition-colors duration-300 sm:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionIntro
              eyebrow={copy.about.eyebrow}
              title={copy.about.title}
            />

            <motion.div
              initial={{ opacity: 0, x: -28, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-9 overflow-hidden rounded-[36px] border border-(--border) bg-[linear-gradient(145deg,rgba(190,124,76,0.18),var(--surface)_42%,rgba(226,184,70,0.18))] 
              shadow-(--card-shadow)"
            >
              <div className="pointer-events-none absolute -left-16 top-12 h-48 w-48 rounded-full bg-[#b9784a]/18 blur-3xl" />
              <div className="pointer-events-none absolute -right-12 bottom-8 h-52 w-52 rounded-full bg-[#dfb846]/18 blur-3xl" />
              <div className="pointer-events-none absolute inset-4 rounded-[28px] border border-white/10" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#e7c66d]/70 to-transparent" />

              <div className="relative flex aspect-3/4 items-end justify-center sm:aspect-auto sm:min-h-130 sm:px-8 sm:pt-8">
                <Image
                  src="/ethan-outline-transparent.png"
                  alt="Ethan Angelo"
                  width={1086}
                  height={1448}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="h-full w-full object-cover object-top drop-shadow-[0_24px_38px_rgba(0,0,0,0.16)] sm:h-auto sm:max-h-135 sm:w-auto sm:max-w-full sm:object-contain sm:object-bottom"
                />
              </div>

              <div className="absolute bottom-5 left-5 rounded-full border border-(--border) bg-(--nav-bg) px-4 py-2 text-[10px] font-medium uppercase tracking-[0.28em] 
              text-(--foreground) shadow-lg backdrop-blur-xl">
                {copy.hero.based}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-4xl border border-(--border) bg-(--surface) p-7 shadow-(--card-shadow) sm:p-10"
            >
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[#dcb34f]/8 blur-3xl" />
              {/* <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#b98738]">
                {copy.about.eyebrow}
              </p> */}
              <h3 className="mt-4 flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-[-0.04em] text-(--foreground) sm:text-4xl">
                <span>{copy.about.greeting}</span>
                {/* <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="h-9 w-9 shrink-0 -rotate-12 text-[#d8a947] sm:h-10 sm:w-10"
                >
                  <path
                    d="M17 25V10a3 3 0 0 1 6 0v11-14a3 3 0 0 1 6 0v14-11a3 3 0 0 1 6 0v15-9a3 3 0 0 1 6 0v12c0 9-6 15-15 15h-3c-6 0-10-3-13-8l-5-8a3.5 3.5 0 0 1 6-3.5l6 7"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 8 5 5M12 5V2M5 13H2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg> */}
              </h3>
              <p className="mt-6 text-base leading-8 text-(--muted) text-justify">
                {copy.about.p1}
              </p>

              <div className="my-7 h-px bg-linear-to-r from-(--border) via-[#d8ae52]/35 to-transparent" />

              <p className="text-base leading-8 text-(--muted) text-justify">
                {copy.about.p2}
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {copy.hero.cards.map((card, index) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-(--border) bg-(--surface-strong) p-4"
                  >
                    <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-(--muted)">
                      0{index + 1}
                    </span>
                    <p className="mt-2 text-sm font-semibold leading-5 text-(--foreground)">
                      {card.title}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import { useLanguage } from "../../context/LanguageContext";

export default function SkillsSection() {
  const { copy } = useLanguage();
  const books = copy.skills.groups.flatMap((group, groupIndex) =>
    group.items.map((item, itemIndex) => ({
      item,
      group: group.title,
      groupIndex,
      itemIndex,
    }))
  );
  const middle = Math.ceil(books.length / 2);
  const shelves = [books.slice(0, middle), books.slice(middle)];

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-(--background-alt) py-24 text-(--foreground) transition-colors duration-300 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(var(--foreground)_0.7px,transparent_0.7px)] bg-size-[10px_10px]" />
      <Container>
        <SectionIntro
          eyebrow={copy.skills.eyebrow}
          title={copy.skills.title}
          description={copy.skills.description}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 overflow-hidden rounded-[36px] border border-(--foreground)/20 bg-(--surface) px-4 py-6 shadow-(--card-shadow) sm:px-8 
          sm:py-8 lg:px-12"
        >
          <div className="pointer-events-none absolute inset-3 rounded-[28px] border border-(--foreground)/6" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#d2aa58]/10 blur-3xl" />

          <div className="relative mb-8 flex items-center justify-between gap-5 border-b border-(--foreground)/15 pb-6">
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border border-(--foreground)/25 bg-(--background) 
              shadow-[4px_4px_0_rgba(184,136,53,0.2)]"
              >
                <Image
                  src="/bookcase.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="theme-icon h-9 w-9"
                />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-[#b88835]">
                  {copy.skills.eyebrow}
                </p>
                <p className="mt-1 text-base font-semibold tracking-[-0.02em] text-(--foreground)">
                  {copy.skills.knowledgeBase} · Vol. 06
                </p>
              </div>
            </div>
            <span className="hidden font-serif text-5xl italic text-(--foreground)/8 sm:block">
              EA
            </span>
          </div>

          <div className="relative mx-auto max-w-4xl border-2 border-(--foreground)/70 bg-(--background) p-3 shadow-[8px_10px_0_rgba(184,136,53,0.14)] sm:aspect-square sm:p-5">
            <div className="absolute -left-3 -right-3 -top-3 h-3 border-2 border-(--foreground)/70 bg-(--background)" />
            <div className="absolute -bottom-5 left-3 right-3 h-4 border-2 border-(--foreground)/70 bg-(--background)" />
            <div className="absolute left-1/2 top-2 h-px w-1/3 -translate-x-1/2 bg-[#b88835]/70" />
            <div className="flex h-full flex-col border border-(--foreground)/20">
              {shelves.map((shelf, shelfIndex) => (
                <div
                  key={shelfIndex}
                  className="relative flex min-h-67.5 flex-1 flex-col justify-end overflow-hidden border-(--foreground)/20 bg-[linear-gradient(135deg,var(--surface),transparent_55%)]"
                >
                  <span className="pointer-events-none absolute right-5 top-3 font-serif text-6xl italic text-(--foreground)/4.5 sm:text-8xl">
                    0{shelfIndex + 1}
                  </span>
                  <div className="flex items-end gap-2 overflow-x-auto px-3 pb-3 pt-12 sm:flex-1 sm:justify-center sm:gap-3 sm:px-5">
                    {shelf.map((book, bookIndex) => {
                      const height =
                        176 + ((bookIndex * 19 + shelfIndex * 13) % 68);
                      const tilt =
                        bookIndex % 5 === 4
                          ? -2.5
                          : bookIndex % 7 === 5
                          ? 2
                          : 0;
                      const accent = (bookIndex + shelfIndex) % 4 === 1;
                      return (
                        <motion.div
                          key={`${book.group}-${book.item}`}
                          initial={{ opacity: 0, y: 34 }}
                          whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.48,
                            delay: bookIndex * 0.045,
                          }}
                          whileHover={{
                            y: -10,
                            rotate: 0,
                            transition: { duration: 0.22 },
                          }}
                          title={`${book.group}: ${book.item}`}
                          className={`relative flex w-12 shrink-0 cursor-default items-center justify-center rounded-t-[3px] border-2 bg-(--background) 
                            shadow-[3px_3px_0_rgba(184,136,53,0.18)] sm:w-14 ${
                              accent
                                ? "border-[#b88835]"
                                : "border-(--foreground)/70"
                            }`}
                          style={{ height, transformOrigin: "bottom center" }}
                        >
                          <span
                            className={`absolute inset-x-1 top-3 h-px ${
                              accent ? "bg-[#b88835]" : "bg-(--foreground)/45"
                            }`}
                          />
                          <span
                            className={`absolute inset-x-1 top-5 h-px ${
                              accent
                                ? "bg-[#b88835]/60"
                                : "bg-(--foreground)/20"
                            }`}
                          />
                          <span
                            className={`absolute inset-x-1 bottom-3 h-px ${
                              accent ? "bg-[#b88835]" : "bg-(--foreground)/45"
                            }`}
                          />
                          <span className="absolute left-1.5 top-7 bottom-6 w-px bg-(--foreground)/10" />
                          <span
                            className="max-h-[calc(100%-62px)] overflow-hidden text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-(--foreground) sm:text-[10px]"
                            style={{
                              writingMode: "vertical-rl",
                              transform: "rotate(180deg)",
                            }}
                          >
                            {book.item}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="relative h-4 border-y-2 border-(--foreground)/70 bg-(--background)">
                    <div className="absolute inset-x-0 top-1 h-px bg-[#b88835]/55" />
                    <div className="absolute -bottom-2 left-2 h-2 w-3 border-x-2 border-(--foreground)/55" />
                    <div className="absolute -bottom-2 right-2 h-2 w-3 border-x-2 border-(--foreground)/55" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-(--foreground)/15 pt-6">
            {copy.skills.groups.map((group, index) => (
              <span
                key={group.title}
                className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-(--muted)"
              >
                <span
                  className={`h-2.5 w-2.5 ${
                    index === 1
                      ? "rotate-45 border border-[#b88835]"
                      : "rounded-full border border-(--foreground)/50"
                  }`}
                />
                {group.title}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

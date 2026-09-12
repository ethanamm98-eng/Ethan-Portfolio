"use client";
import { motion } from "framer-motion";
import { ArrowRight, Code2, PenTool, Search, Sparkles } from "lucide-react";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import { useLanguage } from "../../context/LanguageContext";

const icons = [Search, PenTool, Code2, Sparkles];

export default function ProcessSection() {
  const { copy } = useLanguage();

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-(--background) py-24 text-(--foreground) transition-colors duration-300 sm:py-28"
    >
      <div className="pointer-events-none absolute right-[-12%] top-[10%] h-110 w-110 rounded-full bg-[#b88835]/7 blur-3xl" />
      <Container>
        <SectionIntro
          eyebrow={copy.process.eyebrow}
          title={copy.process.title}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7 }}
          className="relative mt-14 overflow-hidden rounded-[34px] border border-(--foreground)/15 bg-(--surface) p-5 shadow-(--card-shadow) sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute inset-3 rounded-[26px] border border-(--foreground)/5" />

          <div className="relative">
            <div className="absolute bottom-8 left-6.75 top-8 w-px bg-(--foreground)/15 lg:hidden">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full origin-top bg-[#b88835]"
              />
            </div>
            <div className="absolute left-[12.5%] right-[12.5%] top-7.75 hidden h-px bg-(--foreground)/15 lg:block">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full origin-left bg-[#b88835]"
              />
            </div>

            <div className="grid gap-5 lg:grid-cols-4">
              {copy.process.steps.map((step, index) => {
                const Icon = icons[index] ?? Sparkles;
                return (
                  <motion.article
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.16 }}
                    whileHover={{ y: -8 }}
                    className="group relative grid min-h-52.5 grid-cols-[56px_1fr] gap-4 rounded-[26px] border border-(--foreground)/15 bg-(--background) p-4 
                    transition-colors hover:border-[#b88835]/60 sm:p-5 lg:flex lg:min-h-82.5 lg:flex-col lg:items-center lg:text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.7 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.12 + index * 0.16,
                        type: "spring",
                        stiffness: 220,
                      }}
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#b88835] bg-(--background) 
                      text-[#b88835] shadow-[3px_3px_0_rgba(184,136,53,0.18)] transition group-hover:scale-110"
                    >
                      <Icon size={20} strokeWidth={1.6} />
                      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border border-[#b88835] bg-(--background)" />
                    </motion.div>

                    <div className="min-w-0 pt-1 lg:pt-3">
                      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#b88835]">
                        {copy.process.eyebrow} · 0{index + 1}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-(--muted)">
                        {step.description}
                      </p>
                    </div>

                    {index < copy.process.steps.length - 1 && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45 + index * 0.16 }}
                        className="absolute -bottom-3.5 left-5 z-20 flex h-7 w-7 rotate-90 items-center justify-center rounded-full border border-[#b88835]/50 
                        bg-(--background) text-[#b88835] lg:-right-3.5 lg:bottom-auto lg:left-auto lg:top-4.5 lg:rotate-0"
                      >
                        <ArrowRight size={12} />
                      </motion.span>
                    )}
                  </motion.article>
                );
              })}
            </div>
          </div>

          <div className="relative mt-7 flex items-center justify-center gap-3 border-t border-(--foreground)/10 pt-6">
            {copy.process.steps.map((step, index) => (
              <div key={step.title} className="flex items-center gap-3">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.12 }}
                  className="h-2 w-2 rounded-full bg-[#b88835]"
                />
                {index < copy.process.steps.length - 1 && (
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: 28 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.58 + index * 0.12 }}
                    className="h-px bg-(--foreground)/25"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

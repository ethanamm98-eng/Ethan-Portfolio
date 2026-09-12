"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { featuredProjects } from "../../data/featuredProjects";
import { useLanguage } from "../../context/LanguageContext";

export default function MobilePhoneShowcase() {
  const { copy } = useLanguage();
  const [active, setActive] = useState(0);
  const project = featuredProjects[active];

  useEffect(() => {
    const interval = window.setInterval(
      () => setActive((current) => (current + 1) % featuredProjects.length),
      4200
    );
    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.28 }}
      className="relative mx-auto mt-12 w-full max-w-62.5 pb-5 lg:hidden"
    >
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b88835]/10" />
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b88835]/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-5 w-36 -translate-x-1/2 rounded-full bg-black/20 blur-xl dark:bg-black/45" />

      <div className="pointer-events-none absolute left-1/2 top-3 h-109.5 w-49.5 -translate-x-1/2 -rotate-2 rounded-[42px] border border-[#b88835]/20" />
      <div className="relative mx-auto w-49.5 rotate-[4deg] rounded-[42px] border border-[#3b3b3b] bg-[#151515] p-1.5 shadow-[0_24px_65px_rgba(20,16,11,0.3),6px_7px_0_rgba(184,136,53,0.14)] transition-transform duration-700 ease-out">
        <span className="absolute -left-1 top-20 h-9 w-0.75 rounded-l-full bg-[#202020]" />
        <span className="absolute -left-1 top-32 h-14 w-0.75 rounded-l-full bg-[#202020]" />
        <span className="absolute -right-1 top-28 h-16 w-0.75 rounded-r-full bg-[#202020]" />

        <div className="relative aspect-[0.455] overflow-hidden rounded-[36px] bg-[#eceae5]">
          <div className="absolute left-1/2 top-2 z-30 h-4.5 w-17 -translate-x-1/2 rounded-full bg-[#111]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 1.025 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              <Image
                src={project.mobileImage}
                alt={`${project.title} mobile interface`}
                fill
                sizes="198px"
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-3 bottom-3 z-20 flex h-8 items-center gap-2 rounded-full border border-white/30 bg-black/55 px-3 text-white shadow-lg backdrop-blur-md">
            <LockKeyhole size={9} />
            <span className="min-w-0 flex-1 truncate text-[8px] tracking-wide">
              ethanangelo.dev/{project.title.toLowerCase().replaceAll(" ", "-")}
            </span>
          </div>
          <span className="pointer-events-none absolute inset-y-10 right-2 z-20 w-px bg-linear-to-b from-transparent via-white/25 to-transparent" />
          {project.year === "2027" && (
            <div className="absolute left-3 top-9 z-30 flex items-center gap-1.5 rounded-full border border-[#e3bd6b]/45 bg-[#11151e]/82 px-2 py-1.5 text-[6px] font-semibold uppercase tracking-[0.16em] text-[#f0cf86] shadow-lg backdrop-blur-md">
              <span className="h-1 w-1 rounded-full bg-[#e3bd6b]" />
              {copy.work.comingSoon}
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute -left-1 top-20 flex flex-col gap-1.5 opacity-60">
        <span className="h-1 w-1 rounded-full bg-[#b88835]" />
        <span className="h-1 w-1 rounded-full bg-[#b88835]/55" />
        <span className="h-1 w-1 rounded-full bg-[#b88835]/25" />
      </div>
    </motion.div>
  );
}

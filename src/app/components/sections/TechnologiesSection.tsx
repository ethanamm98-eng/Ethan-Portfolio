"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import { useLanguage } from "../../context/LanguageContext";

const technologies = [
  { name: "Visual Studio Code", icon: "/technologies/visual-studio.svg" },
  { name: "GitHub", icon: "/technologies/github.svg" },
  { name: "SourceTree", icon: "/technologies/sourcetree.svg" },
  { name: "Swagger", icon: "/technologies/swagger.svg" },
  { name: "WordPress", icon: "/technologies/wordpress.svg" },
  { name: "Elementor", icon: "/technologies/elementor.svg" },
  { name: "Shopify", icon: "/technologies/shopify.svg" },
  { name: "Squarespace", icon: "/technologies/squarespace.svg" },
  { name: "Vercel", icon: "/technologies/vercel.svg" },
  { name: "Sanity", icon: "/technologies/sanity.png" },
  { name: "Supabase", icon: "/technologies/supabase.svg" },
  { name: "Firebase", icon: "/technologies/firebase.svg" },
  { name: "Resend", icon: "/technologies/resend.svg" },
  { name: "Stripe", icon: "/technologies/stripe.svg" },
  { name: "Android Studio", icon: "/technologies/androidstudio.svg" },
  { name: "Canva", icon: "/technologies/canva-svgrepo-com.svg" },
];

export default function TechnologiesSection() {
  const { copy } = useLanguage();

  return (
    <section
      id="technologies"
      className="relative overflow-hidden bg-(--background) py-24 text-(--foreground) transition-colors duration-300 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(var(--foreground)_0.7px,transparent_0.7px)] bg-size-[11px_11px]" />
      <div className="pointer-events-none absolute left-1/2 top-[62%] h-120 w-180 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c79a45]/8 blur-3xl" />

      <Container>
        <SectionIntro
          eyebrow={copy.technologies.eyebrow}
          title={copy.technologies.title}
          description={copy.technologies.description}
        />

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 max-w-5xl"
        >
          <div className="relative mx-auto w-full max-w-sm sm:hidden">
            <div className="relative rounded-[26px] border-2 border-(--foreground)/70 bg-(--background) p-3 pb-8 shadow-[7px_8px_0_rgba(184,136,53,0.16)]">
              <div className="min-h-152.5 overflow-hidden rounded-[17px] border border-(--foreground)/25 bg-(--surface-strong)">
                <div className="flex h-10 items-center justify-between border-b border-(--foreground)/15 px-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full border border-(--foreground)/50" />
                    <span className="h-2 w-2 rounded-full border border-[#b88835]" />
                    <span className="h-2 w-2 rounded-full border border-(--foreground)/50" />
                  </div>
                  <span className="text-[7px] font-medium uppercase tracking-[0.2em] text-(--muted)">
                    {copy.technologies.desktop}
                  </span>
                  <span className="h-1.5 w-6 rounded-full bg-(--foreground)/10" />
                </div>
                <div className="grid min-h-142 grid-cols-4 place-items-center gap-x-1 gap-y-4 px-3 py-5">
                  {technologies.map((technology, index) => (
                    <motion.div
                      key={`mobile-${technology.name}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.025 }}
                      className="flex h-full w-full min-w-0 flex-col items-center justify-center text-center"
                    >
                      <div className="relative h-11 w-11 rounded-[13px] border border-black/20 bg-[#fbfaf6] shadow-[2px_3px_0_rgba(184,136,53,0.2)]">
                        <Image
                          src={technology.icon}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-contain p-2"
                        />
                      </div>
                      <span className="mt-2 min-h-6 w-full wrap-break-word px-0.5 text-[7px] font-medium leading-tight text-(--foreground)">
                        {technology.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <span className="absolute bottom-3 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-(--foreground)/50" />
            </div>
            <div className="mx-auto h-14 w-24 border-x-2 border-(--foreground)/60 bg-(--surface) [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)]" />
            <div className="mx-auto h-3 w-44 rounded-full border-2 border-(--foreground)/60 bg-(--background) shadow-[0_6px_0_rgba(184,136,53,0.12)]" />
          </div>

          <div className="relative hidden aspect-1000/760 w-full sm:block">
            <div className="absolute left-[9%] top-[8.6%] z-0 h-[62.5%] w-[82%] overflow-hidden rounded-[2.5%] border border-(--foreground)/15 bg-(--surface-strong)">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] 
              bg-size-[32px_32px]"
              />
              <div className="pointer-events-none absolute -right-[12%] -top-[20%] h-[65%] w-[52%] rounded-full border border-[#b88835]/25" />
              <div className="pointer-events-none absolute -right-[4%] -top-[8%] h-[42%] w-[34%] rounded-full border border-[#b88835]/15" />

              <div className="relative flex h-[12%] min-h-5 items-center justify-between border-b border-(--foreground)/15 px-[3%]">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full border border-(--foreground)/60 sm:h-2 sm:w-2" />
                  <span className="h-1.5 w-1.5 rounded-full border border-[#b88835] sm:h-2 sm:w-2" />
                  <span className="h-1.5 w-1.5 rounded-full border border-(--foreground)/60 sm:h-2 sm:w-2" />
                </div>
                <span className="text-[5px] font-medium uppercase tracking-[0.3em] text-(--muted) sm:text-[8px] md:text-[10px]">
                  {copy.technologies.desktop}
                </span>
                <span className="h-1.5 w-6 rounded-full bg-(--foreground)/10 sm:w-10" />
              </div>

              <div className="grid h-[88%] grid-cols-4 place-items-center gap-x-1 gap-y-0 px-[4%] py-[2%] sm:px-[6%] sm:py-[3%]">
                {technologies.map((technology, index) => (
                  <motion.div
                    key={technology.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.025 }}
                    whileHover={{ y: -5, scale: 1.06 }}
                    className="group flex w-full min-w-0 flex-col items-center"
                  >
                    <div
                      className="relative flex aspect-square w-[46%] min-w-7 max-w-14 items-center justify-center rounded-[24%] border border-black/20 bg-[#fbfaf6] 
                    p-[18%] shadow-[2px_3px_0_rgba(184,136,53,0.22)] transition group-hover:border-[#b88835] sm:w-[52%]"
                    >
                      <Image
                        src={technology.icon}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-contain p-[18%]"
                      />
                    </div>
                    <span className="mt-1.5 max-w-full truncate text-center text-[5px] font-medium leading-none text-(--foreground) sm:text-[7px] md:text-[9px]">
                      {technology.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <Image
              src="/imac.svg"
              alt="Outlined desktop displaying Ethan Angelo's technology toolkit"
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="theme-icon pointer-events-none z-10 object-contain"
            />
            <div className="pointer-events-none absolute bottom-[4.2%] left-1/2 z-20 h-px w-[38%] -translate-x-1/2 bg-[#b88835]/65" />
          </div>

          <div
            className="mx-auto mt-5 flex w-fit items-center gap-3 rounded-full border border-(--foreground)/15 bg-(--surface) px-4 py-2 text-center text-[9px] uppercase 
          tracking-[0.2em] text-(--muted) backdrop-blur sm:-mt-[2%] sm:tracking-[0.25em] sm:text-[10px]"
          >
            <span className="h-2 w-2 rounded-full border border-[#b88835]" />
            {copy.technologies.system}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

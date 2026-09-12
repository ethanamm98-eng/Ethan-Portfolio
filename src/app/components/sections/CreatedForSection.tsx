"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Container from "../ui/Container";
import { useLanguage } from "../../context/LanguageContext";

export type Client = {
  name: string;
  href: string;
  type: string;
  typeKey:
    | "luxuryResort"
    | "luxuryHotel"
    | "lifestyleHotel"
    | "resort"
    | "transportation"
    | "commercialProperty"
    | "technologyServices"
    | "beautyStudio"
    | "communityOrganization"
    | "technologyCompany"
    | "digitalProduct";
  logo: string;
  logoAlt: string;
  invertOnDark?: boolean;
  invertOnLight?: boolean;
  fillCircle?: boolean;
  logoClassName?: string;
};

export const clients: Client[] = [
  {
    name: "Bahia Beach Resort & Golf Club",
    href: "https://www.bahiabeachpuertorico.com/",
    type: "Luxury Resort",
    typeKey: "luxuryResort",
    logo: "/logos/bahia.png",
    logoAlt: "Bahia Beach Resort & Golf Club logo",
    invertOnDark: true,
    logoClassName: "max-h-24 max-w-[125%]",
  },
  {
    name: "Condado Vanderbilt",
    href: "https://www.condadovanderbilt.com/",
    type: "Luxury Hotel",
    typeKey: "luxuryHotel",
    logo: "/logos/vanderbilt.png",
    logoAlt: "Condado Vanderbilt logo",
    invertOnDark: false,
  },
  {
    name: "Condado Ocean Club",
    href: "https://www.condadooceanclub.com/",
    type: "Lifestyle Hotel",
    typeKey: "lifestyleHotel",
    logo: "https://cdn.prod.website-files.com/5f6a1436799fa7b66ba94e6e/5f6a1436799fa70b74a94ec4_Asset%202%404x.png",
    logoAlt: "Condado Ocean Club logo",
    invertOnDark: false,
  },
  {
    name: "La Concha",
    href: "https://www.laconcharesort.com/",
    type: "Resort",
    typeKey: "resort",
    logo: "/logos/laconcha.png",
    logoAlt: "La Concha Resort logo",
    invertOnDark: false,
  },
  {
    name: "Bahia Limo",
    href: "https://www.bahialimo-pr.com/",
    type: "Transportation",
    typeKey: "transportation",
    logo: "/logos/bahialimologo.webp",
    logoAlt: "Bahia Limo logo",
    invertOnDark: false,
    invertOnLight: true,
    logoClassName: "max-h-20 max-w-[135%]",
  },

  {
    name: "Casino del Mar",
    href: "https://www.casinodelmarpr.com/",
    type: "Commercial Property",
    typeKey: "commercialProperty",
    logo: "/logos/casinodelmar.svg",
    logoAlt: "Casino del Mar logo",
    invertOnDark: false,
    invertOnLight: false,
  },
  {
    name: "Paulson Offices",
    href: "https://paulsonoffices.com/250-plaza/",
    type: "Commercial Property",
    typeKey: "commercialProperty",
    logo: "/logos/paulsonoffices.png",
    logoAlt: "250 Plaza logo",
    invertOnDark: false,
    invertOnLight: true,
  },

  {
    name: "Karen Sutton Hair Studio",
    href: "https://karensuttonhairstudio.com/",
    type: "Beauty Studio",
    typeKey: "beautyStudio",
    // logo: "https://karensuttonhairstudio.com/images/brand.png",
    logo: "/logos/kss.png",
    logoAlt: "Karen Sutton Hair Studio logo",
    invertOnDark: false,
    fillCircle: true,
  },
  {
    name: "Synergy",
    href: "https://www.synergyppr.com/",
    type: "Technology / Services",
    typeKey: "technologyServices",
    logo: "/logos/synergy.webp",
    logoAlt: "Synergy logo",
    invertOnDark: false,
  },
  {
    name: "Paso Libre",
    href: "https://www.pasolibre.org/",
    type: "Community Organization",
    typeKey: "communityOrganization",
    logo: "/logos/pasolibre.jpg",
    logoAlt: "Paso Libre logo",
    invertOnDark: false,
    fillCircle: true,
  },
  {
    name: "Teckpert",
    href: "https://teckpert.com/",
    type: "Technology Company",
    typeKey: "technologyCompany",
    // logo: "https://cdn.prod.website-files.com/65b415cb7c5706e2b9526d74/65bc0759d0cad3aba86fe6a2_TECKpert-logo-02.svg",
    logo: "/logos/teckpert.jpeg",
    logoAlt: "TECKpert logo",
    invertOnDark: false,
    fillCircle: true,
  },
  {
    name: "Longbow",
    href: "https://mylongbow.com/",
    type: "Digital Product",
    typeKey: "digitalProduct",
    logo: "/logos/longbow.png",
    logoAlt: "Longbow logo",
    invertOnDark: false,
    invertOnLight: true,
  },
];

export function ClientLogo({
  src,
  alt,
  name,
  invertOnDark,
  invertOnLight,
  fillCircle,
  logoClassName,
}: {
  src: string;
  alt: string;
  name: string;
  invertOnDark?: boolean;
  invertOnLight?: boolean;
  fillCircle?: boolean;
  logoClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-10 items-center text-sm font-medium tracking-wide text-(--foreground)">
        {name}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={180}
      height={56}
      unoptimized
      onError={() => setFailed(true)}
      className={
        fillCircle
          ? "h-full w-full rounded-full object-cover"
          : `h-auto w-auto object-contain transition-[filter,transform] duration-300 ${
              logoClassName ?? "max-h-12 max-w-full"
            } ${invertOnDark ? "logo-invert-on-dark" : ""} ${
              invertOnLight ? "logo-invert-on-light" : ""
            }`
      }
    />
  );
}

function chunkArray<T>(array: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export default function CreatedForSection() {
  const { copy } = useLanguage();
  const slides = useMemo(() => chunkArray(clients, 4), []);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="created-for"
      className="relative overflow-hidden bg-(--background) py-24 text-(--foreground) transition-colors duration-300 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[8%] h-80 w-[320px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[0%] h-85 w-85 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container>
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] uppercase tracking-[0.34em] text-(--muted)"
            >
              {copy.created.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl"
            >
              {copy.created.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 text-sm leading-7 text-(--muted) sm:text-base"
            >
              {copy.created.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex items-center gap-3"
            >
              <button
                onClick={goPrev}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-(--surface) text-(--muted) 
                transition hover:bg-(--surface-strong) hover:text-(--foreground)"
                aria-label={copy.created.previous}
              >
                <ChevronLeft
                  size={18}
                  className="transition group-hover:-translate-x-0.5"
                />
              </button>

              <button
                onClick={goNext}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-(--surface) text-(--muted) 
                transition hover:bg-(--surface-strong) hover:text-(--foreground)"
                aria-label={copy.created.next}
              >
                <ChevronRight
                  size={18}
                  className="transition group-hover:translate-x-0.5"
                />
              </button>

              {/* <div className="ml-2 flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`${copy.created.slide} ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeSlide === index
                        ? "w-10 bg-[var(--foreground)]"
                        : "w-2.5 bg-[var(--foreground)]/25 hover:bg-[var(--foreground)]/45"
                    }`}
                  />
                ))}
              </div> */}
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative min-h-140 overflow-hidden rounded-[36px] border border-(--border) bg-(--surface) p-4 shadow-[0_30px_100px_rgba(114,76,24,0.12)] backdrop-blur-xl sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%)] opacity-80" />
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#d7ad55]/10 blur-3xl" />
              <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#a9673e]/10 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#e6c56b]/50 to-transparent" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative z-10 grid gap-4 sm:grid-cols-2"
                >
                  {slides[activeSlide].map((client, index) => (
                    <motion.a
                      key={client.name}
                      href={client.href}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.06,
                        ease: "easeOut",
                      }}
                      whileHover={{ y: -6 }}
                      className="group relative overflow-hidden rounded-[30px] border border-(--border) bg-(--surface) p-6 shadow-(--card-shadow) transition 
                      duration-500 hover:-translate-y-1.5 hover:border-[#d6ae58]/35 hover:bg-(--surface-strong)"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_35%)] opacity-80" />

                      <div className="relative z-10 flex h-full flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div
                            className={`relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--border) 
                              bg-(--surface-strong) shadow-[0_16px_45px_rgba(0,0,0,0.12)] ring-1 ring-white/10 transition duration-500 group-hover:scale-105 
                              group-hover:shadow-[0_20px_55px_rgba(180,132,45,0.18)] ${
                                client.fillCircle ? "p-0" : "p-5"
                              }`}
                          >
                            {!client.fillCircle && (
                              <div className="absolute inset-2 rounded-full border border-(--border)" />
                            )}
                            <ClientLogo
                              src={client.logo}
                              alt={client.logoAlt}
                              name={client.name}
                              invertOnDark={client.invertOnDark}
                              fillCircle={client.fillCircle}
                            />
                          </div>

                          <div
                            className="rounded-full border border-(--border) bg-(--background)/40 p-2 text-(--muted) transition duration-300 
                          group-hover:text-(--foreground) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          >
                            <ArrowUpRight size={16} />
                          </div>
                        </div>

                        <div className="mt-7">
                          <p className="text-[10px] uppercase tracking-[0.28em] text-(--muted)">
                            {copy.created.types[client.typeKey]}
                          </p>

                          <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.03em] text-(--foreground)">
                            {client.name}
                          </h3>
                        </div>

                        <div className="mt-6 pt-2">
                          <span
                            className="inline-flex items-center rounded-full border border-(--border) bg-(--surface)/55 px-3 py-1.5 text-xs 
                          text-(--muted) transition group-hover:text-(--foreground)"
                          >
                            {copy.created.visit}
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

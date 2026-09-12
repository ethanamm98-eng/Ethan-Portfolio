"use client";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import { useLanguage } from "../context/LanguageContext";

const content = {
  en: {
    eyebrow: "Resume · 2026",
    role: "Lead Front-End Developer · UI Engineer",
    intro:
      "I build scalable digital products where thoughtful engineering, clear UX, and refined visual craft work as one.",
    back: "Back to portfolio",
    print: "Print / Save PDF",
    experience: "Professional Experience",
    education: "Education",
    expertise: "Core Expertise",
    courses: "Continued Learning",
    present: "Present",
    references: "References available upon request.",
    degree: "B.S. in Computer Science",
    honors: "Summa Cum Laude · 3.7 / 4.0 GPA",
    university: "Interamerican University of Puerto Rico",
    synergy: [
      "Lead front-end development with React, Next.js, and TypeScript for scalable, high-performance web applications.",
      "Architect new applications from the ground up while modernizing established client products.",
      "Build responsive landing pages, CMS platforms, and internal administration tools with Tailwind CSS.",
      "Implement real-time experiences and live data synchronization with SignalR.",
      "Create rich-text workflows, data dashboards, visualizations, and advanced scheduling experiences.",
      "Improve performance through code splitting, lazy loading, and scalable state-management patterns.",
      "Maintain reusable component libraries and design systems across multiple products.",
    ],
    teckpertInternal: "Lead Front-End Developer · Internal Platforms",
    teckpertClient: "Front-End Developer · Client-Facing Product",
    teckpert: [
      "Led front-end delivery for web and mobile applications supporting a technology freelancing platform.",
      "Rebuilt legacy experiences with React and React Native to improve scalability, maintainability, and efficiency.",
      "Owned delivery from requirements and system design through implementation and deployment.",
      "Designed resolution-management tools and reusable interfaces connected to GraphQL and AWS services.",
      "Contributed to Longbow, a React-based financial investment analysis platform.",
      "Improved reliability and UX through focused debugging, optimization, and cross-functional collaboration.",
    ],
  },
  es: {
    eyebrow: "Resumé · 2026",
    role: "Desarrollador Front-End Líder · Ingeniero UI",
    intro:
      "Desarrollo productos digitales escalables donde la ingeniería, una experiencia clara y el diseño refinado funcionan como uno.",
    back: "Volver al portafolio",
    print: "Imprimir / Guardar PDF",
    experience: "Experiencia Profesional",
    education: "Educación",
    expertise: "Experiencia Técnica",
    courses: "Educación Continua",
    present: "Presente",
    references: "Referencias disponibles al solicitarse.",
    degree: "B.S. en Ciencias de Cómputos",
    honors: "Summa Cum Laude · GPA 3.7 / 4.0",
    university: "Universidad Interamericana de Puerto Rico",
    synergy: [
      "Lidero desarrollo front-end con React, Next.js y TypeScript para aplicaciones web escalables y de alto rendimiento.",
      "Diseño aplicaciones desde cero y modernizo productos existentes para clientes.",
      "Desarrollo landing pages, plataformas CMS y herramientas administrativas responsivas con Tailwind CSS.",
      "Implemento experiencias en tiempo real y sincronización de datos mediante SignalR.",
      "Creo flujos de texto enriquecido, dashboards, visualizaciones y experiencias avanzadas de calendario.",
      "Optimizo el rendimiento mediante code splitting, lazy loading y patrones escalables de estado.",
      "Mantengo bibliotecas de componentes y sistemas de diseño reutilizables para múltiples productos.",
    ],
    teckpertInternal: "Desarrollador Front-End Líder · Plataformas Internas",
    teckpertClient: "Desarrollador Front-End · Producto para Clientes",
    teckpert: [
      "Lideré aplicaciones web y móviles para una plataforma de profesionales independientes de tecnología.",
      "Reconstruí experiencias legacy con React y React Native para mejorar escalabilidad y mantenimiento.",
      "Dirigí el ciclo completo, desde requisitos y diseño del sistema hasta implementación y despliegue.",
      "Diseñé herramientas de manejo de resoluciones e interfaces conectadas a servicios GraphQL y AWS.",
      "Contribuí a Longbow, una plataforma de análisis de inversiones desarrollada en React.",
      "Mejoré confiabilidad y UX mediante depuración, optimización y colaboración multidisciplinaria.",
    ],
  },
};

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "React Native",
  "Tailwind CSS",
  "HTML",
  "CSS / SCSS",
  "GraphQL",
  "Node.js",
  "SQL",
  "Python",
  "SignalR",
  "AWS",
];
const courses = [
  "The Complete Web Development Bootcamp",
  "Python & Django Full Stack Web Development",
  "Graphic Design Masterclass",
  "React Developer - Redux & Hooks",
  "The Ultimate MySQL Bootcamp",
];

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: typeof BriefcaseBusiness;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#bd9143]/35 bg-[#bd9143]/10 text-[#bd9143]">
        <Icon size={19} />
      </span>
      <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-(--foreground)">
        {children}
      </h2>
      <span className="h-px flex-1 bg-linear-to-r from-(--border) to-transparent" />
    </div>
  );
}

function Experience({
  company,
  role,
  dates,
  location,
  bullets,
  label,
}: {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  label?: string;
}) {
  return (
    <article className="relative border-l border-(--border) pb-12 pl-7 last:pb-0 sm:pl-9">
      <span className="absolute -left-1.25 top-1 h-2.5 w-2.5 rounded-full border-2 border-[#bd9143] bg-(--background) shadow-[0_0_0_6px_color-mix(in_srgb,#bd9143_12%,transparent)]" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#bd9143]">
            {label ?? company}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-(--foreground)">
            {role}
          </h3>
          {label && (
            <p className="mt-1 text-sm font-medium text-(--muted)">{company}</p>
          )}
        </div>
        <div className="shrink-0 space-y-1 text-xs text-(--muted) sm:text-right">
          <p className="flex items-center gap-1.5 sm:justify-end">
            <CalendarDays size={13} />
            {dates}
          </p>
          <p className="flex items-center gap-1.5 sm:justify-end">
            <MapPin size={13} />
            {location}
          </p>
        </div>
      </div>
      <ul className="mt-6 space-y-3">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-3 text-sm leading-6 text-(--muted)"
          >
            <span className="mt-2.5 h-1 w-1 shrink-0 rotate-45 bg-[#bd9143]" />
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ResumeView() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="resume-page min-h-screen bg-(--background) text-(--foreground)">
      <Navbar />
      <div className="resume-actions pt-28 sm:pt-32">
        <Container>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-(--muted) transition hover:text-(--foreground)"
            >
              <ArrowLeft size={15} />
              {t.back}
            </Link>
            {/* <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[#bd9143]/55"><Download size={15} />{t.print}</button> */}
          </div>
        </Container>
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="resume-sheet mb-16 overflow-hidden rounded-[36px] border border-(--border) bg-(--surface) shadow-(--card-shadow)"
        >
          <header className="relative overflow-hidden border-b border-(--border) px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="pointer-events-none absolute -right-20 -top-36 h-96 w-96 rounded-full border border-[#bd9143]/15" />
            <div className="pointer-events-none absolute -right-3 -top-20 h-64 w-64 rounded-full bg-[#bd9143]/8 blur-3xl" />
            <div className="relative grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#bd9143]">
                  {t.eyebrow}
                </p>
                <h1 className="mt-5 text-5xl font-semibold uppercase leading-[0.88] tracking-[-0.065em] sm:text-7xl lg:text-[5.5rem]">
                  Ethan A.{" "}
                  <span className="resume-outline-name block">Mercado</span>
                </h1>
                <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-(--muted)">
                  {t.role}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-7 text-(--muted)">
                  {t.intro}
                </p>
              </div>
              <div className="grid gap-3 text-sm text-(--muted) sm:grid-cols-2 lg:grid-cols-1">
                <a
                  href="mailto:ethan.a.mm98@gmail.com"
                  className="flex items-center gap-3 transition hover:text-(--foreground)"
                >
                  <Mail size={15} className="text-[#bd9143]" />
                  ethan.a.mm98@gmail.com
                </a>
                <a
                  href="tel:+18044845620"
                  className="flex items-center gap-3 transition hover:text-(--foreground)"
                >
                  <Phone size={15} className="text-[#bd9143]" />
                  (804) 484-5620
                </a>
                <p className="flex items-center gap-3">
                  <MapPin size={15} className="text-[#bd9143]" />
                  Metro Area, Puerto Rico
                </p>
              </div>
            </div>
          </header>

          <div className="grid lg:grid-cols-[0.36fr_0.64fr]">
            <aside className="border-b border-(--border) bg-(--background)/35 p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <section>
                <SectionTitle icon={GraduationCap}>{t.education}</SectionTitle>
                <h3 className="text-xl font-semibold tracking-[-0.025em]">
                  {t.degree}
                </h3>
                <p className="mt-3 text-xs font-medium uppercase leading-5 tracking-[0.12em] text-[#bd9143]">
                  {t.university}
                </p>
                <p className="mt-3 text-sm text-(--muted)">{t.honors}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-(--muted)">
                  <span>2015 - 2018</span>
                  <span>San Germán, PR</span>
                </div>
              </section>

              <section className="mt-12">
                <SectionTitle icon={Sparkles}>{t.expertise}</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-(--border) bg-(--surface) px-3 py-2 text-xs text-(--foreground)"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <SectionTitle icon={GraduationCap}>{t.courses}</SectionTitle>
                <ul className="space-y-3">
                  {courses.map((course) => (
                    <li
                      key={course}
                      className="border-b border-(--border) pb-3 text-sm leading-5 text-(--muted) last:border-0"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              </section>
            </aside>

            <section className="p-6 sm:p-10 lg:p-12">
              <SectionTitle icon={BriefcaseBusiness}>
                {t.experience}
              </SectionTitle>
              <div>
                <Experience
                  company="Synergy LLC"
                  role="Lead Front-End React Developer"
                  dates={`March 2024 - ${t.present}`}
                  location="Hato Rey, San Juan, PR · Hybrid"
                  bullets={t.synergy}
                />
                <Experience
                  company="TECKpert LLC"
                  role={t.teckpertInternal}
                  label="TECKpert LLC"
                  dates="September 2021 - July 2023"
                  location="Miami, FL · Remote"
                  bullets={t.teckpert}
                />
              </div>
            </section>
          </div>

          <div className="border-t border-(--border) px-6 py-5 text-center text-[10px] uppercase tracking-[0.24em] text-(--muted)">
            {t.references}
          </div>
        </motion.div>
      </Container>
      <Footer />
    </main>
  );
}

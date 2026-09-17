"use client";

import Image from "next/image";
import Container from "../ui/Container";
import { useLanguage } from "../../context/LanguageContext";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/ethanamm98-eng",
    icon: "/projects/github-142-svgrepo-com.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ethan-mercado-software",
    icon: "/projects/linkedin-svgrepo-com.svg",
  },
];

export default function Footer() {
  const { copy } = useLanguage();
  return (
    <footer className="border-t border-(--border) bg-(--background) py-8 text-(--muted) transition-colors duration-300 px-6">
      <Container>
        <div className="flex flex-col gap-6 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-medium text-(--foreground)">
              © 2026 Ethan Angelo
            </p>
            <p className="mt-1">{copy.footer}</p>
          </div>

          <div className="flex items-center justify-center gap-3 sm:justify-start">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-(--surface) transition duration-300 
                hover:-translate-y-1 hover:border-[#d7ad55]/50 hover:bg-(--surface-strong) hover:shadow-[0_12px_32px_rgba(177,125,36,0.18)]"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={19}
                  height={19}
                  className="theme-icon h-4.75 w-4.75 opacity-70 transition group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

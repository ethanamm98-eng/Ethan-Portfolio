"use client";
import Image from "next/image"
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, DockIcon, FileText, LetterTextIcon, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "../ui/LanguageToggle";
import { useLanguage } from "../../context/LanguageContext";


export default function Navbar() {
  const { copy } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const links = [
    { label: copy.nav.home, href: "/#top" },
    { label: copy.nav.brands, href: "/#created-for" },
    { label: copy.nav.work, href: "/#work" },
    { label: copy.nav.about, href: "/#about" },
    { label: copy.nav.skills, href: "/#skills" },
    { label: copy.nav.technologies, href: "/#technologies" },
    { label: copy.nav.process, href: "/#process" },
    // { label: copy.nav.testimonials, href: "/#testimonials" },
    { label: copy.nav.contact, href: "/#contact" },
    { label: copy.nav.resume, href: "/resume" },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className="mx-auto mt-4 flex w-[calc(100%-24px)] max-w-8xl items-center justify-between rounded-full border border-(--border) bg-(--nav-bg) px-4 py-3 
        backdrop-blur-xl sm:w-[calc(100%-40px)] sm:px-6"
        >
          <Link
            href="/#top"
            aria-label="Ethan Angelo — Back to top"
            className="group relative flex items-center gap-2.5 rounded-full py-1 pr-1 text-(--foreground) 
          sm:gap-3"
          >
            <span
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-(--foreground)/25 bg-(--background) font-serif text-sm 
            font-semibold italic shadow-[3px_3px_0_rgba(184,136,53,0.2)] transition group-hover:-translate-y-0.5 group-hover:border-[#b88835]"
            >
              EA
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-[#b88835] bg-(--nav-bg)" />
            </span>
            <span className="hidden items-center font-mono text-[10px] font-semibold uppercase tracking-[0.13em] sm:flex sm:text-xs sm:tracking-[0.17em]">
              <span className="mr-1 text-[#b88835] transition group-hover:-translate-x-0.5">
                &lt;
              </span>
              Ethan Angelo
              <span className="ml-1 text-[#b88835] transition group-hover:translate-x-0.5">
                /&gt;
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex">
            {links.slice(2, 7).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-(--muted) transition hover:text-(--foreground)"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            <ThemeToggle />

            <Link
              href="/resume"
              aria-label={copy.nav.resume}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-(--border) 
            bg-(--surface) text-sm font-medium text-(--foreground) transition hover:-translate-y-0.5 hover:border-[#b88835]/55 hover:bg-(--surface-strong) 
            sm:inline-flex md:h-auto md:w-auto md:px-4 md:py-2"
            >
              <FileText size={16} className="md:hidden" />
              <span className="hidden md:inline"><FileText className="w-4 h-4 mr-1.5 inline my-auto relative bottom-[0.9px]" />{copy.nav.resume}</span>
            </Link>

            <Link
              href="/#contact"
              className="hidden rounded-full border border-(--border) bg-(--foreground) px-4 py-2 text-sm font-medium text-(--background) transition 
              hover:scale-[1.02] lg:inline-flex"
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              {copy.nav.talk}
              
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={copy.nav.menu}
              aria-expanded={menuOpen}
              aria-controls="site-navigation-drawer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-(--surface) transition hover:border-[#b88835] 
              hover:text-[#b88835] xl:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-100 xl:hidden">
            <motion.button
              type="button"
              aria-label={copy.nav.closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
            />
            <motion.aside
              id="site-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={copy.nav.menu}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-[min(90vw,430px)] flex-col overflow-y-auto border-l border-(--border) bg-(--background) p-6 text-(--foreground) shadow-[-30px_0_90px_rgba(0,0,0,0.25)] sm:p-9"
            >
              <div className="flex items-center justify-between border-b border-(--border) pb-6">
                <div>
                  <p className="font-serif text-xl italic">Ethan Angelo</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-[#b88835]">
                    Digital portfolio
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label={copy.nav.closeMenu}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) transition hover:rotate-90 hover:border-[#b88835] hover:text-[#b88835]"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center py-8">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.035 }}
                  >
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-5 border-b border-(--border) py-3.5"
                    >
                      <span className="w-7 font-mono text-[9px] tracking-[0.18em] text-[#b88835]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-xl font-medium tracking-[-0.025em] transition group-hover:translate-x-1 group-hover:text-[#b88835] sm:text-2xl">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="text-(--muted) transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#b88835]"
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex items-center justify-between border-t border-(--border) pt-5 text-[9px] uppercase tracking-[0.22em] text-(--muted)">
                <span>San Juan, PR</span>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

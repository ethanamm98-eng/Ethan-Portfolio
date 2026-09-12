"use client";
import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import { useLanguage } from "../../context/LanguageContext";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const { copy } = useLanguage();
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      if (!response.ok) throw new Error("Unable to send message");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)]/55 px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/55 focus:border-[#c89a43]/65 focus:ring-4 focus:ring-[#c89a43]/10";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-(--background-alt) py-24 text-(--foreground) transition-colors duration-300 sm:py-28"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-(--card-shadow) sm:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#d2a650]/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-(--muted)">
                {copy.contact.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-(--foreground) sm:text-5xl">
                {copy.contact.title}
              </h2>
              <p className="mt-6 text-sm leading-7 text-(--muted) sm:text-base">
                {copy.contact.description}
              </p>
              <div className="mt-9 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-(--muted)">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                {copy.contact.available}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[26px] border border-(--border) bg-(--surface-strong) p-5 sm:p-7"
            >
              <input
                name="companyWebsite"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-xs font-medium text-(--foreground)">
                  {copy.contact.name}
                  <input
                    className={fieldClass}
                    name="name"
                    type="text"
                    required
                    maxLength={80}
                    placeholder={copy.contact.namePlaceholder}
                  />
                </label>
                <label className="text-xs font-medium text-(--foreground)">
                  {copy.contact.email}
                  <input
                    className={fieldClass}
                    name="email"
                    type="email"
                    required
                    maxLength={160}
                    placeholder={copy.contact.emailPlaceholder}
                  />
                </label>
              </div>
              <label className="mt-5 block text-xs font-medium text-(--foreground)">
                {copy.contact.subject}
                <input
                  className={fieldClass}
                  name="subject"
                  type="text"
                  required
                  maxLength={140}
                  placeholder={copy.contact.subjectPlaceholder}
                />
              </label>
              <label className="mt-5 block text-xs font-medium text-(--foreground)">
                {copy.contact.message}
                <textarea
                  className={`${fieldClass} min-h-36 resize-y`}
                  name="message"
                  required
                  minLength={10}
                  maxLength={4000}
                  placeholder={copy.contact.messagePlaceholder}
                />
              </label>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-(--foreground) px-5 py-3 text-sm font-semibold 
                  text-(--background) transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-65"
                >
                  {status === "sending"
                    ? copy.contact.sending
                    : copy.contact.submit}
                  <Send
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
                <div aria-live="polite" className="min-h-5 text-sm">
                  {status === "success" && (
                    <span className="inline-flex items-center gap-2 text-emerald-500">
                      <CheckCircle2 size={16} />
                      {copy.contact.success}
                    </span>
                  )}
                  {status === "error" && (
                    <span className="inline-flex items-center gap-2 text-red-500">
                      <AlertCircle size={16} />
                      {copy.contact.error}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

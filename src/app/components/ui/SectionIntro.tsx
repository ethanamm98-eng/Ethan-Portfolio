interface SectionIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionIntro({
  eyebrow,
  title,
  description,
}: SectionIntroProps) {
  return (
    <div className="max-w-4xl">
      <p className="text-[11px] uppercase tracking-[0.32em] text-(--muted)">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-(--foreground) sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-sm leading-7 text-(--muted) sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  sub?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  heading,
  sub,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p
        data-reveal
        className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        {eyebrow}
      </p>
      <h2
        data-reveal
        className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
      >
        {heading}
      </h2>
      {sub && (
        <p data-reveal className="mt-4 text-base leading-7 text-slate-500">
          {sub}
        </p>
      )}
    </div>
  );
}

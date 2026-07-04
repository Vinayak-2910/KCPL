import { hero, company } from "@/lib/site-content";
import { RingShape, DotMatrix } from "@/components/svg/DecorShapes";

/** Laptop pose: right of centre — content lives on the left. */
export default function Hero() {
  return (
    <section
      id="hero"
      data-scene
      className="relative flex min-h-screen items-center overflow-hidden scroll-mt-24"
    >
      {/* Backdrop */}
      <div className="dot-grid absolute inset-0 -z-10 opacity-60" />
      <div className="glow-brand absolute -left-40 top-16 -z-10 h-[34rem] w-[34rem] rounded-full" />
      <div className="glow-accent absolute -right-32 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full" />

      {/* Decorative shapes */}
      <RingShape
        data-parallax="0.7"
        className="absolute right-[8%] top-[14%] hidden h-28 w-28 text-brand-200 lg:block"
      />
      <DotMatrix
        data-parallax="-0.4"
        className="absolute bottom-[16%] left-[42%] hidden h-24 w-24 text-accent-300/70 lg:block"
      />

      <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8">
        <div className="max-w-2xl">
          <p
            data-hero-item
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-800 shadow-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-500" />
            {hero.eyebrow}
          </p>

          <h1
            data-hero-item
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
          >
            {hero.headlineTop}
            <br />
            <span className="bg-gradient-to-r from-brand-700 via-brand-500 to-accent-500 bg-clip-text text-transparent">
              {hero.headlineBottom}
            </span>
          </h1>

          <p
            data-hero-item
            className="mt-6 max-w-xl text-lg leading-8 text-slate-500"
          >
            {hero.sub}
          </p>

          <div data-hero-item className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-700/30 transition-all hover:-translate-y-0.5 hover:bg-brand-800"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#process"
              className="rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700"
            >
              {hero.secondaryCta}
            </a>
          </div>

          <p data-hero-item className="mt-10 text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
            {company.verification} · 500+ Enterprises · PAN India
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-item
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-brand-500 to-transparent" />
      </div>
    </section>
  );
}

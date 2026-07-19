import { ctaBanner, company } from "@/lib/site-content";
import { DotMatrix, WaveShape } from "@/components/svg/DecorShapes";

/** Laptop pose: small, top-centre - the invitation sits beneath it. */
export default function CtaBanner() {
  return (
    <section
      id="cta"
      data-scene
      className="relative flex min-h-screen items-end overflow-hidden scroll-mt-24 lg:items-center"
    >
      <div className="glow-brand absolute left-[16%] top-[20%] -z-10 h-96 w-96 rounded-full" />
      <div className="glow-accent absolute bottom-[10%] right-[14%] -z-10 h-80 w-80 rounded-full" />
      <DotMatrix
        data-parallax="0.5"
        className="absolute left-[7%] bottom-[24%] hidden h-24 w-24 text-brand-200 lg:block"
      />
      <WaveShape
        data-parallax="-0.4"
        className="absolute right-[8%] top-[18%] hidden h-12 w-48 text-accent-300/70 lg:block"
      />

      <div className="mx-auto w-full max-w-4xl px-5 pb-28 pt-28 text-center sm:px-8 lg:pt-[42vh]">
        <h2
          data-reveal
          className="font-display text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          {ctaBanner.heading}
        </h2>
        <p
          data-reveal
          className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600"
        >
          {ctaBanner.sub}
        </p>

        <div data-reveal className="mt-10">
          <a
            href="#products"
            className="inline-block rounded-full bg-gradient-to-r from-brand-700 to-brand-600 px-10 py-4 font-display text-base font-semibold text-white shadow-2xl shadow-brand-700/40 transition-all hover:-translate-y-1 hover:shadow-brand-700/60"
          >
            {ctaBanner.cta} →
          </a>
        </div>

        <p
          data-reveal
          className="mt-8 text-xs font-medium uppercase tracking-[0.24em] text-slate-400"
        >
          {company.name} · {company.verification}
        </p>
      </div>
    </section>
  );
}

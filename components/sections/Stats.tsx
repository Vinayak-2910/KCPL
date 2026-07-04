import SectionHeading from "@/components/ui/SectionHeading";
import { stats, statBadge } from "@/lib/site-content";
import { WaveShape } from "@/components/svg/DecorShapes";

/** Laptop pose: small, top-centre — content sits in the lower half. */
export default function Stats() {
  return (
    <section
      id="stats"
      data-scene
      className="relative flex min-h-screen items-end overflow-hidden scroll-mt-24 lg:items-center"
    >
      <div className="glow-brand absolute right-[10%] top-[30%] -z-10 h-96 w-96 rounded-full" />
      <WaveShape
        data-parallax="0.45"
        className="absolute left-[6%] top-[24%] hidden h-14 w-56 text-brand-200 lg:block"
      />

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:pt-[46vh]">
        <SectionHeading
          align="center"
          eyebrow="The Numbers Speak"
          heading="A quarter-century, measured in trust."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal
              className="glass rounded-3xl border border-white/60 p-8 text-center shadow-xl shadow-brand-900/5"
            >
              <p className="font-display text-5xl font-bold tracking-tight text-brand-800">
                <span data-counter={stat.value}>0</span>
                <span className="text-accent-500">{stat.suffix}</span>
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-widest text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}

          <div
            data-reveal
            className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-center shadow-xl shadow-brand-900/25"
          >
            <p className="font-display text-4xl font-bold tracking-tight text-white">
              {statBadge.title}
            </p>
            <p className="mt-3 text-sm font-medium uppercase tracking-widest text-brand-200">
              {statBadge.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

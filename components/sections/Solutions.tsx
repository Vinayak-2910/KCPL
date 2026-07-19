import SectionHeading from "@/components/ui/SectionHeading";
import { solutions } from "@/lib/site-content";
import { TriangleShape, DotMatrix } from "@/components/svg/DecorShapes";

/** Laptop pose: left of centre - content lives on the right. */
export default function Solutions() {
  return (
    <section
      id="solutions"
      data-scene
      className="relative flex min-h-screen items-center overflow-hidden scroll-mt-24"
    >
      <TriangleShape
        data-parallax="-0.5"
        className="absolute left-[8%] top-[8%] hidden h-24 w-24 text-brand-200 lg:block"
      />
      <DotMatrix
        data-parallax="0.6"
        className="absolute bottom-[8%] right-[4%] h-24 w-24 text-brand-200/80"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-5">
        {/* Left two-fifths reserved for the travelling laptop */}
        <div className="hidden lg:col-span-2 lg:block" aria-hidden="true" />

        <div className="lg:col-span-3">
          <SectionHeading
            eyebrow={solutions.eyebrow}
            heading={solutions.heading}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {solutions.items.map((item, index) => (
              <div
                key={item.title}
                data-reveal
                className="group rounded-2xl border border-stone-300 bg-surface/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-700/10"
              >
                <span className="font-display text-xs font-bold tracking-widest text-accent-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 group-hover:text-brand-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

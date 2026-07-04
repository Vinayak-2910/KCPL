import SectionHeading from "@/components/ui/SectionHeading";
import { partners } from "@/lib/site-content";
import { HexShape } from "@/components/svg/DecorShapes";

/** Laptop pose: right of centre — content lives on the left. */
export default function Partners() {
  return (
    <section
      id="partners"
      data-scene
      className="relative flex min-h-screen items-center overflow-hidden scroll-mt-24"
    >
      <div className="glow-accent absolute -left-24 bottom-[12%] -z-10 h-80 w-80 rounded-full" />
      <HexShape
        data-parallax="0.55"
        className="absolute right-[10%] top-[10%] hidden h-28 w-28 text-accent-300/60 lg:block"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow={partners.eyebrow}
            heading={partners.heading}
            sub={partners.sub}
          />

          <div className="mt-12 space-y-8">
            {partners.brands.map((brand, index) => (
              <div key={brand.name} data-reveal className="group">
                <p
                  data-drift={index % 2 === 0 ? "1" : "-1"}
                  className="font-display text-6xl font-bold tracking-[0.14em] text-slate-200 transition-colors group-hover:text-brand-200 sm:text-7xl"
                >
                  {brand.name}
                </p>
                <div className="mt-3 flex items-start gap-4">
                  <span className="mt-2 h-1 w-10 shrink-0 rounded-full bg-accent-500" />
                  <p className="max-w-md text-sm leading-7 text-slate-500">
                    {brand.blurb}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p
            data-reveal
            className="mt-12 inline-block rounded-full border border-brand-100 bg-brand-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-800"
          >
            {partners.note}
          </p>
        </div>

        {/* Right half reserved for the travelling laptop */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}

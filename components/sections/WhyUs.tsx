import SectionHeading from "@/components/ui/SectionHeading";
import { whyUs } from "@/lib/site-content";
import { BlobShape, CircuitShape } from "@/components/svg/DecorShapes";

/** Laptop pose: left of centre - content lives on the right. */
export default function WhyUs() {
  return (
    <section
      id="why-us"
      data-scene
      className="relative flex min-h-screen items-center overflow-hidden scroll-mt-24"
    >
      <BlobShape
        data-parallax="-0.5"
        className="absolute -right-24 top-[10%] h-80 w-80 text-accent-100"
      />
      <CircuitShape
        data-parallax="0.5"
        className="absolute bottom-[14%] left-[6%] hidden h-28 w-28 text-brand-200 lg:block"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2">
        {/* Left half reserved for the travelling laptop */}
        <div className="hidden lg:block" aria-hidden="true" />

        <div>
          <SectionHeading eyebrow={whyUs.eyebrow} heading={whyUs.heading} />

          <div className="mt-12 space-y-6">
            {whyUs.points.map((point) => (
              <div
                key={point.title}
                data-reveal
                className="flex gap-5 rounded-2xl border border-stone-300 bg-surface/80 p-6 shadow-sm transition-all hover:border-accent-400 hover:shadow-md"
              >
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-100">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-5 w-5"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10.5 8.2 15 16 5.5"
                      stroke="#d97706"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-7 text-slate-600">
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

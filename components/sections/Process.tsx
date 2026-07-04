import SectionHeading from "@/components/ui/SectionHeading";
import { process } from "@/lib/site-content";
import { RingShape } from "@/components/svg/DecorShapes";

/** Laptop pose: right of centre — the journey timeline lives on the left. */
export default function Process() {
  return (
    <section
      id="process"
      data-scene
      className="relative flex min-h-screen items-center overflow-hidden scroll-mt-24"
    >
      <div className="dot-grid absolute inset-0 -z-10 opacity-40" />
      <RingShape
        data-parallax="-0.45"
        className="absolute bottom-[12%] right-[8%] hidden h-32 w-32 text-accent-300/50 lg:block"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow={process.eyebrow}
            heading={process.heading}
            sub={process.sub}
          />

          <ol className="relative mt-12 space-y-10 pl-2">
            {/* Self-drawing spine */}
            <svg
              className="absolute left-[27px] top-2 -z-10 h-[calc(100%-1rem)] w-1"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path d="M1 0 V100" stroke="#dbeafe" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path
                data-draw-path
                d="M1 0 V100"
                stroke="#2563eb"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {process.steps.map((step, index) => (
              <li key={step.title} data-reveal className="flex gap-6">
                <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 font-display text-lg font-bold text-white shadow-lg shadow-brand-700/30">
                  {index + 1}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Right half reserved for the travelling laptop */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}

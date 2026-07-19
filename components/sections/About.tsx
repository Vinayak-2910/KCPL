import SectionHeading from "@/components/ui/SectionHeading";
import { about } from "@/lib/site-content";
import { BlobShape, CircuitShape } from "@/components/svg/DecorShapes";

/** Laptop pose: left of centre - content lives on the right. */
export default function About() {
  return (
    <section
      id="about"
      data-scene
      className="relative flex min-h-screen items-center overflow-hidden scroll-mt-24"
    >
      <BlobShape
        data-parallax="0.5"
        className="absolute -left-20 top-[12%] h-72 w-72 text-brand-100"
      />
      <CircuitShape
        data-parallax="-0.6"
        className="absolute bottom-[10%] right-[6%] hidden h-32 w-32 text-brand-200 lg:block"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2">
        {/* Left half reserved for the travelling laptop */}
        <div className="hidden lg:block" aria-hidden="true" />

        <div>
          <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                data-reveal
                className="text-base leading-8 text-slate-600"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote
            data-reveal
            className="mt-10 border-l-4 border-accent-500 bg-surface/70 py-4 pl-6 pr-4 font-display text-xl font-semibold italic text-brand-900 shadow-sm"
          >
            “{about.pullQuote}”
          </blockquote>
        </div>
      </div>
    </section>
  );
}

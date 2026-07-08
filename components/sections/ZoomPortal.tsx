/**
 * The dive stage. The travelling laptop descends from the CTA section
 * and parks dead-centre over this pinned white canvas — its display
 * already playing a live miniature of the catalogue. Scroll on and
 * the pinned timeline (lib/laptop-flight.ts) grows the laptop until
 * its screen *is* the viewport, then hands over to the real
 * #products section waiting exactly beneath.
 *
 * Desktop-only: on mobile and reduced-motion this stage is skipped
 * entirely (see globals.css).
 *
 * Purely visual — it must never intercept the pointer, or it eats
 * clicks meant for the first catalogue row sitting underneath it.
 */
export default function ZoomPortal() {
  return (
    <section
      id="zoom"
      data-scene
      className="pointer-events-none relative z-30 hidden h-screen select-none items-end justify-center overflow-hidden bg-white lg:flex"
    >
      <p
        data-zoom-cue
        className="mb-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400"
      >
        Keep scrolling — entering the catalogue
      </p>
    </section>
  );
}

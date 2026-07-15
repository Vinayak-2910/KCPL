"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero, heroVideo, company } from "@/lib/site-content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The cinematic scrub hero.
 *
 * A 15-second single-take film (closed laptop → exploded view →
 * reassembly → lid opens onto a pure-white display) is pinned for
 * 350vh and scrubbed by scroll. Three copy stages ride the timeline:
 *
 *   Stage A — opening headline over the dark studio (bows out early)
 *   Stage B — mid-flight caption while the machine hangs exploded
 *   Stage C — CTAs on paper, arriving with the white-out
 *
 * The final white-out is deliberately NOT baked into the footage:
 * compressed video "white" (limited-range BT.709) rarely equals the
 * page surface, so a DOM overlay in `--color-paper` performs the fade
 * — guaranteeing a pixel-perfect handoff into the About section.
 *
 * Respects `prefers-reduced-motion`: no pin, no scrub, poster + copy.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageARef = useRef<HTMLDivElement>(null);
  const stageBRef = useRef<HTMLDivElement>(null);
  const stageCRef = useRef<HTMLDivElement>(null);
  const whiteRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      const lines = section.querySelectorAll("[data-hero-line]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* iOS/Safari: one muted play()→pause() on first interaction
           primes the decoder so currentTime seeks actually paint. */
        const prime = () => {
          video
            .play()
            .then(() => video.pause())
            .catch(() => {});
        };
        window.addEventListener("touchstart", prime, {
          once: true,
          passive: true,
        });
        window.addEventListener("pointerdown", prime, { once: true });

        /* Scrub proxy — decoupled from metadata so the timeline (and
           every copy stage) still runs if the film hasn't loaded yet. */
        const scrub = { p: 0 };
        const applyFrame = () => {
          if (video.readyState >= 2 && video.duration) {
            const t = scrub.p * Math.max(video.duration - 0.05, 0);
            if (Math.abs(video.currentTime - t) > 1 / 90) {
              video.currentTime = t;
            }
          }
        };
        video.addEventListener("loadeddata", applyFrame);

        /* Master timeline — 10 beats, pinned for 350vh. */
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=350%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // The film occupies beats 0 → 9.4; the last 0.6 belongs to paper.
        tl.to(scrub, { p: 1, duration: 9.4, onUpdate: applyFrame }, 0);

        // Scroll cue dies the moment the journey starts.
        tl.to(cueRef.current, { autoAlpha: 0, duration: 0.25 }, 0.05);

        // Stage A — the headline drifts upward, scrubbed by scroll, the
        // two lines trailing each other before the whole block dissolves.
        tl.to(
          lines,
          { yPercent: -70, stagger: 0.2, ease: "none", duration: 3.2 },
          0
        );
        tl.to(
          stageARef.current,
          { autoAlpha: 0, filter: "blur(6px)", duration: 1, ease: "power1.in" },
          2.3
        );

        // Stage B — caption while the machine hangs in exploded view.
        tl.fromTo(
          stageBRef.current,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power1.out" },
          3.3
        ).to(
          stageBRef.current,
          { autoAlpha: 0, y: -40, duration: 0.7, ease: "power1.in" },
          5.6
        );

        // Paper white-out — DOM-driven so it matches the page surface
        // exactly (video white ≠ CSS white after compression).
        tl.fromTo(
          whiteRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.1, ease: "power1.in" },
          8.7
        );

        // Stage C — the handshake: CTAs on paper before release.
        tl.fromTo(
          stageCRef.current,
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          9.4
        );

        // Navbar rides light-on-dark while the studio is dark.
        const navTrigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => "+=" + window.innerHeight * 3.5 * 0.86,
          toggleClass: { targets: "#site-nav", className: "nav-on-dark" },
        });

        return () => {
          video.removeEventListener("loadeddata", applyFrame);
          window.removeEventListener("touchstart", prime);
          window.removeEventListener("pointerdown", prime);
          navTrigger.kill();
        };
      });

      /* Reduced motion: a still, honest hero. Poster + copy, no pin. */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [stageBRef.current, stageCRef.current, whiteRef.current],
          { autoAlpha: 0 }
        );
        gsap.set([stageARef.current, cueRef.current], { autoAlpha: 1 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[100svh] overflow-hidden bg-[#06070a]"
    >
      {/* The film */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo.src}
        poster={heroVideo.poster}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Stage A — the headline alone, anchored bottom-right */}
      <div ref={stageARef} className="absolute inset-0 z-10">
        {/* Legibility wash, weighted to the bottom-right where the copy sits */}
        <div className="absolute inset-0 bg-gradient-to-tl from-black/70 via-black/25 to-transparent" />

        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-end justify-end px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24">
          <h1
            data-hero-item
            className="text-right font-display text-4xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <span data-hero-line className="block will-change-transform">
              {hero.headlineTop}
            </span>
            <span
              data-hero-line
              className="block bg-gradient-to-r from-brand-300 via-brand-200 to-accent-300 bg-clip-text text-transparent will-change-transform"
            >
              {hero.headlineBottom}
            </span>
          </h1>
        </div>
      </div>

      {/* Stage B — mid-flight caption over the exploded view */}
      <div
        ref={stageBRef}
        className="invisible absolute inset-0 z-10 flex items-end justify-center pb-24 opacity-0"
      >
        <div className="px-5 text-center">
          <p className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {heroVideo.midline}
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.28em] text-slate-400">
            {heroVideo.midSub}
          </p>
        </div>
      </div>

      {/* Paper white-out — matches --color-paper for a seamless handoff */}
      <div
        ref={whiteRef}
        className="pointer-events-none invisible absolute inset-0 z-20 bg-paper opacity-0"
      />

      {/* Stage C — CTAs on paper, the bridge into the page */}
      <div
        ref={stageCRef}
        className="invisible absolute inset-0 z-30 flex flex-col items-center justify-center px-5 text-center opacity-0"
      >
        <p className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {heroVideo.endLine}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
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
        <p className="mt-10 text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
          {company.verification} · 500+ Enterprises · PAN India
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        data-hero-item
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-brand-400 to-transparent" />
      </div>
    </section>
  );
}

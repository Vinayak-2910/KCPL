"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlowRibbon from "@/components/scene/FlowRibbon";
import LaptopRig from "@/components/scene/LaptopRig";
import { buildLaptopFlight } from "@/lib/laptop-flight";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The scroll stage. Wraps the whole homepage and orchestrates every
 * scrubbed animation:
 *
 *  - the travelling laptop + screen dive (desktop) via `buildLaptopFlight`
 *  - the self-drawing flow ribbon (its own component)
 *  - `[data-reveal]`    → scrub-tied fade/rise of section content
 *  - `[data-counter]`   → scroll-driven number counters
 *  - `[data-parallax]`  → drifting decorative SVG shapes
 *  - `[data-drift]`     → horizontal glide tied to scroll
 *  - `[data-draw-path]` → SVG paths that draw themselves in
 *  - `[data-hero-item]` → one-time staggered hero entrance
 *
 * Elements inside the laptop rig (the live catalogue miniature) are
 * excluded from all global hooks — the miniature must stay a static,
 * pixel-perfect twin of the real page.
 *
 * Everything respects `prefers-reduced-motion`.
 */
export default function ScrollExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      /** Global hooks must never touch the rig's miniature content. */
      const pick = (selector: string) =>
        (Array.from(stage.querySelectorAll(selector)) as HTMLElement[]).filter(
          (el) => !el.closest("[data-laptop-rig]")
        );

      const mm = gsap.matchMedia();

      mm.add(
        {
          motionOk: "(prefers-reduced-motion: no-preference)",
          desktop:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx: { conditions?: Record<string, boolean> }) => {
          const desktop = Boolean(ctx.conditions?.desktop);

          /* Navbar chrome + top progress bar */
          ScrollTrigger.create({
            start: 40,
            end: "max",
            toggleClass: { targets: "#site-nav", className: "nav-scrolled" },
          });
          gsap.to("[data-progress-bar]", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
            },
          });

          /* One-time hero entrance */
          gsap.fromTo(
            pick("[data-hero-item]"),
            { autoAlpha: 0, y: 42 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              delay: 0.1,
            }
          );

          /* Scrubbed content reveals */
          pick("[data-reveal]").forEach((el) => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 56 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 92%",
                  end: "top 55%",
                  scrub: 1,
                },
              }
            );
          });

          /* Scroll-driven counters */
          pick("[data-counter]").forEach((el) => {
            const target = parseFloat(el.dataset.counter ?? "0");
            const proxy = { value: 0 };
            gsap.to(proxy, {
              value: target,
              ease: "power1.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 45%",
                scrub: 1,
              },
              onUpdate: () => {
                el.textContent = Math.round(proxy.value).toLocaleString(
                  "en-IN"
                );
              },
            });
          });

          /* Parallax drift for decorative shapes */
          pick("[data-parallax]").forEach((el) => {
            const speed = parseFloat(el.dataset.parallax ?? "0.5");
            gsap.fromTo(
              el,
              { y: () => speed * 130 },
              {
                y: () => speed * -130,
                ease: "none",
                scrollTrigger: {
                  trigger: el.closest("section") ?? el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            );
          });

          /* Horizontal glide (brand rows, marquee text) */
          pick("[data-drift]").forEach((el) => {
            const direction = parseFloat(el.dataset.drift ?? "1");
            gsap.fromTo(
              el,
              { x: () => direction * 90 },
              {
                x: () => direction * -90,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            );
          });

          /* Self-drawing section paths (e.g. the process timeline) */
          pick("[data-draw-path]").forEach((el) => {
            const path = el as unknown as SVGPathElement;
            const length = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
            gsap.to(path, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: path.closest("section") ?? path,
                start: "top 70%",
                end: "bottom 85%",
                scrub: 1,
              },
            });
          });

          /* The star of the show */
          const cleanupFlight = desktop ? buildLaptopFlight(stage) : undefined;

          return () => {
            cleanupFlight?.();
          };
        }
      );
    },
    { scope: stageRef }
  );

  return (
    <div ref={stageRef} className="relative">
      <FlowRibbon />
      <LaptopRig />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

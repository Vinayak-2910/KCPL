"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

/**
 * A full-page SVG ribbon that weaves left and right through every
 * section, drawing itself in as the visitor scrolls. An amber signal
 * dot rides the tip of the line via MotionPath.
 */
export default function FlowRibbon() {
  const rootRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = rootRef.current;
      if (!svg) return;
      const path = svg.querySelector<SVGPathElement>("[data-ribbon-path]");
      const dot = svg.querySelector<SVGPathElement>("[data-ribbon-dot]");
      if (!path || !dot) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        const scrollTrigger = {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        };

        gsap.to(path, { strokeDashoffset: 0, ease: "none", scrollTrigger });
        gsap.to(dot, {
          ease: "none",
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          scrollTrigger,
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <svg
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 100 800"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="ribbon-grad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="800"
        >
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Faint guide track */}
      <path
        d="M 50 0 C 85 40 85 60 50 95 S 15 140 50 185 S 85 230 50 275 S 15 320 50 365 S 85 410 50 455 S 15 500 50 545 S 85 590 50 635 S 15 680 50 725 S 85 775 50 800"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeDasharray="4 8"
        vectorEffect="non-scaling-stroke"
        opacity="0.55"
      />

      {/* The living line */}
      <path
        data-ribbon-path
        d="M 50 0 C 85 40 85 60 50 95 S 15 140 50 185 S 85 230 50 275 S 15 320 50 365 S 85 410 50 455 S 15 500 50 545 S 85 590 50 635 S 15 680 50 725 S 85 775 50 800"
        stroke="url(#ribbon-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.5"
      />

      {/* Signal dot riding the tip (zero-length stroke = constant-size dot) */}
      <path
        data-ribbon-dot
        d="M 50 0 l 0.001 0"
        stroke="#f59e0b"
        strokeWidth="11"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

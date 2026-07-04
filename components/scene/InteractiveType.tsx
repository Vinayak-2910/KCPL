"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Giant Lusion-style display type living behind a section's content.
 * Outlined for the light theme; each glyph fills with brand colour
 * and lifts as the cursor sweeps near it (desktop hover devices only).
 *
 * Deliberately free of scroll-driven offsets: this component is also
 * rendered inside the travelling laptop's miniature display, and both
 * copies must paint identically for the dive handoff to be seamless.
 */
export default function InteractiveType({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const chars = gsap.utils.toArray(
        root.querySelectorAll("[data-char]")
      ) as HTMLElement[];
      if (!chars.length) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)",
        () => {
          const RADIUS = 240;
          const movers = chars.map((el) => ({
            el,
            toY: gsap.quickTo(el, "y", { duration: 0.45, ease: "power2.out" }),
          }));

          const host = (root.closest("section") ?? root) as HTMLElement;

          const onMove = (event: PointerEvent) => {
            for (const mover of movers) {
              const rect = mover.el.getBoundingClientRect();
              const dx = event.clientX - (rect.left + rect.width / 2);
              const dy = event.clientY - (rect.top + rect.height / 2);
              const strength = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
              mover.toY(strength * -26);
              mover.el.style.color = `rgba(29, 78, 216, ${(strength * 0.85).toFixed(3)})`;
            }
          };

          const onLeave = () => {
            for (const mover of movers) {
              mover.toY(0);
              mover.el.style.color = "transparent";
            }
          };

          host.addEventListener("pointermove", onMove);
          host.addEventListener("pointerleave", onLeave);
          return () => {
            host.removeEventListener("pointermove", onMove);
            host.removeEventListener("pointerleave", onLeave);
          };
        }
      );
    },
    { scope: rootRef }
  );

  const alignments = ["self-start", "self-end", "self-start lg:pl-[14vw]"];

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 flex select-none flex-col justify-between overflow-hidden px-[2vw] py-[6vh] ${className}`}
    >
      {lines.map((line, lineIndex) => (
        <div
          key={line}
          className={`whitespace-nowrap font-display font-bold leading-[0.9] tracking-tight text-transparent ${alignments[lineIndex % alignments.length]}`}
          style={{
            WebkitTextStroke: "1.5px #cbd5e1",
            fontSize: "clamp(5rem, 16vw, 19rem)",
          }}
        >
          {line.split("").map((char, charIndex) => (
            <span
              key={`${char}-${charIndex}`}
              data-char
              className="inline-block will-change-transform"
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

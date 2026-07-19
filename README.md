# KOPAL Computers - Corporate Website

A scroll-driven, GSAP-animated single-page site for **Kopal Computers Pvt. Ltd.** (Nehru Place, New Delhi - est. 2000). Built with Next.js (App Router), Tailwind CSS v4 and GSAP ScrollTrigger + MotionPath.

## Getting started

```bash
npm install   # required once - installs gsap + @gsap/react
npm run dev
```

Open http://localhost:3000.

## How the scroll experience works

- `components/scene/ScrollExperience.tsx` - client orchestrator. Wires up every scrubbed animation via data attributes: `data-reveal`, `data-counter`, `data-parallax`, `data-drift`, `data-draw-path`, `data-hero-item`.
- `components/scene/LaptopRig.tsx` + `components/svg/LaptopModel.tsx` - the travelling laptop. A fixed rig that GSAP flies from pose to pose as you scroll; each section owns a `[data-screen]` scene inside the laptop's display, crossfaded mid-flight.
- `lib/laptop-flight.ts` - the flight plan. Poses are keyed by section `id` (`LAPTOP_POSES`); tweak position/tilt/scale per section there.
- `components/scene/FlowRibbon.tsx` - full-page SVG ribbon that draws itself with scroll; an amber dot rides its tip via MotionPath.
- All motion respects `prefers-reduced-motion`; the laptop rig is desktop-only (`lg+`).

## Structure

```
app/                    layout, page, global theme (Tailwind v4 tokens)
components/
  layout/               Navbar, Footer
  scene/                ScrollExperience, LaptopRig, FlowRibbon
  sections/             Hero, About, Stats, Partners, Solutions, Process, WhyUs, CtaBanner
  svg/                  KopalLogo, LaptopModel, DecorShapes
  ui/                   SectionHeading
lib/                    site-content.ts (all copy), laptop-flight.ts (poses + timeline)
```

## Editing content

All copy lives in `lib/site-content.ts` - company details, stats, brands, process steps, address.

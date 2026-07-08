import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Flight plan for the travelling laptop.
 *
 * Each homepage section (keyed by its `id`) owns a pose. Between
 * consecutive sections a scrubbed timeline glides the laptop from
 * pose to pose and crossfades the matching `[data-screen]` scene.
 *
 * The finale: after the CTA section the laptop descends and parks
 * dead-centre (#zoom), its display already playing a live miniature
 * of the catalogue. A pinned timeline then grows it until the screen
 * *is* the viewport — the miniature landing at exactly 1:1 over the
 * real #products section waiting beneath — and dissolves. You are
 * inside the machine.
 */

export type LaptopPose = {
  /** Horizontal offset from viewport centre, in vw */
  xvw: number;
  /** Vertical offset from viewport centre, in vh */
  yvh: number;
  /** 2D rotation, degrees */
  rotation: number;
  /** 3D swivel, degrees */
  rotationY: number;
  scale: number;
};

export const LAPTOP_POSES: Record<string, LaptopPose> = {
  hero: { xvw: 23, yvh: 5, rotation: -6, rotationY: -16, scale: 1.05 },
  about: { xvw: -27, yvh: 2, rotation: 5, rotationY: 18, scale: 0.88 },
  stats: { xvw: 0, yvh: -27, rotation: 0, rotationY: 0, scale: 0.6 },
  partners: { xvw: 26, yvh: 0, rotation: 4, rotationY: -14, scale: 0.92 },
  solutions: { xvw: -26, yvh: 2, rotation: -5, rotationY: 16, scale: 0.9 },
  process: { xvw: 25, yvh: 6, rotation: 8, rotationY: -12, scale: 0.8 },
  "why-us": { xvw: -25, yvh: 0, rotation: -4, rotationY: 14, scale: 0.95 },
  cta: { xvw: 0, yvh: -24, rotation: 0, rotationY: 0, scale: 0.66 },
  /** Final stop — descended to dead centre, facing the visitor. */
  zoom: { xvw: 0, yvh: 0, rotation: 0, rotationY: 0, scale: 1.3 },
};

/** Display rect of the laptop model, as fractions of its 560×400 box. */
const SCREEN = {
  top: 34 / 400,
  width: 372 / 560,
  height: 222 / 400,
};

type PoseTweenVars = {
  x: () => number;
  y: () => number;
  rotation: number;
  rotationY: number;
  scale: number;
};

/** Convert a pose into GSAP vars with viewport-relative, refresh-safe x/y. */
function poseVars(pose: LaptopPose): PoseTweenVars {
  return {
    x: () => (window.innerWidth * pose.xvw) / 100,
    y: () => (window.innerHeight * pose.yvh) / 100,
    rotation: pose.rotation,
    rotationY: pose.rotationY,
    scale: pose.scale,
  };
}

/**
 * Builds the whole flight. Returns a cleanup function (ticker +
 * refresh listeners) for the owning matchMedia context.
 */
export function buildLaptopFlight(stage: HTMLElement): (() => void) | void {
  const rig = stage.querySelector<HTMLElement>("[data-laptop-rig]");
  const float = stage.querySelector<HTMLElement>("[data-laptop-float]");
  const entrance = stage.querySelector<HTMLElement>("[data-laptop-entrance]");
  if (!rig || !float || !entrance) return;

  const mini = rig.querySelector<HTMLElement>("[data-laptop-mini]");
  const miniScaler = rig.querySelector<HTMLElement>(
    "[data-laptop-mini-scaler]"
  );

  const sections = gsap.utils.toArray("[data-scene]", stage) as HTMLElement[];
  if (!sections.length) return;

  // Assigned once the dive's pin-spacer exists; tears down its refresh hook.
  let removeSpacerHarden: (() => void) | undefined;

  const screenOf = (id: string) =>
    rig.querySelector<SVGGElement>(`[data-screen="${id}"]`);

  /* ---- Dive geometry ------------------------------------------------ */

  /** Scale at which the display rect covers the whole viewport. */
  const endScale = () =>
    Math.max(
      window.innerWidth / (rig.offsetWidth * SCREEN.width),
      window.innerHeight / (rig.offsetHeight * SCREEN.height)
    );

  /** Rig y-offset that puts the display's top edge at the viewport top. */
  const endY = () =>
    (0.5 - SCREEN.top) * rig.offsetHeight * endScale() -
    window.innerHeight / 2;

  /** Keep the miniature rendered so it lands at exactly 1:1 at dive end. */
  const fitMini = () => {
    if (miniScaler) gsap.set(miniScaler, { scale: 1 / endScale() });
  };
  fitMini();
  ScrollTrigger.addEventListener("refresh", fitMini);

  /* ---- Parking + entrance + idle bob -------------------------------- */

  const first = LAPTOP_POSES[sections[0].id];
  gsap.set(rig, {
    xPercent: -50,
    yPercent: -50,
    transformPerspective: 1400,
    autoAlpha: 1,
    ...poseVars(first),
  });

  // Idle bob is ticker-driven from an amplitude proxy so the dive can
  // damp it deterministically under scrub (a plain yoyo tween can't be).
  const bob = { amp: 0 };
  let bobTick: (() => void) | null = null;

  gsap.fromTo(
    entrance,
    { autoAlpha: 0, y: 90 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1.2,
      delay: 0.15,
      ease: "power3.out",
      onComplete: () => {
        gsap.to(bob, { amp: 14, duration: 1.6, ease: "power1.inOut" });
        bobTick = () => {
          gsap.set(float, {
            y: bob.amp * Math.sin(gsap.ticker.time * 2.2),
          });
        };
        gsap.ticker.add(bobTick);
      },
    }
  );

  /* ---- Pose-to-pose glides ------------------------------------------ */

  sections.forEach((section, i) => {
    if (i === 0) return;
    const prevId = sections[i - 1].id;
    const currId = section.id;
    const prev = LAPTOP_POSES[prevId];
    const curr = LAPTOP_POSES[currId];
    if (!prev || !curr) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top 32%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      rig,
      poseVars(prev),
      {
        ...poseVars(curr),
        ease: "power1.inOut",
        duration: 1,
        immediateRender: false,
      },
      0
    );

    // Crossfade the on-screen scene mid-flight.
    const from = screenOf(prevId);
    const to = screenOf(currId);
    if (from && to) {
      tl.fromTo(
        from,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.3, immediateRender: false },
        0.1
      ).fromTo(
        to,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, immediateRender: false },
        0.62
      );
    }

    // Descending into the dive stage, the live miniature wakes up.
    if (currId === "zoom" && mini) {
      tl.fromTo(
        mini,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, immediateRender: false },
        0.62
      );
    }
  });

  /* ---- The dive ------------------------------------------------------ */

  const zoomSection = document.getElementById("zoom");
  if (zoomSection) {
    const cue = zoomSection.querySelector("[data-zoom-cue]");
    const frame = rig.querySelector("[data-screen-frame]");
    const clipRect = rig.querySelector("[data-screen-clip]");

    const dive = gsap.timeline({
      scrollTrigger: {
        trigger: zoomSection,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // To pin #zoom, ScrollTrigger wraps it in a runtime `.pin-spacer` and
    // COPIES #zoom's z-index (30) onto that wrapper. The wrapper is
    // transparent but, sitting at z-30, it lands directly over the first
    // catalogue row (pulled up beneath it by -100vh) and silently eats
    // every click meant for the Dell Latitude's configuration chips —
    // which is why only the first product feels "dead". The dive stage is
    // purely visual, so make its spacer click-through on every refresh
    // (the spacer is rebuilt whenever ScrollTrigger recalculates).
    const hardenPinSpacer = () => {
      const spacer = (dive.scrollTrigger as unknown as { spacer?: HTMLElement })
        ?.spacer;
      if (spacer) spacer.style.pointerEvents = "none";
    };
    hardenPinSpacer();
    ScrollTrigger.addEventListener("refresh", hardenPinSpacer);
    removeSpacerHarden = () =>
      ScrollTrigger.removeEventListener("refresh", hardenPinSpacer);

    // Settle: damp the idle bob so the plunge is rock-steady.
    dive.fromTo(
      bob,
      { amp: 14 },
      { amp: 0, duration: 0.1, ease: "none", immediateRender: false },
      0
    );

    // Square off the display corners while still tiny (unnoticeable
    // now, essential when the screen edge meets the viewport edge).
    if (frame) {
      dive.fromTo(
        frame,
        { attr: { rx: 10 } },
        { attr: { rx: 0 }, duration: 0.25, immediateRender: false },
        0
      );
    }
    if (clipRect) {
      dive.fromTo(
        clipRect,
        { attr: { rx: 10 } },
        { attr: { rx: 0 }, duration: 0.25, immediateRender: false },
        0
      );
    }
    if (mini) {
      dive.fromTo(
        mini,
        { borderRadius: "6px" },
        { borderRadius: "0px", duration: 0.25, immediateRender: false },
        0
      );
    }
    if (cue) {
      dive.fromTo(
        cue,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.08, immediateRender: false },
        0.02
      );
    }

    // The plunge — bigger and bigger until the screen IS the viewport,
    // the miniature arriving at exactly natural size.
    dive.fromTo(
      rig,
      {
        x: 0,
        y: 0,
        scale: LAPTOP_POSES.zoom.scale,
        rotation: 0,
        rotationY: 0,
      },
      {
        x: 0,
        y: endY,
        scale: endScale,
        rotation: 0,
        rotationY: 0,
        ease: "power2.in",
        duration: 0.94,
        immediateRender: false,
      },
      0
    );

    // The white stage steps aside beneath the (now viewport-filling)
    // screen, exposing the real catalogue that waits underneath...
    dive.fromTo(
      zoomSection,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.025, ease: "none", immediateRender: false },
      0.945
    );

    // ...and the rig dissolves over its identical twin. You're inside.
    dive.fromTo(
      rig,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.015, ease: "none", immediateRender: false },
      0.985
    );
  }

  /* ---- Footer failsafe ------------------------------------------------ */

  const footer = document.getElementById("site-footer");
  if (footer) {
    gsap.to(rig, {
      autoAlpha: 0,
      immediateRender: false,
      ease: "none",
      scrollTrigger: {
        trigger: footer,
        start: "top 95%",
        end: "top 55%",
        scrub: 1,
      },
    });
  }

  return () => {
    ScrollTrigger.removeEventListener("refresh", fitMini);
    removeSpacerHarden?.();
    if (bobTick) gsap.ticker.remove(bobTick);
  };
}

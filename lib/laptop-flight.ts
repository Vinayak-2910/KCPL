import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Flight plan for the travelling laptop.
 *
 * Each homepage section (keyed by its `id`) owns a pose. Between
 * consecutive sections a scrubbed timeline glides the laptop from
 * pose to pose and crossfades the matching `[data-screen]` scene.
 *
 * The laptop enters showing the KOPAL splash; an intro crossfade then
 * hands that splash off to the first posed scene so every scene
 * *replaces* the previous one rather than stacking over the splash.
 *
 * The finale: after the CTA section the laptop descends and parks
 * dead-centre (#zoom), its display already playing a live miniature of
 * the real catalogue ([data-laptop-mini]). A pinned timeline then grows
 * it until the screen *is* the viewport, at which point the miniature
 * reads 1:1 and dissolves into the real #products section waiting
 * exactly beneath. You are inside the machine.
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
  /** Opening pose - the cinematic video hero owns the viewport above,
   *  so the rig makes its entrance at About. */
  about: { xvw: -27, yvh: 2, rotation: 5, rotationY: 18, scale: 0.88 },
  stats: { xvw: 0, yvh: -27, rotation: 0, rotationY: 0, scale: 0.6 },
  partners: { xvw: 26, yvh: 0, rotation: 4, rotationY: -14, scale: 0.92 },
  solutions: { xvw: -26, yvh: 2, rotation: -5, rotationY: 16, scale: 0.9 },
  process: { xvw: 25, yvh: 6, rotation: 8, rotationY: -12, scale: 0.8 },
  "why-us": { xvw: -25, yvh: 0, rotation: -4, rotationY: 14, scale: 0.95 },
  cta: { xvw: 0, yvh: -24, rotation: 0, rotationY: 0, scale: 0.66 },
  /** Final stop - descended to dead centre, facing the visitor. */
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

  // The live catalogue miniature ([data-laptop-mini]) and its inverse-
  // scaled inner wrapper ([data-laptop-mini-scaler]).
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

  /**
   * Keep the catalogue miniature at the inverse of the dive's end scale
   * so that when the rig grows to `endScale` the catalogue inside reads
   * at a true 1:1 - a pixel-perfect match for the real #products section
   * it hands over to. Recomputed on every ScrollTrigger refresh (resize).
   */
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
  const startBob = () => {
    if (bobTick) return;
    gsap.to(bob, { amp: 14, duration: 1.6, ease: "power1.inOut" });
    bobTick = () => {
      gsap.set(float, {
        y: bob.amp * Math.sin(gsap.ticker.time * 2.2),
      });
    };
    gsap.ticker.add(bobTick);
  };

  // The scrub-video hero owns the viewport at load, so the rig stays
  // out of frame until the first posed section (About) scrolls into
  // reach - and bows back out if the visitor returns to the film.
  gsap.fromTo(
    entrance,
    { autoAlpha: 0, y: 90 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sections[0],
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      onComplete: startBob,
    }
  );

  /* ---- Splash → first scene hand-off -------------------------------- */

  // The laptop enters showing the KOPAL splash (the SVG's default
  // [data-screen="hero"], the only scene that starts visible). Nothing
  // ever turned that splash back off, so every later scene faded in *on
  // top* of it - the KOPAL logo showed through under each new icon.
  // Crossfade the splash out as the rig settles at the first posed
  // section so the scenes replace it instead of stacking over it.
  const heroScreen = screenOf("hero");
  const firstScreen = screenOf(sections[0].id);
  if (heroScreen && firstScreen) {
    const intro = gsap.timeline({
      scrollTrigger: {
        trigger: sections[0],
        start: "top 55%",
        end: "top 20%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    intro
      .fromTo(
        heroScreen,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.4, immediateRender: false },
        0
      )
      .fromTo(
        firstScreen,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, immediateRender: false },
        0.3
      );
  }

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

    // As the laptop descends toward the dive stage, reveal the live
    // catalogue miniature so it is already playing when the plunge begins.
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

    // Make the pin-spacer click-through so it does not block the
    // catalogue section that slides up beneath it.
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

    // Square off the display corners while still tiny.
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

    // The plunge - screen grows until it fills the viewport.
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

    // White stage steps aside, exposing the real catalogue beneath.
    dive.fromTo(
      zoomSection,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.025, ease: "none", immediateRender: false },
      0.945
    );

    // Rig dissolves. You're inside.
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

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { laptopController } from "@/lib/laptop-controller";
import type { SceneId } from "@/lib/screen-scenes";

/**
 * Flight plan for the travelling 3D laptop.
 *
 * Each homepage section (keyed by its `id`) owns a pose. Between
 * consecutive sections a scrubbed timeline glides the laptop from pose to
 * pose (translate / 2D tilt / scale via CSS on the rig) while the model's
 * 3D swivel and its on-screen scene are driven separately, straight from
 * scroll position (see `driveScreen` below).
 *
 * Why the screen is driven from raw scroll instead of per-transition
 * tweens: the old SVG crossfaded scenes with independent fromTo opacity
 * tweens, so a fast scroll that skipped a transition could leave a scene
 * stuck half-lit or never shown. Here the visible scene + swivel are a
 * pure function of the current scroll position, recomputed every update and
 * fully repainted each time — nothing to skip, nothing to leave stale.
 *
 * The finale is unchanged in spirit: after CTA the laptop descends to dead
 * centre, its screen fading to the surface colour, and a live DOM miniature
 * of the catalogue ([data-laptop-mini]) — pinned to the *measured* 3D
 * screen rect — grows until it is the viewport and hands off to #products.
 */

export type LaptopPose = {
  xvw: number;
  yvh: number;
  rotation: number;
  rotationY: number;
  scale: number;
};

export const LAPTOP_POSES: Record<string, LaptopPose> = {
  about: { xvw: -27, yvh: 2, rotation: 5, rotationY: 18, scale: 0.88 },
  stats: { xvw: 0, yvh: -27, rotation: 0, rotationY: 0, scale: 0.6 },
  partners: { xvw: 26, yvh: 0, rotation: 4, rotationY: -14, scale: 0.92 },
  solutions: { xvw: -26, yvh: 2, rotation: -5, rotationY: 16, scale: 0.9 },
  process: { xvw: 25, yvh: 6, rotation: 8, rotationY: -12, scale: 0.8 },
  "why-us": { xvw: -25, yvh: 0, rotation: -4, rotationY: 14, scale: 0.95 },
  cta: { xvw: 0, yvh: -24, rotation: 0, rotationY: 0, scale: 0.66 },
  zoom: { xvw: 0, yvh: 0, rotation: 0, rotationY: 0, scale: 1.3 },
};

/** Fallback display rect (SVG-era) until the 3D screen rect is measured. */
const SCREEN_FALLBACK = {
  top: 34 / 400,
  left: 94 / 560,
  width: 372 / 560,
  height: 222 / 400,
};

type PoseTweenVars = {
  x: () => number;
  y: () => number;
  rotation: number;
  scale: number;
};

/** CSS vars for the rig — 3D swivel (rotationY) is handled by the model. */
function poseVars(pose: LaptopPose): PoseTweenVars {
  return {
    x: () => (window.innerWidth * pose.xvw) / 100,
    y: () => (window.innerHeight * pose.yvh) / 100,
    rotation: pose.rotation,
    scale: pose.scale,
  };
}

/** GSAP-style quad in-out, to match the pose glides' power1.inOut. */
function easeInOut(p: number): number {
  return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function buildLaptopFlight(stage: HTMLElement): (() => void) | void {
  const rig = stage.querySelector<HTMLElement>("[data-laptop-rig]");
  const entrance = stage.querySelector<HTMLElement>("[data-laptop-entrance]");
  if (!rig || !entrance) return;

  const mini = rig.querySelector<HTMLElement>("[data-laptop-mini]");
  const miniScaler = rig.querySelector<HTMLElement>("[data-laptop-mini-scaler]");

  const sections = gsap.utils.toArray("[data-scene]", stage) as HTMLElement[];
  if (!sections.length) return;
  const sceneIds = sections.map((s) => s.id as SceneId);

  let removeSpacerHarden: (() => void) | undefined;

  /* ---- Live screen rect (measured from the 3D model) ---------------- */

  let screenRect = { ...SCREEN_FALLBACK };
  const applyScreenRect = () => {
    const r = laptopController.getScreenRect();
    if (r) screenRect = r;
    if (mini) {
      gsap.set(mini, {
        left: `${screenRect.left * 100}%`,
        top: `${screenRect.top * 100}%`,
        width: `${screenRect.width * 100}%`,
        height: `${screenRect.height * 100}%`,
      });
    }
  };
  applyScreenRect();
  ScrollTrigger.addEventListener("refresh", applyScreenRect);

  // Re-align to the measured 3D screen rect the moment the model is ready.
  // Fires on first load and on every client navigation back to the homepage.
  // The model is browser-cached on a return visit, so it may become ready
  // before or after this runs — onReady covers both (it fires immediately if
  // readiness already happened). A next-frame refresh settles positions
  // after the browser restores scroll on a back-button navigation, and a
  // pageshow refresh covers bfcache restores.
  const offReady = laptopController.onReady(() => {
    applyScreenRect();
    ScrollTrigger.refresh();
  });
  const settleRaf = requestAnimationFrame(() => ScrollTrigger.refresh());
  const onPageShow = () => ScrollTrigger.refresh();
  window.addEventListener("pageshow", onPageShow);

  /* ---- Dive geometry (uses the live screen rect) -------------------- */

  const endScale = () =>
    Math.max(
      window.innerWidth / (rig.offsetWidth * screenRect.width),
      window.innerHeight / (rig.offsetHeight * screenRect.height),
    );

  const endY = () =>
    (0.5 - screenRect.top) * rig.offsetHeight * endScale() -
    window.innerHeight / 2;

  const fitMini = () => {
    if (miniScaler) gsap.set(miniScaler, { scale: 1 / endScale() });
  };
  fitMini();
  ScrollTrigger.addEventListener("refresh", fitMini);

  /* ---- Parking + entrance (no idle bob) ----------------------------- */

  const first = LAPTOP_POSES[sceneIds[0]];
  gsap.set(rig, {
    xPercent: -50,
    yPercent: -50,
    autoAlpha: 1,
    ...poseVars(first),
  });
  laptopController.setRotationY(first.rotationY);
  laptopController.setScreen("hero", "hero", 0);

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
    },
  );

  /* ---- Screen + swivel: pure function of scroll position ------------ */

  // Contiguous segments over the flight. Each segment glides fromId→toId
  // between two scroll positions; between segments the laptop is settled
  // showing the segment's toId. Bounds are cached and refreshed on resize.
  type Segment = {
    fromId: SceneId;
    toId: SceneId;
    fromPose: LaptopPose;
    toPose: LaptopPose;
    start: number;
    end: number;
  };
  let segments: Segment[] = [];

  const scrollTopOf = (el: HTMLElement) =>
    el.getBoundingClientRect().top + window.scrollY;

  const buildSegments = () => {
    const vh = window.innerHeight;
    const aboutPose = LAPTOP_POSES[sceneIds[0]];
    const segs: Segment[] = [];

    // seg 0: splash hero → first posed scene (about), tied to the entrance.
    const aboutTop = scrollTopOf(sections[0]);
    segs.push({
      fromId: "hero",
      toId: sceneIds[0],
      fromPose: aboutPose,
      toPose: aboutPose,
      start: aboutTop - vh * 0.8,
      end: aboutTop - vh * 0.2,
    });

    // seg i: pose glides, matching each pose timeline's scroll window
    // (start "top bottom" → end "top 32%").
    for (let i = 1; i < sections.length; i++) {
      const top = scrollTopOf(sections[i]);
      segs.push({
        fromId: sceneIds[i - 1],
        toId: sceneIds[i],
        fromPose: LAPTOP_POSES[sceneIds[i - 1]],
        toPose: LAPTOP_POSES[sceneIds[i]],
        start: top - vh,
        end: top - vh * 0.32,
      });
    }
    segments = segs;
  };

  const driveScreen = () => {
    if (!segments.length) return;
    const y = window.scrollY;

    // Before the flight begins: hold the splash.
    if (y < segments[0].start) {
      laptopController.setScreen("hero", "hero", 0);
      laptopController.setRotationY(segments[0].toPose.rotationY);
      return;
    }

    for (const seg of segments) {
      if (y < seg.start) {
        // Settled between segments — show this segment's start scene/pose.
        laptopController.setScreen(seg.fromId, seg.fromId, 0);
        laptopController.setRotationY(seg.fromPose.rotationY);
        return;
      }
      if (y < seg.end) {
        const p = clamp01((y - seg.start) / (seg.end - seg.start));
        // Screen crossfades over the middle of the glide (matches old timing).
        const t = clamp01((p - 0.2) / 0.5);
        laptopController.setScreen(seg.fromId, seg.toId, t);
        // Swivel eases across the whole glide, in lockstep with position.
        const e = easeInOut(p);
        laptopController.setRotationY(
          seg.fromPose.rotationY +
            (seg.toPose.rotationY - seg.fromPose.rotationY) * e,
        );
        return;
      }
    }

    // Past the last segment: settled at the final (zoom) scene/pose.
    const last = segments[segments.length - 1];
    laptopController.setScreen(last.toId, last.toId, 0);
    laptopController.setRotationY(last.toPose.rotationY);
  };

  buildSegments();
  driveScreen();

  const screenDriver = ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: driveScreen,
    onRefresh: () => {
      buildSegments();
      driveScreen();
    },
  });

  /* ---- Pose-to-pose glides (position / 2D tilt / scale) ------------- */

  sections.forEach((section, i) => {
    if (i === 0) return;
    const prev = LAPTOP_POSES[sceneIds[i - 1]];
    const curr = LAPTOP_POSES[sceneIds[i]];
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
      0,
    );

    // Reveal the live catalogue miniature as the laptop reaches the dive.
    if (sceneIds[i] === "zoom" && mini) {
      tl.fromTo(
        mini,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, immediateRender: false },
        0.62,
      );
    }
  });

  /* ---- The dive ----------------------------------------------------- */

  const zoomSection = document.getElementById("zoom");
  if (zoomSection) {
    const cue = zoomSection.querySelector("[data-zoom-cue]");

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

    const hardenPinSpacer = () => {
      const spacer = (dive.scrollTrigger as unknown as { spacer?: HTMLElement })
        ?.spacer;
      if (spacer) spacer.style.pointerEvents = "none";
    };
    hardenPinSpacer();
    ScrollTrigger.addEventListener("refresh", hardenPinSpacer);
    removeSpacerHarden = () =>
      ScrollTrigger.removeEventListener("refresh", hardenPinSpacer);

    if (mini) {
      dive.fromTo(
        mini,
        { borderRadius: "6px" },
        { borderRadius: "0px", duration: 0.25, immediateRender: false },
        0,
      );
    }
    if (cue) {
      dive.fromTo(
        cue,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.08, immediateRender: false },
        0.02,
      );
    }

    // The plunge — screen grows until it fills the viewport.
    dive.fromTo(
      rig,
      { x: 0, y: 0, scale: LAPTOP_POSES.zoom.scale, rotation: 0 },
      {
        x: 0,
        y: endY,
        scale: endScale,
        rotation: 0,
        ease: "power2.in",
        duration: 0.94,
        immediateRender: false,
      },
      0,
    );

    dive.fromTo(
      zoomSection,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.025, ease: "none", immediateRender: false },
      0.945,
    );

    dive.fromTo(
      rig,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.015, ease: "none", immediateRender: false },
      0.985,
    );
  }

  // The dive owns the rig's post-dive visibility: it dissolves the rig to
  // autoAlpha 0 as the screen fills the viewport (products showing through)
  // and reverses cleanly on scroll-up. A separate footer failsafe only
  // fought that state — leaving the laptop stuck hidden on a fast scroll-up,
  // and its grown screen showing over the products page — so it is gone.

  return () => {
    ScrollTrigger.removeEventListener("refresh", fitMini);
    ScrollTrigger.removeEventListener("refresh", applyScreenRect);
    removeSpacerHarden?.();
    offReady();
    cancelAnimationFrame(settleRaf);
    window.removeEventListener("pageshow", onPageShow);
    screenDriver.kill();
  };
}

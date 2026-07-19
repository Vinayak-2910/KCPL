import type { SceneId, ScreenState } from "@/lib/screen-scenes";

/**
 * Imperative bridge between the scroll flight logic (lib/laptop-flight.ts)
 * and the three.js renderer (components/scene/LaptopCanvas.tsx).
 *
 * The renderer registers its handlers on mount; the flight logic calls them
 * on every ScrollTrigger update. Everything is optional-chained so the
 * flight code never crashes if the canvas hasn't mounted yet (or WebGL is
 * unavailable).
 *
 * Crucially, screen state is *pushed* as an absolute value derived straight
 * from scroll progress every update — never as an incremental/relative
 * animation. That is what kills the old fast-scroll bug where scenes got
 * stuck or failed to appear: there is no per-transition tween that can be
 * skipped and leave stale opacity behind. Whatever the current scroll
 * position implies is exactly what gets drawn.
 *
 * A `ready` handshake lets the flight re-align to the *measured* 3D screen
 * rect the moment the model finishes loading — on first load and on every
 * client navigation back to the homepage. Because the model is browser-
 * cached on a return visit it can become ready before or after the flight
 * builds, so the handshake fires the callback immediately if readiness has
 * already happened, and `register()` resets it for each fresh canvas.
 */

export type LaptopScreenRect = {
  /** Fractions of the rig box, matching the SVG's old SCREEN constants. */
  top: number;
  left: number;
  width: number;
  height: number;
};

export type LaptopControllerHandlers = {
  /** Real 3D swivel of the model about its vertical axis, in degrees. */
  setRotationY: (deg: number) => void;
  /** Absolute screen content, derived from scroll progress. */
  setScreen: (state: ScreenState) => void;
  /**
   * Screen rect (as fractions of the rig box) where the display renders in
   * the current camera framing. Used by the flight dive to pin the HTML
   * hand-off overlay exactly over the 3D screen.
   */
  getScreenRect: () => LaptopScreenRect | null;
};

class LaptopController {
  private handlers: Partial<LaptopControllerHandlers> = {};
  private ready = false;
  private readyCb: (() => void) | null = null;

  register(h: LaptopControllerHandlers) {
    this.handlers = h;
    // A new canvas is mounting — it has not measured its screen yet.
    this.ready = false;
    return () => {
      if (this.handlers === h) this.handlers = {};
    };
  }

  /** Called by the canvas once the model is loaded and its rect measured. */
  markReady() {
    this.ready = true;
    this.readyCb?.();
  }

  /**
   * Subscribe to model readiness. Fires immediately if the model is already
   * ready (cached model that loaded before the flight built). Returns an
   * unsubscribe.
   */
  onReady(cb: () => void) {
    this.readyCb = cb;
    if (this.ready) cb();
    return () => {
      if (this.readyCb === cb) this.readyCb = null;
    };
  }

  setRotationY(deg: number) {
    this.handlers.setRotationY?.(deg);
  }

  setScreen(from: SceneId, to: SceneId, t: number) {
    this.handlers.setScreen?.({ from, to, t });
  }

  getScreenRect(): LaptopScreenRect | null {
    return this.handlers.getScreenRect?.() ?? null;
  }
}

export const laptopController = new LaptopController();

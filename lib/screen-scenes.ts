/**
 * Screen scenes, ported 1:1 from the SVG laptop's `[data-screen]` groups
 * (see the previous components/svg/LaptopModel.tsx) onto a 2D canvas so
 * they can be painted as a live texture onto the 3D laptop's screen mesh.
 *
 * All drawing happens in the *original* SVG coordinate system: the laptop
 * SVG used a 560x400 viewBox with the display rect at x=94, y=34, w=372,
 * h=222. Each scene here is authored in those same coordinates, then the
 * compositor scales the whole thing to fill whatever texture resolution we
 * render at. That keeps every shape, position and proportion identical to
 * what used to show on the SVG screen.
 */

export type SceneId =
  | "hero"
  | "about"
  | "stats"
  | "partners"
  | "solutions"
  | "process"
  | "why-us"
  | "cta"
  | "zoom";

/** The display rect the scenes were authored against, in SVG units. */
export const SCREEN_VIEW = { x: 94, y: 34, w: 372, h: 222 };

const FONT_DISPLAY = '"Space Grotesk", var(--font-space-grotesk), sans-serif';
const FONT_SANS = '"Geist", var(--font-geist-sans), sans-serif';

/* --------------------------------------------------------------------- */
/* small canvas helpers, all in SVG coordinate units                     */
/* --------------------------------------------------------------------- */

function rrect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string,
  alpha = 1,
) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.restore();
}

function circle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  fill: string,
) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

function fillPath(ctx: CanvasRenderingContext2D, d: string, fill: string) {
  const p = new Path2D(d);
  ctx.fillStyle = fill;
  ctx.fill(p);
}

function strokePath(
  ctx: CanvasRenderingContext2D,
  d: string,
  stroke: string,
  width: number,
) {
  const p = new Path2D(d);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke(p);
}

function text(
  ctx: CanvasRenderingContext2D,
  str: string,
  x: number,
  y: number,
  opts: {
    size: number;
    fill: string;
    weight?: number;
    family?: string;
    spacing?: number;
    align?: CanvasTextAlign;
  },
) {
  const align = opts.align ?? "center";
  const spacing = opts.spacing ?? 0;
  ctx.save();
  ctx.fillStyle = opts.fill;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.font = `${opts.weight ?? 400} ${opts.size}px ${opts.family ?? FONT_SANS}`;
  // letterSpacing is supported in the browsers this app targets.
  (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
    `${spacing}px`;
  // Browsers include the trailing letter-spacing gap in the measured width,
  // so centred spaced text is biased left by half a gap. Nudge it back so
  // headings like KOPAL / DELL / ASUS sit truly centred on the screen.
  let drawX = x;
  if (spacing) {
    if (align === "center") drawX = x + spacing / 2;
    else if (align === "right") drawX = x + spacing;
  }
  ctx.fillText(str, drawX, y);
  ctx.restore();
}

/* --------------------------------------------------------------------- */
/* the scenes                                                            */
/* --------------------------------------------------------------------- */

const SCENES: Record<SceneId, (ctx: CanvasRenderingContext2D) => void> = {
  hero(ctx) {
    rrect(ctx, 238, 74, 84, 84, 20, "#2563eb");
    rrect(ctx, 258, 92, 9, 48, 3, "#ffffff");
    fillPath(
      ctx,
      "M273 113.5 288 98.2a3 3 0 0 1 4.3 0l1.4 1.5a3 3 0 0 1 0 4.2l-9.8 10.1 9.8 10.1a3 3 0 0 1 0 4.2l-1.4 1.5a3 3 0 0 1-4.3 0L273 119.5v-6Z",
      "#ffffff",
    );
    circle(ctx, 277, 116.5, 4.6, "#f59e0b");
    text(ctx, "KOPAL", 280, 192, {
      size: 26,
      weight: 700,
      family: FONT_DISPLAY,
      spacing: 7,
      fill: "#1e3a8a",
    });
    text(ctx, "EST. 2000 · NEW DELHI", 280, 216, {
      size: 11,
      spacing: 4,
      fill: "#475569",
    });
    rrect(ctx, 240, 228, 80, 4, 2, "#f59e0b");
  },

  about(ctx) {
    rrect(ctx, 122, 66, 130, 14, 7, "#1e3a8a");
    rrect(ctx, 122, 94, 180, 8, 4, "#93c5fd");
    rrect(ctx, 122, 112, 160, 8, 4, "#bfdbfe");
    rrect(ctx, 122, 130, 172, 8, 4, "#bfdbfe");
    rrect(ctx, 122, 160, 96, 30, 8, "#f59e0b", 0.9);
    text(ctx, "SINCE 2000", 170, 180, { size: 12, weight: 600, fill: "#ffffff" });
    // Nehru Place skyline
    rrect(ctx, 330, 150, 26, 70, 3, "#2563eb");
    rrect(ctx, 362, 120, 26, 100, 3, "#1d4ed8");
    rrect(ctx, 394, 170, 26, 50, 3, "#60a5fa");
    rrect(ctx, 336, 160, 14, 4, 2, "#dbeafe");
    rrect(ctx, 368, 130, 14, 4, 2, "#dbeafe");
    rrect(ctx, 368, 144, 14, 4, 2, "#dbeafe");
    circle(ctx, 407, 108, 7, "#f59e0b");
  },

  stats(ctx) {
    rrect(ctx, 150, 176, 42, 54, 6, "#93c5fd");
    rrect(ctx, 212, 150, 42, 80, 6, "#60a5fa");
    rrect(ctx, 274, 122, 42, 108, 6, "#3b82f6");
    rrect(ctx, 336, 88, 42, 142, 6, "#2563eb");
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(152, 150);
    ctx.lineTo(230, 120);
    ctx.lineTo(300, 96);
    ctx.lineTo(396, 62);
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
    fillPath(ctx, "M396 62 l-16 -1 10 13 Z", "#f59e0b");
  },

  partners(ctx) {
    text(ctx, "DELL", 280, 122, {
      size: 42,
      weight: 700,
      family: FONT_DISPLAY,
      spacing: 10,
      fill: "#1e3a8a",
    });
    rrect(ctx, 200, 140, 160, 3, 1.5, "#f59e0b");
    text(ctx, "ASUS", 280, 196, {
      size: 42,
      weight: 700,
      family: FONT_DISPLAY,
      spacing: 10,
      fill: "#2563eb",
    });
  },

  solutions(ctx) {
    for (let c = 0; c < 3; c++) {
      for (let r = 0; r < 2; r++) {
        const odd = (c + r) % 2;
        rrect(
          ctx,
          150 + c * 96,
          72 + r * 82,
          72,
          64,
          12,
          odd ? "#dbeafe" : "#2563eb",
        );
        circle(
          ctx,
          186 + c * 96,
          104 + r * 82,
          11,
          odd ? "#2563eb" : "#f59e0b",
        );
      }
    }
  },

  process(ctx) {
    strokePath(ctx, "M150 145 L410 145", "#bfdbfe", 6);
    for (let i = 0; i < 3; i++) {
      circle(ctx, 150 + i * 87, 145, 17, "#2563eb");
      strokePath(
        ctx,
        `M${142 + i * 87} 145 l6 6 11 -12`,
        "#ffffff",
        3.4,
      );
    }
    circle(ctx, 411, 145, 17, "#f59e0b");
    circle(ctx, 411, 145, 6, "#ffffff");
    text(ctx, "ORDER IN TRANSIT · PAN INDIA", 280, 204, {
      size: 12,
      spacing: 3,
      fill: "#475569",
    });
  },

  "why-us"(ctx) {
    circle(ctx, 280, 132, 52, "#2563eb");
    circle(ctx, 280, 132, 42, "#eff6ff");
    fillPath(
      ctx,
      "M280 104 l8.6 17.4 19.2 2.8 -13.9 13.6 3.3 19.1L280 148l-17.2 9 3.3-19.1-13.9-13.6 19.2-2.8Z",
      "#f59e0b",
    );
    strokePath(ctx, "M234 190 q46 26 92 0", "#1e3a8a", 5);
    text(ctx, "GOVT. VERIFIED · EST. 2000", 280, 226, {
      size: 11,
      spacing: 3.4,
      fill: "#475569",
    });
  },

  cta(ctx) {
    rrect(ctx, 164, 112, 232, 58, 29, "#2563eb");
    text(ctx, "VIEW PRODUCTS", 280, 148, {
      size: 16,
      weight: 600,
      spacing: 2.4,
      fill: "#ffffff",
    });
    fillPath(ctx, "M366 168 l7 22 6-8.4 10 8 4.4-5.4-10-8 9-4.8Z", "#0f172a");
  },

  zoom(ctx) {
    ctx.fillStyle = "#ece9e3";
    ctx.fillRect(
      SCREEN_VIEW.x,
      SCREEN_VIEW.y,
      SCREEN_VIEW.w,
      SCREEN_VIEW.h,
    );
  },
};

/** Scenes whose background should stay the surface colour, not the glass gradient. */
const FLAT_BG: Partial<Record<SceneId, boolean>> = { zoom: true };

/* --------------------------------------------------------------------- */
/* compositor                                                            */
/* --------------------------------------------------------------------- */

export type ScreenState = {
  from: SceneId;
  to: SceneId;
  /** 0 = fully `from`, 1 = fully `to`. */
  t: number;
};

function paintBackground(ctx: CanvasRenderingContext2D, flat: boolean) {
  if (flat) {
    ctx.fillStyle = "#ece9e3";
  } else {
    const g = ctx.createLinearGradient(94, 34, 466, 256);
    g.addColorStop(0, "#eff6ff");
    g.addColorStop(1, "#dbeafe");
    ctx.fillStyle = g;
  }
  ctx.fillRect(SCREEN_VIEW.x, SCREEN_VIEW.y, SCREEN_VIEW.w, SCREEN_VIEW.h);
}

/**
 * Render the current screen state into `ctx`, whose backing canvas is
 * `pxW` x `pxH` device pixels. Everything is authored in SVG units, so we
 * scale the SVG display rect up to fill the whole canvas.
 */
export function renderScreen(
  ctx: CanvasRenderingContext2D,
  pxW: number,
  pxH: number,
  state: ScreenState,
) {
  const t = Math.min(1, Math.max(0, state.t));

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, pxW, pxH);

  // Map SVG display rect -> full canvas.
  ctx.scale(pxW / SCREEN_VIEW.w, pxH / SCREEN_VIEW.h);
  ctx.translate(-SCREEN_VIEW.x, -SCREEN_VIEW.y);

  const sameScene = state.from === state.to || t <= 0;
  const bgFlat =
    (Boolean(FLAT_BG[state.to]) && t >= 1) ||
    (Boolean(FLAT_BG[state.from]) && t <= 0) ||
    (Boolean(FLAT_BG[state.from]) && Boolean(FLAT_BG[state.to]));

  paintBackground(ctx, bgFlat);

  if (sameScene) {
    SCENES[state.from](ctx);
  } else {
    ctx.save();
    ctx.globalAlpha = 1 - t;
    SCENES[state.from](ctx);
    ctx.restore();
    ctx.save();
    ctx.globalAlpha = t;
    SCENES[state.to](ctx);
    ctx.restore();
  }

  ctx.restore();
}

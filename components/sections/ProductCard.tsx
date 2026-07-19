"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductItem } from "@/lib/site-content";

/** Outer media box ratio - every product renders inside the same 4:3 stage. */
const STAGE_RATIO = 4 / 3;

/**
 * The laptop photo with a video playing inside its display.
 *
 * The photo sits in an inner box that matches its intrinsic aspect
 * ratio exactly, so the screen rect (percentages in site-content.ts)
 * stays glued to the display at every viewport size. The video panel
 * is invisible until the file actually plays - before the videos are
 * dropped into /public/videos/products/ the photo looks untouched.
 */
function ProductMedia({ product }: { product: ProductItem }) {
  const [playing, setPlaying] = useState(false);
  const { image, screen, video } = product;

  // Width of the inner box (in % of the 4:3 stage) so the image is as
  // large as possible without overflowing - then nudged by `zoom` so
  // padded press shots (like the square ASUS render) read the same
  // physical size as the tightly-cropped Dell ones.
  const innerWidth = Math.min(100, image.ratio * (100 / STAGE_RATIO));

  return (
    // Decorative only - never let the (over-scaled) photo box or its video
    // panel intercept clicks meant for the configuration chips beside it.
    <div
      className="pointer-events-none relative flex w-full items-center justify-center overflow-visible"
      style={{ aspectRatio: String(STAGE_RATIO) }}
    >
      <div
        className="relative"
        style={{
          width: `${innerWidth}%`,
          aspectRatio: String(image.ratio),
          transform: image.zoom ? `scale(${image.zoom})` : undefined,
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="pointer-events-none object-contain drop-shadow-[0_30px_60px_rgba(15,23,42,0.16)]"
        />

        {video ? (
          // The lit display. Sits ON the laptop photo, filling the exact
          // screen cut-out so the PNG's bezel frames it - the panel reads
          // as if the machine were switched on. Percentage geometry keeps
          // it glued to the display at every viewport, so it stays
          // perfectly framed on mobile too.
          <div
            className={`absolute overflow-hidden bg-slate-950 transition-opacity duration-700 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: `${screen.left}%`,
              top: `${screen.top}%`,
              width: `${screen.width}%`,
              height: `${screen.height}%`,
              borderRadius: "1.5% / 2.5%",
            }}
            aria-hidden="true"
          >
            <video
              src={video}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onPlaying={() => setPlaying(true)}
              onCanPlay={(e) => {
                // Some mobile browsers need an explicit nudge to autoplay.
                const v = e.currentTarget;
                if (v.paused) v.play().catch(() => {});
              }}
            />
            {/* Diagonal glass glare + soft edge vignette so the video melts
                into the panel instead of looking pasted on top. */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/10" />
            <div className="absolute inset-0 shadow-[inset_0_0_14px_rgba(0,0,0,0.45)]" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * One catalogue row - real product photography on one side, live spec
 * sheet on the other, with a configuration switcher so a single model
 * can present every CPU / RAM / GPU build we provision (e.g. a
 * Latitude 5450 in Core Ultra 5 and Core Ultra 7 trims).
 *
 * Rendered inside both the real Products section and the `mini` copy
 * that lives in the travelling laptop's display. Both mount with the
 * same default variant, so the dive crossfade stays pixel-identical.
 */
export default function ProductCard({
  product,
  flipped,
  idPrefix,
  ctaLabel,
  variantsLabel,
}: {
  product: ProductItem;
  flipped: boolean;
  idPrefix: string;
  ctaLabel: string;
  variantsLabel: string;
}) {
  const [active, setActive] = useState(0);
  const variant = product.variants[active];

  return (
    <article className="grid items-center gap-12 border-t border-stone-300 py-20 lg:grid-cols-2">
      <div className={flipped ? "lg:order-2" : ""}>
        <p
          className="text-xs font-semibold uppercase tracking-[0.24em]"
          style={{ color: product.accent }}
        >
          {product.category}
        </p>
        <h3 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {product.brand}{" "}
          <span className="text-slate-400">{product.model}</span>
        </h3>

        {/* Configuration switcher - every trim of this model */}
        <div className="mt-8 max-w-lg">
          <div className="flex items-baseline justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {variantsLabel}
            </p>
            <span className="font-mono text-xs text-slate-400">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(product.variants.length).padStart(2, "0")}
            </span>
          </div>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="tablist"
            aria-label={`${product.brand} ${product.model} configurations`}
          >
            {product.variants.map((v, i) => {
              const selected = i === active;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  id={`${idPrefix}-tab-${v.id}`}
                  aria-selected={selected}
                  aria-controls={`${idPrefix}-panel`}
                  onClick={() => setActive(i)}
                  className={`group/chip rounded-xl border px-4 py-2.5 text-left transition-all ${
                    selected
                      ? "border-slate-900 bg-slate-900"
                      : "border-stone-300 bg-paper hover:border-stone-500"
                  }`}
                >
                  <span
                    className={`block text-sm font-semibold leading-5 ${
                      selected ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {v.label}
                  </span>
                  <span
                    className={`block font-mono text-[11px] leading-4 ${
                      selected ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {v.config}
                  </span>
                  {v.tag ? (
                    <span
                      className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        selected ? "" : "opacity-60"
                      }`}
                      style={{ color: selected ? "#fff" : product.accent }}
                    >
                      {v.tag}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spec sheet for the selected configuration */}
        <ul
          key={variant.id}
          id={`${idPrefix}-panel`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-${variant.id}`}
          className="mt-6 max-w-lg"
        >
          {variant.specs.map(([num, spec]) => (
            <li
              key={num}
              className="flex items-baseline gap-7 border-b border-stone-300 py-3"
            >
              <span className="font-mono text-sm text-brand-700">{num}</span>
              <span className="text-sm leading-6 text-slate-600">{spec}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-md text-sm italic leading-6 text-slate-400">
          {product.note}
        </p>
        <a
          href="#site-footer"
          className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
        >
          {ctaLabel}
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      <div className={flipped ? "lg:order-1" : ""}>
        <ProductMedia product={product} />
      </div>
    </article>
  );
}

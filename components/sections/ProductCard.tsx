"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductItem } from "@/lib/site-content";

/**
 * One catalogue row — real product photography on one side, live spec
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
    <article className="grid items-center gap-12 border-t border-slate-200 py-20 lg:grid-cols-2">
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

        {/* Configuration switcher — every trim of this model */}
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
                      : "border-slate-200 bg-white hover:border-slate-400"
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
              className="flex items-baseline gap-7 border-b border-slate-100 py-3"
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
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-contain drop-shadow-[0_30px_60px_rgba(15,23,42,0.16)]"
          />
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";
import InteractiveType from "@/components/scene/InteractiveType";
import { productCategories, type ProductCategory } from "@/lib/site-content";

/**
 * The catalogue landing - the three ranges we provision, alternating
 * left/right down the page.
 *
 * Rendered in three variants:
 *
 *  - `home`  the homepage `#products` section, and the laptop dive's
 *            landing pad. Pulled up 100vh under the pinned #zoom stage
 *            (desktop only) so its top edge sits exactly at the viewport
 *            top the moment the dive completes.
 *  - `mini`  the live copy inside the travelling laptop's display.
 *            Must paint identically to `home` for the dive's final
 *            crossfade to be seamless - hence no scroll-reveal
 *            attributes anywhere in here, no SVG `defs`/gradient ids
 *            that would collide between the two copies, and the same
 *            heading level as `home`.
 *  - `page`  the standalone /products route. Same content, but it owns
 *            the document title so its heading is an `h1`.
 *
 * Individual machines live one level down (e.g. /products/laptops).
 * Only the Laptops range is published, so the other two CTAs render
 * disabled rather than linking nowhere.
 */
type Variant = "home" | "mini" | "page";

/** Simple line glyphs - no `defs`, so the mini copy can't collide. */
function CategoryGlyph({ id, accent }: { id: string; accent: string }) {
  const stroke = { stroke: accent, strokeWidth: 6, fill: "none" as const };

  return (
    <svg
      viewBox="0 0 240 160"
      className="h-auto w-full max-w-[280px]"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {id === "laptops" ? (
        <>
          <rect x="58" y="34" width="124" height="80" rx="8" {...stroke} />
          <path d="M34 126h172" {...stroke} />
          <path d="M104 50h72" {...stroke} opacity="0.45" />
          <path d="M104 68h48" {...stroke} opacity="0.45" />
        </>
      ) : id === "desktop-computers" ? (
        <>
          <rect x="30" y="30" width="112" height="76" rx="8" {...stroke} />
          <path d="M86 106v20M62 126h48" {...stroke} />
          <rect x="164" y="30" width="46" height="96" rx="8" {...stroke} />
          <path d="M178 48h18" {...stroke} opacity="0.45" />
          <circle cx="187" cy="104" r="6" {...stroke} opacity="0.45" />
        </>
      ) : (
        <>
          <rect x="28" y="26" width="60" height="108" rx="8" {...stroke} />
          <rect x="100" y="26" width="60" height="108" rx="8" {...stroke} />
          <path
            d="M44 46h28M44 64h28M116 46h28M116 64h28"
            {...stroke}
            opacity="0.45"
          />
          <path d="M184 58l22 22-22 22" {...stroke} />
        </>
      )}
    </svg>
  );
}

function CategoryRow({
  category,
  index,
  ctaLabel,
  pendingLabel,
  variant,
}: {
  category: ProductCategory;
  index: number;
  ctaLabel: string;
  pendingLabel: string;
  variant: Variant;
}) {
  const { name, description, href, accent } = category;
  const flipped = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="grid items-center gap-12 border-t border-stone-300 py-20 lg:grid-cols-2">
      <div className={flipped ? "lg:order-2" : ""}>
        <p
          className="font-mono text-xs font-semibold tracking-[0.24em]"
          style={{ color: accent }}
        >
          {num} - RANGE
        </p>
        <h3 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {name}
        </h3>
        <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
          {description}
        </p>

        {href ? (
          <Link
            href={href}
            // The mini copy is decorative and lives inside an
            // aria-hidden, pointer-events-none rig - never focusable.
            tabIndex={variant === "mini" ? -1 : undefined}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            {ctaLabel}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-8 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-stone-400 px-6 py-3 text-sm font-semibold text-slate-500"
          >
            {ctaLabel}
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
              · {pendingLabel}
            </span>
          </button>
        )}
      </div>

      <div className={`flex justify-center ${flipped ? "lg:order-1" : ""}`}>
        <CategoryGlyph id={category.id} accent={accent} />
      </div>
    </article>
  );
}

export default function ProductCategories({
  variant = "home",
}: {
  variant?: Variant;
}) {
  const { heading, sub, ctaLabel, pendingLabel, items } = productCategories;
  const count = String(items.length).padStart(2, "0");

  // `page` owns the document title, so its heading is the h1. `home` and
  // `mini` must match each other exactly for the dive crossfade.
  const Heading = variant === "page" ? "h1" : "h2";

  return (
    <section
      id={variant === "home" ? "products" : undefined}
      className={`relative overflow-hidden bg-surface ${
        variant === "home" ? "scroll-mt-0 lg:-mt-[100vh]" : ""
      }`}
    >
      <InteractiveType lines={["KOPAL", "PRODUCT", "LINEUP"]} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-28 sm:px-8">
        {/* Header row - big title, asterisk tally */}
        <div className="grid items-center gap-8 pb-14 lg:grid-cols-2">
          <Heading className="font-display text-6xl font-bold tracking-tight text-slate-900 sm:text-7xl">
            {heading}
          </Heading>
          <div className="flex items-center gap-5">
            <svg
              viewBox="0 0 48 48"
              className="h-12 w-12 text-slate-900"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M24 2c2 0 3.4 1.7 3.1 3.7l-1.5 9.5 7.5-6c1.6-1.3 3.8-.9 4.8.8s.4 3.8-1.4 4.7l-8.6 4.3 8.6 4.3c1.8.9 2.4 3 1.4 4.7s-3.2 2.1-4.8.8l-7.5-6 1.5 9.5c.3 2-1.1 3.7-3.1 3.7s-3.4-1.7-3.1-3.7l1.5-9.5-7.5 6c-1.6 1.3-3.8.9-4.8-.8s-.4-3.8 1.4-4.7l8.6-4.3-8.6-4.3c-1.8-.9-2.4-3-1.4-4.7s3.2-2.1 4.8-.8l7.5 6-1.5-9.5C20.6 3.7 22 2 24 2Z" />
            </svg>
            <span className="font-mono text-4xl font-semibold text-slate-900">
              {count}
            </span>
            <p className="max-w-xs text-sm leading-6 text-slate-600">{sub}</p>
          </div>
        </div>

        {items.map((category, index) => (
          <CategoryRow
            key={category.id}
            category={category}
            index={index}
            ctaLabel={ctaLabel}
            pendingLabel={pendingLabel}
            variant={variant}
          />
        ))}
      </div>
    </section>
  );
}

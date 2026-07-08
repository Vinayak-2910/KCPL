import InteractiveType from "@/components/scene/InteractiveType";
import ProductCard from "@/components/sections/ProductCard";
import { products } from "@/lib/site-content";

/**
 * The catalogue — white-theme homage to the Lusion awards wall.
 * Giant cursor-reactive outline type behind alternating product rows.
 *
 * Rendered twice: once as the real section, and once with `mini`
 * inside the travelling laptop's display. The two must stay pixel-
 * identical so the dive's final crossfade is seamless — which is why
 * nothing in here carries scroll-reveal attributes.
 *
 * The real section is pulled up 100vh under the pinned #zoom stage
 * (desktop only) so its top edge sits exactly at the viewport top
 * the moment the dive completes.
 */
export default function Products({ mini = false }: { mini?: boolean }) {
  const count = String(products.items.length).padStart(2, "0");

  return (
    <section
      id={mini ? undefined : "products"}
      className={`relative overflow-hidden bg-white ${
        mini ? "" : "scroll-mt-0 lg:-mt-[100vh]"
      }`}
    >
      <InteractiveType lines={["KOPAL", "PRODUCT", "LINEUP"]} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-28 sm:px-8">
        {/* Header row — big title, asterisk tally */}
        <div className="grid items-center gap-8 pb-14 lg:grid-cols-2">
          <h2 className="font-display text-6xl font-bold tracking-tight text-slate-900 sm:text-7xl">
            {products.heading}
          </h2>
          <div className="flex items-center gap-5">
            <svg viewBox="0 0 48 48" className="h-12 w-12 text-slate-900" fill="currentColor" aria-hidden="true">
              <path d="M24 2c2 0 3.4 1.7 3.1 3.7l-1.5 9.5 7.5-6c1.6-1.3 3.8-.9 4.8.8s.4 3.8-1.4 4.7l-8.6 4.3 8.6 4.3c1.8.9 2.4 3 1.4 4.7s-3.2 2.1-4.8.8l-7.5-6 1.5 9.5c.3 2-1.1 3.7-3.1 3.7s-3.4-1.7-3.1-3.7l1.5-9.5-7.5 6c-1.6 1.3-3.8.9-4.8-.8s-.4-3.8 1.4-4.7l8.6-4.3-8.6-4.3c-1.8-.9-2.4-3-1.4-4.7s3.2-2.1 4.8-.8l7.5 6-1.5-9.5C20.6 3.7 22 2 24 2Z" />
            </svg>
            <span className="font-mono text-4xl font-semibold text-slate-900">
              {count}
            </span>
            <p className="max-w-xs text-sm leading-6 text-slate-500">
              {products.sub}
            </p>
          </div>
        </div>

        {/* Product rows — specs / image alternating, with config switcher */}
        {products.items.map((product, index) => (
          <ProductCard
            key={product.model}
            product={product}
            flipped={index % 2 === 1}
            idPrefix={`${mini ? "mini-" : ""}product-${index}`}
            ctaLabel={products.ctaLabel}
            variantsLabel={products.variantsLabel}
          />
        ))}
      </div>
    </section>
  );
}

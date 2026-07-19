import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Products from "@/components/sections/Products";
import { loadCatalogue } from "@/lib/api";

/**
 * Without this the route is statically prerendered at build time and the
 * catalogue freezes until the next deploy - and if the backend happens to
 * be down during that build, the static fallback gets baked in for good.
 * Re-fetch on a 60s window instead.
 */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Laptops - KOPAL Computers Pvt. Ltd.",
  description:
    "Commercial laptops and ultrabooks KOPAL provisions at fleet scale - vPro-managed, ISV-certified and imaged to your build before they ship.",
};

/**
 * The Laptops range, reached from the Laptops card on /products.
 *
 * Deliberately outside ScrollExperience: the GSAP stage exists to fly
 * the laptop through the homepage narrative, and none of that applies
 * here. That also means no ScrollTrigger runs on this route, so the
 * navbar is pinned solid rather than waiting for a scroll toggle.
 */
export default async function LaptopsPage() {
  const catalogue = await loadCatalogue();

  return (
    <>
      <Navbar solid />
      <main className="select-none pt-24">
        <div className="mx-auto w-full max-w-7xl px-5 pb-4 pt-10 sm:px-8">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-brand-700"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            All ranges
          </Link>
          <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Laptops
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Commercial notebooks and ultrabooks for corporate fleets -
            vPro-managed, ISV-certified and imaged to your build before they
            ship.
          </p>
        </div>

        <Products catalogue={catalogue} />
      </main>
      <Footer />
    </>
  );
}

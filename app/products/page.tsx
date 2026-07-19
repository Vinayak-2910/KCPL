import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCategories from "@/components/sections/ProductCategories";

export const metadata: Metadata = {
  title: "Products - KOPAL Computers Pvt. Ltd.",
  description:
    "The three ranges KOPAL provisions at fleet scale - laptops, desktop computers and workstations - sourced, imaged and delivered PAN India.",
};

/**
 * The catalogue landing. Mirrors the homepage #products section, but as
 * a route of its own so the ranges are linkable and each one can own a
 * page beneath it (e.g. /products/laptops).
 *
 * Outside ScrollExperience - the GSAP stage only exists to fly the
 * laptop through the homepage narrative - so the navbar is pinned solid
 * rather than waiting for a scroll toggle that never fires here.
 */
export default function ProductsPage() {
  return (
    <>
      <Navbar solid />
      <main className="select-none pt-24">
        <ProductCategories variant="page" />
      </main>
      <Footer />
    </>
  );
}

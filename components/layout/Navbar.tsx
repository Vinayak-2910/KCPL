import Link from "next/link";
import KopalLogo from "@/components/svg/KopalLogo";

// Root-relative so they resolve from sub-routes (/products) too, not
// just from the homepage.
const NAV_LINKS = [
  { label: "Who We Are", href: "/#about" },
  { label: "Solutions", href: "/#solutions" },
  { label: "The Journey", href: "/#process" },
  { label: "Why KOPAL", href: "/#why-us" },
  { label: "Products", href: "/products" },
];

/**
 * `solid` pins the bar to its scrolled (frosted, dark-text) state for
 * routes that have no scroll experience. On the homepage a ScrollTrigger
 * toggles `.nav-scrolled` once past the dark hero; off the homepage that
 * trigger never runs, so without this the bar would sit transparent with
 * pale links over a light page.
 */
export default function Navbar({ solid = false }: { solid?: boolean }) {
  return (
    <header
      id="site-nav"
      className={`fixed inset-x-0 top-0 z-50 ${solid ? "nav-scrolled" : ""}`}
    >
      {/* Scroll progress bar */}
      <div
        data-progress-bar
        className="h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-600 via-accent-500 to-brand-700"
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/#hero" aria-label="KOPAL Computers - home">
          <KopalLogo className="h-11 w-auto" />
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-brand-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/products"
          className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-700/25 transition-all hover:bg-brand-800 hover:shadow-brand-700/40"
        >
          View Products
        </Link>
      </nav>
    </header>
  );
}

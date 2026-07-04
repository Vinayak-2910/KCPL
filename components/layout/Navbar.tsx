import KopalLogo from "@/components/svg/KopalLogo";

const NAV_LINKS = [
  { label: "Who We Are", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "The Journey", href: "#process" },
  { label: "Why KOPAL", href: "#why-us" },
  { label: "Products", href: "#products" },
];

export default function Navbar() {
  return (
    <header id="site-nav" className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress bar */}
      <div
        data-progress-bar
        className="h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-600 via-accent-500 to-brand-700"
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#hero" aria-label="KOPAL Computers — home">
          <KopalLogo className="h-11 w-auto" />
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-brand-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#products"
          className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-700/25 transition-all hover:bg-brand-800 hover:shadow-brand-700/40"
        >
          View Products
        </a>
      </nav>
    </header>
  );
}

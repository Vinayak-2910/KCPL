import KopalLogo from "@/components/svg/KopalLogo";
import { company, footer } from "@/lib/site-content";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative z-10 border-t border-slate-200 bg-white"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div className="space-y-4">
          <KopalLogo className="h-12 w-auto" />
          <p className="max-w-sm text-sm leading-6 text-slate-500">
            {footer.blurb}
          </p>
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
            <span className="h-2 w-2 rounded-full bg-accent-500" />
            {company.verification}
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-slate-900">
            Explore
          </h3>
          <ul className="space-y-3 text-sm text-slate-500">
            {footer.links.map((link) => (
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
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-slate-900">
            {footer.addressLabel}
          </h3>
          <address className="text-sm not-italic leading-7 text-slate-500">
            {company.name}
            <br />
            {company.address}
          </address>
        </div>
      </div>

      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {company.name} All rights reserved. ·
        Est. {company.founded}, {company.city}
      </div>
    </footer>
  );
}

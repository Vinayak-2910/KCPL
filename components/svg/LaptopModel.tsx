/**
 * The hero object of the site — an open commercial laptop rendered in SVG.
 *
 * Each homepage section owns one `[data-screen]` group inside the display;
 * the scroll timeline crossfades between them as the laptop travels
 * through the page. Every group except "hero" starts hidden.
 */
export default function LaptopModel({
  className = "w-full h-auto",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 560 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lm-screen" x1="94" y1="34" x2="466" y2="256">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="lm-lid" x1="80" y1="20" x2="480" y2="280">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="lm-deck" x1="0" y1="286" x2="0" y2="352">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <clipPath id="lm-clip">
          <rect data-screen-clip x="94" y="34" width="372" height="222" rx="10" />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="280" cy="368" rx="230" ry="16" fill="#0f172a" opacity="0.12" />

      {/* Lid / bezel */}
      <rect x="80" y="20" width="400" height="260" rx="18" fill="url(#lm-lid)" />
      <circle cx="280" cy="28.5" r="2.6" fill="#64748b" />

      {/* Display */}
      <rect data-screen-frame x="94" y="34" width="372" height="222" rx="10" fill="url(#lm-screen)" />

      {/* ---- Per-section screen scenes ---- */}
      <g clipPath="url(#lm-clip)">
        {/* HERO — brand splash */}
        <g data-screen="hero">
          <rect x="238" y="74" width="84" height="84" rx="20" fill="#2563eb" />
          <rect x="258" y="92" width="9" height="48" rx="3" fill="#ffffff" />
          <path
            d="M273 113.5 288 98.2a3 3 0 0 1 4.3 0l1.4 1.5a3 3 0 0 1 0 4.2l-9.8 10.1 9.8 10.1a3 3 0 0 1 0 4.2l-1.4 1.5a3 3 0 0 1-4.3 0L273 119.5v-6Z"
            fill="#ffffff"
          />
          <circle cx="277" cy="116.5" r="4.6" fill="#f59e0b" />
          <text x="280" y="192" textAnchor="middle" fontFamily="var(--font-space-grotesk), sans-serif" fontWeight="700" fontSize="26" letterSpacing="7" fill="#1e3a8a">KOPAL</text>
          <text x="280" y="216" textAnchor="middle" fontFamily="var(--font-geist-sans), sans-serif" fontSize="11" letterSpacing="4" fill="#475569">EST. 2000 · NEW DELHI</text>
          <rect x="240" y="228" width="80" height="4" rx="2" fill="#f59e0b" />
        </g>

        {/* ABOUT — company dossier */}
        <g data-screen="about" opacity="0">
          <rect x="122" y="66" width="130" height="14" rx="7" fill="#1e3a8a" />
          <rect x="122" y="94" width="180" height="8" rx="4" fill="#93c5fd" />
          <rect x="122" y="112" width="160" height="8" rx="4" fill="#bfdbfe" />
          <rect x="122" y="130" width="172" height="8" rx="4" fill="#bfdbfe" />
          <rect x="122" y="160" width="96" height="30" rx="8" fill="#f59e0b" opacity="0.9" />
          <text x="170" y="180" textAnchor="middle" fontFamily="var(--font-geist-sans), sans-serif" fontWeight="600" fontSize="12" fill="#ffffff">SINCE 2000</text>
          {/* Nehru Place skyline */}
          <rect x="330" y="150" width="26" height="70" rx="3" fill="#2563eb" />
          <rect x="362" y="120" width="26" height="100" rx="3" fill="#1d4ed8" />
          <rect x="394" y="170" width="26" height="50" rx="3" fill="#60a5fa" />
          <rect x="336" y="160" width="14" height="4" rx="2" fill="#dbeafe" />
          <rect x="368" y="130" width="14" height="4" rx="2" fill="#dbeafe" />
          <rect x="368" y="144" width="14" height="4" rx="2" fill="#dbeafe" />
          <circle cx="407" cy="108" r="7" fill="#f59e0b" />
        </g>

        {/* STATS — rising chart */}
        <g data-screen="stats" opacity="0">
          <rect x="150" y="176" width="42" height="54" rx="6" fill="#93c5fd" />
          <rect x="212" y="150" width="42" height="80" rx="6" fill="#60a5fa" />
          <rect x="274" y="122" width="42" height="108" rx="6" fill="#3b82f6" />
          <rect x="336" y="88" width="42" height="142" rx="6" fill="#2563eb" />
          <polyline points="152,150 230,120 300,96 396,62" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M396 62 l-16 -1 10 13 Z" fill="#f59e0b" />
        </g>

        {/* PARTNERS — brand marquee */}
        <g data-screen="partners" opacity="0">
          <text x="280" y="122" textAnchor="middle" fontFamily="var(--font-space-grotesk), sans-serif" fontWeight="700" fontSize="42" letterSpacing="10" fill="#1e3a8a">DELL</text>
          <rect x="200" y="140" width="160" height="3" rx="1.5" fill="#f59e0b" />
          <text x="280" y="196" textAnchor="middle" fontFamily="var(--font-space-grotesk), sans-serif" fontWeight="700" fontSize="42" letterSpacing="10" fill="#2563eb">ASUS</text>
        </g>

        {/* SOLUTIONS — capability grid */}
        <g data-screen="solutions" opacity="0">
          {[0, 1, 2].map((c) =>
            [0, 1].map((r) => (
              <g key={`${c}-${r}`}>
                <rect x={150 + c * 96} y={72 + r * 82} width="72" height="64" rx="12" fill={(c + r) % 2 ? "#dbeafe" : "#2563eb"} />
                <circle cx={186 + c * 96} cy={104 + r * 82} r="11" fill={(c + r) % 2 ? "#2563eb" : "#f59e0b"} />
              </g>
            ))
          )}
        </g>

        {/* PROCESS — journey tracker */}
        <g data-screen="process" opacity="0">
          <line x1="150" y1="145" x2="410" y2="145" stroke="#bfdbfe" strokeWidth="6" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={150 + i * 87} cy="145" r="17" fill="#2563eb" />
              <path d={`M${142 + i * 87} 145 l6 6 11 -12`} stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          ))}
          <circle cx="411" cy="145" r="17" fill="#f59e0b" />
          <circle cx="411" cy="145" r="6" fill="#ffffff" />
          <text x="280" y="204" textAnchor="middle" fontFamily="var(--font-geist-sans), sans-serif" fontSize="12" letterSpacing="3" fill="#475569">ORDER IN TRANSIT · PAN INDIA</text>
        </g>

        {/* WHY US — badge of trust */}
        <g data-screen="why-us" opacity="0">
          <circle cx="280" cy="132" r="52" fill="#2563eb" />
          <circle cx="280" cy="132" r="42" fill="#eff6ff" />
          <path d="M280 104 l8.6 17.4 19.2 2.8 -13.9 13.6 3.3 19.1L280 148l-17.2 9 3.3-19.1-13.9-13.6 19.2-2.8Z" fill="#f59e0b" />
          <path d="M234 190 q46 26 92 0" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <text x="280" y="226" textAnchor="middle" fontFamily="var(--font-geist-sans), sans-serif" fontSize="11" letterSpacing="3.4" fill="#475569">GOVT. VERIFIED · EST. 2000</text>
        </g>

        {/* CTA — the invitation */}
        <g data-screen="cta" opacity="0">
          <rect x="164" y="112" width="232" height="58" rx="29" fill="#2563eb" />
          <text x="280" y="148" textAnchor="middle" fontFamily="var(--font-geist-sans), sans-serif" fontWeight="600" fontSize="16" letterSpacing="2.4" fill="#ffffff">VIEW PRODUCTS</text>
          <path d="M366 168 l7 22 6-8.4 10 8 4.4-5.4-10-8 9-4.8Z" fill="#0f172a" />
        </g>

        {/* ZOOM — plain white; the live miniature overlays this */}
        <g data-screen="zoom" opacity="0">
          <rect x="94" y="34" width="372" height="222" fill="#ffffff" />
        </g>
      </g>

      {/* Screen glare */}
      <path d="M94 200 240 34h74L134 256h-30a10 10 0 0 1-10-10Z" fill="#ffffff" opacity="0.14" clipPath="url(#lm-clip)" />

      {/* Deck */}
      <path d="M46 286h468a8 8 0 0 1 7.6 5.5l13.8 41.3A8 8 0 0 1 527.8 343H32.2a8 8 0 0 1-7.6-10.2l13.8-41.3A8 8 0 0 1 46 286Z" fill="url(#lm-deck)" />
      {/* Hinge */}
      <rect x="80" y="278" width="400" height="10" rx="5" fill="#1e293b" />
      {/* Keyboard */}
      <g opacity="0.5">
        <rect x="96" y="296" width="368" height="7" rx="3.5" fill="#64748b" />
        <rect x="88" y="309" width="384" height="7" rx="3.5" fill="#64748b" />
        <rect x="80" y="322" width="400" height="7" rx="3.5" fill="#64748b" />
      </g>
      {/* Touchpad */}
      <rect x="236" y="332" width="88" height="9" rx="4.5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
      {/* Base edge */}
      <path d="M32.2 343h495.6a8 8 0 0 0 7.6-5.4l.4-1.1c1.7 5.2-2.2 15.5-8 15.5H32.2c-5.8 0-9.7-10.3-8-15.5l.4 1.1a8 8 0 0 0 7.6 5.4Z" fill="#64748b" />
    </svg>
  );
}

type ProductLaptopProps = {
  /** Unique per instance — prefixes SVG def ids to avoid collisions. */
  idPrefix: string;
  brand: string;
  model: string;
  accent?: string;
  className?: string;
};

/**
 * A light-theme product shot of an open commercial laptop, with the
 * brand wordmark on a clean white display. Rendered once per product
 * in the catalogue, so all defs ids are prefixed.
 */
export default function ProductLaptop({
  idPrefix,
  brand,
  model,
  accent = "#2563eb",
  className = "w-full h-auto select-none",
}: ProductLaptopProps) {
  const lidId = `${idPrefix}-lid`;
  const deckId = `${idPrefix}-deck`;
  const clipId = `${idPrefix}-clip`;

  return (
    <svg
      className={className}
      viewBox="0 0 560 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={lidId} x1="80" y1="20" x2="480" y2="280">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id={deckId} x1="0" y1="286" x2="0" y2="352">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect x="94" y="34" width="372" height="222" rx="10" />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="280" cy="368" rx="230" ry="16" fill="#0f172a" opacity="0.1" />

      {/* Lid / bezel */}
      <rect x="80" y="20" width="400" height="260" rx="18" fill={`url(#${lidId})`} />
      <circle cx="280" cy="28.5" r="2.6" fill="#94a3b8" />

      {/* Display */}
      <rect x="94" y="34" width="372" height="222" rx="10" fill="#ffffff" />
      <g clipPath={`url(#${clipId})`}>
        {/* Soft accent wallpaper */}
        <circle cx="150" cy="70" r="120" fill={accent} opacity="0.07" />
        <circle cx="430" cy="230" r="140" fill={accent} opacity="0.09" />

        {/* Menu bar */}
        <rect x="94" y="34" width="372" height="18" fill="#f8fafc" />
        <circle cx="108" cy="43" r="3" fill="#e2e8f0" />
        <circle cx="120" cy="43" r="3" fill="#e2e8f0" />
        <circle cx="132" cy="43" r="3" fill="#e2e8f0" />

        {/* Brand splash */}
        <text x="280" y="150" textAnchor="middle" fontFamily="var(--font-space-grotesk), sans-serif" fontWeight="700" fontSize="34" letterSpacing="8" fill="#0f172a">{brand}</text>
        <text x="280" y="180" textAnchor="middle" fontFamily="var(--font-geist-sans), sans-serif" fontWeight="500" fontSize="13" letterSpacing="3" fill="#64748b">{model.toUpperCase()}</text>
        <rect x="240" y="198" width="80" height="4" rx="2" fill={accent} />
      </g>

      {/* Deck */}
      <path d="M46 286h468a8 8 0 0 1 7.6 5.5l13.8 41.3A8 8 0 0 1 527.8 343H32.2a8 8 0 0 1-7.6-10.2l13.8-41.3A8 8 0 0 1 46 286Z" fill={`url(#${deckId})`} />
      <rect x="80" y="278" width="400" height="10" rx="5" fill="#334155" />
      <g opacity="0.45">
        <rect x="96" y="296" width="368" height="7" rx="3.5" fill="#94a3b8" />
        <rect x="88" y="309" width="384" height="7" rx="3.5" fill="#94a3b8" />
        <rect x="80" y="322" width="400" height="7" rx="3.5" fill="#94a3b8" />
      </g>
      <rect x="236" y="332" width="88" height="9" rx="4.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
      <path d="M32.2 343h495.6a8 8 0 0 0 7.6-5.4l.4-1.1c1.7 5.2-2.2 15.5-8 15.5H32.2c-5.8 0-9.7-10.3-8-15.5l.4 1.1a8 8 0 0 0 7.6 5.4Z" fill="#94a3b8" />
    </svg>
  );
}

type KopalLogoProps = {
  className?: string;
  withWordmark?: boolean;
};

/**
 * KOPAL Computers logo - a "K" carved from a display panel,
 * with an amber signal node marking the point of connection.
 */
export default function KopalLogo({
  className = "h-10 w-auto",
  withWordmark = true,
}: KopalLogoProps) {
  return (
    <svg
      className={className}
      viewBox={withWordmark ? "0 0 250 56" : "0 0 56 56"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KOPAL Computers Pvt. Ltd."
      role="img"
    >
      <defs>
        <linearGradient id="kopal-mark" x1="0" y1="0" x2="56" y2="56">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>

      {/* Mark: rounded display tile */}
      <rect
        x="2"
        y="2"
        width="52"
        height="52"
        rx="14"
        fill="url(#kopal-mark)"
      />
      {/* K - stem */}
      <rect x="15" y="14" width="7" height="28" rx="2.5" fill="#ffffff" />
      {/* K - upper arm */}
      <path
        d="M27 27.5 39.5 14.8a2.6 2.6 0 0 1 3.7 0l1.2 1.2a2.6 2.6 0 0 1 0 3.7L34 30l10.4 10.3a2.6 2.6 0 0 1 0 3.7l-1.2 1.2a2.6 2.6 0 0 1-3.7 0L27 32.5v-5Z"
        fill="#ffffff"
      />
      {/* Signal node */}
      <circle cx="30.5" cy="30" r="4" fill="#f59e0b" />

      {withWordmark && (
        <>
          <text
            x="68"
            y="33"
            fontFamily="var(--font-space-grotesk), sans-serif"
            fontWeight="700"
            fontSize="26"
            letterSpacing="4"
            fill="#0f172a"
          >
            KOPAL
          </text>
          <text
            x="68"
            y="48"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="500"
            fontSize="9.5"
            letterSpacing="2.6"
            fill="#475569"
          >
            COMPUTERS PVT. LTD.
          </text>
        </>
      )}
    </svg>
  );
}

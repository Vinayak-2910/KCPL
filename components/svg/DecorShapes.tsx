/**
 * Decorative SVG shapes scattered through sections.
 * Each is placed absolutely by the section and drifted on
 * scroll via `[data-parallax]` handled in ScrollExperience.
 * All extra props (data-* attributes included) are forwarded.
 */

type ShapeProps = React.SVGProps<SVGSVGElement>;

export function BlobShape({ className = "", ...rest }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M164 46c18 22 24 54 13 80s-39 45-68 47-59-13-72-37 -9-57 8-80S107 22 131 24s21 0 33 22Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function RingShape({ className = "", ...rest }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true" {...rest}>
      <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="14" />
      <circle cx="100" cy="100" r="46" stroke="currentColor" strokeWidth="6" opacity="0.5" />
    </svg>
  );
}

export function DotMatrix({ className = "", ...rest }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" aria-hidden="true" {...rest}>
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 5 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={16 + c * 32} cy={16 + r * 32} r="5" fill="currentColor" />
        ))
      )}
    </svg>
  );
}

export function HexShape({ className = "", ...rest }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M100 12 172 54v84l-72 42-72-42V54Z"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TriangleShape({ className = "", ...rest }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true" {...rest}>
      <path d="M100 18 186 172H14Z" stroke="currentColor" strokeWidth="12" strokeLinejoin="round" />
    </svg>
  );
}

export function WaveShape({ className = "", ...rest }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 240 60" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M4 30c20-24 40-24 60 0s40 24 60 0 40-24 60 0 40 24 52 12"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CircuitShape({ className = "", ...rest }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M20 100h48l22-40h40l22 40h28M110 60V20m0 120v40m-68-60v52h40"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="100" r="9" fill="currentColor" />
      <circle cx="110" cy="20" r="9" fill="currentColor" />
      <circle cx="180" cy="100" r="9" fill="currentColor" />
      <circle cx="82" cy="172" r="9" fill="currentColor" />
    </svg>
  );
}

import LaptopModel from "@/components/svg/LaptopModel";
import Products from "@/components/sections/Products";

/**
 * Fixed mount for the travelling laptop. GSAP owns every transform:
 *
 *  - [data-laptop-rig]      → flown pose to pose, then scaled through
 *                             the dive until its screen is the viewport
 *  - [data-laptop-float]    → idle bob (amplitude-damped for the dive)
 *  - [data-laptop-entrance] → one-time rise-in on load
 *  - [data-laptop-mini]     → live miniature of the catalogue, clipped
 *                             to the SVG display rect (94,34 → 372×222
 *                             of the 560×400 viewBox)
 *  - [data-laptop-mini-scaler] → 100vw-wide render of <Products mini/>
 *                             scaled so it hits exactly 1:1 when the
 *                             dive completes
 *
 * Hidden below `lg` — sections stand on their own on small screens.
 */
export default function LaptopRig() {
  return (
    <div
      data-laptop-rig
      className="pointer-events-none fixed left-1/2 top-1/2 z-20 hidden w-[clamp(320px,34vw,560px)] opacity-0 lg:block"
      aria-hidden="true"
    >
      <div data-laptop-float>
        <div data-laptop-entrance className="relative">
          <LaptopModel className="w-full h-auto drop-shadow-[0_24px_50px_rgba(30,58,138,0.25)]" />

          {/* Live miniature of the catalogue inside the display */}
          <div
            data-laptop-mini
            className="absolute flex items-start justify-center overflow-hidden bg-white opacity-0"
            style={{
              left: "16.786%",
              top: "8.5%",
              width: "66.428%",
              height: "55.5%",
              borderRadius: "6px",
            }}
          >
            <div
              data-laptop-mini-scaler
              className="w-screen shrink-0 origin-top"
            >
              <Products mini />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

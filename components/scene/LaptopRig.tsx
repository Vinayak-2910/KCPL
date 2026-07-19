import LaptopModel from "@/components/svg/LaptopModel";
import ProductCategories from "@/components/sections/ProductCategories";

/**
 * Fixed mount for the travelling laptop. GSAP owns every transform:
 *
 *  - [data-laptop-rig]         → flown pose to pose, then scaled through
 *                                the dive until its screen is the viewport
 *  - [data-laptop-float]       → idle bob (amplitude-damped for the dive)
 *  - [data-laptop-entrance]    → one-time rise-in on load
 *  - [data-laptop-mini]        → live miniature of the real catalogue,
 *                                pinned to the laptop's display rect
 *  - [data-laptop-mini-scaler] → inverse-scaled by the flight controller
 *                                so the catalogue reads 1:1 at dive end and
 *                                the hand-off to the real #products section
 *                                is seamless
 *
 * Hidden below `lg` - sections stand on their own on small screens.
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

          {/*
           * Live miniature of the catalogue rendered inside the laptop
           * display. Coordinates mirror the SVG screen rect (94,34 →
           * 372×222 in a 560×400 viewBox):
           *   left   = 94/560  = 16.786%
           *   top    = 34/400  = 8.5%
           *   width  = 372/560 = 66.428%
           *   height = 222/400 = 55.5%
           *
           * `overflow-hidden` clips the full-width catalogue to the display
           * rect; the flight controller inverse-scales the inner scaler so
           * the miniature grows into a pixel-perfect copy of the real
           * #products section as the dive completes.
           */}
          <div
            data-laptop-mini
            className="absolute flex items-start justify-center overflow-hidden bg-surface opacity-0"
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
              <ProductCategories variant="mini" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

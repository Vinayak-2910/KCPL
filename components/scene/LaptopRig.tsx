import LaptopCanvas from "@/components/scene/LaptopCanvas";
import ProductCategories from "@/components/sections/ProductCategories";

/**
 * Fixed mount for the travelling laptop. GSAP owns every transform:
 *
 *  - [data-laptop-rig]         → flown pose to pose (translate/scale/tilt),
 *                                then scaled through the dive until its
 *                                screen is the viewport
 *  - [data-laptop-entrance]    → one-time rise-in on load
 *  - [data-laptop-mini]        → live miniature of the real catalogue,
 *                                pinned to the laptop's display rect for the
 *                                final dive hand-off (positioned at runtime
 *                                by the flight controller from the 3D
 *                                screen's measured rect)
 *  - [data-laptop-mini-scaler] → inverse-scaled by the flight controller
 *                                so the catalogue reads 1:1 at dive end
 *
 * The laptop body + its live screen are now a real 3D model (LaptopCanvas),
 * which owns the 3D swivel and paints each section's data onto the screen
 * mesh. There is no idle bob any more.
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
      <div data-laptop-entrance className="relative">
        <LaptopCanvas className="w-full drop-shadow-[0_24px_50px_rgba(30,58,138,0.25)]" />

        {/*
         * Live miniature of the catalogue used only for the final dive
         * hand-off. Its rect defaults to the SVG-era display fractions and
         * is corrected at runtime to the 3D screen's measured rect so the
         * grow-into-the-page finale still lands pixel-perfect. Hidden until
         * the dive begins.
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
          <div data-laptop-mini-scaler className="w-screen shrink-0 origin-top">
            <ProductCategories variant="mini" />
          </div>
        </div>
      </div>
    </div>
  );
}

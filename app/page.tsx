import ScrollExperience from "@/components/scene/ScrollExperience";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Partners from "@/components/sections/Partners";
import Solutions from "@/components/sections/Solutions";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import CtaBanner from "@/components/sections/CtaBanner";
import ZoomPortal from "@/components/sections/ZoomPortal";
import ProductCategories from "@/components/sections/ProductCategories";

export default function Home() {
  return (
    <ScrollExperience>
      <main className="select-none">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Stats />
          <Partners />
          <Solutions />
          <Process />
          <WhyUs />
          <CtaBanner />
          <ZoomPortal />
          <ProductCategories />
        </main>
        <Footer />
      </main>
    </ScrollExperience>
  );
}

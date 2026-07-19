/**
 * Single source of truth for all homepage copy.
 */

export const company = {
  name: "KOPAL Computers Pvt. Ltd.",
  shortName: "KOPAL",
  tagline: "We don't sell. We create experiences.",
  founded: 2000,
  city: "New Delhi",
  address: "203–204, Kushal Bazar, Nehru Place, New Delhi - 110019",
  verification: "Govt. Verified Enterprise",
};

export const hero = {
  eyebrow: "Kopal Computers Pvt. Ltd. · Est. 2000 · Nehru Place, New Delhi",
  headlineTop: "We don't sell.",
  headlineBottom: "We create experiences.",
  sub: "For over two and a half decades, enterprises across India have entrusted us to architect their technology backbone - from corporate laptop fleets to complete digital, security and power ecosystems.",
  primaryCta: "View All Our Products",
  secondaryCta: "Start an Enquiry",
};

/**
 * The scroll-scrubbed cinematic hero film.
 * Files live in /public/videos/hero - see the README there.
 */
export const heroVideo = {
  /** Scrub-optimised film (H.264, dense keyframes, silent). */
  src: "/videos/hero/hero-scrub.mp4",
  /** First frame, extracted from the film - shown before load / reduced motion. */
  poster: "/videos/hero/hero-poster.jpg",
  /** Caption while the machine hangs in exploded view. */
  midline: "Engineered to the last layer.",
  midSub: "The machines we provision are chosen for what's inside.",
  /** Shown as the display's white glow hands the page over to About. */
  endLine: "Built on precision. Delivered with care.",
};

export const about = {
  eyebrow: "Who We Are",
  heading: "A legacy of trust, engineered since 2000.",
  paragraphs: [
    "KOPAL Computers Pvt. Ltd. is a collective of seasoned professionals engaged in the trading of IT, office automation, telecom and audio-visual products. Since incorporation, we have grown into a partner of choice for more than 500 satisfied customers.",
    "We provide corporate solutions and re-distribution across IT computer hardware, digital solutions, security solutions and power solutions - and undertake third-party maintenance of desktops, servers, peripherals and networking products.",
    "The journey of success demands foresight, strategy and preparedness. All of these - bound together by the power of trust - sit at the core of every operation we run. Our inspiration is your willingness to believe in our capability to deliver.",
  ],
  pullQuote: "An organization is only as good as its people.",
};

export const stats = [
  { value: 25, suffix: "+", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Satisfied Enterprises" },
  { value: 15000, suffix: "+", label: "Laptops Delivered This Year" },
] as const;

export const statBadge = {
  title: "PAN India",
  label: "Delivery & Service Coverage",
};

export const partners = {
  eyebrow: "Brands We Champion",
  heading: "Powering workspaces with the world's finest.",
  sub: "We equip corporate India with commercial-grade machines built for the modern workspace - sourced, provisioned and delivered at scale.",
  brands: [
    {
      name: "DELL",
      blurb:
        "Commercial laptops and precision-built PCs for corporate workspace requirements - deployed fleet-wide with uncompromising reliability.",
    },
    {
      name: "ASUS",
      blurb:
        "Commercial notebooks and workspace systems engineered for enterprise performance, provisioned across PAN India.",
    },
  ],
  note: "Re-distribution & corporate provisioning · 15,000+ units this year",
};

export const solutions = {
  eyebrow: "What We Orchestrate",
  heading: "End-to-end technology, under one roof.",
  items: [
    {
      title: "IT Hardware Re-distribution",
      body: "Enterprise-grade laptops, desktops and servers sourced and channelled with consistency in every delivery schedule.",
    },
    {
      title: "Corporate Workspace Provisioning",
      body: "Complete workspace builds - commercial laptops and PCs tailored to corporate requirements.",
    },
    {
      title: "Digital Solutions",
      body: "Office automation, telecom and audio-visual ecosystems that make modern workplaces work.",
    },
    {
      title: "Security Solutions",
      body: "Protection engineered into the infrastructure layer, safeguarding what your enterprise builds.",
    },
    {
      title: "Power Solutions",
      body: "Uninterrupted energy backbones that keep mission-critical operations always-on.",
    },
    {
      title: "Third-Party Maintenance",
      body: "Expert upkeep of desktops, servers, peripherals and networking products - beyond the sale.",
    },
  ],
};

export const process = {
  eyebrow: "The KOPAL Journey",
  heading: "From enquiry to experience.",
  sub: "A procurement voyage refined over 25 years - deliberate, transparent and impeccably timed.",
  steps: [
    {
      title: "Discovery & Enquiry",
      body: "Share your requirement. Our specialists immerse themselves in your workspace ambitions and technical landscape.",
    },
    {
      title: "Tailored Quotation",
      body: "We craft a precision-engineered commercial proposal - judicious pricing, zero ambiguity.",
    },
    {
      title: "Purchase Order",
      body: "Your mandate is confirmed and our fulfilment engine is set in motion within committed timelines.",
    },
    {
      title: "White-Glove Delivery",
      body: "Products arrive exactly as promised - PAN India, with the consistency that built our name.",
    },
  ],
};

export const whyUs = {
  eyebrow: "Why KOPAL",
  heading: "The oldest name. The fastest ascent.",
  points: [
    {
      title: "Legacy of the Marketplace",
      body: "The oldest distribution house operating in the market today - a quarter-century of institutional memory at your service.",
    },
    {
      title: "Momentum That Compounds",
      body: "Counted among the fastest-growing companies in our field, scaling without ever diluting quality.",
    },
    {
      title: "Judicious Commercials",
      body: "Reasonable, transparent pricing - engineered to respect your budget as much as your ambition.",
    },
    {
      title: "Govt. Verified Credentials",
      body: "A government-verified enterprise, anchored in Nehru Place and accountable across PAN India.",
    },
  ],
};

export const ctaBanner = {
  heading: "Ready to equip your enterprise?",
  sub: "Explore the complete KOPAL catalogue - commercial laptops, workspace systems and everything that powers them.",
  cta: "View All Our Products",
};

export const footer = {
  blurb:
    "Kopal Computers Pvt. Ltd. - providing corporate solutions and re-distribution in IT hardware, digital, security and power solutions since 2000.",
  addressLabel: "Registered Office",
  links: [
    { label: "Who We Are", href: "#about" },
    { label: "Solutions", href: "#solutions" },
    { label: "The Journey", href: "#process" },
    { label: "Why KOPAL", href: "#why-us" },
  ],
};

export type ProductVariant = {
  /** Stable id used for React keys / aria wiring. */
  id: string;
  /** Short chip label, e.g. "Core Ultra 5". */
  label: string;
  /** One-line memory/storage summary shown inside the chip. */
  config: string;
  /** Optional highlight tag rendered on the selected chip. */
  tag?: string;
  /** Full numbered spec sheet for this configuration. */
  specs: [string, string][];
};

export type ProductScreen = {
  /** Screen rect as % of the product image box (left/top/width/height). */
  left: number;
  top: number;
  width: number;
  height: number;
};

export type ProductItem = {
  brand: string;
  model: string;
  category: string;
  accent: string;
  image: {
    src: string;
    alt: string;
    /** Intrinsic width/height ratio - keeps the overlay aligned at every size. */
    ratio: number;
    /** Visual scale nudge so all three laptops read the same size. */
    zoom?: number;
  };
  /** Video played inside the laptop's display (file lives in /public). */
  video?: string;
  /** Where the display sits within the photo - tune per image. */
  screen: ProductScreen;
  variants: ProductVariant[];
  note: string;
};

export const products = {
  eyebrow: "The Catalogue",
  heading: "PRODUCTS",
  sub: "Commercial machines we provision at fleet scale - every unit sourced, imaged and delivered with white-glove care, PAN India.",
  variantsLabel: "Configurations",
  items: [
    {
      brand: "DELL",
      model: "Latitude 5450",
      category: "Corporate Workspace Laptop",
      accent: "#2563eb",
      image: {
        src: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/latitude-14-5450-laptop/mg/notebook-latitude-14-5450t-ir-gallery-3.psd?fmt=png-alpha&wid=1200",
        alt: "Dell Latitude 5450 14-inch business laptop, front view",
        ratio: 4703 / 3709,
      },
      video: "/videos/products/latitude-5450.mp4",
      screen: { left: 8.5, top: 5, width: 83, height: 62 },
      variants: [
        {
          id: "ultra5",
          label: "Core Ultra 5",
          config: "16 GB · 512 GB",
          specs: [
            ["001", "Intel Core Ultra 5 135U vPro · 12 Cores · up to 4.4 GHz"],
            ["002", "16 GB DDR5 5600 MT/s · 512 GB PCIe NVMe Gen4 SSD"],
            ["003", "35.5 cm (14\") FHD+ 1920×1200 · Anti-Glare · ComfortView+"],
            ["004", "Wi-Fi 6E · Bluetooth 5.3 · FHD IR Camera · Backlit Keyboard"],
            ["005", "Fleet-Ready Imaging · 3-Yr ProSupport"],
          ],
        },
        {
          id: "ultra7",
          label: "Core Ultra 7",
          config: "16 GB · 512 GB",
          tag: "Fleet favourite",
          specs: [
            ["001", "Intel Core Ultra 7 165U vPro Enterprise · 12 Cores · up to 4.9 GHz"],
            ["002", "16 GB DDR5 5600 MT/s · 512 GB PCIe NVMe Gen4 SSD"],
            ["003", "35.5 cm (14\") FHD+ 1920×1200 · Anti-Glare · ComfortView+"],
            ["004", "Wi-Fi 6E · Bluetooth 5.3 · FHD IR Camera · Backlit Keyboard"],
            ["005", "Fleet-Ready Imaging · 3-Yr ProSupport"],
          ],
        },
        {
          id: "ultra7-32",
          label: "Core Ultra 7",
          config: "32 GB · 512 GB",
          specs: [
            ["001", "Intel Core Ultra 7 165U vPro Enterprise · 12 Cores · up to 4.9 GHz"],
            ["002", "32 GB DDR5 5600 MT/s · 512 GB PCIe NVMe Gen4 SSD"],
            ["003", "35.5 cm (14\") FHD+ 1920×1200 · Anti-Glare · ComfortView+"],
            ["004", "Wi-Fi 6E · Bluetooth 5.3 · FHD IR Camera · Backlit Keyboard"],
            ["005", "Fleet-Ready Imaging · 3-Yr ProSupport"],
          ],
        },
      ],
      note: "The enterprise fleet favourite - deployed across corporate India by the thousands.",
    },
    {
      brand: "ASUS",
      model: "ExpertBook B5",
      category: "Business Ultrabook · B5404",
      accent: "#d97706",
      image: {
        src: "https://dlcdnwebimgs.asus.com/gain/ecf910e0-d9d4-4435-9f57-0ac5a77173be/w1200",
        alt: "ASUS ExpertBook B5 (B5404) 14-inch business ultrabook",
        ratio: 1,
        // The ASUS press render is a padded square, so its laptop reads
        // far smaller than the tightly-cropped Dell shots. Scale it up so
        // all three machines sit at the same physical size on the wall.
        zoom: 1.62,
      },
      video: "/videos/products/expertbook-b5.mp4",
      screen: { left: 22, top: 12, width: 56, height: 48 },
      variants: [
        {
          id: "i5",
          label: "Core i5",
          config: "16 GB · 512 GB",
          specs: [
            ["001", "Intel Core i5-1335U · 10 Cores / 12 Threads · up to 4.6 GHz"],
            ["002", "16 GB DDR5 · 512 GB PCIe 4.0 SSD · Dual-SSD RAID Ready"],
            ["003", "35.5 cm (14\") 16:10 WUXGA · Anti-Glare · 1.29 kg All-Metal"],
            ["004", "MIL-STD 810H Durability · TPM 2.0 · Smart-Card Ready"],
            ["005", "Wi-Fi 6E · Thunderbolt 4 · AI Noise Cancellation"],
          ],
        },
        {
          id: "i7",
          label: "Core i7",
          config: "16 GB · 1 TB",
          tag: "Performance pick",
          specs: [
            ["001", "Intel Core i7-1355U · 10 Cores / 12 Threads · up to 5.0 GHz"],
            ["002", "16 GB DDR5 · 1 TB PCIe 4.0 SSD · Dual-SSD RAID Ready"],
            ["003", "35.5 cm (14\") 16:10 WUXGA · Anti-Glare · 1.29 kg All-Metal"],
            ["004", "MIL-STD 810H Durability · TPM 2.0 · Smart-Card Ready"],
            ["005", "Wi-Fi 6E · Thunderbolt 4 · AI Noise Cancellation"],
          ],
        },
      ],
      note: "Engineered endurance for the always-on corporate workday.",
    },
    {
      brand: "DELL",
      model: "Precision 3591",
      category: "Mobile Workstation",
      accent: "#1e3a8a",
      image: {
        src: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/workstations/mobile-workstations/precision/15-3591/media-gallery/workstation-precision-15-3591-silver-gallery-4.psd?fmt=png-alpha&wid=1200",
        alt: "Dell Precision 3591 15.6-inch mobile workstation, front view",
        ratio: 4449 / 2639,
      },
      video: "/videos/products/precision-3591.mp4",
      screen: { left: 20, top: 8, width: 60, height: 57 },
      variants: [
        {
          id: "ultra7-rtx1000",
          label: "Core Ultra 7",
          config: "RTX 1000 Ada · 32 GB",
          specs: [
            ["001", "Intel Core Ultra 7 165H vPro Enterprise · 16 Cores · up to 5.0 GHz"],
            ["002", "NVIDIA RTX 1000 Ada Generation · 6 GB GDDR6"],
            ["003", "32 GB DDR5 5600 MT/s · 512 GB PCIe NVMe Gen4 SSD"],
            ["004", "39.6 cm (15.6\") FHD · ISV-Certified · Thunderbolt 4"],
            ["005", "Wi-Fi 6E · 3-Yr ProSupport Plus"],
          ],
        },
        {
          id: "ultra9-rtx2000",
          label: "Core Ultra 9",
          config: "RTX 2000 Ada · 32 GB",
          tag: "Max performance",
          specs: [
            ["001", "Intel Core Ultra 9 185H vPro Enterprise · 16 Cores · up to 5.1 GHz"],
            ["002", "NVIDIA RTX 2000 Ada Generation · 8 GB GDDR6"],
            ["003", "32 GB DDR5 5600 MT/s · 1 TB PCIe NVMe Gen4 SSD"],
            ["004", "39.6 cm (15.6\") FHD · ISV-Certified · Thunderbolt 4"],
            ["005", "Wi-Fi 6E · 3-Yr ProSupport Plus"],
          ],
        },
      ],
      note: "Workstation-class muscle for CAD, analytics and design teams.",
    },
  ] satisfies ProductItem[],
  ctaLabel: "Enquire about this machine",
};

/* ------------------------------------------------------------------ */
/*  Product categories - the homepage catalogue landing                 */
/* ------------------------------------------------------------------ */

export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  /** Destination for the CTA, or `null` while the range is unpublished. */
  href: string | null;
  accent: string;
};

/**
 * The three ranges shown on the homepage in place of individual
 * machines. Only Laptops is published today - the other two render a
 * disabled CTA until their catalogues exist, rather than a dead link.
 */
export const productCategories = {
  eyebrow: "The Catalogue",
  heading: "PRODUCTS",
  sub: "Three ranges, one standard of provisioning - sourced, imaged and delivered with white-glove care, PAN India.",
  ctaLabel: "View products",
  pendingLabel: "Coming soon",
  items: [
    {
      id: "laptops",
      name: "Laptops",
      description:
        "Commercial notebooks and ultrabooks for corporate fleets - vPro-managed, ISV-certified and imaged to your build before they ship.",
      href: "/products/laptops",
      accent: "#2563eb",
    },
    {
      id: "desktop-computers",
      name: "Desktop Computers",
      description:
        "Business desktops and all-in-ones for the fixed workspace, specified for quiet, serviceable, all-day operation across large floors.",
      href: null,
      accent: "#d97706",
    },
    {
      id: "workstations",
      name: "Workstations",
      description:
        "Certified tower and mobile workstations for CAD, simulation and analytics teams that need professional graphics and ECC headroom.",
      href: null,
      accent: "#0f766e",
    },
  ] satisfies ProductCategory[],
};

/**
 * Single source of truth for all homepage copy.
 */

export const company = {
  name: "KOPAL Computers Pvt. Ltd.",
  shortName: "KOPAL",
  tagline: "We don't sell. We create experiences.",
  founded: 2000,
  city: "New Delhi",
  address: "203–204, Kushal Bazar, Nehru Place, New Delhi — 110019",
  verification: "Govt. Verified Enterprise",
};

export const hero = {
  eyebrow: "Kopal Computers Pvt. Ltd. · Est. 2000 · Nehru Place, New Delhi",
  headlineTop: "We don't sell.",
  headlineBottom: "We create experiences.",
  sub: "For over two and a half decades, enterprises across India have entrusted us to architect their technology backbone — from corporate laptop fleets to complete digital, security and power ecosystems.",
  primaryCta: "View All Our Products",
  secondaryCta: "Start an Enquiry",
};

export const about = {
  eyebrow: "Who We Are",
  heading: "A legacy of trust, engineered since 2000.",
  paragraphs: [
    "KOPAL Computers Pvt. Ltd. is a collective of seasoned professionals engaged in the trading of IT, office automation, telecom and audio-visual products. Since incorporation, we have grown into a partner of choice for more than 500 satisfied customers.",
    "We provide corporate solutions and re-distribution across IT computer hardware, digital solutions, security solutions and power solutions — and undertake third-party maintenance of desktops, servers, peripherals and networking products.",
    "The journey of success demands foresight, strategy and preparedness. All of these — bound together by the power of trust — sit at the core of every operation we run. Our inspiration is your willingness to believe in our capability to deliver.",
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
  sub: "We equip corporate India with commercial-grade machines built for the modern workspace — sourced, provisioned and delivered at scale.",
  brands: [
    {
      name: "DELL",
      blurb:
        "Commercial laptops and precision-built PCs for corporate workspace requirements — deployed fleet-wide with uncompromising reliability.",
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
      body: "Complete workspace builds — commercial laptops and PCs tailored to corporate requirements.",
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
      body: "Expert upkeep of desktops, servers, peripherals and networking products — beyond the sale.",
    },
  ],
};

export const process = {
  eyebrow: "The KOPAL Journey",
  heading: "From enquiry to experience.",
  sub: "A procurement voyage refined over 25 years — deliberate, transparent and impeccably timed.",
  steps: [
    {
      title: "Discovery & Enquiry",
      body: "Share your requirement. Our specialists immerse themselves in your workspace ambitions and technical landscape.",
    },
    {
      title: "Tailored Quotation",
      body: "We craft a precision-engineered commercial proposal — judicious pricing, zero ambiguity.",
    },
    {
      title: "Purchase Order",
      body: "Your mandate is confirmed and our fulfilment engine is set in motion within committed timelines.",
    },
    {
      title: "White-Glove Delivery",
      body: "Products arrive exactly as promised — PAN India, with the consistency that built our name.",
    },
  ],
};

export const whyUs = {
  eyebrow: "Why KOPAL",
  heading: "The oldest name. The fastest ascent.",
  points: [
    {
      title: "Legacy of the Marketplace",
      body: "The oldest distribution house operating in the market today — a quarter-century of institutional memory at your service.",
    },
    {
      title: "Momentum That Compounds",
      body: "Counted among the fastest-growing companies in our field, scaling without ever diluting quality.",
    },
    {
      title: "Judicious Commercials",
      body: "Reasonable, transparent pricing — engineered to respect your budget as much as your ambition.",
    },
    {
      title: "Govt. Verified Credentials",
      body: "A government-verified enterprise, anchored in Nehru Place and accountable across PAN India.",
    },
  ],
};

export const ctaBanner = {
  heading: "Ready to equip your enterprise?",
  sub: "Explore the complete KOPAL catalogue — commercial laptops, workspace systems and everything that powers them.",
  cta: "View All Our Products",
};

export const footer = {
  blurb:
    "Kopal Computers Pvt. Ltd. — providing corporate solutions and re-distribution in IT hardware, digital, security and power solutions since 2000.",
  addressLabel: "Registered Office",
  links: [
    { label: "Who We Are", href: "#about" },
    { label: "Solutions", href: "#solutions" },
    { label: "The Journey", href: "#process" },
    { label: "Why KOPAL", href: "#why-us" },
  ],
};

export const products = {
  eyebrow: "The Catalogue",
  heading: "PRODUCTS",
  sub: "Commercial machines we provision at fleet scale — every unit sourced, imaged and delivered with white-glove care, PAN India.",
  items: [
    {
      brand: "DELL",
      model: "Latitude 5450",
      category: "Corporate Workspace Laptop",
      accent: "#2563eb",
      specs: [
        ["001", "Intel Core Ultra 7 165U · vPro Enterprise"],
        ["002", "16 GB DDR5 5600 · 512 GB PCIe NVMe SSD"],
        ["003", "35.5 cm (14\") FHD+ · Anti-Glare · ComfortView+"],
        ["004", "Wi-Fi 6E · FHD IR Camera · Backlit Keyboard"],
        ["005", "Fleet-Ready Imaging · 3-Yr ProSupport"],
      ],
      note: "The enterprise fleet favourite — deployed across corporate India by the thousands.",
    },
    {
      brand: "ASUS",
      model: "ExpertBook B5",
      category: "Business Ultrabook",
      accent: "#d97706",
      specs: [
        ["001", "Intel Core i7 13th Gen · Iris Xe Graphics"],
        ["002", "16 GB DDR5 · 1 TB PCIe 4.0 SSD"],
        ["003", "39.6 cm (15.6\") FHD IPS · Anti-Glare"],
        ["004", "MIL-STD 810H Durability · Smart-Card Ready"],
        ["005", "Wi-Fi 6E · AI Noise Cancellation · TPM 2.0"],
      ],
      note: "Engineered endurance for the always-on corporate workday.",
    },
    {
      brand: "DELL",
      model: "Precision 3591",
      category: "Mobile Workstation",
      accent: "#1e3a8a",
      specs: [
        ["001", "Intel Core Ultra 9 · NVIDIA RTX A1000"],
        ["002", "32 GB DDR5 · 1 TB PCIe NVMe SSD"],
        ["003", "39.6 cm (15.6\") FHD · 100% sRGB"],
        ["004", "ISV-Certified · vPro Enterprise Manageability"],
        ["005", "Thunderbolt 4 · 3-Yr ProSupport Plus"],
      ],
      note: "Workstation-class muscle for CAD, analytics and design teams.",
    },
  ],
  ctaLabel: "Enquire about this machine",
};

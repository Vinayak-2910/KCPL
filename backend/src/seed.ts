/**
 * Seed script - populates MongoDB with the 3 KOPAL catalogue products
 * and the catalogue meta document.
 *
 * Run once:  npm run seed
 */
import "dotenv/config";
import mongoose from "mongoose";
import { Product } from "./models/Product";
import { CatalogueMeta } from "./models/CatalogueMeta";

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/kcpl";

const catalogueMeta = {
  key: "main",
  eyebrow: "The Catalogue",
  heading: "PRODUCTS",
  sub: "Commercial machines we provision at fleet scale - every unit sourced, imaged and delivered with white-glove care, PAN India.",
  ctaLabel: "Enquire about this machine",
  variantsLabel: "Configurations",
};

const products = [
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
          { code: "001", text: "Intel Core Ultra 5 135U vPro · 12 Cores · up to 4.4 GHz" },
          { code: "002", text: "16 GB DDR5 5600 MT/s · 512 GB PCIe NVMe Gen4 SSD" },
          { code: "003", text: '35.5 cm (14") FHD+ 1920×1200 · Anti-Glare · ComfortView+' },
          { code: "004", text: "Wi-Fi 6E · Bluetooth 5.3 · FHD IR Camera · Backlit Keyboard" },
          { code: "005", text: "Fleet-Ready Imaging · 3-Yr ProSupport" },
        ],
      },
      {
        id: "ultra7",
        label: "Core Ultra 7",
        config: "16 GB · 512 GB",
        tag: "Fleet favourite",
        specs: [
          { code: "001", text: "Intel Core Ultra 7 165U vPro Enterprise · 12 Cores · up to 4.9 GHz" },
          { code: "002", text: "16 GB DDR5 5600 MT/s · 512 GB PCIe NVMe Gen4 SSD" },
          { code: "003", text: '35.5 cm (14") FHD+ 1920×1200 · Anti-Glare · ComfortView+' },
          { code: "004", text: "Wi-Fi 6E · Bluetooth 5.3 · FHD IR Camera · Backlit Keyboard" },
          { code: "005", text: "Fleet-Ready Imaging · 3-Yr ProSupport" },
        ],
      },
      {
        id: "ultra7-32",
        label: "Core Ultra 7",
        config: "32 GB · 512 GB",
        specs: [
          { code: "001", text: "Intel Core Ultra 7 165U vPro Enterprise · 12 Cores · up to 4.9 GHz" },
          { code: "002", text: "32 GB DDR5 5600 MT/s · 512 GB PCIe NVMe Gen4 SSD" },
          { code: "003", text: '35.5 cm (14") FHD+ 1920×1200 · Anti-Glare · ComfortView+' },
          { code: "004", text: "Wi-Fi 6E · Bluetooth 5.3 · FHD IR Camera · Backlit Keyboard" },
          { code: "005", text: "Fleet-Ready Imaging · 3-Yr ProSupport" },
        ],
      },
    ],
    note: "The enterprise fleet favourite - deployed across corporate India by the thousands.",
    sortOrder: 0,
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
          { code: "001", text: "Intel Core i5-1335U · 10 Cores / 12 Threads · up to 4.6 GHz" },
          { code: "002", text: "16 GB DDR5 · 512 GB PCIe 4.0 SSD · Dual-SSD RAID Ready" },
          { code: "003", text: '35.5 cm (14") 16:10 WUXGA · Anti-Glare · 1.29 kg All-Metal' },
          { code: "004", text: "MIL-STD 810H Durability · TPM 2.0 · Smart-Card Ready" },
          { code: "005", text: "Wi-Fi 6E · Thunderbolt 4 · AI Noise Cancellation" },
        ],
      },
      {
        id: "i7",
        label: "Core i7",
        config: "16 GB · 1 TB",
        tag: "Performance pick",
        specs: [
          { code: "001", text: "Intel Core i7-1355U · 10 Cores / 12 Threads · up to 5.0 GHz" },
          { code: "002", text: "16 GB DDR5 · 1 TB PCIe 4.0 SSD · Dual-SSD RAID Ready" },
          { code: "003", text: '35.5 cm (14") 16:10 WUXGA · Anti-Glare · 1.29 kg All-Metal' },
          { code: "004", text: "MIL-STD 810H Durability · TPM 2.0 · Smart-Card Ready" },
          { code: "005", text: "Wi-Fi 6E · Thunderbolt 4 · AI Noise Cancellation" },
        ],
      },
    ],
    note: "Engineered endurance for the always-on corporate workday.",
    sortOrder: 1,
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
          { code: "001", text: "Intel Core Ultra 7 165H vPro Enterprise · 16 Cores · up to 5.0 GHz" },
          { code: "002", text: "NVIDIA RTX 1000 Ada Generation · 6 GB GDDR6" },
          { code: "003", text: "32 GB DDR5 5600 MT/s · 512 GB PCIe NVMe Gen4 SSD" },
          { code: "004", text: '39.6 cm (15.6") FHD · ISV-Certified · Thunderbolt 4' },
          { code: "005", text: "Wi-Fi 6E · 3-Yr ProSupport Plus" },
        ],
      },
      {
        id: "ultra9-rtx2000",
        label: "Core Ultra 9",
        config: "RTX 2000 Ada · 32 GB",
        tag: "Max performance",
        specs: [
          { code: "001", text: "Intel Core Ultra 9 185H vPro Enterprise · 16 Cores · up to 5.1 GHz" },
          { code: "002", text: "NVIDIA RTX 2000 Ada Generation · 8 GB GDDR6" },
          { code: "003", text: "32 GB DDR5 5600 MT/s · 1 TB PCIe NVMe Gen4 SSD" },
          { code: "004", text: '39.6 cm (15.6") FHD · ISV-Certified · Thunderbolt 4' },
          { code: "005", text: "Wi-Fi 6E · 3-Yr ProSupport Plus" },
        ],
      },
    ],
    note: "Workstation-class muscle for CAD, analytics and design teams.",
    sortOrder: 2,
  },
];

async function seed(): Promise<void> {
  console.log("[Seed] Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI);
  console.log("[Seed] Connected.");

  /* Upsert catalogue meta */
  await CatalogueMeta.findOneAndUpdate(
    { key: "main" },
    catalogueMeta,
    { upsert: true, new: true }
  );
  console.log("[Seed] Catalogue meta upserted.");

  /* Upsert each product by (brand, model) */
  for (const product of products) {
    await Product.findOneAndUpdate(
      { brand: product.brand, model: product.model },
      product,
      { upsert: true, new: true }
    );
    console.log(`[Seed] Upserted: ${product.brand} ${product.model}`);
  }

  console.log("[Seed] Done ✓");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("[Seed] Fatal:", err);
  process.exit(1);
});

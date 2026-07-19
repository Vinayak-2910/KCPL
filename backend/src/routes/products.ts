import { Router, Request, Response } from "express";
import { Product } from "../models/Product";
import { CatalogueMeta } from "../models/CatalogueMeta";

const router = Router();

/* ------------------------------------------------------------------ */
/*  GET /api/products                                                    */
/*  Returns catalogue meta + all active products, sorted by sortOrder. */
/* ------------------------------------------------------------------ */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const [meta, items] = await Promise.all([
      CatalogueMeta.findOne({ key: "main" }).lean(),
      Product.find({ active: true }).sort({ sortOrder: 1 }).lean(),
    ]);

    if (!meta) {
      res.status(404).json({ error: "Catalogue meta not found." });
      return;
    }

    // Shape the spec tuples back to [code, text] arrays to match
    // the frontend's existing ProductItem type exactly.
    const shaped = items.map((p) => ({
      brand: p.brand,
      model: p.model,
      category: p.category,
      accent: p.accent,
      image: p.image,
      video: p.video,
      screen: p.screen,
      variants: p.variants.map((v) => ({
        id: v.id,
        label: v.label,
        config: v.config,
        tag: v.tag,
        specs: v.specs.map((s) => [s.code, s.text] as [string, string]),
      })),
      note: p.note,
    }));

    res.json({
      eyebrow: meta.eyebrow,
      heading: meta.heading,
      sub: meta.sub,
      ctaLabel: meta.ctaLabel,
      variantsLabel: meta.variantsLabel,
      items: shaped,
    });
  } catch (err) {
    console.error("[GET /api/products]", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* ------------------------------------------------------------------ */
/*  GET /api/products/:model                                             */
/*  Returns a single product by model slug (case-insensitive).          */
/* ------------------------------------------------------------------ */
router.get("/:model", async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      model: { $regex: new RegExp(`^${req.params.model}$`, "i") },
      active: true,
    }).lean();

    if (!product) {
      res.status(404).json({ error: "Product not found." });
      return;
    }

    res.json(product);
  } catch (err) {
    console.error("[GET /api/products/:model]", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;

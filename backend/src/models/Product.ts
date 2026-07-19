import mongoose, { Schema, Document } from "mongoose";

/* ------------------------------------------------------------------ */
/*  Sub-schemas                                                          */
/* ------------------------------------------------------------------ */

const SpecPairSchema = new Schema<[string, string]>(
  { code: { type: String, required: true }, text: { type: String, required: true } },
  { _id: false }
);

const VariantSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    config: { type: String, required: true },
    tag: { type: String },
    specs: {
      type: [{ code: String, text: String }],
      required: true,
    },
  },
  { _id: false }
);

const ProductImageSchema = new Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    /** Intrinsic aspect ratio (width / height) of the product photo. */
    ratio: { type: Number, required: true, default: 1 },
    /** Visual zoom multiplier so all laptops read the same on-screen size. */
    zoom: { type: Number },
  },
  { _id: false }
);

const ProductScreenSchema = new Schema(
  {
    left: { type: Number, required: true },
    top: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { _id: false }
);

/* ------------------------------------------------------------------ */
/*  Root document                                                        */
/* ------------------------------------------------------------------ */

export interface IProductVariant {
  id: string;
  label: string;
  config: string;
  tag?: string;
  specs: { code: string; text: string }[];
}

export interface IProductImage {
  src: string;
  alt: string;
  ratio: number;
  zoom?: number;
}

export interface IProductScreen {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface IProduct extends Document {
  brand: string;
  model: string;
  category: string;
  accent: string;
  image: IProductImage;
  /** Path to a promo video shown inside the laptop display overlay. */
  video?: string;
  screen: IProductScreen;
  variants: IProductVariant[];
  note: string;
  /** Controls render order on the catalogue wall. */
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    accent: { type: String, required: true, default: "#2563eb" },
    image: { type: ProductImageSchema, required: true },
    video: { type: String },
    screen: { type: ProductScreenSchema, required: true },
    variants: { type: [VariantSchema], required: true, default: [] },
    note: { type: String, required: true, default: "" },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

/* Ensure every (brand, model) pair is unique */
ProductSchema.index({ brand: 1, model: 1 }, { unique: true });
ProductSchema.index({ sortOrder: 1 });

export const Product = mongoose.model<IProduct>("Product", ProductSchema);

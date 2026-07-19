import mongoose, { Schema, Document } from "mongoose";

/**
 * Stores the heading-level copy that accompanies the product catalogue.
 * There should be exactly one document (singleton pattern via key "main").
 */
export interface ICatalogueMeta extends Document {
  key: string;
  eyebrow: string;
  heading: string;
  sub: string;
  ctaLabel: string;
  variantsLabel: string;
}

const CatalogueMetaSchema = new Schema<ICatalogueMeta>(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    eyebrow: { type: String, required: true },
    heading: { type: String, required: true },
    sub: { type: String, required: true },
    ctaLabel: { type: String, required: true },
    variantsLabel: { type: String, required: true },
  },
  { timestamps: true, collection: "catalogue_meta" }
);

export const CatalogueMeta = mongoose.model<ICatalogueMeta>(
  "CatalogueMeta",
  CatalogueMetaSchema
);

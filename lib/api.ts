/**
 * KCPL Frontend API Client
 *
 * Thin wrapper around fetch() for the KOPAL backend.
 * All types mirror the shapes defined in site-content.ts so that
 * existing components that consume `products` from site-content
 * can switch to this client with zero other changes.
 */

import { products as fallback } from "@/lib/site-content";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

/* ------------------------------------------------------------------ */
/*  Types (kept in sync with backend IProduct shape)                    */
/* ------------------------------------------------------------------ */

export type ProductVariant = {
  id: string;
  label: string;
  config: string;
  tag?: string;
  specs: [string, string][];
};

export type ProductImage = {
  src: string;
  alt: string;
  ratio: number;
  zoom?: number;
};

export type ProductScreen = {
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
  image: ProductImage;
  video?: string;
  screen: ProductScreen;
  variants: ProductVariant[];
  note: string;
};

export type ProductCatalogue = {
  eyebrow: string;
  heading: string;
  sub: string;
  ctaLabel: string;
  variantsLabel: string;
  items: ProductItem[];
};

/* ------------------------------------------------------------------ */
/*  API helpers                                                          */
/* ------------------------------------------------------------------ */

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`[API] ${res.status} ${path}: ${body}`);
  }
  return res.json() as Promise<T>;
}

/* ------------------------------------------------------------------ */
/*  Products                                                             */
/* ------------------------------------------------------------------ */

/**
 * Fetch the full product catalogue (meta + all active products).
 * Used by the Products section and the travelling laptop miniature.
 */
export async function fetchProducts(): Promise<ProductCatalogue> {
  return apiFetch<ProductCatalogue>("/products");
}

/**
 * Server-side catalogue loader with a static safety net.
 *
 * Call this from a Server Component only. It must never run in the
 * browser: the API lives on a different origin, so a client-side call
 * needs CORS and would leak the backend URL into the bundle. The page
 * loads it once and passes the result down to both the real catalogue
 * and the laptop miniature, which keeps the two byte-identical - the
 * dive's final crossfade depends on that.
 */
export async function loadCatalogue(): Promise<ProductCatalogue> {
  try {
    return await fetchProducts();
  } catch (err) {
    console.warn(
      "[catalogue] Backend unavailable, using static fallback.",
      (err as Error).message,
    );
    return fallback as unknown as ProductCatalogue;
  }
}

/**
 * Fetch a single product by its model name (e.g. "Latitude 5450").
 */
export async function fetchProduct(model: string): Promise<ProductItem> {
  return apiFetch<ProductItem>(`/products/${encodeURIComponent(model)}`);
}

/* ------------------------------------------------------------------ */
/*  Health                                                               */
/* ------------------------------------------------------------------ */

export async function checkHealth(): Promise<{ status: string; timestamp: string }> {
  const url = API_BASE.replace("/api", "");
  const res = await fetch(`${url}/health`);
  return res.json();
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Allow product images from Dell and ASUS CDNs to be rendered
   * via Next.js <Image> if components are ever upgraded to use it.
   */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dell.com",
        pathname: "/is/image/**",
      },
      {
        protocol: "https",
        hostname: "dlcdnwebimgs.asus.com",
        pathname: "/gain/**",
      },
    ],
  },

  /**
   * Expose the API base URL to both server and client components.
   * Set NEXT_PUBLIC_API_URL in .env.local for local dev.
   * In production, set it in your deployment environment.
   */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api",
  },
};

export default nextConfig;

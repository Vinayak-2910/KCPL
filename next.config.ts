import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dell.com",
        pathname: "/is/image/DellContent/**",
      },
      {
        protocol: "https",
        hostname: "dlcdnwebimgs.asus.com",
        pathname: "/gain/**",
      },
    ],
  },
};

export default nextConfig;

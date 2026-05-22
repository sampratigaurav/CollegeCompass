import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Silence false-positive warning about using Prisma in Next.js
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;

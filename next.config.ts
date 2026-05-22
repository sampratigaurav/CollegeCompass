import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Silence false-positive warning about using Prisma in Next.js
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;

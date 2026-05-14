import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    deviceSizes: [375, 768, 1280, 1920],
    imageSizes: [],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fuzzyhub.generals-soft.com",
      },
    ],
  },
  experimental: {
    testProxy: true,
  },
};

export default nextConfig;

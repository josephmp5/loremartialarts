import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove output: 'export' for Vercel deployment with dynamic features
  // basePath: '/loremartialarts', // Remove for root domain deployment
  // assetPrefix: '/loremartialarts', // Remove for root domain deployment
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;

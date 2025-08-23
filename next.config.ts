import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['pixel.menusifu.com', "lh3.googleusercontent.com"],
    unoptimized: true,
  },
  trailingSlash: true,
};


export default nextConfig;

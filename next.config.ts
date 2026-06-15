import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    // Add external hostnames here if you ever use remote images
    // remotePatterns: [{ hostname: "example.com" }],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

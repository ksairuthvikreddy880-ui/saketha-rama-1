import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  serverExternalPackages: ["mongoose", "bcryptjs", "nodemailer"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

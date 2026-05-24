import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  serverExternalPackages: ["pdfmake", "@foliojs-fork/fontkit"],
};

export default nextConfig;

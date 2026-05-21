import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/config", "@repo/db", "@repo/types"],
};

export default nextConfig;

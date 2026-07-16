import type { NextConfig } from "next";

/** Must match the GitHub repository name for project Pages. */
const repo = "portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Matches the live WordPress URLs (/about-us/, /contact/) for SEO continuity.
  trailingSlash: true,
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
};

export default nextConfig;

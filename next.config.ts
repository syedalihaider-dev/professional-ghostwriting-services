import type { NextConfig } from "next";
import { INDEXABLE } from "./src/config/indexing";

const nextConfig: NextConfig = {
  // Matches the live WordPress URLs (/about-us/, /contact/) for SEO continuity.
  trailingSlash: true,
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // Belt and braces while pre-launch: an HTTP noindex on every response,
  // including non-HTML assets the meta tag can't cover.
  async headers() {
    return INDEXABLE ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  partialPrefetching: true,
  reactCompiler: true,
};

export default nextConfig;

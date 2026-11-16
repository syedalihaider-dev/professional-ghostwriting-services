import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { INDEXABLE } from "@/config/indexing";

/**
 * Crawling stays allowed so crawlers can read the noindex directives. The
 * sitemap is only advertised once the site is indexable.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    ...(INDEXABLE ? { sitemap: `${site.url}/sitemap.xml` } : {}),
    host: site.url,
  };
}
import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services, servicePath } from "@/data/services";

/**
 * Sitemap entries, kept ready for launch. NOT served while INDEXABLE is false.
 * At launch, create src/app/sitemap.ts:
 *   export { sitemapEntries as default } from "@/lib/sitemapEntries";
 */
export function sitemapEntries(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about-us/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/contact/`, changeFrequency: "yearly", priority: 0.8 },
    ...services.map((s) => ({ url: `${site.url}${servicePath(s.slug)}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}

import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Only built routes are listed. Add inner pages here as they ship. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about-us/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/contact/`, changeFrequency: "yearly", priority: 0.8 },
  ];
}

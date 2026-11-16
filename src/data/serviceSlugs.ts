/**
 * The service page slugs, kept in a tiny standalone module so src/proxy.ts
 * can import it without bundling all the page content. The build fails if
 * this list and src/data/services.ts ever disagree (see app/[serviceSlug]).
 */
export const SERVICE_SLUGS = [
  "biography-writing-services",
  "content-writing-services",
  "article-writing-services",
  "business-plan-writing-services",
  "book-marketing-services",
  "book-proofreading-services",
  "book-editing-services",
  "business-ghostwriting-services",
  "medical-ghostwriting-services",
  "academic-ghostwriting-services",
  "non-fiction-ghostwriting-services",
  "memoir-ghostwriting-services",
  "fiction-ghostwriting-services",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

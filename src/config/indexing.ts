/**
 * LAUNCH SWITCH — search indexing.
 *
 * While false (pre-launch), every route is served with:
 *   - <meta name="robots" content="noindex, nofollow"> (root layout metadata)
 *   - X-Robots-Tag: noindex, nofollow (HTTP header, next.config.ts)
 *   - no XML sitemap, and no sitemap reference in robots.txt.
 * robots.txt still ALLOWS crawling on purpose: a crawler blocked by
 * robots.txt can't see the noindex directive, and could still index URLs.
 *
 * At launch: set to true, then restore src/app/sitemap.ts (see README).
 * Titles, descriptions, canonicals and Open Graph stay in place either way.
 */
export const INDEXABLE = false;

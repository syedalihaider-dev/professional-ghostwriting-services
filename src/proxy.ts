import { NextResponse, type NextRequest } from "next/server";
import { SERVICE_SLUGS } from "@/data/serviceSlugs";

/*
 * Genuine 404s for unknown root URLs.
 *
 * Service pages share one dynamic root segment (app/[serviceSlug]). With
 * Cache Components + Partial Prerendering, an unknown param is answered from
 * the prerendered shell, so its notFound() arrives after a 200 status has
 * been sent — a "soft 404". This runs before rendering: a single-segment path
 * that is not a known page, service or app-generated file is rewritten to an
 * unrouted path, which Next answers with a real 404 and the not-found page.
 */
const ROOT_PAGES = new Set(["about-us", "contact"]);
const ROOT_FILES = new Set(["robots.txt", "icon.png", "apple-icon.png", "favicon.ico"]);
const SERVICES = new Set<string>(SERVICE_SLUGS);

export function proxy(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  if (segments.length === 1) {
    const [s] = segments;
    if (!ROOT_PAGES.has(s) && !SERVICES.has(s) && !ROOT_FILES.has(s)) {
      return NextResponse.rewrite(new URL("/_unrouted/not-found/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  // Everything except Next internals, the API and public asset folders —
  // extension paths like /sitemap.xml are included so they can't soft-200.
  matcher: ["/((?!_next/|api/|images/|videos/).*)"],
};

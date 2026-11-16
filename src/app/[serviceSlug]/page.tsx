import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { services, serviceBySlug, servicePath } from "@/data/services";
import { SERVICE_SLUGS } from "@/data/serviceSlugs";
import ServicePage from "@/components/ServicePage/ServicePage";

/**
 * Service pages live at the domain root (/biography-writing-services/ …),
 * never under /services/. Static routes (about-us, contact, api) take
 * precedence over this dynamic segment, so there are no conflicts.
 *
 * Cache Components: `dynamicParams` is unsupported, so every known slug is
 * prerendered via generateStaticParams and unknown slugs call notFound().
 */
export function generateStaticParams() {
  // Guard: the proxy's slug list must match the service data exactly.
  const data = services.map((s) => s.slug).sort().join("|");
  const listed = [...SERVICE_SLUGS].sort().join("|");
  if (data !== listed) throw new Error("src/data/serviceSlugs.ts is out of sync with src/data/services.ts");
  return services.map((s) => ({ serviceSlug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[serviceSlug]">): Promise<Metadata> {
  const { serviceSlug } = await params;
  const s = serviceBySlug[serviceSlug];
  if (!s) return {};
  const path = servicePath(s.slug);
  const title = `${s.seo.title} | ${site.name}`;
  return {
    title: { absolute: title },
    description: s.seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title,
      description: s.seo.description,
      images: [{ url: s.hero.image, width: 1600, height: 1100, alt: s.hero.alt }],
    },
    twitter: { card: "summary_large_image", title, description: s.seo.description, images: [s.hero.image] },
  };
}

export default async function ServiceRoute({ params }: PageProps<"/[serviceSlug]">) {
  const { serviceSlug } = await params;
  const service = serviceBySlug[serviceSlug];
  if (!service) notFound();
  return <ServicePage service={service} />;
}

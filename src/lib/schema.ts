import { site } from "@/config/site";
import { faq, services } from "@/content/home";

/** schema.org graph for the homepage: organisation, website, services and FAQ. */
export function homeSchema() {
  const org = `${site.url}/#organization`;
  const { contact } = site;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": org,
        name: site.name,
        url: site.url,
        logo: `${site.url}${site.logo.png}`,
        image: `${site.url}${site.seo.ogImage.src}`,
        description: site.seo.description,
        telephone: contact.phone.e164,
        email: contact.email.display,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.city,
          addressRegion: contact.address.region,
          postalCode: contact.address.postalCode,
          addressCountry: contact.address.country,
        },
        areaServed: { "@type": "Country", name: "United States" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Ghostwriting and publishing services",
          itemListElement: services.items.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.summary },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": org },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

/** Breadcrumb trail from the homepage to an inner page. */
function breadcrumb(name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
    ],
  };
}

/** About page: AboutPage about the organisation, plus breadcrumbs. */
export function aboutSchema(description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${site.url}/about-us/#webpage`,
        url: `${site.url}/about-us/`,
        name: `About ${site.name}`,
        description,
        about: { "@id": `${site.url}/#organization` },
        isPartOf: { "@id": `${site.url}/#website` },
        inLanguage: "en-US",
      },
      breadcrumb("About Us", "/about-us/"),
    ],
  };
}

/** Contact page: ContactPage with the organisation's real contact point, plus breadcrumbs. */
export function contactSchema(description: string) {
  const { contact } = site;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${site.url}/contact/#webpage`,
        url: `${site.url}/contact/`,
        name: `Contact ${site.name}`,
        description,
        isPartOf: { "@id": `${site.url}/#website` },
        inLanguage: "en-US",
        mainEntity: {
          "@type": "ProfessionalService",
          "@id": `${site.url}/#organization`,
          name: site.name,
          telephone: contact.phone.e164,
          email: contact.email.display,
          address: {
            "@type": "PostalAddress",
            streetAddress: contact.address.street,
            addressLocality: contact.address.city,
            addressRegion: contact.address.region,
            postalCode: contact.address.postalCode,
            addressCountry: contact.address.country,
          },
          contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: contact.phone.e164, email: contact.email.display, areaServed: "US", availableLanguage: "English" },
        },
      },
      breadcrumb("Contact", "/contact/"),
    ],
  };
}

/** Service page: Service offered by the organisation, its FAQs and breadcrumbs. */
export function serviceSchema(svc: { slug: string; name: string; seo: { description: string }; faqs: { q: string; a: string }[] }) {
  const url = `${site.url}/${svc.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: svc.name,
        description: svc.seo.description,
        url,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: { "@type": "Country", name: "United States" },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: svc.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: svc.name, item: url },
        ],
      },
    ],
  };
}

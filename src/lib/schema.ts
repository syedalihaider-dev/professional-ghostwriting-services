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

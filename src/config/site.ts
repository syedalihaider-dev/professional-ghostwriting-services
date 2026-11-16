/**
 * Business facts — the single source of truth for brand, contact and SEO data.
 * Values are taken from the live site (professionalghostwritingservices.com).
 * Change them here, never inline in components.
 */
export const site = {
  name: "Professional Ghostwriting Services",
  shortName: "PGS",
  url: "https://professionalghostwritingservices.com",
  tagline: "Your story. Your voice. Our craft.",

  logo: {
    ivory: { src: "/images/brand/logo-ivory.webp", width: 622, height: 382 },
    ink: { src: "/images/brand/logo-ink.webp", width: 622, height: 382 },
    png: "/images/brand/logo-ivory.png",
  },

  contact: {
    phone: { display: "+1-302-209-9757", href: "tel:+13022099757", e164: "+13022099757" },
    // NOTE: copied verbatim from the live site — the domain is spelled
    // "professinal…service.com" there. Confirm with the client before launch.
    email: { display: "info@professinalghostwritingservice.com", href: "mailto:info@professinalghostwritingservice.com" },
    address: {
      street: "539 W. Commerce St #1852",
      city: "Dallas",
      region: "TX",
      postalCode: "75208",
      country: "US",
      display: "539 W. Commerce St #1852, Dallas, TX 75208",
    },
  },

  seo: {
    title: "Professional Ghostwriting Services | Book Ghostwriters in the USA",
    description:
      "Professional ghostwriting services that turn your ideas, expertise and stories into publish-ready books. Expert book and ebook ghostwriters, editors and publishing consultants — written in your voice, with all the credit yours.",
    ogImage: { src: "/images/og-image.jpg", width: 1200, height: 630 },
  },

  /** Primary navigation — in-page anchors until the inner pages are built. */
  nav: [
    { label: "The Premise", href: "/#premise" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "The Shelf", href: "/#shelf" },
    { label: "Letters", href: "/#letters" },
  ],

  /** Legal pages exist on the roadmap but are not built yet — rendered as text. */
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/", built: false },
    { label: "Terms & Conditions", href: "/terms-and-conditions/", built: false },
  ],

  /** Social profiles: none are published on the live site yet. */
  social: [] as { label: string; href: string }[],
} as const;

export type Site = typeof site;

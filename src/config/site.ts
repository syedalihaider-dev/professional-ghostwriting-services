/**
 * Business facts — the single source of truth for brand, contact and SEO data.
 * Values are taken from the live site (professionalghostwritingservices.com).
 */
export const site = {
  name: "Professional Ghostwriting Services",
  url: "https://professionalghostwritingservices.com",
  tagline: "Your story. Your voice. Our craft.",

  logo: {
    light: { src: "/images/brand/logo-light.webp", width: 622, height: 382 },
    dark: { src: "/images/brand/logo-dark.webp", width: 622, height: 382 },
    png: "/images/brand/logo-light.png",
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
      "Professional ghostwriting services that turn your ideas, expertise and stories into publish-ready books. Book, fiction, memoir and non-fiction ghostwriters, editors and publishing specialists — written in your voice, with all the credit yours.",
    ogImage: { src: "/images/og-image.jpg", width: 1200, height: 630 },
  },

  /** Primary navigation. Homepage sections are anchors; inner pages are routes. */
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about-us/" },
    { label: "Contact", href: "/contact/" },
  ],

  /** Legal pages are on the roadmap but not built yet — rendered as text. */
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/", built: false },
    { label: "Terms & Conditions", href: "/terms-and-conditions/", built: false },
  ],

  /** Social profiles: none are published on the live site yet. */
  social: [] as { label: string; href: string }[],
} as const;

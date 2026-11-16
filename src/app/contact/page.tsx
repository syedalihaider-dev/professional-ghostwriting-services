import type { Metadata } from "next";
import { site } from "@/config/site";
import ContactHero from "@/components/Contact/Hero/ContactHero";
import ContactMain from "@/components/Contact/Main/ContactMain";
import ContactVisual from "@/components/Contact/Visual/ContactVisual";
import FirstPage from "@/components/Contact/FirstPage/FirstPage";
import Studio from "@/components/Contact/Studio/Studio";
import ContactCta from "@/components/Contact/Cta/ContactCta";
import JsonLd from "@/components/Seo/JsonLd";
import { contactSchema } from "@/lib/schema";

const title = "Contact Us — Start Your Book";
const description = `Tell us about your book. Contact Professional Ghostwriting Services for ghostwriting, editing, publishing, cover design and book marketing — call ${site.contact.phone.display} or send us a message.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact/" },
  openGraph: {
    type: "website",
    url: "/contact/",
    siteName: site.name,
    title: `${title} | ${site.name}`,
    description,
    images: [{ url: site.seo.ogImage.src, width: site.seo.ogImage.width, height: site.seo.ogImage.height, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [site.seo.ogImage.src] },
};

/**
 * Contact — how to reach us, what we can help with, how to start, what we
 * need and what happens next, told as the beginning of a conversation.
 */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactMain />
      <ContactVisual />
      <FirstPage />
      <Studio />
      <ContactCta />
      <JsonLd data={contactSchema(description)} />
    </>
  );
}

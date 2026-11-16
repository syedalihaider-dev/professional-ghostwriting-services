import type { Metadata } from "next";
import { site } from "@/config/site";
import AboutHero from "@/components/About/Hero/AboutHero";
import Story from "@/components/About/Story/Story";
import Triad from "@/components/About/Triad/Triad";
import Approach from "@/components/About/Approach/Approach";
import Expertise from "@/components/About/Expertise/Expertise";
import Reasons from "@/components/About/Reasons/Reasons";
import Reel from "@/components/About/Reel/Reel";
import Philosophy from "@/components/About/Philosophy/Philosophy";
import Disciplines from "@/components/About/Disciplines/Disciplines";
import Quotes from "@/components/About/Quotes/Quotes";
import AboutCta from "@/components/About/Cta/AboutCta";
import JsonLd from "@/components/Seo/JsonLd";
import { aboutSchema } from "@/lib/schema";

const title = "About Us — Ghostwriters, Editors & Publishing Specialists";
const description =
  "Meet the team behind Professional Ghostwriting Services: ghostwriters, editors, publishing consultants, designers and marketers who turn the ideas and stories of authors, executives and entrepreneurs into books — in your voice, with all the credit yours.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about-us/" },
  openGraph: {
    type: "website",
    url: "/about-us/",
    siteName: site.name,
    title: `${title} | ${site.name}`,
    description,
    images: [{ url: site.seo.ogImage.src, width: site.seo.ogImage.width, height: site.seo.ogImage.height, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [site.seo.ogImage.src] },
};

/**
 * About — who we are, what we believe, how we work, who we help and why
 * clients trust us. Each section has its own motion language.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <Triad />
      <Approach />
      <Expertise />
      <Reasons />
      <Reel />
      <Philosophy />
      <Disciplines />
      <Quotes />
      <AboutCta />
      <JsonLd data={aboutSchema(description)} />
    </>
  );
}

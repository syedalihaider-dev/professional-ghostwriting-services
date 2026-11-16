import type { Metadata } from "next";
import Hero from "@/components/Home/Hero/Hero";
import Intro from "@/components/Home/Intro/Intro";
import Services from "@/components/Home/Services/Services";
import Process from "@/components/Home/Process/Process";
import Work from "@/components/Home/Work/Work";
import Trust from "@/components/Home/Trust/Trust";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import Faq from "@/components/Home/Faq/Faq";
import Cta from "@/components/Home/Cta/Cta";
import JsonLd from "@/components/Seo/JsonLd";
import { homeSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Homepage — "Idea → Book". Each section is a Server Component with its own
 * client *Motion sibling, so every section has a distinct motion language.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Process />
      <Work />
      <Trust />
      <Testimonials />
      <Faq />
      <Cta />
      <JsonLd data={homeSchema()} />
    </>
  );
}

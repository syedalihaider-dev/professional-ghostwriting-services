import type { Metadata } from "next";
import Hero from "@/components/Home/Hero/Hero";
import Premise from "@/components/Home/Premise/Premise";
import Services from "@/components/Home/Services/Services";
import Process from "@/components/Home/Process/Process";
import FilmStory from "@/components/Home/FilmStory/FilmStory";
import Shelf from "@/components/Home/Shelf/Shelf";
import Principles from "@/components/Home/Principles/Principles";
import Letters from "@/components/Home/Letters/Letters";
import Faq from "@/components/Home/Faq/Faq";
import Finale from "@/components/Home/Finale/Finale";
import JsonLd from "@/components/Seo/JsonLd";
import { homeSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * The homepage reads like a book: a title sequence (hero), then chapters
 * I–VIII, each with its own surface, composition and motion language,
 * closing on the finale and the colophon (footer).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Premise />
      <Services />
      <Process />
      <FilmStory />
      <Shelf />
      <Principles />
      <Letters />
      <Faq />
      <Finale />
      <JsonLd data={homeSchema()} />
    </>
  );
}

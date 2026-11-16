import type { ServiceData } from "@/data/services";
import SvcHero from "./Hero/SvcHero";
import SvcIntro from "./Intro/SvcIntro";
import SvcOffer from "./Offer/SvcOffer";
import SvcMatters from "./Matters/SvcMatters";
import SvcProcess from "./Process/SvcProcess";
import SvcBenefits from "./Benefits/SvcBenefits";
import SvcVisual from "./Visual/SvcVisual";
import SvcFaq from "./Faq/SvcFaq";
import SvcRelated from "./Related/SvcRelated";
import SvcCta from "./Cta/SvcCta";
import JsonLd from "@/components/Seo/JsonLd";
import { serviceSchema } from "@/lib/schema";

/**
 * The master service page. Every service route renders this one template;
 * only the data changes. Section order:
 * hero → introduction → what we offer → why it matters → process →
 * benefits → visual story → FAQs → related services → CTA (→ shared footer).
 */
export default function ServicePage({ service }: { service: ServiceData }) {
  return (
    <>
      <SvcHero service={service} />
      <SvcIntro service={service} />
      <SvcOffer offer={service.offer} />
      <SvcMatters matters={service.matters} />
      <SvcProcess process={service.process} />
      <SvcBenefits benefits={service.benefits} />
      <SvcVisual visual={service.visual} />
      <SvcFaq faqs={service.faqs} name={service.name} />
      <SvcRelated slugs={service.related} />
      <SvcCta cta={service.cta} lead={service.lead} />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}

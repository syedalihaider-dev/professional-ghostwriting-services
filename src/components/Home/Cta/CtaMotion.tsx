"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * CTA motion language — "the flood":
 * the volt field rises over the white page from a curved edge that
 * flattens as it fills the screen; the two lines slide in opposite
 * directions with the scroll; the seal drops in with a spring.
 */
export default function CtaMotion() {
  const marker = useSectionMotion((section) => {
    const lines = Array.from(section.querySelectorAll<HTMLElement>("[data-anim='cline']"));
    const seal = section.querySelector("button");
    const flood = section.querySelector("[data-anim='flood']");
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      gsap.fromTo(
        flood,
        { clipPath: "inset(18% 0% 0% 0% round 50% 50% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0% round 0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: true } },
      );
      lines.forEach((line) => {
        const d = Number(line.dataset.dir) || 1;
        gsap.fromTo(line, { xPercent: 18 * d }, { xPercent: -4 * d, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });
      if (seal) gsap.from(seal, { scale: 0, rotation: -120, duration: 1.4, ease: "elastic.out(1, 0.55)", scrollTrigger: { trigger: section, start: "top 40%", once: true } });
    });
  });
  return <span ref={marker} hidden />;
}

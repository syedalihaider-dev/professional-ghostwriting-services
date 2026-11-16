"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Service CTA motion language — "closing in":
 * the two lines start far apart at either edge and close toward each other
 * with the scroll; the seal springs in once they meet.
 */
export default function SvcCtaMotion() {
  const marker = useSectionMotion((section) => {
    const lines = Array.from(section.querySelectorAll<HTMLElement>("[data-anim='cline']"));
    const seal = section.querySelector("button");
    gsap.matchMedia().add(MQ.motion, () => {
      lines.forEach((l) => {
        const d = Number(l.dataset.dir);
        gsap.fromTo(l, { xPercent: 45 * d * -1 }, { xPercent: 0, ease: "power2.out", scrollTrigger: { trigger: section, start: "top bottom", end: "top 25%", scrub: 0.6 } });
      });
      if (seal) gsap.from(seal, { scale: 0, rotation: -120, duration: 1.3, ease: "elastic.out(1, 0.55)", scrollTrigger: { trigger: section, start: "top 40%", once: true } });
    });
  });
  return <span ref={marker} hidden />;
}

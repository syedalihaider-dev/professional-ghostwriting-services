"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Visual motion language — "the pull-back":
 * the media starts close and pulls back as the section passes (zoom-out),
 * while the two lines cross it in opposite directions.
 */
export default function SvcVisualMotion() {
  const marker = useSectionMotion((section) => {
    const media = section.querySelector("[data-anim='media']");
    const lines = Array.from(section.querySelectorAll<HTMLElement>("[data-anim='vline']"));
    gsap.matchMedia().add(MQ.motion, () => {
      const st = { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo(media, { scale: 1.4 }, { scale: 1, ease: "none", scrollTrigger: st });
      lines.forEach((l) => {
        const d = Number(l.dataset.dir);
        gsap.fromTo(l, { xPercent: -25 * d }, { xPercent: 12 * d, ease: "none", scrollTrigger: st });
      });
    });
  });
  return <span ref={marker} hidden />;
}

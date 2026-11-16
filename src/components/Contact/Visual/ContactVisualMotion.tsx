"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines } from "@/animations/text";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Visual motion language — "the slit":
 * the manuscript opens through a horizontal slit that widens to full height
 * while the image settles from a push-in; the desk portrait rises faster than
 * the page (depth); the line is revealed by lines.
 */
export default function ContactVisualMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => section.querySelector<HTMLElement>(`[data-anim='${s}']`)!;
    gsap.matchMedia().add(MQ.motion, () => {
      gsap
        .timeline({ scrollTrigger: { trigger: section, start: "top 85%", end: "top 10%", scrub: true } })
        .fromTo(q("wide"), { clipPath: "inset(48% 0% 48% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut" }, 0)
        .fromTo(q("wide-inner"), { scale: 1.35 }, { scale: 1, ease: "none" }, 0);
      gsap.fromTo(q("wide-inner"), { yPercent: -6 }, { yPercent: 6, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true } });
      gsap.fromTo(q("portrait"), { yPercent: 40 }, { yPercent: -30, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
      revealLines(q("line"), { trigger: q("line"), start: "top 75%" });
    });
  });
  return <span ref={marker} hidden />;
}

"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines } from "@/animations/text";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Chapter VII motion language — "the letter arrives":
 * the oxblood sheet cuts in on a diagonal over the paper chapter above,
 * the giant quotation mark swings into place, the heading rises.
 */
export default function LettersMotion() {
  const marker = useSectionMotion((section) => {
    const mark = section.querySelector<HTMLElement>("[data-anim='mark']");
    const title = section.querySelector<HTMLElement>("h2");
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      gsap.fromTo(
        section,
        { clipPath: "polygon(0% 14%, 100% 0%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "top 20%", scrub: true } },
      );
      gsap.fromTo(
        mark,
        { rotation: -24, scale: 0.6, yPercent: 20, opacity: 0 },
        { rotation: 0, scale: 1, yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: section, start: "top 85%", end: "top 15%", scrub: 0.8 } },
      );
      if (title) revealLines(title, { trigger: title });
    });
  });

  return <span ref={marker} hidden />;
}

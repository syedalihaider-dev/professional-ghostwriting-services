"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Philosophy motion language — "inking":
 * each word begins as a faint ghost and inks solid as the reader scrolls
 * past it, so the sentence is literally written in. The supporting line
 * follows once the sentence is complete.
 */
export default function PhilosophyMotion() {
  const marker = useSectionMotion((section) => {
    const words = Array.from(section.querySelectorAll<HTMLElement>("[data-anim='pw']"));
    const body = section.querySelector("[data-anim='body']");
    gsap.matchMedia().add(MQ.motion, () => {
      words.forEach((w) => {
        const fill = getComputedStyle(w).color;
        gsap.fromTo(
          w,
          { color: "rgba(10,10,12,0.1)", yPercent: 12 },
          { color: fill, yPercent: 0, ease: "none", scrollTrigger: { trigger: w, start: "top 88%", end: "top 55%", scrub: 0.4 } },
        );
      });
      gsap.from(body, { opacity: 0, y: 24, duration: 1, ease: "power3.out", scrollTrigger: { trigger: body, start: "top 88%", once: true } });
    });
  });
  return <span ref={marker} hidden />;
}

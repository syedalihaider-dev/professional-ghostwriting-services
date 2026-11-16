"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Contact main motion language — "the conversation opens":
 * the white sheet rises over the hero with a squared lip; contact details
 * slide in from the margin; each form sentence arrives in turn, its prompt
 * first and its line drawn after.
 */
export default function ContactMainMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    gsap.matchMedia().add(MQ.motion, () => {
      gsap.fromTo(section, { clipPath: "inset(6% 3% 0% 3%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "top 20%", scrub: true } });
      gsap.from(q("detail"), { x: -40, opacity: 0, duration: 1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: section, start: "top 70%", once: true } });
      gsap.from(q("next"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: q("next")[0], start: "top 88%", once: true } });
      q("field").forEach((f) => gsap.from(f, { y: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: f, start: "top 90%", once: true } }));
    });
  });
  return <span ref={marker} hidden />;
}

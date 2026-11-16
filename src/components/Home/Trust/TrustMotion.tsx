"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines } from "@/animations/text";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Trust motion language — "the count":
 * the page floods from black to cobalt as the section arrives; each figure's
 * digit columns roll in from zero like an odometer, right-most first; the
 * reasons are drawn in as rules sweep across.
 */
export default function TrustMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      gsap.fromTo(section, { backgroundColor: "#0a0a0c" }, { backgroundColor: "#2b3cff", ease: "none", scrollTrigger: { trigger: section, start: "top 90%", end: "top 25%", scrub: true } });

      const [title] = q("title");
      revealLines(title, { trigger: title });

      q("figure").forEach((fig, i) => {
        const strips = Array.from(fig.querySelectorAll<HTMLElement>("[data-anim='strip']")).reverse();
        gsap.from(strips, { y: 0, duration: 2.2, stagger: 0.12, delay: i * 0.12, ease: "power4.out", scrollTrigger: { trigger: fig, start: "top 85%", once: true } });
      });

      gsap.from(q("reason"), { clipPath: "inset(0% 100% 0% 0%)", duration: 1.1, stagger: 0.07, ease: "expo.inOut", scrollTrigger: { trigger: q("reason")[0], start: "top 88%", once: true } });
    });
  });

  return <span ref={marker} hidden />;
}

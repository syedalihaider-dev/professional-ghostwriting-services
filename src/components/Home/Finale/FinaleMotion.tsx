"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

/**
 * Finale motion language — "the aperture opens":
 * a circle of footage widens with the scroll until it fills the room; the
 * three-line question rises against it, then the answer and seal arrive.
 */
export default function FinaleMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const [film] = q("film");
    const [inner] = q("film-inner");
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      gsap.fromTo(film, { clipPath: "circle(12% at 50% 60%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "none", scrollTrigger: { trigger: section, start: "top 85%", end: "top top", scrub: true } });
      gsap.fromTo(inner, { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });

      const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 45%", once: true } });
      tl.from(q("line"), { yPercent: 115, rotationX: -30, transformOrigin: "50% 0%", duration: 1.4, stagger: 0.12, ease: EASE.out })
        .from(q("answer"), { opacity: 0, x: -30, duration: 1.2, ease: EASE.out }, 0.6)
        .from(section.querySelector("button"), { scale: 0, rotation: -90, duration: 1.3, ease: "elastic.out(1, 0.6)" }, 0.75)
        .from(q("meta"), { opacity: 0, y: 20, duration: 1 }, 1);
    });
  });
  return <span ref={marker} hidden />;
}

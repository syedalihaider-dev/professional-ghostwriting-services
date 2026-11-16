"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines } from "@/animations/text";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Intro motion language — "the spread":
 * statement lines rise from their masks; paragraphs follow; the main image
 * is unmasked from the top and drifts slowly while the detail image, set
 * over its corner, travels faster — two depths on one page.
 */
export default function SvcIntroMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    gsap.matchMedia().add(MQ.motion, () => {
      const [statement] = q("statement");
      const [main] = q("main");
      const [inner] = q("main-inner");
      const [detail] = q("detail");
      revealLines(statement, { trigger: statement, stagger: 0.1 });
      gsap.from(q("para"), { opacity: 0, y: 26, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: q("para")[0], start: "top 88%", once: true } });
      gsap
        .timeline({ scrollTrigger: { trigger: main, start: "top 82%", once: true } })
        .fromTo(main, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" })
        .from(inner, { scale: 1.3, duration: 1.8, ease: "expo.out" }, 0.2)
        .fromTo(detail, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut" }, 0.6);
      gsap.fromTo(inner, { yPercent: -6 }, { yPercent: 6, ease: "none", immediateRender: false, scrollTrigger: { trigger: main, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(detail, { yPercent: 30 }, { yPercent: -25, ease: "none", scrollTrigger: { trigger: main, start: "top bottom", end: "bottom top", scrub: true } });
    });
  });
  return <span ref={marker} hidden />;
}

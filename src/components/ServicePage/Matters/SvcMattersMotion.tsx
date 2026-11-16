"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines } from "@/animations/text";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Matters motion language — "the diagonal":
 * the image opens along a diagonal cut and drifts; the heading rises by
 * lines; each point's numeral drops in from above its baseline, then its
 * text follows.
 */
export default function SvcMattersMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    gsap.matchMedia().add(MQ.motion, () => {
      const [title] = q("title");
      const [figure] = q("figure");
      const [inner] = q("fig-inner");
      revealLines(title, { trigger: title });
      gsap.from(q("body"), { opacity: 0, y: 24, duration: 1, ease: "power3.out", scrollTrigger: { trigger: title, start: "top 70%", once: true } });
      gsap.fromTo(
        figure,
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: figure, start: "top 80%", once: true } },
      );
      gsap.fromTo(inner, { scale: 1.25, yPercent: -4 }, { scale: 1, yPercent: 4, ease: "none", scrollTrigger: { trigger: figure, start: "top bottom", end: "bottom top", scrub: true } });
      q("point").forEach((p, i) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: p, start: "top 88%", once: true }, delay: i * 0.12 });
        tl.from(p.querySelector("[data-anim='num']"), { yPercent: -60, opacity: 0, duration: 0.9, ease: "back.out(1.8)" }).from(Array.from(p.children).slice(1), { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.2);
      });
    });
  });
  return <span ref={marker} hidden />;
}

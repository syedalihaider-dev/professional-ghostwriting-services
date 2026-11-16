"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Reasons motion language — "the highlighter":
 * each title gets a volt stroke swept across it, scrubbed by the scroll as
 * it nears the reading line; the sticky photograph wipes to the matching
 * image (desktop). Without motion the marks are simply drawn.
 */
export default function ReasonsMotion() {
  const marker = useSectionMotion((section) => {
    const items = Array.from(section.querySelectorAll<HTMLElement>("[data-anim='item']"));
    const shots = Array.from(section.querySelectorAll<HTMLElement>("[data-anim='shot']"));
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      items.forEach((item, i) => {
        const mark = item.querySelector("[data-anim='mark']");
        gsap.fromTo(mark, { scaleX: 0 }, { scaleX: 1, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 75%", end: "top 45%", scrub: 0.5 } });
        if (i > 0 && shots[i]) {
          gsap.fromTo(shots[i], { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: item, start: "top 70%", end: "top 40%", scrub: true } });
        }
      });
    });
  });
  return <span ref={marker} hidden />;
}

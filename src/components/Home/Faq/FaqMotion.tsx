"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines } from "@/animations/text";
import { gsap, MQ } from "@/lib/gsap";

/** Chapter VIII motion language — "ruled paper": each rule draws, then its question settles. */
export default function FaqMotion() {
  const marker = useSectionMotion((section) => {
    const items = section.querySelectorAll<HTMLElement>("[data-anim='item']");
    const title = section.querySelector<HTMLElement>("[data-anim='title']");
    gsap.matchMedia().add(MQ.motion, () => {
      if (title) revealLines(title, { trigger: title });
      items.forEach((item, i) => {
        gsap
          .timeline({ scrollTrigger: { trigger: item, start: "top 90%", once: true }, delay: i * 0.05 })
          .from(item, { "--draw": 0, duration: 1.2, ease: "power3.inOut" })
          .from(item.querySelector("summary"), { x: -24, opacity: 0, duration: 1, ease: "expo.out" }, 0.25);
      });
    });
  });
  return <span ref={marker} hidden />;
}

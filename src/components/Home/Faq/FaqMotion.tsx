"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/** FAQ motion language — "indexing": rows slide in from the right edge, one after another. */
export default function FaqMotion() {
  const marker = useSectionMotion((section) => {
    const items = section.querySelectorAll<HTMLElement>("[data-anim='item']");
    gsap.matchMedia().add(MQ.motion, () => {
      gsap.from(items, { xPercent: 12, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: items[0], start: "top 88%", once: true } });
    });
  });
  return <span ref={marker} hidden />;
}

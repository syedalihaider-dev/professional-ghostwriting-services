"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/** Benefits motion language — "turning pages": each statement swings up from a top hinge, like a page settling flat. */
export default function SvcBenefitsMotion() {
  const marker = useSectionMotion((section) => {
    const items = section.querySelectorAll<HTMLElement>("[data-anim='benefit']");
    gsap.matchMedia().add(MQ.motion, () => {
      gsap.from(items, {
        rotationX: -75,
        opacity: 0,
        y: 30,
        duration: 1.3,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: items[0], start: "top 85%", once: true },
      });
    });
  });
  return <span ref={marker} hidden />;
}

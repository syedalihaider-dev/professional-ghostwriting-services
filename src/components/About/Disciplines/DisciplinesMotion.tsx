"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/** Disciplines motion language — "curtains": strips rise into place from the floor, one after another. */
export default function DisciplinesMotion() {
  const marker = useSectionMotion((section) => {
    const strips = section.querySelectorAll<HTMLElement>("[data-anim='strip']");
    gsap.matchMedia().add(MQ.motion, () => {
      gsap.fromTo(
        strips,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, stagger: 0.1, ease: "expo.inOut", scrollTrigger: { trigger: strips[0], start: "top 80%", once: true } },
      );
    });
  });
  return <span ref={marker} hidden />;
}

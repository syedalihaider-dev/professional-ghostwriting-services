"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/** Studio motion language — "the drifting city": the ghosted name slides sideways with the scroll and brightens as it passes centre. */
export default function StudioMotion() {
  const marker = useSectionMotion((section) => {
    const city = section.querySelector<HTMLElement>("[data-anim='city']");
    gsap.matchMedia().add(MQ.motion, () => {
      gsap
        .timeline({ scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.6 } })
        .fromTo(city, { xPercent: 0 }, { xPercent: -38, ease: "none", duration: 1 }, 0)
        .fromTo(city, { color: "rgba(243,244,246,0.04)" }, { color: "rgba(243,244,246,0.14)", duration: 0.5, ease: "none" }, 0.25);
    });
  });
  return <span ref={marker} hidden />;
}

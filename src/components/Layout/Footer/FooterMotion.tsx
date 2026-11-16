"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/** The closing word rises out of the page bottom as the reader arrives. */
export default function FooterMotion() {
  const marker = useSectionMotion((footer) => {
    const word = footer.querySelector("[data-anim='word']");
    const cols = footer.querySelectorAll("[data-anim='cols'] > *");
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(word, {
        yPercent: 70,
        scaleY: 1.25,
        transformOrigin: "50% 100%",
        ease: "none",
        scrollTrigger: { trigger: footer, start: "top 85%", end: "bottom bottom", scrub: 0.8 },
      });
      gsap.from(cols, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1.1,
        scrollTrigger: { trigger: footer, start: "top 80%", once: true },
      });
    });
  });
  return <span ref={marker} hidden />;
}

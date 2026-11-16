"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/** As the page lifts away, the footer rises from slightly deeper — parallax depth under the curtain. */
export default function FooterMotion() {
  const marker = useSectionMotion((footer) => {
    const inner = footer.querySelector("[data-anim='inner']");
    gsap.matchMedia().add(MQ.motion, () => {
      gsap.fromTo(inner, { yPercent: -18, opacity: 0.4 }, { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: footer, start: "top bottom", end: "bottom bottom", scrub: true } });
    });
  });
  return <span ref={marker} hidden />;
}

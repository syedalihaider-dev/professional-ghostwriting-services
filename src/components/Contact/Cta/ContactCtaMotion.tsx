"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Contact CTA motion language — "shutters":
 * cobalt blinds close over the black stage from alternating edges, staggered
 * by the scroll; then the lines rise and the seal springs in.
 */
export default function ContactCtaMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      const blinds = q("blind");
      blinds.forEach((b, i) => gsap.set(b, { scaleY: 0, transformOrigin: i % 2 ? "50% 100%" : "50% 0%" }));
      gsap.set(q("line"), { yPercent: 110 });
      gsap.set(q("seal"), { scale: 0, rotation: -90 });

      gsap
        .timeline({
          scrollTrigger: desktop
            ? { trigger: section, start: "top top", end: "+=110%", pin: q("pin")[0], scrub: 0.8, anticipatePin: 1 }
            : { trigger: section, start: "top 80%", end: "bottom bottom", scrub: 0.8 },
        })
        .to(blinds, { scaleY: 1, duration: 0.6, stagger: 0.07, ease: "power2.inOut" })
        .to(q("line"), { yPercent: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, ">-0.1")
        .to(q("seal"), { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.6)" }, ">-0.2")
        .to({}, { duration: 0.3 });
    });
  });
  return <span ref={marker} hidden />;
}

"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Triad motion language — "three entrances":
 * pinned. "Your story." slides in from the left edge; "Your voice." sweeps
 * in from the right with a skew that straightens; "Our craft." scales up from
 * a clipped sliver in volt while the room floods to cobalt.
 * Phones get the same three entrances on a shorter, unpinned scroll.
 */
export default function TriadMotion() {
  const marker = useSectionMotion((section) => {
    const get = (s: string) => section.querySelector<HTMLElement>(`[data-anim='${s}']`)!;
    const items = [get("p0"), get("p1"), get("p2")];
    const phrase = (el: HTMLElement) => el.querySelector<HTMLElement>("[data-anim='phrase']")!;
    const note = (el: HTMLElement) => el.querySelector<HTMLElement>("[data-anim='note']")!;
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      const [a, b, c] = items;

      gsap.set(phrase(a), { xPercent: -110 });
      gsap.set(phrase(b), { xPercent: 110, skewX: -18 });
      gsap.set(phrase(c), { scale: 0.25, clipPath: "inset(45% 0% 45% 0%)", transformOrigin: "0% 100%" });
      gsap.set(items.map(note), { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: desktop
          ? { trigger: section, start: "top top", end: "+=220%", pin: get("pin"), scrub: 0.8, anticipatePin: 1 }
          : { trigger: section, start: "top 70%", end: "bottom 60%", scrub: 0.8 },
      });
      tl.to(phrase(a), { xPercent: 0, duration: 1 })
        .to(note(a), { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
        .to(phrase(b), { xPercent: 0, skewX: 0, duration: 1 }, "+=0.15")
        .to(note(b), { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
        .to(phrase(c), { scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.out" }, "+=0.15")
        .to(section, { backgroundColor: "#2b3cff", duration: 0.8, ease: "none" }, "<")
        .to(note(c), { opacity: 1, y: 0, duration: 0.4 }, "-=0.4")
        .to({}, { duration: 0.4 });
    });
  });
  return <span ref={marker} hidden />;
}

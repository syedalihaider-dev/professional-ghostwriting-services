"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines } from "@/animations/text";
import { gsap, MQ, ScrollTrigger } from "@/lib/gsap";

/**
 * Intro motion language — "type in transit":
 * the ticker runs continuously and leans into the scroll direction/speed;
 * statement lines drift horizontally against each other; the capsule opens
 * in the sentence; a cobalt sheet slides off the image, which then drifts.
 */
export default function IntroMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      // Ticker: an endless loop whose speed and direction follow the scroll.
      const [track] = q("track");
      const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
      let dir = 1;
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          dir = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
          gsap.to(loop, { timeScale: dir * boost, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.2, ease: "power2.out" });
        },
      });

      // Statement rows drift against each other.
      q("sline").forEach((line) => {
        const d = Number(line.dataset.dir) || 1;
        gsap.fromTo(line, { xPercent: 10 * d }, { xPercent: -6 * d, ease: "none", scrollTrigger: { trigger: line, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });

      gsap.from(q("capsule"), { width: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: q("capsule")[0], start: "top 80%", once: true } });

      // Image: cobalt sheet slides off, then the image drifts.
      const [frame] = q("frame");
      const [cover] = q("cover");
      const [media] = q("media");
      gsap
        .timeline({ scrollTrigger: { trigger: frame, start: "top 80%", once: true } })
        .fromTo(cover, { scaleX: 1 }, { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
        .from(media, { scale: 1.3, duration: 1.8, ease: "expo.out" }, 0.3);
      gsap.fromTo(media, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } });

      const [heading] = q("heading");
      revealLines(heading, { trigger: heading });
      gsap.from(q("body"), { opacity: 0, y: 24, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: q("body")[0], start: "top 88%", once: true } });
      gsap.from(q("aud"), { clipPath: "inset(0 100% 0 0)", duration: 1, stagger: 0.08, ease: "expo.inOut", scrollTrigger: { trigger: q("aud")[0], start: "top 90%", once: true } });
    });
  });

  return <span ref={marker} hidden />;
}

"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Work motion language — "the moving shelf":
 * desktop pins the section and converts scroll into sideways travel. Each
 * cover swells and squares up as it crosses the centre, then turns away;
 * its outlined title slides behind it faster than the row (parallax type).
 */
export default function WorkMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add(MQ.desktop, () => {
      section.dataset.mode = "scroll";
      const [pin] = q("pin");
      const [track] = q("track");
      const distance = () => track.scrollWidth - window.innerWidth;

      const travel = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, pin, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true },
      });

      q("item").forEach((item) => {
        const cover = item.querySelector<HTMLElement>("[data-anim='cover']");
        const ghost = item.querySelector<HTMLElement>("[data-anim='ghost']");
        gsap
          .timeline({ scrollTrigger: { trigger: item, containerAnimation: travel, start: "left right", end: "right left", scrub: true } })
          .fromTo(cover, { scale: 0.78, rotationY: -28, transformPerspective: 1200 }, { scale: 1, rotationY: 0, ease: "power2.out", duration: 0.5 })
          .to(cover, { scale: 0.78, rotationY: 24, ease: "power2.in", duration: 0.5 });
        gsap.fromTo(ghost, { xPercent: 30 }, { xPercent: -30, ease: "none", scrollTrigger: { trigger: item, containerAnimation: travel, start: "left right", end: "right left", scrub: true } });
      });

      return () => {
        delete section.dataset.mode;
      };
    });

    mm.add(MQ.mobile, () => {
      gsap.from(q("cover"), { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: section, start: "top 75%", once: true } });
    });
  });

  return <span ref={marker} hidden />;
}

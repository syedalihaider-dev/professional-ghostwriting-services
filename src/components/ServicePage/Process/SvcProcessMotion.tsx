"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Process motion language — "the line":
 * desktop pins the section; scroll drives the track sideways while a volt
 * progress line fills; each step's numeral rises and its copy follows as it
 * enters. Phones: the rule draws down the margin with the scroll and steps
 * slide in from the left.
 */
export default function SvcProcessMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add(MQ.desktop, () => {
      section.dataset.mode = "scroll";
      const [pin] = q("pin");
      const [track] = q("track");
      const [progress] = q("progress");
      const distance = () => track.scrollWidth - window.innerWidth;

      const travel = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
        },
      });

      q("step").forEach((step) => {
        gsap
          .timeline({ scrollTrigger: { trigger: step, containerAnimation: travel, start: "left 85%", end: "left 45%", scrub: true } })
          .fromTo(step.querySelector("[data-anim='num']"), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "power3.out" }, 0)
          .fromTo(Array.from(step.children).slice(1), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, ease: "power3.out" }, 0.15);
      });

      return () => {
        delete section.dataset.mode;
      };
    });

    mm.add(MQ.mobile, () => {
      const [rail] = q("rail");
      gsap.fromTo(rail, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: rail, start: "top 75%", end: "bottom 60%", scrub: true } });
      q("step").forEach((s) => gsap.from(s, { x: -30, opacity: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 85%", once: true } }));
    });
  });
  return <span ref={marker} hidden />;
}

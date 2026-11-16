"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines } from "@/animations/text";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Story motion language — "the long line":
 * desktop pins the screen and the sentence travels right-to-left with the
 * scroll, words rising slightly as they pass the centre. Then the heading
 * is revealed by lines and the audience rows wipe in like ruled entries.
 */
export default function StoryMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add(MQ.desktop, () => {
      section.dataset.mode = "scroll";
      const [pin] = q("pin");
      const [sentence] = q("sentence");
      const distance = () => sentence.scrollWidth - window.innerWidth * 0.6;
      const travel = gsap.fromTo(
        sentence,
        { x: () => window.innerWidth * 0.9 },
        {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: () => `+=${sentence.scrollWidth * 0.55}`, pin, scrub: 0.7, invalidateOnRefresh: true },
        },
      );
      q("sw").forEach((w) =>
        gsap
          .timeline({ scrollTrigger: { trigger: w, containerAnimation: travel, start: "left 90%", end: "right 10%", scrub: true } })
          .fromTo(w, { yPercent: 18, opacity: 0.25 }, { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.4 })
          .to(w, { opacity: 0.35, duration: 0.6 }),
      );
      return () => {
        delete section.dataset.mode;
      };
    });

    mm.add(MQ.motion, () => {
      const [heading] = q("heading");
      revealLines(heading, { trigger: heading });
      gsap.from(q("para"), { opacity: 0, y: 30, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: q("para")[0], start: "top 85%", once: true } });
      gsap.from(q("aud"), { clipPath: "inset(0% 100% 0% 0%)", duration: 1.2, stagger: 0.1, ease: "expo.inOut", scrollTrigger: { trigger: q("aud")[0], start: "top 88%", once: true } });
    });
  });
  return <span ref={marker} hidden />;
}

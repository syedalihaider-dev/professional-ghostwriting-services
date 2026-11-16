"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { inkWords, revealLines, revealMedia } from "@/animations/text";
import { gsap, MQ } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

/**
 * Chapter I motion language — "ink on paper":
 * the page widens as it slides over the hero, the statement's words are
 * inked in with the scroll, the film chip swells into the sentence, and the
 * figure opens upward then drifts at its own depth.
 */
export default function PremiseMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`);
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      // Page arrival: a narrower sheet with lifted corners settles to full width.
      gsap.fromTo(
        section,
        { clipPath: "inset(0% 4% 0% 4% round 28px 28px 0 0)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0 0)", ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "top 15%", scrub: true } },
      );

      inkWords(q("statement")[0]);

      gsap.from(q("chip"), {
        width: 0,
        marginInline: 0,
        duration: 1.4,
        ease: EASE.out,
        scrollTrigger: { trigger: q("statement")[0], start: "top 65%", once: true },
      });

      const frame = q("frame")[0];
      const media = q("media")[0];
      revealMedia(frame, null);
      gsap.fromTo(media, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } });

      revealLines(q("heading")[0], { trigger: q("heading")[0] });

      gsap.from(q("body"), {
        y: 30,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        scrollTrigger: { trigger: q("body")[0], start: "top 85%", once: true },
      });

      gsap.from(q("audience"), {
        xPercent: -8,
        opacity: 0,
        duration: 1.1,
        stagger: 0.09,
        ease: EASE.out,
        scrollTrigger: { trigger: q("audience")[0], start: "top 88%", once: true },
      });
    });
  });

  return <span ref={marker} hidden />;
}

"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines } from "@/animations/text";
import { gsap, MQ, SplitText } from "@/lib/gsap";

/**
 * Quotes motion language — "the reading rail":
 * desktop pins the section and the track slides sideways; as each quote
 * nears centre its lines rise out of their masks and its quotation mark
 * swings into place. Phones reveal each quote's lines on arrival.
 */
export default function QuotesMotion() {
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

      const splits = q("quote").map((quote) => {
        const split = SplitText.create(quote.querySelector("[data-anim='qtext']")!, { type: "lines", mask: "lines" });
        gsap
          .timeline({ scrollTrigger: { trigger: quote, containerAnimation: travel, start: "left 85%", end: "left 35%", scrub: true } })
          .from(split.lines, { yPercent: 110, stagger: 0.1, ease: "power3.out" }, 0)
          .from(quote.querySelector("span[aria-hidden]"), { rotation: -40, scale: 0.4, opacity: 0, ease: "back.out(2)" }, 0);
        return split;
      });

      return () => {
        splits.forEach((s) => s.revert());
        delete section.dataset.mode;
      };
    });

    mm.add(MQ.mobile, () => {
      q("qtext").forEach((t) => revealLines(t, { trigger: t }));
    });
  });
  return <span ref={marker} hidden />;
}

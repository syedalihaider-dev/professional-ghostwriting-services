"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ, SplitText } from "@/lib/gsap";
import { onReveal } from "@/lib/loader";

/**
 * Contact hero motion language — "the typed question":
 * the question appears one character at a time behind the caret; then
 * "Let's talk." punches in from oversize through a closing clip. On scroll
 * the whole frame recedes (scale + lift) as the form slides over it.
 */
export default function ContactHeroMotion() {
  const marker = useSectionMotion((hero) => {
    const q = (s: string) => Array.from(hero.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      const lines = q("q");
      const [answer] = q("answer");
      const fades = q("fade");
      const split = SplitText.create(lines, { type: "words,chars" });

      gsap.set(split.chars, { autoAlpha: 0 });
      gsap.set(answer, { scale: 1.6, clipPath: "inset(0% 50% 0% 50%)", transformOrigin: "100% 100%" });
      gsap.set(fades, { opacity: 0, y: 14 });

      const intro = gsap.timeline({ paused: true });
      intro
        .to(split.chars, { autoAlpha: 1, duration: 0.01, stagger: 0.055 }, 0.2)
        .to(answer, { scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.out" }, ">0.25")
        .to(fades, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "<0.3");
      const off = onReveal(() => intro.play());

      gsap.to(q("frame")[0], { scale: 0.9, yPercent: -8, opacity: 0.4, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });

      return () => {
        off();
        split.revert();
      };
    });
  });
  return <span ref={marker} hidden />;
}

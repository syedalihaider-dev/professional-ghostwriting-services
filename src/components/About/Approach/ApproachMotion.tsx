"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Approach motion language — "the teleprompter":
 * pinned; the column of verbs rolls upward one row per step, the word on the
 * reading line fills solid white while the rest stay ghosted; the
 * photograph wipes up from below, the copy swaps, the volt line fills.
 */
export default function ApproachMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      section.dataset.mode = "scroll";
      const [pin] = q("pin");
      const [column] = q("column");
      const [fill] = q("fill");
      const words = q("word");
      const shots = q("shot");
      const inners = q("shot-inner");
      const steps = q("step");
      const last = words.length - 1;
      const row = () => words[0].offsetHeight;

      const lit = { color: "rgba(243,244,246,1)", scale: 1 };
      const dim = { color: "rgba(243,244,246,0.16)", scale: 0.86 };
      gsap.set(words, dim);
      gsap.set(words[0], lit);
      gsap.set(shots.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(inners.slice(1), { scale: 1.3 });
      gsap.set(steps.slice(1), { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 0.5 },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${words.length * 75}%`,
          pin,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: "labelsDirectional", duration: { min: 0.25, max: 0.8 }, ease: "power2.inOut" },
        },
      });

      tl.addLabel("s0", 0).to(fill, { scaleY: 1, ease: "none", duration: last + 0.5 }, 0);
      // fromTo throughout: with invalidateOnRefresh (needed to re-measure the
      // row height on resize), plain .to() would re-record start values from
      // wherever the scroll happened to be during a refresh.
      const rest = { immediateRender: false } as const;
      for (let i = 1; i <= last; i++) {
        const at = i - 0.5;
        tl.fromTo(column, { y: () => -row() * (i - 1) }, { y: () => -row() * i, ...rest }, at)
          .fromTo(words[i - 1], lit, { ...dim, duration: 0.4, ...rest }, at)
          .fromTo(words[i], dim, { ...lit, duration: 0.4, ...rest }, at + 0.1)
          .fromTo(shots[i], { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ...rest }, at)
          .fromTo(inners[i], { scale: 1.3 }, { scale: 1, duration: 0.7, ease: "power2.out", ...rest }, at)
          .fromTo(steps[i - 1], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -16, duration: 0.25, ...rest }, at)
          .fromTo(steps[i], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3, ...rest }, at + 0.25)
          .addLabel(`s${i}`, i);
      }
      tl.to({}, { duration: 0.5 }, last);

      return () => {
        delete section.dataset.mode;
      };
    });
  });
  return <span ref={marker} hidden />;
}

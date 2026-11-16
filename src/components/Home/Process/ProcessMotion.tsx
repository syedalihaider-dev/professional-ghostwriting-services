"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ, SplitText } from "@/lib/gsap";

/**
 * Process motion language — "the timeline":
 * pinned; each step wipes its background in from the right while the old
 * one recedes, the giant step word rolls out letter by letter as the next
 * rolls in, the copy swaps, and the volt progress segments fill
 * continuously. Snaps gently to each step.
 */
export default function ProcessMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      section.dataset.mode = "scroll";

      const [pin] = q("pin");
      const bgs = q("bg");
      const inners = q("bg-inner");
      const words = q("word");
      const steps = q("step");
      const fills = q("fill");
      const last = steps.length - 1;

      const splits = words.map((w) => SplitText.create(w, { type: "words,chars", mask: "chars" }));
      splits.forEach((s, i) => gsap.set(s.chars, { yPercent: i === 0 ? 0 : 105 }));
      gsap.set(bgs.slice(1), { clipPath: "inset(0% 0% 0% 100%)" });
      gsap.set(inners.slice(1), { scale: 1.25 });
      gsap.set(steps.slice(1), { autoAlpha: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${steps.length * 90}%`,
          pin,
          scrub: 0.8,
          anticipatePin: 1,
          snap: { snapTo: "labelsDirectional", duration: { min: 0.3, max: 0.9 }, delay: 0.06, ease: "power2.inOut" },
        },
      });

      tl.addLabel("s0", 0);
      // Segment i fills across its own span: [i - 0.5, i + 0.5], clamped to the timeline.
      fills.forEach((f, i) => tl.fromTo(f, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: i === 0 ? 0.5 : 1 }, Math.max(0, i - 0.5)));

      for (let i = 1; i <= last; i++) {
        const at = i - 0.5;
        tl.to(splits[i - 1].chars, { yPercent: -105, stagger: 0.025, duration: 0.3, ease: "power3.in" }, at)
          .to(splits[i].chars, { yPercent: 0, stagger: 0.025, duration: 0.35, ease: "power3.out" }, at + 0.2)
          .to(bgs[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55 }, at)
          .to(inners[i], { scale: 1, duration: 0.7, ease: "power2.out" }, at)
          .to(inners[i - 1], { scale: 1.1, xPercent: -6, duration: 0.55 }, at)
          .to(steps[i - 1], { autoAlpha: 0, y: -24, duration: 0.25 }, at)
          .to(steps[i], { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.25)
          .addLabel(`s${i}`, i);
      }
      tl.to({}, { duration: 0.5 }, last);

      return () => {
        splits.forEach((s) => s.revert());
        delete section.dataset.mode;
      };
    });
  });

  return <span ref={marker} hidden />;
}

"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

/**
 * Chapter III motion language — "the page evolves":
 * pinned; each scroll step rolls the numeral, swaps the step text and
 * advances the same sheet of paper — idea → outline → prose (typed line by
 * line) → editor's marks → bound cover. Snaps gently to each step.
 */
export default function ProcessMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      section.dataset.mode = "scroll";

      const steps = q("step");
      const last = steps.length - 1;
      const [pin] = q("pin");
      const [numTrack] = q("num-track");
      const [fill] = q("progress");
      const ticks = q("tick");
      const [page] = q("page");
      const [idea] = q("idea");
      const outline = q("outline-item");
      const paras = q("para");
      const strikes = q("edit-strike");
      const circles = q("edit-circle");
      const notes = q("edit-note");
      const paths = q("edit-path").map((svg) => svg.querySelector("path"));
      const [cover] = q("cover");

      // Opening state: only the idea is on the page.
      gsap.set(steps.slice(1), { autoAlpha: 0, y: 40 });
      gsap.set(outline, { autoAlpha: 0, y: 14 });
      gsap.set(paras, { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(strikes, { "--strike": 0 });
      gsap.set(circles, { "--circle": 0 });
      gsap.set(notes, { autoAlpha: 0, y: 6 });
      gsap.set(paths, { strokeDashoffset: 1 });
      gsap.set(cover, { autoAlpha: 0, xPercent: 45, rotationY: 35, transformOrigin: "0% 50%" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 0.5 },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${steps.length * 85}%`,
          pin,
          scrub: 0.8,
          anticipatePin: 1,
          snap: { snapTo: "labelsDirectional", duration: { min: 0.3, max: 0.9 }, delay: 0.08, ease: "power2.inOut" },
          onUpdate: (self) => {
            const at = self.progress * (last + 0.5);
            ticks.forEach((t, i) => t.toggleAttribute("data-done", at >= i - 0.25));
          },
        },
      });

      tl.addLabel("s0", 0);
      for (let i = 1; i <= last; i++) {
        const at = i - 0.5;
        tl.to(steps[i - 1], { autoAlpha: 0, y: -30, duration: 0.3 }, at)
          .to(steps[i], { autoAlpha: 1, y: 0, duration: 0.4 }, at + 0.15)
          .to(numTrack, { yPercent: (-100 / steps.length) * i }, at)
          .to(fill, { scaleX: i / last, ease: "none" }, at);
      }

      // 1 · Development — the idea becomes the working title; the outline is drawn.
      tl.to(idea, { top: "15%", scale: 0.5, transformOrigin: "0% 0%" }, 0.5).to(
        outline,
        { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.3 },
        0.65,
      );

      // 2 · Writing — the outline gives way to prose, typed in line steps.
      tl.to([...outline].reverse(), { autoAlpha: 0, y: -10, stagger: 0.03, duration: 0.2 }, 1.5)
        .to(idea, { autoAlpha: 0, duration: 0.2 }, 1.5)
        .to(paras, { clipPath: "inset(0% 0% 0% 0%)", ease: "steps(9)", stagger: 0.14, duration: 0.42 }, 1.6);

      // 3 · Editing — the editor's pen.
      tl.to(strikes, { "--strike": 1, duration: 0.2, ease: EASE.soft }, 2.5)
        .to(notes, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.25 }, 2.6)
        .to(circles, { "--circle": 1, duration: 0.25, ease: "back.out(2)" }, 2.65)
        .to(paths, { strokeDashoffset: 0, duration: 0.3, ease: "none" }, 2.7);

      // 4 · Publishing — the cover closes over the page; the room warms.
      tl.to(page, { xPercent: -7, scale: 0.94, rotationY: -10, filter: "brightness(0.8)" }, 3.5)
        .to(cover, { autoAlpha: 1, xPercent: 0, rotationY: 0, duration: 0.55, ease: EASE.soft }, 3.55)
        .to(pin, { backgroundColor: "#22110f", duration: 0.5 }, 3.5);

      for (let i = 1; i <= last; i++) tl.addLabel(`s${i}`, i);
      tl.to({}, { duration: 0.5 }, last); // a short hold on the finished book

      return () => {
        delete section.dataset.mode;
      };
    });
  });

  return <span ref={marker} hidden />;
}

"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ, SplitText } from "@/lib/gsap";

/**
 * First-page motion language — "typed by the scroll":
 * pinned; the sheet lifts from lying flat to upright, then each character is
 * typed in as the reader scrolls — hidden characters leave the flow, so the
 * caret always sits right after the last typed letter. Scrolling back
 * un-types it. The follow-up line fades in once the sentence is complete.
 */
export default function FirstPageMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => section.querySelector<HTMLElement>(`[data-anim='${s}']`)!;
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      const typed = q("typed");
      const split = SplitText.create(typed.querySelectorAll("span:not([data-anim])"), { type: "words,chars" });
      const chars = split.chars as HTMLElement[];
      const caret = q("caret");
      let shown = -1;
      const show = (n: number) => {
        if (n === shown) return;
        // SplitText's chars are inline-block divs — keep that, never reset to "".
        chars.forEach((c, i) => (c.style.display = i < n ? "inline-block" : "none"));
        // The caret always follows the last typed character.
        if (n > 0) chars[n - 1].after(caret);
        else chars[0]?.before(caret);
        shown = n;
      };
      show(0);
      gsap.set(q("body"), { opacity: 0, y: 12 });

      const counter = { n: 0 };
      gsap
        .timeline({
          scrollTrigger: desktop
            ? { trigger: section, start: "top top", end: "+=200%", pin: q("pin"), scrub: 0.5, anticipatePin: 1 }
            : { trigger: section, start: "top 75%", end: "bottom 70%", scrub: 0.5 },
        })
        .fromTo(q("page"), { rotationX: 62, scale: 0.8, yPercent: 12 }, { rotationX: 0, scale: 1, yPercent: 0, duration: 1, ease: "power2.out" })
        .to(counter, { n: chars.length, duration: 2, ease: "none", onUpdate: () => show(Math.round(counter.n)) })
        .to(q("body"), { opacity: 1, y: 0, duration: 0.4 })
        .to({}, { duration: 0.3 });

      return () => {
        show(chars.length);
        typed.appendChild(caret); // back to its server-rendered place before reverting
        split.revert();
      };
    });
  });
  return <span ref={marker} hidden />;
}

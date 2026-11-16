"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines, riseChars } from "@/animations/text";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Services motion language — "the stack":
 * as each panel slides over the last (CSS sticky), the covered panel sinks
 * back — scaling down, tilting away and dimming — while the arriving panel's
 * title punches up letter by letter and its image settles from a push-in.
 */
export default function ServicesMotion() {
  const marker = useSectionMotion((section) => {
    const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-anim='panel']"));
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      const title = section.querySelector<HTMLElement>("[data-anim='title']");
      if (title) revealLines(title, { trigger: title });

      panels.forEach((panel, i) => {
        const inner = panel.querySelector<HTMLElement>("[data-anim='inner']")!;
        const media = panel.querySelector<HTMLElement>("[data-anim='media']")!;
        const dim = panel.querySelector<HTMLElement>("[data-anim='dim']")!;
        const name = panel.querySelector<HTMLElement>("[data-anim='name']")!;

        riseChars(name, { trigger: panel, start: "top 55%", stagger: 0.018 });
        gsap.fromTo(media, { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "top top", scrub: true } });

        const next = panels[i + 1];
        if (!next) return;
        gsap
          .timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } })
          .to(inner, { scale: desktop ? 0.88 : 0.94, rotationX: desktop ? 8 : 0, transformPerspective: 1400, ease: "none" }, 0)
          .to(dim, { opacity: 0.7, ease: "none" }, 0);
      });
    });
  });

  return <span ref={marker} hidden />;
}

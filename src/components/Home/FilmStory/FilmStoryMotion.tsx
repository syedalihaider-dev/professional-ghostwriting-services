"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Chapter IV motion language — "the aperture":
 * pinned; a small frame in the dark opens to full bleed while the footage
 * settles from a close crop. Lines rise into one shared slot and leave
 * upward; the last one stays, and the caption arrives beneath it.
 */
export default function FilmStoryMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      section.dataset.mode = "scroll";

      const [pin] = q("pin");
      const [frame] = q("frame");
      const [media] = q("media");
      const [shade] = q("shade");
      const lines = q("fline");
      const [caption] = q("caption");
      const closed = desktop ? "inset(30% 36% 30% 36%)" : "inset(32% 18% 32% 18%)";

      gsap.set(lines, { yPercent: 110 });
      gsap.set(caption, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: section, start: "top top", end: "+=260%", pin, scrub: 0.9, anticipatePin: 1 },
      });

      tl.fromTo(frame, { clipPath: closed }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power2.inOut" }, 0)
        .fromTo(media, { scale: 1.45 }, { scale: 1, duration: 1.6, ease: "none" }, 0)
        .fromTo(shade, { opacity: 0.2 }, { opacity: 1, duration: 1.4 }, 0);

      lines.forEach((line, i) => {
        const at = 0.35 + i * 0.75;
        tl.to(line, { yPercent: 0, duration: 0.4, ease: "power3.out" }, at);
        if (i < lines.length - 1) tl.to(line, { yPercent: -110, duration: 0.35, ease: "power3.in" }, at + 0.5);
      });

      tl.to(caption, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.35 + (lines.length - 1) * 0.75 + 0.3).to({}, { duration: 0.4 });

      return () => {
        delete section.dataset.mode;
      };
    });
  });

  return <span ref={marker} hidden />;
}

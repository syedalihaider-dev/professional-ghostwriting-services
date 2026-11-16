"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Reel motion language — "small → large → full":
 * pinned; the film starts as a small centred frame, grows to a large one,
 * then fills the viewport while settling from a close crop. Only then do the
 * words rise over it, one by one, followed by the caption.
 */
export default function ReelMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      const [frame] = q("frame");
      const [media] = q("media");
      const [shade] = q("shade");
      const words = q("w");
      const [caption] = q("caption");

      gsap.set(words, { yPercent: 110 });
      gsap.set(caption, { opacity: 0, y: 14 });

      gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: section, start: "top top", end: "+=230%", pin: q("pin")[0], scrub: 0.8, anticipatePin: 1 },
        })
        .fromTo(frame, { clipPath: desktop ? "inset(36% 38% 36% 38%)" : "inset(34% 20% 34% 20%)" }, { clipPath: desktop ? "inset(14% 18% 14% 18%)" : "inset(18% 8% 18% 8%)", duration: 1 })
        .to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 })
        .fromTo(media, { scale: 1.5 }, { scale: 1, duration: 2, ease: "none" }, 0)
        .fromTo(shade, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.4)
        .to(words, { yPercent: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, 1.7)
        .to(caption, { opacity: 1, y: 0, duration: 0.4 }, ">-0.1")
        .to({}, { duration: 0.4 });
    });
  });
  return <span ref={marker} hidden />;
}

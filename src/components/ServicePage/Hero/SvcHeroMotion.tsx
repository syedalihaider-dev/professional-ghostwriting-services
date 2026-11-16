"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";
import { onReveal } from "@/lib/loader";

/**
 * Service hero motion language — "the wipe":
 * a cobalt sheet drops over the portrait and lifts away, revealing the image
 * settling from a push-in; each headline line is wiped in left-to-right like
 * a highlighter stroke, then the details settle. On scroll the portrait
 * drifts and the headline lines slide apart. All scroll tweens use explicit
 * from-values so returning to the top always restores the composed hero.
 */
export default function SvcHeroMotion() {
  const marker = useSectionMotion((hero) => {
    const q = (s: string) => Array.from(hero.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const [sheet] = q("sheet");
    const [media] = q("media");
    const lines = q("line");
    const fades = q("fade");
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      gsap.set(sheet, { scaleY: 1, transformOrigin: "50% 0%" });
      gsap.set(media, { scale: 1.25 });
      gsap.set(lines, { clipPath: "inset(0% 100% 0% 0%)", x: -30 });
      gsap.set(fades, { opacity: 0, y: 14 });

      const intro = gsap.timeline({ paused: true });
      intro
        .to(sheet, { scaleY: 0, transformOrigin: "50% 100%", duration: 1.2, ease: "expo.inOut" }, 0.1)
        .to(media, { scale: 1, duration: 2, ease: "expo.out" }, 0.4)
        .to(lines, { clipPath: "inset(0% 0% 0% 0%)", x: 0, duration: 1.1, stagger: 0.12, ease: "expo.out" }, 0.25)
        .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.8);
      const off = onReveal(() => intro.play());

      const rest = { immediateRender: false, ease: "none" } as const;
      gsap.fromTo(media, { yPercent: 0 }, { yPercent: 10, ...rest, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      lines.forEach((l, i) =>
        gsap.fromTo(l, { xPercent: 0 }, { xPercent: i % 2 ? 8 : -8, ...rest, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } }),
      );
      return off;
    });
  });
  return <span ref={marker} hidden />;
}

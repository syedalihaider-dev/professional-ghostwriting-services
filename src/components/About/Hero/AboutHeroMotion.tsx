"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";
import { onReveal } from "@/lib/loader";

/**
 * About hero motion language — "typesetting":
 * each line slides in from alternating sides inside its own slot, like type
 * being set; photographs open from their centres and float at their own
 * depth with the pointer; on scroll the lines part and the photos drift up
 * at different speeds.
 */
export default function AboutHeroMotion() {
  const marker = useSectionMotion((hero) => {
    const q = (s: string) => Array.from(hero.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const rows = q("row-inner");
    const layers = q("layer");
    const inners = q("layer-inner");
    const fades = q("fade");
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };

      rows.forEach((r) => gsap.set(r, { xPercent: 105 * Number(r.dataset.dir) }));
      gsap.set(layers, { clipPath: "inset(50% 50% 50% 50%)" });
      gsap.set(inners, { scale: 1.4 });
      gsap.set(fades, { opacity: 0, y: 14 });

      const intro = gsap.timeline({ paused: true });
      intro
        .to(rows, { xPercent: 0, duration: 1.3, stagger: 0.09, ease: "expo.out" }, 0)
        .to(layers, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, stagger: 0.15, ease: "expo.inOut" }, 0.3)
        .to(inners, { scale: 1, duration: 2, stagger: 0.15, ease: "expo.out" }, 0.3)
        .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.8);
      const off = onReveal(() => intro.play());

      // Scroll: lines part, photos rise at their own speeds.
      rows.forEach((r) =>
        gsap.fromTo(r, { xPercent: 0 }, { xPercent: 14 * Number(r.dataset.dir), ease: "none", immediateRender: false, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } }),
      );
      layers.forEach((l) =>
        gsap.to(l, { yPercent: -60 * Number(l.dataset.depth), ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } }),
      );

      if (!desktop) return off;

      const movers = layers.map((l) => ({ d: Number(l.dataset.depth), x: gsap.quickTo(l, "x", { duration: 1.1, ease: "power3" }), y: gsap.quickTo(l, "y", { duration: 1.1, ease: "power3" }) }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => {
          m.x(nx * 40 * m.d);
          m.y(ny * 30 * m.d);
        });
      };
      hero.addEventListener("pointermove", onMove);
      return () => {
        off();
        hero.removeEventListener("pointermove", onMove);
      };
    });
  });
  return <span ref={marker} hidden />;
}

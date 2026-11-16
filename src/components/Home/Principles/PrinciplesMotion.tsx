"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Chapter VI motion language — "invisible ink":
 * a lantern follows the pointer across the band (eased, so it feels like
 * carried light); on touch screens the scroll sweeps it along an S-curve.
 * The heading and principles bleed in from a blur, like ink surfacing.
 */
export default function PrinciplesMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const [band] = q("band");
    const mm = gsap.matchMedia();

    mm.add({ hover: `${MQ.hover} and ${MQ.motion}`, touch: `(hover: none) and ${MQ.motion}` }, (ctx) => {
      const { hover } = ctx.conditions as { hover: boolean };
      const lamp = { x: 50, y: 50 };
      const paint = () => {
        band.style.setProperty("--x", `${lamp.x}%`);
        band.style.setProperty("--y", `${lamp.y}%`);
      };

      if (hover) {
        const toX = gsap.quickTo(lamp, "x", { duration: 0.9, ease: "power3", onUpdate: paint });
        const toY = gsap.quickTo(lamp, "y", { duration: 0.9, ease: "power3", onUpdate: paint });
        const onMove = (e: PointerEvent) => {
          const r = band.getBoundingClientRect();
          toX(((e.clientX - r.left) / r.width) * 100);
          toY(((e.clientY - r.top) / r.height) * 100);
        };
        band.addEventListener("pointermove", onMove);
        // Until the reader finds it, the lantern drifts across on its own.
        gsap.fromTo(lamp, { x: 12, y: 30 }, { x: 70, y: 62, duration: 2.4, ease: "power2.inOut", onUpdate: paint, scrollTrigger: { trigger: band, start: "top 70%", once: true } });
        return () => band.removeEventListener("pointermove", onMove);
      }

      gsap.timeline({ scrollTrigger: { trigger: band, start: "top 85%", end: "bottom 15%", scrub: 0.6 }, onUpdate: paint })
        .fromTo(lamp, { x: 5 }, { x: 95, ease: "sine.inOut", duration: 1 }, 0)
        .fromTo(lamp, { y: 20 }, { y: 80, ease: "sine.inOut", duration: 0.5, yoyo: true, repeat: 1 }, 0);
    });

    mm.add(MQ.motion, () => {
      gsap.from(q("title"), {
        filter: "blur(14px)",
        opacity: 0,
        y: 20,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });
      gsap.from(q("item"), {
        filter: "blur(10px)",
        opacity: 0,
        y: 24,
        duration: 1.3,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: { trigger: q("item")[0], start: "top 88%", once: true },
      });
    });
  });

  return <span ref={marker} hidden />;
}

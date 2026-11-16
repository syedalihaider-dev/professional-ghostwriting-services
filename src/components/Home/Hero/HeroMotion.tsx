"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { onLoaderDone } from "@/lib/loader";

/**
 * Hero choreography.
 * Entrance (after the preloader): the film window draws open upward, the
 * headline rises line by line out of its masks, details settle last.
 * Scroll (desktop): pinned — the window opens to full bleed while the three
 * headline lines part left, up and right. Pointer: gentle depth parallax.
 */
export default function HeroMotion() {
  const marker = useSectionMotion((hero) => {
    const q = (s: string) => hero.querySelectorAll<HTMLElement>(`[data-anim='${s}']`);
    const film = q("film")[0];
    const filmInner = q("film-inner")[0];
    const lines = q("line");
    const wraps = q("line-wrap");
    const fades = q("fade");
    const title = q("title")[0];
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      const windowShape = getComputedStyle(hero).getPropertyValue("--window").trim() || "inset(15% 11% 13% 55%)";

      // Pre-entrance state (hidden behind the preloader).
      gsap.set(lines, { yPercent: 115, rotationX: -35, transformOrigin: "50% 0%" });
      gsap.set(fades, { opacity: 0, y: 24 });
      gsap.set(filmInner, { scale: 1.35 });
      if (desktop) gsap.set(film, { clipPath: "inset(87% 11% 13% 55%)" });
      else gsap.set(film, { opacity: 0 });

      const intro = gsap.timeline({ paused: true, defaults: { ease: EASE.out } });
      intro
        .to(film, desktop ? { clipPath: windowShape, duration: 1.8, ease: EASE.cinematic } : { opacity: 1, duration: 1.6 }, 0)
        .to(filmInner, { scale: 1.12, duration: 2.6 }, 0)
        .to(lines, { yPercent: 0, rotationX: 0, duration: 1.5, stagger: 0.11 }, 0.25)
        .to(fades, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.9);

      const off = onLoaderDone(() => intro.play());

      if (!desktop) {
        // Mobile: the film drifts slower than the page; text lifts away.
        gsap.to(filmInner, { yPercent: 12, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        return () => off();
      }

      // Desktop: pin and open the window to full bleed.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: hero, start: "top top", end: "+=110%", pin: q("stage")[0], scrub: 0.9, anticipatePin: 1 },
      });
      tl.fromTo(film, { clipPath: windowShape }, { clipPath: "inset(0% 0% 0% 0%)", immediateRender: false }, 0)
        .to(filmInner, { scale: 1, duration: 1 }, 0)
        .to(wraps[0], { xPercent: -28, opacity: 0 }, 0)
        .to(wraps[1], { yPercent: -60, opacity: 0 }, 0.05)
        .to(wraps[2], { xPercent: 28, opacity: 0 }, 0)
        .to(fades, { opacity: 0, y: -30, stagger: 0.02 }, 0);

      // Pointer depth: film and type drift in opposite directions.
      const fx = gsap.quickTo(filmInner, "x", { duration: 1.2, ease: "power3" });
      const fy = gsap.quickTo(filmInner, "y", { duration: 1.2, ease: "power3" });
      const tx = gsap.quickTo(title, "x", { duration: 1.4, ease: "power3" });
      const ty = gsap.quickTo(title, "y", { duration: 1.4, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        fx(nx * -24);
        fy(ny * -18);
        tx(nx * 10);
        ty(ny * 8);
      };
      hero.addEventListener("pointermove", onMove);

      return () => {
        off();
        hero.removeEventListener("pointermove", onMove);
      };
    });

    // Reduced motion: no pre-hiding, no pin — the composed frame as designed.
  });

  return <span ref={marker} hidden />;
}

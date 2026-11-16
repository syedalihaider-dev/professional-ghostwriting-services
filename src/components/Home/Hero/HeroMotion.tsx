"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ, SplitText } from "@/lib/gsap";
import { onReveal } from "@/lib/loader";

/**
 * Hero choreography.
 * Entrance (after the preloader): the headline punches up letter by letter,
 * the knockout word rises into its band with the footage already running
 * inside it, then the details settle.
 * Scroll (desktop): pinned — the band opens to the full stage while the
 * knockout sheet scales up around the stem of the B, so the camera flies
 * through the letter and the footage fills the screen.
 * Pointer: the footage drifts inside the letters.
 */
export default function HeroMotion() {
  const marker = useSectionMotion((hero) => {
    const q = (s: string) => Array.from(hero.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const [stage] = q("stage");
    const [knock] = q("knock");
    const [film] = q("film");
    const [mask] = q("mask");
    const [word] = q("word");
    const [zoomLetter] = q("zoom");
    const lines = q("line");
    const fades = q("fade");
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };

      const split = SplitText.create(lines, { type: "words,chars", mask: "chars" });
      gsap.set(split.chars, { yPercent: 105, skewY: 10 });
      gsap.set(word, { yPercent: 100 });
      gsap.set(fades, { opacity: 0, y: 16 });
      gsap.set(film, { scale: 1.35 });

      const intro = gsap.timeline({ paused: true });
      intro
        .to(split.chars, { yPercent: 0, skewY: 0, duration: 1.1, stagger: 0.03, ease: "expo.out" }, 0)
        .to(word, { yPercent: 0, duration: 1.5, ease: "expo.out" }, 0.25)
        .to(film, { scale: 1.12, duration: 2.4, ease: "power3.out" }, 0.25)
        .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.8);
      const off = onReveal(() => intro.play());

      if (!desktop) {
        return () => {
          off();
          split.revert();
        };
      }

      // The B's stem, relative to the mask — the point the camera flies into.
      const origin = () => {
        const m = mask.getBoundingClientRect();
        const r = zoomLetter.getBoundingClientRect();
        return `${r.left - m.left + r.width * 0.2}px ${r.top - m.top + r.height * 0.55}px`;
      };
      // Mirrors the CSS band: word line-box height === --kh.
      const bandTop = () => `inset(${stage.offsetHeight - word.offsetHeight}px 0px 0px 0px)`;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: hero, start: "top top", end: "+=150%", pin: stage, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true },
      });
      tl.to(fades, { opacity: 0, y: -40, duration: 0.25 }, 0)
        .to(lines, { yPercent: -40, opacity: 0, stagger: 0.05, duration: 0.3 }, 0)
        .fromTo(knock, { clipPath: bandTop }, { clipPath: "inset(0px 0px 0px 0px)", duration: 0.35, ease: "power2.inOut" }, 0.05)
        .fromTo(mask, { scale: 1, transformOrigin: origin }, { scale: 70, duration: 1, ease: "power3.in" }, 0.1)
        .to(film, { scale: 1, duration: 1 }, 0.1);

      const fx = gsap.quickTo(film, "xPercent", { duration: 1.2, ease: "power3" });
      const fy = gsap.quickTo(film, "yPercent", { duration: 1.2, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        fx((e.clientX / window.innerWidth - 0.5) * -4);
        fy((e.clientY / window.innerHeight - 0.5) * -4);
      };
      hero.addEventListener("pointermove", onMove);

      return () => {
        off();
        hero.removeEventListener("pointermove", onMove);
        split.revert();
      };
    });
  });

  return <span ref={marker} hidden />;
}

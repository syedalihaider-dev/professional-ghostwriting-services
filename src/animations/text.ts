"use client";

import { gsap, SplitText } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

type Target = HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>;

/**
 * Masked line reveal — lines rise out of their own clip with a slight
 * 3D tilt. Re-splits on resize / font load (autoSplit) and reverts cleanly.
 */
export function revealLines(
  target: Target,
  { trigger, start = "top 82%", delay = 0, stagger = 0.09, duration = 1.25 }: {
    trigger?: Element;
    start?: string;
    delay?: number;
    stagger?: number;
    duration?: number;
  } = {},
) {
  return SplitText.create(target, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 115,
        rotationX: -28,
        transformOrigin: "50% 0%",
        duration,
        delay,
        stagger,
        ease: EASE.out,
        scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
      });
    },
  });
}

/**
 * Scroll-scrubbed word illumination: words start ghosted and are "inked in"
 * as the reader moves through the passage.
 */
export function inkWords(target: HTMLElement, { start = "top 78%", end = "bottom 55%" } = {}) {
  return SplitText.create(target, {
    type: "words",
    autoSplit: true,
    onSplit(self) {
      return gsap.fromTo(
        self.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: target, start, end, scrub: 0.6 },
        },
      );
    },
  });
}

/** Clip-path "page lift" image reveal with the inner media settling from 1.18 → 1. */
export function revealMedia(frame: HTMLElement, media: HTMLElement | null, { from = "bottom" as "bottom" | "top" | "left" } = {}) {
  const hidden = { bottom: "inset(100% 0% 0% 0%)", top: "inset(0% 0% 100% 0%)", left: "inset(0% 100% 0% 0%)" }[from];
  const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 85%", once: true } });
  tl.fromTo(frame, { clipPath: hidden }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: EASE.cinematic });
  if (media) tl.fromTo(media, { scale: 1.18 }, { scale: 1, duration: 2, ease: EASE.out }, 0);
  return tl;
}

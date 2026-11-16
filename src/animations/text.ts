"use client";

import { gsap, SplitText } from "@/lib/gsap";

type Target = HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>;

/** Masked line reveal: lines rise out of their own clip. Re-splits on resize / font load. */
export function revealLines(target: Target, { trigger, start = "top 85%", delay = 0, stagger = 0.08, duration = 1.1 }: { trigger?: Element; start?: string; delay?: number; stagger?: number; duration?: number } = {}) {
  return SplitText.create(target, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 110,
        duration,
        delay,
        stagger,
        ease: "expo.out",
        scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
      });
    },
  });
}

/**
 * Character cascade for display type: each letter punches up from below its
 * baseline with a slight skew, staggered — the heavy, typographic entrance.
 */
export function riseChars(target: Target, { trigger, start = "top 85%", delay = 0, stagger = 0.025, duration = 1 }: { trigger?: Element; start?: string; delay?: number; stagger?: number; duration?: number } = {}) {
  return SplitText.create(target, {
    type: "words,chars",
    mask: "chars",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.chars, {
        yPercent: 105,
        skewY: 8,
        duration,
        delay,
        stagger,
        ease: "expo.out",
        scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
      });
    },
  });
}

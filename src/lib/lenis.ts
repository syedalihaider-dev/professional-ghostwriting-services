"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Lenis singleton driven by GSAP's ticker, so Lenis and ScrollTrigger share
 * one RAF loop and never drift. Reduced-motion users keep native scrolling,
 * and touch devices keep native momentum (syncTouch off).
 */
let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

export function initLenis() {
  if (lenis || prefersReducedMotion()) return lenis;

  lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
    anchors: { offset: 0 },
    prevent: (node: HTMLElement) => !!node.closest?.('[data-lenis-prevent], [aria-modal="true"]'),
  });

  lenis.on("scroll", ScrollTrigger.update);
  tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyLenis() {
  if (tick) gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = null;
  tick = null;
}

export const getLenis = () => lenis;

/** Lock / unlock page scroll (menu, modal, preloader). Counted, so nested locks are safe. */
let locks = 0;
export function lockScroll(locked: boolean) {
  locks = Math.max(0, locks + (locked ? 1 : -1));
  const on = locks > 0;
  if (lenis) {
    if (on) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = on ? "hidden" : "";
}

export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  // `force` so links inside a closing menu still scroll while Lenis is stopped.
  if (lenis) lenis.scrollTo(el, { duration: 1.6, force: true });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

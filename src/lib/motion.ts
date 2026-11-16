/**
 * Motion tokens — the durations and eases used across GSAP and Motion.
 * CSS mirrors the eases as --ease-out / --ease-in-out.
 */
export const DUR = { fast: 0.3, base: 0.6, slow: 1.1, cinematic: 1.6 } as const;

export const EASE = {
  /** GSAP names */
  out: "expo.out",
  soft: "power3.out",
  inOut: "power3.inOut",
  cinematic: "power4.inOut",
} as const;

/** Cubic-bezier arrays for Motion (framer-motion). */
export const BEZIER = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.76, 0, 0.24, 1] as [number, number, number, number],
};

/**
 * Mutable state shared between the DOM-side scroll choreography and the
 * WebGL scene. Read inside useFrame — never triggers React renders.
 */
export const shelfState = {
  /** 0 → books.length - 1, the (fractional) index at the centre. */
  progress: 0,
  /** Pointer position over the section, -1 → 1. */
  pointer: { x: 0, y: 0 },
};

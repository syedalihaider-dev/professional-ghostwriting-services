"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";

/**
 * Lets a Server Component section own its markup while a tiny client sibling
 * owns its choreography. Render the returned ref on a hidden marker placed
 * directly inside the section; `setup` receives that section element.
 *
 * Everything created inside `setup` (tweens, ScrollTriggers, SplitText,
 * matchMedia) is reverted automatically on unmount by useGSAP's context, and
 * a returned function runs as extra cleanup (listeners, observers).
 */
export function useSectionMotion(setup: (section: HTMLElement) => void | (() => void)) {
  const marker = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const section = marker.current?.parentElement;
    if (!section) return;
    return setup(section);
  });

  return marker;
}

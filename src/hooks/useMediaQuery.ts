"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query. Renders `serverValue` on the server and during
 * hydration, then the live value — no setState-in-effect, no mismatch.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

let webgl: boolean | undefined;
const noop = () => () => {};

/** WebGL availability, probed once per page load. */
export function useWebGL() {
  return useSyncExternalStore(
    noop,
    () => {
      if (webgl === undefined) {
        try {
          const c = document.createElement("canvas");
          webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
        } catch {
          webgl = false;
        }
      }
      return webgl;
    },
    () => false,
  );
}

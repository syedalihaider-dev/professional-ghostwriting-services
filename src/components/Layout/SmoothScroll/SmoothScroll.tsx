"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { destroyLenis, initLenis, lockScroll, scrollToTarget } from "@/lib/lenis";
import { onLoaderDone } from "@/lib/loader";

/**
 * Boots Lenis (synced to GSAP's ticker), holds the page still behind the
 * preloader, refreshes ScrollTrigger once fonts and the preloader are done,
 * and routes same-page anchor links through the smooth scroller. Renders nothing.
 */
export default function SmoothScroll() {
  useEffect(() => {
    initLenis();
    lockScroll(true);

    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    const offLoader = onLoaderDone(() => {
      lockScroll(false);
      refresh();
    });
    document.fonts?.ready.then(refresh).catch(() => {});

    // "/#section" and "#section" links on this page scroll smoothly.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", url.hash);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      offLoader();
      document.removeEventListener("click", onClick);
      lockScroll(false);
      destroyLenis();
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { beginTransition, endTransition } from "@/lib/loader";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { normPath } from "@/lib/path";
import { services, servicePath } from "@/data/services";
import styles from "./PageTransition.module.css";

/** Display names typed onto the cover for each route. */
const NAMES: Record<string, string> = {
  "/": "HOME",
  "/about-us": "ABOUT",
  "/contact": "CONTACT",
  ...Object.fromEntries(services.map((s) => [normPath(servicePath(s.slug)), s.transition])),
};
const norm = normPath;

/**
 * Page transitions in the brand's own language: a black sheet rises from the
 * bottom, the destination name is typed with the volt caret, the route swaps
 * underneath, and the sheet lifts away. Intercepts same-origin <a> clicks to
 * other pages (modifier-clicks, new tabs and downloads pass through).
 * Reduced motion: a quick cross-fade.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const pending = useRef<{ path: string; hash: string } | null>(null);

  // Cover on click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || norm(url.pathname) === norm(location.pathname) || url.pathname.startsWith("/api/")) return;

      // Capture phase + stopPropagation: we own the navigation (Next <Link> included).
      e.preventDefault();
      e.stopPropagation();
      const el = root.current;
      const w = word.current;
      if (!el || !w || pending.current) return;
      pending.current = { path: norm(url.pathname), hash: url.hash };
      beginTransition();
      router.prefetch(url.pathname);

      const name = NAMES[norm(url.pathname)] ?? "";
      const go = () => router.push(url.pathname + url.search, { scroll: false });

      if (prefersReducedMotion()) {
        gsap.set(el, { display: "grid", clipPath: "inset(0% 0% 0% 0%)", opacity: 0 });
        gsap.to(el, { opacity: 1, duration: 0.25, onComplete: go });
        return;
      }

      w.textContent = "";
      // Size the word to its length so long names (PROOFREADING) still fit the screen.
      w.parentElement!.style.fontSize = `min(${Math.min(18, 150 / Math.max(name.length, 1)).toFixed(2)}vw, 22rem)`;
      const tl = gsap.timeline();
      tl.set(el, { display: "grid", opacity: 1 })
        .fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" });
      for (let i = 1; i <= name.length; i++) tl.call(() => void (w.textContent = name.slice(0, i)), [], `>${i === 1 ? 0.05 : 0.045}`);
      tl.call(go, [], ">0.05");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Reveal once the new route has rendered.
  useEffect(() => {
    const el = root.current;
    const target = pending.current;
    if (!el || !target || norm(pathname) !== target.path) return;

    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    const finish = () => {
      gsap.set(el, { display: "none" });
      pending.current = null;
      ScrollTrigger.refresh();
      endTransition();
      if (target.hash) {
        scrollToTarget(target.hash);
        history.replaceState(null, "", target.hash);
      }
    };

    // Let the new page mount its ScrollTriggers before measuring.
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (prefersReducedMotion()) {
        gsap.to(el, { opacity: 0, duration: 0.25, onComplete: finish });
        return;
      }
      gsap.timeline({ delay: 0.15 }).to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.inOut", onComplete: finish });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div ref={root} className={styles.cover} aria-hidden="true">
      <span className={`display ${styles.word}`}>
        <span ref={word} />
        <span className={styles.caret} />
      </span>
    </div>
  );
}

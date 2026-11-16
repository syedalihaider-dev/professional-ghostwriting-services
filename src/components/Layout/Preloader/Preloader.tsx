"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { markLoaderDone } from "@/lib/loader";
import { site } from "@/config/site";
import styles from "./Preloader.module.css";

const SEEN_KEY = "pgs:intro-seen";
const FIRST = "IDEA";
const FINAL = "BOOK.";

/**
 * The first animation of the site — the brand thesis, typed live.
 * The caret types IDEA, backspaces it, types BOOK., then the black sheet
 * lifts off the hero. A counter and progress line run in the margins.
 * Repeat visits in a session get a short cut; reduced motion a simple fade.
 * Without JavaScript the overlay never renders (see `html.js` in the CSS).
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1";
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage blocked — play the full intro */
      }

      const finish = () => {
        el.style.display = "none";
        markLoaderDone();
      };

      if (prefersReducedMotion()) {
        gsap.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.2, onComplete: finish });
        return;
      }

      const q = gsap.utils.selector(el);
      const word = q("[data-word]")[0] as HTMLElement;
      const count = q("[data-count]")[0] as HTMLElement;
      const counter = { v: 0 };
      const fonts = document.fonts?.ready ?? Promise.resolve();
      const set = (text: string) => () => {
        word.textContent = text;
      };

      const tl = gsap.timeline({ paused: true });
      const typeStep = seen ? 0.05 : 0.11;
      let t = 0.25;

      // Type, backspace, retype — the caret writes the thesis.
      if (!seen) {
        for (let i = 1; i <= FIRST.length; i++) tl.call(set(FIRST.slice(0, i)), [], (t += typeStep));
        t += 0.45;
        for (let i = FIRST.length - 1; i >= 0; i--) tl.call(set(FIRST.slice(0, i)), [], (t += 0.06));
        t += 0.2;
      }
      for (let i = 1; i <= FINAL.length; i++) tl.call(set(FINAL.slice(0, i)), [], (t += typeStep));
      t += seen ? 0.2 : 0.4;

      tl.to(counter, { v: 100, duration: t, ease: "power1.inOut", onUpdate: () => void (count.textContent = String(Math.round(counter.v)).padStart(3, "0")) }, 0)
        .fromTo(q("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: t, ease: "power1.inOut" }, 0)
        .from(q("[data-meta]"), { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 }, 0)
        .addLabel("exit", t)
        .to(q("[data-caret]"), { opacity: 0, duration: 0.1 }, "exit")
        .to(q("[data-stage]"), { yPercent: -12, opacity: 0, duration: 0.6, ease: "power3.in" }, "exit")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.95, ease: "expo.inOut" }, "exit+=0.3")
        .add(markLoaderDone, "exit+=0.65")
        .add(finish);

      // Hold before the exit until fonts are ready (capped so nothing can hang).
      tl.addPause("exit", () => {
        Promise.race([fonts, new Promise((r) => setTimeout(r, 2500))]).then(() => tl.play());
      });
      tl.play();
      return () => tl.kill();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={styles.preloader} aria-hidden="true">
      <div className={styles.stage} data-stage>
        <span className={`display ${styles.word}`}>
          <span data-word />
          <span className={styles.caret} data-caret />
        </span>
      </div>
      <div className={styles.foot}>
        <span className="label caret-label" data-meta>
          {site.name}
        </span>
        <span className={`display ${styles.count}`} data-meta data-count>
          000
        </span>
      </div>
      <span className={styles.bar} data-bar />
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { markLoaderDone } from "@/lib/loader";
import { site } from "@/config/site";
import styles from "./Preloader.module.css";

const SEEN_KEY = "pgs:intro-seen";
const LINE = "Every book begins with a blank page.";

/**
 * The opening title sequence. The logo rises out of the ink while a folio
 * counter runs to 100; then the ink lifts away like a turned page, revealing
 * an ivory leaf that lifts in turn onto the hero. Repeat visits in the same
 * session get a short cut; reduced motion gets a simple fade.
 * Without JavaScript the overlay never shows (see `html.js` in the CSS).
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
      const counter = { v: 0 };
      const num = q(`.${styles.count}`)[0] as HTMLElement;
      const fonts = document.fonts?.ready ?? Promise.resolve();

      const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.out } });
      const intro = seen ? 0.9 : 2.1;

      tl.fromTo(q(`.${styles.logo}`), { clipPath: "inset(100% 0 0 0)", y: 24 }, { clipPath: "inset(0% 0 0 0)", y: 0, duration: seen ? 0.7 : 1.3 }, 0.1)
        .from(q(`.${styles.word}`), { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.05 }, seen ? 0.2 : 0.55)
        .from(q(`.${styles.meta}`), { opacity: 0, y: 10, duration: 0.8, stagger: 0.1 }, 0.3)
        .to(counter, {
          v: 100,
          duration: intro,
          ease: "power2.inOut",
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0.1)
        .fromTo(q(`.${styles.bar}`), { scaleX: 0 }, { scaleX: 1, duration: intro, ease: "power2.inOut" }, 0.1)
        .addLabel("exit")
        .to(q(`.${styles.content}`), { yPercent: -18, opacity: 0, duration: 0.7, ease: EASE.inOut }, "exit")
        .to(q(`.${styles.ink}`), { clipPath: "inset(0 0 100% 0)", duration: 1.05, ease: EASE.cinematic }, "exit+=0.15")
        .to(q(`.${styles.leaf}`), { clipPath: "inset(0 0 100% 0)", duration: 1, ease: EASE.cinematic }, "exit+=0.42")
        // Signal the hero slightly before the leaf clears so the two overlap.
        .add(markLoaderDone, "exit+=0.75")
        .add(finish);

      // Hold at the exit until fonts are ready (capped so nothing can hang).
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
      <div className={styles.leaf} />
      <div className={styles.ink}>
        <div className={styles.content}>
          <Image className={styles.logo} src={site.logo.ivory.src} alt="" width={site.logo.ivory.width} height={site.logo.ivory.height} priority />
          <p className={styles.line}>
            {LINE.split(" ").map((w, i) => (
              <span key={i} className={styles.mask}>
                <span className={styles.word}>{w}</span>
              </span>
            ))}
          </p>
        </div>
        <div className={styles.foot}>
          <span className={`label ${styles.meta}`}>{site.name}</span>
          <span className={`${styles.meta} ${styles.folio}`}>
            <span className="label">Page</span>
            <span className={styles.count}>000</span>
          </span>
        </div>
        <span className={styles.bar} />
      </div>
    </div>
  );
}

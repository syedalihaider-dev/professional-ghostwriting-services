"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ServiceData } from "@/data/services";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { BEZIER } from "@/lib/motion";
import styles from "./SvcOffer.module.css";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * What we offer — an interactive index. Desktop: hovering, focusing or
 * scrolling a deliverable makes it active; a sticky panel crossfades to its
 * description. Phones: every description sits under its title. All text is
 * always in the DOM.
 */
export default function SvcOffer({ offer }: { offer: ServiceData["offer"] }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const item = offer.items[active];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", el);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        rows.forEach((row, i) => ScrollTrigger.create({ trigger: row, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && setActive(i) }));
      });
      mm.add(MQ.motion, () => {
        gsap.from(rows, { clipPath: "inset(0% 100% 0% 0%)", duration: 1.1, stagger: 0.08, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 75%", once: true } });
      });
    },
    { scope: root },
  );

  return (
    <section className={`surface-black ${styles.section}`} data-surface="dark" aria-labelledby="svc-offer-title">
      <div ref={root} className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <p className="label caret-label">What we offer</p>
          <h2 id="svc-offer-title" className={`display ${styles.title}`}>
            {offer.heading}
          </h2>
        </header>

        <ol role="list" className={styles.list}>
          {offer.items.map((it, i) => (
            <li key={it.title} className={styles.row} data-row data-on={active === i || undefined} onPointerEnter={() => setActive(i)}>
              <h3 className={styles.rowHead}>
                <button type="button" className={styles.rowBtn} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
                  <span className={`label ${styles.num}`}>{pad(i)}</span>
                  <span className={`display ${styles.name}`}>{it.title}</span>
                  <span className={styles.marker} aria-hidden="true" />
                </button>
              </h3>
              <p className={styles.inlineBody}>{it.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.panelCol} aria-hidden="true">
          <div className={styles.panel}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.title}
                className={styles.panelInner}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: BEZIER.out }}
              >
                <span className={`display ${styles.panelNum}`}>{pad(active)}</span>
                <span className={`display ${styles.panelTitle}`}>{item.title}</span>
                <span className={styles.panelBody}>{item.body}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

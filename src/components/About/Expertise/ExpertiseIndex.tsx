"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { BEZIER } from "@/lib/motion";
import styles from "./Expertise.module.css";

type Item = { name: string; note: string; image: string };

/**
 * A typographic index. Pointer: hovering (or focusing) a category lights it,
 * dims the rest and swaps the full-bleed photograph and caption behind.
 * Touch: the category crossing the middle of the screen becomes active.
 * Every note is also in the DOM (visually hidden list) for crawlers and AT.
 */
export default function ExpertiseIndex({ items, children }: { items: readonly Item[]; children: ReactNode }) {
  const [active, setActive] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const current = active === null ? null : items[active];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", el);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        // Animate the <li>s: the buttons carry CSS opacity transitions for hover.
        gsap.from(words.map((w) => w.parentElement), { yPercent: 60, opacity: 0, duration: 1, stagger: 0.05, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 70%", once: true } });
      });
      // Touch screens have no hover: let the scroll choose the active category.
      mm.add("(hover: none)", () => {
        words.forEach((w, i) => ScrollTrigger.create({ trigger: w, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && setActive(i) }));
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={styles.stage} onPointerLeave={() => setActive(null)} data-active={active !== null || undefined}>
      <div className={styles.bgs} aria-hidden="true">
        {items.map((it, i) => (
          <div key={it.name} className={styles.bg} data-on={active === i || undefined}>
            <Image src={it.image} alt="" fill sizes="100vw" />
          </div>
        ))}
        <div className={styles.veil} />
      </div>

      <div className={`container ${styles.inner}`}>
        {children}

        <ul role="list" className={`display ${styles.words}`}>
          {items.map((it, i) => (
            <li key={it.name}>
              <button
                type="button"
                className={styles.word}
                data-word
                data-on={active === i || undefined}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-describedby={`exp-${i}`}
              >
                {it.name}
              </button>
              {i < items.length - 1 && (
                <span className={styles.sep} aria-hidden="true">
                  /
                </span>
              )}
              <span id={`exp-${i}`} className="sr-only">
                {it.note}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.caption} aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={current?.name ?? "hint"}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: BEZIER.out }}
            >
              {current ? (
                <>
                  <span className="label caret-label">{current.name}</span>
                  <span className={styles.note}>{current.note}</span>
                </>
              ) : (
                <span className="label muted">Hover or tap a category</span>
              )}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

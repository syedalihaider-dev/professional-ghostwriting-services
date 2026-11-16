"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ServiceData } from "@/data/services";
import { BEZIER } from "@/lib/motion";
import styles from "./SvcFaq.module.css";

/**
 * Service FAQs — a Motion accordion. Each answer stays in the DOM (hidden
 * panels are collapsed, not removed) so the content is crawlable and
 * matches the FAQPage schema; open/close animates height.
 */
export default function SvcFaq({ faqs, name }: { faqs: ServiceData["faqs"]; name: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <section className={`surface-white ${styles.section}`} data-surface="light" aria-labelledby={`${uid}-title`}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <p className="label caret-label">FAQ</p>
          <h2 id={`${uid}-title`} className={`display ${styles.title}`}>
            Questions about {name.replace(/ Services$/, "").toLowerCase()}.
          </h2>
        </header>

        <ul role="list" className={styles.list}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const id = `${uid}-${i}`;
            return (
              <li key={f.q} className={styles.item} data-open={isOpen || undefined}>
                <h3 className={styles.qWrap}>
                  <button type="button" className={styles.q} aria-expanded={isOpen} aria-controls={`${id}-a`} id={`${id}-q`} onClick={() => setOpen(isOpen ? null : i)}>
                    <span className="label muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.qText}>{f.q}</span>
                    <motion.span className={styles.icon} aria-hidden="true" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.45, ease: BEZIER.out }}>
                      +
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="a"
                      id={`${id}-a`}
                      role="region"
                      aria-labelledby={`${id}-q`}
                      className={styles.a}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.5, ease: BEZIER.out }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Collapsed answers stay in the HTML for crawlers and the FAQ schema. */}
                {!isOpen && (
                  <p id={`${id}-a`} className="sr-only">
                    {f.a}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

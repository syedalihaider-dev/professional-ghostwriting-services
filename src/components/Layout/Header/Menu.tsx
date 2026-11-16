"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { useDialog } from "@/hooks/useDialog";
import { leadStore } from "@/lib/leadStore";
import { BEZIER } from "@/lib/motion";
import styles from "./Menu.module.css";

/**
 * Full-screen menu, designed as a table of contents: the ink spreads from the
 * toggle's corner, entries rise line by line, and contact details settle in
 * last. Closing reverses the choreography.
 */
export default function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useDialog<HTMLDivElement>(open, onClose);
  const reduce = useReducedMotion();

  const panel = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)" },
        animate: { clipPath: "circle(150% at calc(100% - 3rem) 2.75rem)" },
        exit: { clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)" },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`surface-ink ${styles.menu}`}
          {...panel}
          transition={{ duration: reduce ? 0.2 : 0.9, ease: BEZIER.inOut }}
          data-lenis-prevent
        >
          <div className={styles.inner}>
            <p className="chapter-mark">
              <b>Contents</b>
            </p>
            <nav aria-label="Menu">
              <ol role="list" className={styles.list}>
                {site.nav.map((item, i) => (
                  <li key={item.href} className={styles.mask}>
                    <motion.a
                      href={item.href}
                      className={styles.link}
                      onClick={onClose}
                      initial={{ y: reduce ? 0 : "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: reduce ? 0 : "-110%", transition: { duration: 0.35, ease: BEZIER.inOut } }}
                      transition={{ duration: 0.9, ease: BEZIER.out, delay: reduce ? 0 : 0.25 + i * 0.06 }}
                    >
                      <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.text}>{item.label}</span>
                    </motion.a>
                  </li>
                ))}
              </ol>
            </nav>

            <motion.div
              className={styles.foot}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, ease: BEZIER.out, delay: reduce ? 0 : 0.6 }}
            >
              <div>
                <span className="label muted">Call</span>
                <a href={site.contact.phone.href} className={styles.contact}>
                  {site.contact.phone.display}
                </a>
              </div>
              <div>
                <span className="label muted">Write</span>
                <a href={site.contact.email.href} className={styles.contactSmall}>
                  {site.contact.email.display}
                </a>
              </div>
              <button
                type="button"
                className={styles.begin}
                onClick={() => {
                  onClose();
                  leadStore.open();
                }}
                aria-haspopup="dialog"
              >
                Begin your book →
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

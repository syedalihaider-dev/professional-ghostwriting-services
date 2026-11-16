"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { services, serviceCategories, servicePath } from "@/data/services";
import { useDialog } from "@/hooks/useDialog";
import { leadStore } from "@/lib/leadStore";
import { BEZIER } from "@/lib/motion";
import styles from "./Menu.module.css";

/**
 * Full-screen menu. A cobalt field wipes down from the header, then the
 * navigation drops in as giant condensed lines; hovering a line sends a volt
 * caret ahead of it. Exits snap back up.
 */
export default function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useDialog<HTMLDivElement>(open, onClose);
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`surface-cobalt ${styles.menu}`}
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.55, ease: BEZIER.inOut, delay: 0.15 } }}
          transition={{ duration: reduce ? 0.2 : 0.8, ease: BEZIER.inOut }}
          data-lenis-prevent
        >
          <div className={styles.inner}>
            <nav aria-label="Menu">
              <ol role="list" className={styles.list}>
                {site.nav.map((item, i) => (
                  <li key={item.href} className={styles.mask}>
                    <motion.a
                      href={item.href}
                      className={`display ${styles.link}`}
                      onClick={onClose}
                      initial={{ y: reduce ? 0 : "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: reduce ? 0 : "-105%", transition: { duration: 0.3, ease: BEZIER.inOut } }}
                      transition={{ duration: 0.8, ease: BEZIER.out, delay: reduce ? 0 : 0.3 + i * 0.05 }}
                    >
                      <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.text}>{item.label}</span>
                      <span className={styles.caret} aria-hidden="true" />
                    </motion.a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Every service page, grouped — the mobile counterpart of the desktop services panel. */}
            <motion.nav
              aria-label="Services"
              className={styles.services}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.6, ease: BEZIER.out, delay: reduce ? 0 : 0.5 }}
            >
              {serviceCategories.map((cat) => (
                <div key={cat} className={styles.group}>
                  <p className="label">{cat}</p>
                  <ul role="list">
                    {services
                      .filter((s) => s.category === cat)
                      .map((s) => (
                        <li key={s.slug}>
                          <a href={servicePath(s.slug)} onClick={onClose}>
                            {s.short}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </motion.nav>

            <motion.div
              className={styles.foot}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.6, ease: BEZIER.out, delay: reduce ? 0 : 0.6 }}
            >
              <a href={site.contact.phone.href} className={styles.phone}>
                {site.contact.phone.display}
              </a>
              <a href={site.contact.email.href} className={`label ${styles.email}`}>
                {site.contact.email.display}
              </a>
              <button
                type="button"
                className={styles.begin}
                onClick={() => {
                  onClose();
                  leadStore.open();
                }}
                aria-haspopup="dialog"
              >
                Start your book →
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

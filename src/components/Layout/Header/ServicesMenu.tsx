"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { services, serviceCategories, servicePath } from "@/data/services";
import { site } from "@/config/site";
import { BEZIER } from "@/lib/motion";
import { normPath } from "@/lib/path";
import styles from "./ServicesMenu.module.css";

/**
 * Desktop "Services" item: a disclosure button that opens a panel of every
 * service page, grouped by category. Opens on hover, focus or click; closes
 * on Escape, pointer leave (with a short grace period) or navigation.
 */
export default function ServicesMenu({ index }: { index: number }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname; // navigating closes it
  const setOpen = (v: boolean) => setOpenFor(v ? pathname : null);
  const closeTimer = useRef<number | null>(null);
  const root = useRef<HTMLLIElement>(null);
  const isService = services.some((s) => normPath(servicePath(s.slug)) === normPath(pathname));

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenFor(null), 220);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenFor(null);
        root.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpenFor(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => cancelClose, []);

  return (
    <li ref={root} onPointerEnter={() => (cancelClose(), setOpen(true))} onPointerLeave={scheduleClose}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls="services-panel"
        aria-current={isService ? "page" : undefined}
        onClick={() => setOpen(!open)}
        onFocus={() => setOpen(true)}
      >
        <span className={styles.num} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        Services
        <span className={styles.chev} aria-hidden="true" data-open={open || undefined} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="services-panel"
            className={`surface-graphite ${styles.panel}`}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.35, ease: BEZIER.inOut } }}
            transition={{ duration: 0.55, ease: BEZIER.inOut }}
            onPointerEnter={cancelClose}
          >
            <div className={styles.grid}>
              {serviceCategories.map((cat, ci) => (
                <div key={cat} className={styles.col}>
                  <p className="label muted">{cat}</p>
                  <ul role="list">
                    {services
                      .filter((s) => s.category === cat)
                      .map((s, i) => (
                        <motion.li
                          key={s.slug}
                          initial={reduce ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: reduce ? 0 : 0.12 + ci * 0.05 + i * 0.03, duration: 0.45, ease: BEZIER.out }}
                        >
                          <a href={servicePath(s.slug)} className={styles.link} aria-current={normPath(servicePath(s.slug)) === normPath(pathname) ? "page" : undefined}>
                            {s.short}
                          </a>
                        </motion.li>
                      ))}
                  </ul>
                </div>
              ))}
              <div className={styles.aside}>
                <p className="label caret-label">Not sure which?</p>
                <p className={styles.asideText}>Tell us about your book and we’ll recommend the right support.</p>
                <a href={site.contact.phone.href} className={`display ${styles.phone}`}>
                  {site.contact.phone.display}
                </a>
                <Link href="/#services" className={`label link-u ${styles.overview}`}>
                  Services overview →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

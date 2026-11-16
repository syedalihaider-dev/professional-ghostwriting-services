"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Service } from "@/content/home";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { leadStore } from "@/lib/leadStore";
import { revealLines } from "@/animations/text";
import { BEZIER, EASE } from "@/lib/motion";
import Button from "@/components/UI/Button/Button";
import styles from "./Services.module.css";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * The contents list. Desktop: a sticky "plate" on the left shows whichever
 * entry is active — set by scroll position (the row crossing the centre)
 * or by hover / focus. Mobile: each row is a disclosure.
 * Every summary is in the DOM for all readers; the plate is a visual echo.
 */
export default function ServicesIndex({ items }: { items: Service[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const current = items[active];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", el);
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        rows.forEach((row, i) =>
          ScrollTrigger.create({ trigger: row, start: "top center", end: "bottom center", onToggle: (s) => s.isActive && setActive(i) }),
        );
      });

      mm.add(MQ.motion, () => {
        const title = el.parentElement?.querySelector<HTMLElement>("[data-anim='title']");
        if (title) revealLines(title, { trigger: title });

        rows.forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 90%", once: true } });
          tl.from(row.querySelector("[data-num]"), { opacity: 0, x: -12, duration: 0.8 }, 0)
            .from(row.querySelector("[data-name]"), { yPercent: 105, duration: 1.1, ease: EASE.out }, 0.05)
            .from(row.querySelector("[data-leader]"), { scaleX: 0, transformOrigin: "left", duration: 1.3, ease: EASE.inOut }, 0.15)
            .from(row.querySelector("[data-kicker]"), { opacity: 0, duration: 0.8 }, 0.6);
        });

        const plate = el.querySelector("[data-plate]");
        if (plate) gsap.from(plate, { opacity: 0, y: 40, duration: 1.2, scrollTrigger: { trigger: el, start: "top 75%", once: true } });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={styles.index}>
      {/* Desktop plate: a visual echo of the active entry (the rows carry the text). */}
      <div className={styles.plateCol}>
        <div className={styles.plate} data-plate>
          <div aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              className={styles.plateInner}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: BEZIER.out }}
            >
              <span className={styles.plateNum} aria-hidden="true">
                {pad(active)}
              </span>
              <span className="label muted">{current.kicker}</span>
              <span className={styles.plateTitle}>{current.title}</span>
              <span className={styles.plateText}>{current.summary}</span>
            </motion.div>
          </AnimatePresence>
          </div>
          <div className={styles.plateCta}>
            <Button lead={current.title} variant="outline" cursor="Begin">
              {`Discuss ${current.title.toLowerCase()}`}
            </Button>
          </div>
        </div>
      </div>

      <ol role="list" className={styles.list}>
        {items.map((s, i) => {
          const isOpen = open === i;
          return (
            <li
              key={s.id}
              className={styles.row}
              data-row
              data-active={active === i || undefined}
              onPointerEnter={() => setActive(i)}
            >
              <h3 className={styles.rowHead}>
                <button
                  type="button"
                  className={styles.rowBtn}
                  aria-expanded={isOpen}
                  aria-controls={`svc-${s.id}`}
                  onClick={() => {
                    setActive(i);
                    setOpen(isOpen ? null : i);
                  }}
                  onFocus={() => setActive(i)}
                >
                  <span className={styles.num} data-num>
                    {pad(i)}
                  </span>
                  <span className={styles.nameMask}>
                    <span className={styles.nameRise} data-name>
                      <span className={styles.name}>{s.title}</span>
                    </span>
                  </span>
                  <span className={styles.leader} data-leader aria-hidden="true" />
                  <span className={`label ${styles.kicker}`} data-kicker>
                    {s.kicker}
                  </span>
                  <span className={styles.plus} aria-hidden="true" />
                </button>
              </h3>
              <div id={`svc-${s.id}`} className={styles.detail} data-open={isOpen || undefined}>
                <div className={styles.detailInner}>
                  <p>{s.summary}</p>
                  <button type="button" className={styles.detailCta} onClick={() => leadStore.open(s.title)} aria-haspopup="dialog">
                    Discuss {s.title.toLowerCase()} →
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

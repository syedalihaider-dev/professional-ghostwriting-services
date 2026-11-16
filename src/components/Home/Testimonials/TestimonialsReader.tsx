"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./Testimonials.module.css";

type Item = { quote: string; name: string; role: string };
const DURATION = 9000;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Quotes share one slot. On change the outgoing quote's lines rise out of
 * their masks and the incoming lines rise in behind them; the counter rolls.
 * All quotes stay in the DOM (inactive = `hidden`) for crawlers and AT.
 * Auto-advances only while on screen and unpaused; never for reduced motion.
 */
export default function TestimonialsReader({ items }: { items: readonly Item[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const motionOk = useMediaQuery(MQ.motion);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const prev = useRef(0);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const running = motionOk && onScreen && !paused;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), DURATION);
    return () => window.clearTimeout(t);
  }, [running, index, items.length]);

  // Line transition between the previous and the current quote.
  useGSAP(
    () => {
      const from = prev.current;
      prev.current = index;
      if (from === index || !motionOk) return;
      const quotes = gsap.utils.toArray<HTMLElement>("[data-quote]", root.current);
      const outgoing = quotes[from];
      const incoming = quotes[index];
      outgoing.hidden = false;
      const outSplit = SplitText.create(outgoing.querySelector("blockquote")!, { type: "lines", mask: "lines" });
      const inSplit = SplitText.create(incoming.querySelector("blockquote")!, { type: "lines", mask: "lines" });
      gsap
        .timeline({
          onComplete: () => {
            outgoing.hidden = true;
            outSplit.revert();
            inSplit.revert();
          },
        })
        .set(outgoing, { position: "absolute", inset: 0 })
        .to(outSplit.lines, { yPercent: -110, duration: 0.6, stagger: 0.05, ease: "power3.in" }, 0)
        .from(inSplit.lines, { yPercent: 110, duration: 0.9, stagger: 0.07, ease: "expo.out" }, 0.45)
        .from(incoming.querySelector("figcaption"), { opacity: 0, y: 12, duration: 0.6 }, 0.8)
        .set(outgoing, { clearProps: "position,inset" });
    },
    { scope: root, dependencies: [index] },
  );

  const go = (i: number, focus = false) => {
    const n = (i + items.length) % items.length;
    setIndex(n);
    if (focus) tabs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1, true);
    else if (e.key === "ArrowLeft") go(index - 1, true);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={root}
      className={styles.reader}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.counter} aria-hidden="true">
        <span className="display">{pad(index + 1)}</span>
        <span className="label muted">/ {pad(items.length)}</span>
      </div>

      <div className={styles.slot}>
        <span className={`display ${styles.mark}`} aria-hidden="true">
          “
        </span>
        {items.map((item, i) => (
          <figure key={item.name} id={`quote-${i}`} role="tabpanel" aria-labelledby={`quote-tab-${i}`} hidden={i !== index} className={styles.quote} data-quote>
            <blockquote className={styles.text}>{item.quote}</blockquote>
            <figcaption className={styles.sign}>
              <span className={styles.name}>{item.name}</span>
              <span className="label muted">{item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.controls}>
        <div role="tablist" aria-label="Testimonials" className={styles.tabs} onKeyDown={onKey}>
          {items.map((item, i) => (
            <button
              key={item.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`quote-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls={`quote-${i}`}
              tabIndex={i === index ? 0 : -1}
              className={styles.tab}
              onClick={() => go(i)}
            >
              <span className="label">{item.name}</span>
              <span className={styles.bar} aria-hidden="true">
                {i === index && <span key={index} className={styles.fill} data-running={running || undefined} style={{ animationDuration: `${DURATION}ms` }} />}
              </span>
            </button>
          ))}
        </div>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => go(index - 1)} aria-label="Previous testimonial">
            ←
          </button>
          <button type="button" className={styles.arrow} onClick={() => go(index + 1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </div>
  );
}

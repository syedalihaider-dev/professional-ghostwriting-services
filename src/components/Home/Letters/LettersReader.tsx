"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { MQ } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./Letters.module.css";

type Letter = { quote: string; name: string; role: string };

const DURATION = 9000;

/**
 * Tabbed letters. Every quote is in the HTML (inactive ones `hidden`);
 * the active one sets word by word. Auto-advances only while on screen,
 * pauses on hover / focus, and never auto-advances for reduced motion.
 */
export default function LettersReader({ items }: { items: readonly Letter[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const auto = useMediaQuery(MQ.motion);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const running = auto && onScreen && !paused;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), DURATION);
    return () => window.clearTimeout(t);
  }, [running, index, items.length]);

  const go = (i: number, focus = false) => {
    const n = (i + items.length) % items.length;
    setIndex(n);
    if (focus) tabs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1, true);
    else if (e.key === "ArrowLeft") go(index - 1, true);
    else if (e.key === "Home") go(0, true);
    else if (e.key === "End") go(items.length - 1, true);
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
      <div className={styles.panels}>
        {items.map((item, i) => (
          <figure key={item.name} id={`letter-${i}`} role="tabpanel" aria-labelledby={`letter-tab-${i}`} hidden={i !== index} className={styles.panel}>
            <blockquote className={styles.quote}>
              <p>
                {item.quote.split(" ").map((w, wi) => (
                  <span key={wi} className={styles.word} style={{ "--i": wi } as CSSProperties}>
                    {w}{" "}
                  </span>
                ))}
              </p>
            </blockquote>
            <figcaption className={styles.sign}>
              <span className={styles.name}>{item.name}</span>
              <span className="label muted">{item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.controls}>
        <div role="tablist" aria-label="Letters" className={styles.tabs} onKeyDown={onKey}>
          {items.map((item, i) => (
            <button
              key={item.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`letter-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls={`letter-${i}`}
              tabIndex={i === index ? 0 : -1}
              className={styles.tab}
              onClick={() => go(i)}
            >
              <span className={styles.tabNum}>{String(i + 1).padStart(2, "0")}</span>
              <span>{item.name}</span>
              <span className={styles.tabBar} aria-hidden="true">
                {i === index && <span key={index} className={styles.tabFill} data-running={running || undefined} style={{ animationDuration: `${DURATION}ms` }} />}
              </span>
            </button>
          ))}
        </div>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => go(index - 1)} aria-label="Previous letter">
            ←
          </button>
          <button type="button" className={styles.arrow} onClick={() => go(index + 1)} aria-label="Next letter">
            →
          </button>
        </div>
      </div>
    </div>
  );
}

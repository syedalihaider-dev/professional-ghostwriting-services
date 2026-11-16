"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { onLoaderDone } from "@/lib/loader";
import styles from "./Folio.module.css";

type Chapter = { num: string; name: string };

/**
 * A running head in the page margin, as in a printed book: the current
 * chapter number and title, plus a hairline that fills with reading
 * progress. Sections opt in with `data-chapter="III"` + `data-chapter-name`.
 * Decorative (the headings carry the same information), so aria-hidden.
 */
export default function Folio() {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let triggers: ScrollTrigger[] = [];
    const build = () => {
      triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]")).map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            const num = el.dataset.chapter ?? "";
            if (self.isActive) setChapter({ num, name: el.dataset.chapterName ?? "" });
            // Leaving a chapter into unchaptered space (hero, finale, footer) clears the head.
            else setChapter((c) => (c?.num === num ? null : c));
          },
        }),
      );
      triggers.push(
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleY(${self.progress})`;
          },
        }),
      );
    };
    const off = onLoaderDone(build);
    return () => {
      off();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className={styles.folio} data-visible={chapter ? true : undefined} aria-hidden="true">
      <span className={styles.track}>
        <span ref={bar} className={styles.bar} />
      </span>
      <span className={styles.text} key={chapter?.num}>
        <b>{chapter?.num}</b>
        <span>{chapter?.name}</span>
      </span>
    </div>
  );
}

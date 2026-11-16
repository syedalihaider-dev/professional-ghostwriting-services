"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Book } from "@/content/home";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { BEZIER } from "@/lib/motion";
import { shelfState } from "./shelfState";
import { useMediaQuery, useWebGL } from "@/hooks/useMediaQuery";
import styles from "./Shelf.module.css";

// three.js + R3F are split into their own chunk and only fetched for the 3D mode.
const BookScene = dynamic(() => import("./BookScene"), { ssr: false });

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Two presentations of the same shelf:
 * - "flat" (server default; mobile, reduced motion, no WebGL): a swipeable
 *   row of covers — real <img> + text, fully crawlable.
 * - "3d" (desktop): the section pins and scrolling turns a row of bound
 *   books past the reader; the caption column follows the book in focus.
 */
export default function ShelfStage({ books }: { books: Book[] }) {
  const root = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery(MQ.desktop);
  const webgl = useWebGL();
  const mode: "flat" | "3d" = desktop && webgl ? "3d" : "flat";
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const book = books[active];

  // Mount the scene a screen early; run its frame loop only while visible.
  useEffect(() => {
    // The stage is display:contents in 3D mode (no box), so observe the section.
    const el = root.current?.closest("section");
    if (!el || mode !== "3d") return;
    const nearIO = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "150% 0px" });
    const visIO = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    nearIO.observe(el);
    visIO.observe(el);
    return () => {
      nearIO.disconnect();
      visIO.disconnect();
    };
  }, [mode]);

  useGSAP(
    () => {
      const el = root.current;
      const section = el?.closest("section");
      if (!el || !section) return;

      if (mode === "flat") {
        gsap.matchMedia().add(MQ.motion, () => {
          gsap.from(el.querySelectorAll("[data-flat-item]"), {
            y: 60,
            rotationY: -18,
            opacity: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
        return;
      }

      const last = books.length - 1;
      shelfState.progress = 0;
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${last * 75 + 40}%`,
        pin: true,
        anticipatePin: 1,
        snap: { snapTo: 1 / last, duration: { min: 0.3, max: 0.8 }, delay: 0.06, ease: "power2.inOut" },
        onUpdate: (self) => {
          shelfState.progress = self.progress * last;
          const i = Math.round(shelfState.progress);
          setActive((prev) => (prev === i ? prev : i));
        },
      });

      const onMove = (e: PointerEvent) => {
        const r = section.getBoundingClientRect();
        shelfState.pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        shelfState.pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      };
      const onLeave = () => {
        shelfState.pointer.x = 0;
        shelfState.pointer.y = 0;
      };
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);

      // The pin adds scroll length below this point — re-measure everything after it.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      return () => {
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: root, dependencies: [mode], revertOnUpdate: true },
  );

  return (
    <div ref={root} className={styles.stage} data-mode={mode}>
      {mode === "3d" && (
        <>
          <div className={styles.canvas} data-cursor="Turn">
            {near && <BookScene books={books} active={visible} />}
          </div>

          <div className={styles.caption} aria-hidden="true">
            <span className={styles.counter}>
              {pad(active + 1)} <span>/ {pad(books.length)}</span>
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={book.id}
                className={styles.captionText}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: BEZIER.out }}
              >
                <span className={styles.bookTitle}>{book.title}</span>
                <span className={styles.bookAuthor}>{book.author}</span>
                <span className="label muted">{book.note}</span>
              </motion.div>
            </AnimatePresence>
            <span className={`label muted ${styles.hint}`}>Scroll to turn the shelf</span>
          </div>
        </>
      )}

      <ul role="list" className={styles.flat} data-lenis-prevent-wheel={mode === "flat" ? true : undefined}>
        {books.map((b) => (
          <li key={b.id} className={styles.flatItem} data-flat-item>
            <div className={styles.flatCover}>
              <Image src={b.cover} alt={`Cover of ${b.title}`} width={264} height={380} sizes="(max-width: 767px) 62vw, 22vw" />
            </div>
            <p className={styles.flatTitle}>{b.title}</p>
            <p className={`muted ${styles.flatAuthor}`}>{b.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

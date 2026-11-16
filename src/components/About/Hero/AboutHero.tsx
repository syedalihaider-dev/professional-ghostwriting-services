import Image from "next/image";
import { aboutHero } from "@/content/about";
import AboutHeroMotion from "./AboutHeroMotion";
import styles from "./AboutHero.module.css";

const LAYERS = [
  { src: "/images/about/hero-writer.webp", alt: "A writer working by lamplight", cls: "l1", depth: 0.9 },
  { src: "/images/about/hero-book.webp", alt: "Hands resting on an open book", cls: "l2", depth: 0.5 },
  { src: "/images/about/hero-library.webp", alt: "Shelves of books in a dark library", cls: "l3", depth: 1.3 },
] as const;

/**
 * About hero — a five-line statement typeset in from alternating sides, with
 * three photographs layered through it at different depths.
 */
export default function AboutHero() {
  return (
    <section className={`surface-black ${styles.hero}`} data-surface="dark" aria-labelledby="about-title">
      <div className={styles.layers} aria-hidden="true">
        {LAYERS.map((l) => (
          <div key={l.src} className={`${styles.layer} ${styles[l.cls]}`} data-anim="layer" data-depth={l.depth}>
            <div className={styles.layerInner} data-anim="layer-inner">
              <Image src={l.src} alt="" fill sizes="(max-width: 1023px) 40vw, 18vw" priority={l.cls === "l1"} />
            </div>
          </div>
        ))}
      </div>

      <div className={`container ${styles.frame}`}>
        <p className="label caret-label" data-anim="fade">
          {aboutHero.label}
        </p>

        <h1 id="about-title" className={`display ${styles.title}`}>
          {aboutHero.lines.map((line, i) => {
            const accent = line.startsWith("[");
            const text = accent ? line.slice(1, -1) : line;
            return (
              <span key={line} className={`${styles.row} ${styles[`r${i}`]}`} data-anim="row">
                <span className={accent ? styles.accent : undefined} data-anim="row-inner" data-dir={i % 2 ? 1 : -1}>
                  {text}
                </span>{" "}
              </span>
            );
          })}
        </h1>

        <div className={styles.foot} data-anim="fade">
          <p className={styles.lede}>{aboutHero.lede}</p>
          <a href="#our-story" className={`label ${styles.cue}`}>
            Our story <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <AboutHeroMotion />
    </section>
  );
}

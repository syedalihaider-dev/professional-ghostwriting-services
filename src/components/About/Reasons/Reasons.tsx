import Image from "next/image";
import { reasons } from "@/content/about";
import ReasonsMotion from "./ReasonsMotion";
import styles from "./Reasons.module.css";

const IMAGES = ["/images/about/listen.webp", "/images/about/shape.webp", "/images/about/write.webp", "/images/studio/library.webp", "/images/services/publishing.webp"];

/**
 * Why clients work with us — each reason's title is marked with a volt
 * highlighter as it reaches the reading line; a sticky photograph beside the
 * list changes with it (desktop).
 */
export default function Reasons() {
  return (
    <section id="why-us" className={`surface-white ${styles.section}`} data-surface="light" aria-labelledby="reasons-title">
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <p className="label caret-label">{reasons.label}</p>
          <h2 id="reasons-title" className={`display ${styles.title}`}>
            {reasons.heading}
          </h2>
        </header>

        <ol role="list" className={styles.list}>
          {reasons.items.map((r, i) => (
            <li key={r.title} className={styles.item} data-anim="item">
              <span className="label muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`display ${styles.itemTitle}`}>
                <span className={styles.mark} data-anim="mark" aria-hidden="true" />
                <span className={styles.itemText}>{r.title}</span>
              </h3>
              <p className={styles.itemBody}>{r.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.media} aria-hidden="true">
          <div className={styles.mediaSticky}>
            {IMAGES.map((src) => (
              <div key={src} className={styles.shot} data-anim="shot">
                <Image src={src} alt="" fill sizes="30vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReasonsMotion />
    </section>
  );
}

import Image from "next/image";
import type { ServiceData } from "@/data/services";
import Film from "@/components/UI/Film/Film";
import SvcVisualMotion from "./SvcVisualMotion";
import styles from "./SvcVisual.module.css";

/** Visual storytelling — a full-bleed image (or film) with two lines crossing it. */
export default function SvcVisual({ visual }: { visual: ServiceData["visual"] }) {
  return (
    <section className={`surface-black ${styles.section}`} data-surface="dark" aria-label={visual.lines.join(" ")}>
      <div className={styles.media} data-anim="media">
        {visual.film ? <Film name={visual.film} className={styles.film} /> : <Image src={visual.image} alt={visual.alt} fill sizes="100vw" className={styles.img} />}
      </div>
      {visual.film && <div className={styles.tint} />}
      <div className={styles.shade} />
      <p className={`display ${styles.lines}`} aria-hidden="true">
        {visual.lines.map((l, i) => (
          <span key={l} className={i % 2 ? styles.right : styles.left} data-anim="vline" data-dir={i % 2 ? 1 : -1}>
            {l}
          </span>
        ))}
      </p>
      <SvcVisualMotion />
    </section>
  );
}

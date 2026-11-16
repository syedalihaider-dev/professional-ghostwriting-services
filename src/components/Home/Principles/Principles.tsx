import { principles } from "@/content/home";
import PrinciplesMotion from "./PrinciplesMotion";
import styles from "./Principles.module.css";

/**
 * Chapter VI — why us, told through the idea of invisibility. A band of
 * words written in "invisible ink" is revealed only under a lantern (the
 * cursor, or the scroll on touch screens); the principles follow in clear type.
 */
export default function Principles() {
  const words = principles.ghostWords;

  return (
    <section
      id="principles"
      className={`surface-paper ${styles.section}`}
      data-surface="light"
      data-chapter={principles.chapter}
      data-chapter-name={principles.label}
      aria-labelledby="principles-title"
    >
      <div className={`container ${styles.head}`}>
        <p className="chapter-mark">
          <b>{principles.chapter}</b>
          {principles.label}
        </p>
        <h2 id="principles-title" className={styles.title} data-anim="title">
          {principles.heading}
        </h2>
        <p className={`muted ${styles.intro}`}>{principles.intro}</p>
      </div>

      <div className={styles.band} data-anim="band" data-cursor="Reveal" aria-hidden="true">
        {(["base", "lit"] as const).map((layer) => (
          <div key={layer} className={`${styles.words} ${styles[layer]}`} data-anim={layer}>
            {words.map((w, i) => (
              <span key={w} className={i % 2 ? styles.alt : undefined}>
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>

      <ol role="list" className={`container ${styles.items}`}>
        {principles.items.map((item, i) => (
          <li key={item.title} className={styles.item} data-anim="item">
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={`muted ${styles.itemBody}`}>{item.body}</p>
          </li>
        ))}
      </ol>
      <PrinciplesMotion />
    </section>
  );
}

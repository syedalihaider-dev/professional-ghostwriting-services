import { premise } from "@/content/home";
import Film from "@/components/UI/Film/Film";
import PremiseMotion from "./PremiseMotion";
import styles from "./Premise.module.css";

/** Renders the statement, swapping the {braced} word for word + inline film chip. */
function Statement() {
  const parts = premise.statement.split(/\{(.+?)\}/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i}>
            {part}{" "}
            <span className={styles.chip} data-anim="chip" aria-hidden="true">
              <Film name="ink" className={styles.chipFilm} />
            </span>
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/**
 * Chapter I — an ivory page that slides over the hero's smoke. The statement
 * is "inked in" word by word as it is read; the figure opens like a page.
 */
export default function Premise() {
  return (
    <section
      id="premise"
      className={`surface-paper ${styles.premise}`}
      data-surface="light"
      data-chapter={premise.chapter}
      data-chapter-name={premise.label}
      aria-labelledby="premise-title"
    >
      <div className="container">
        <p className="chapter-mark">
          <b>{premise.chapter}</b>
          {premise.label}
        </p>

        <p className={styles.statement} data-anim="statement">
          <Statement />
        </p>

        <div className={styles.grid}>
          <figure className={styles.figure}>
            <div className={styles.frame} data-anim="frame">
              <div className={styles.media} data-anim="media">
                <Film name="writer" className={styles.film} />
              </div>
            </div>
            <figcaption className={`label muted ${styles.caption}`}>Fig. 1 — The work happens quietly, after hours.</figcaption>
          </figure>

          <div className={styles.copy}>
            <h2 id="premise-title" className={styles.heading} data-anim="heading">
              {premise.heading}
            </h2>
            {premise.body.map((p) => (
              <p key={p.slice(0, 16)} className={styles.body} data-anim="body">
                {p}
              </p>
            ))}

            <div className={styles.audience}>
              <p className="label muted">{premise.audienceLabel}</p>
              <ul role="list">
                {premise.audience.map((a, i) => (
                  <li key={a} data-anim="audience">
                    <span className={styles.audienceNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.audienceName}>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className={styles.signature} data-anim="body">
              {premise.signature}
            </p>
          </div>
        </div>
      </div>
      <PremiseMotion />
    </section>
  );
}

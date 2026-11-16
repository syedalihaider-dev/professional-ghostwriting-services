import { aboutQuotes } from "@/content/about";
import { testimonials } from "@/content/home";
import QuotesMotion from "./QuotesMotion";
import styles from "./Quotes.module.css";

/**
 * In their words — the three real testimonials (from the live site) on a
 * cobalt track that moves sideways with the scroll on desktop, opened by a
 * lead line. Phones read them as a vertical sequence.
 */
export default function Quotes() {
  return (
    <section className={`surface-cobalt ${styles.section}`} data-surface="dark" aria-labelledby="quotes-title">
      <div className={styles.pin} data-anim="pin">
        <div className={styles.track} data-anim="track">
          <div className={styles.lead}>
            <p className="label caret-label">{aboutQuotes.label}</p>
            <h2 id="quotes-title" className={`display ${styles.leadText}`}>
              {aboutQuotes.lead}
            </h2>
          </div>

          {testimonials.items.map((t, i) => (
            <figure key={t.name} className={styles.quote} data-anim="quote">
              <span className={`display ${styles.mark}`} aria-hidden="true">
                “
              </span>
              <blockquote className={styles.text} data-anim="qtext">
                {t.quote}
              </blockquote>
              <figcaption className={styles.sign}>
                <span className="label">{String(i + 1).padStart(2, "0")} / {String(testimonials.items.length).padStart(2, "0")}</span>
                <span className={`display ${styles.name}`}>{t.name}</span>
                <span className={styles.role}>{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <QuotesMotion />
    </section>
  );
}

import { faq } from "@/content/home";
import FaqMotion from "./FaqMotion";
import styles from "./Faq.module.css";

/**
 * Chapter VIII — questions. Native <details>/<summary>: keyboard and
 * screen-reader support for free, answers always in the HTML (and mirrored
 * in the FAQPage schema), open/close animated in CSS where supported.
 */
export default function Faq() {
  return (
    <section
      id="questions"
      className={`surface-paper ${styles.section}`}
      data-surface="light"
      data-chapter={faq.chapter}
      data-chapter-name={faq.label}
      aria-labelledby="faq-title"
    >
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <p className="chapter-mark">
            <b>{faq.chapter}</b>
            {faq.label}
          </p>
          <h2 id="faq-title" className={styles.title} data-anim="title">
            {faq.heading}
          </h2>
        </header>

        <div className={styles.list}>
          {faq.items.map((item, i) => (
            <details key={item.q} className={styles.item} name="faq" open={i === 0} data-anim="item">
              <summary className={styles.q}>
                <span className={styles.num}>Q{i + 1}</span>
                <span className={styles.qText}>{item.q}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={`muted ${styles.a}`}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <FaqMotion />
    </section>
  );
}

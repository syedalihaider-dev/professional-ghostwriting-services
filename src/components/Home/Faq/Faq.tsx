import { faq } from "@/content/home";
import FaqMotion from "./FaqMotion";
import styles from "./Faq.module.css";

/**
 * FAQ — native <details>: keyboard + screen-reader support for free, answers
 * always in the HTML (mirrored in the FAQPage schema).
 */
export default function Faq() {
  return (
    <section id="faq" className={`surface-white ${styles.section}`} data-surface="light" aria-labelledby="faq-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <p className="label caret-label">{faq.label}</p>
          <h2 id="faq-title" className={`display ${styles.title}`}>
            {faq.heading}
          </h2>
        </div>

        <div className={styles.list}>
          {faq.items.map((item, i) => (
            <details key={item.q} className={styles.item} name="faq" open={i === 0} data-anim="item">
              <summary className={styles.q}>
                <span className="label muted">{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.qText}>{item.q}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.a}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <FaqMotion />
    </section>
  );
}

import type { ServiceData } from "@/data/services";
import SvcBenefitsMotion from "./SvcBenefitsMotion";
import styles from "./SvcBenefits.module.css";

/** Benefits — four reasons, specific to the service, set as large statements. */
export default function SvcBenefits({ benefits }: { benefits: ServiceData["benefits"] }) {
  return (
    <section className={`surface-white ${styles.section}`} data-surface="light" aria-labelledby="svc-benefits-title">
      <div className="container">
        <header className={styles.head}>
          <p className="label caret-label">Why choose us</p>
          <h2 id="svc-benefits-title" className={`display ${styles.title}`}>
            {benefits.heading}
          </h2>
        </header>
        <ol role="list" className={styles.grid}>
          {benefits.items.map((b, i) => (
            <li key={b.title} className={styles.item} data-anim="benefit">
              <span className={styles.idx} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={`display ${styles.itemTitle}`}>{b.title}</h3>
              <p className={styles.body}>{b.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <SvcBenefitsMotion />
    </section>
  );
}

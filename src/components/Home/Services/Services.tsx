import { services } from "@/content/home";
import ServicesIndex from "./ServicesIndex";
import styles from "./Services.module.css";

/**
 * Chapter II — services typeset as a book's table of contents. Ghostwriting
 * leads; the rest of the publishing house follows.
 */
export default function Services() {
  return (
    <section
      id="services"
      className={`surface-paper ${styles.services}`}
      data-surface="light"
      data-chapter={services.chapter}
      data-chapter-name={services.label}
      aria-labelledby="services-title"
    >
      <div className="container">
        <header className={styles.head}>
          <p className="chapter-mark">
            <b>{services.chapter}</b>
            {services.label}
          </p>
          <h2 id="services-title" className={styles.title} data-anim="title">
            {services.heading}
          </h2>
          <p className={styles.intro}>{services.intro}</p>
        </header>

        <ServicesIndex items={services.items} />
      </div>
    </section>
  );
}

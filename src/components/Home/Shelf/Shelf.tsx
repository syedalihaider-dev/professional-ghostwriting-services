import { shelf } from "@/content/home";
import ShelfStage from "./ShelfStage";
import styles from "./Shelf.module.css";

/** Chapter V — the shelf: covers from the portfolio as bound, turnable books. */
export default function Shelf() {
  return (
    <section
      id="shelf"
      className={`surface-umber ${styles.shelf}`}
      data-surface="dark"
      data-chapter={shelf.chapter}
      data-chapter-name={shelf.label}
      aria-labelledby="shelf-title"
    >
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <p className="chapter-mark">
            <b>{shelf.chapter}</b>
            {shelf.label}
          </p>
          <h2 id="shelf-title" className={styles.title}>
            {shelf.heading}
          </h2>
          <p className={`muted ${styles.intro}`}>{shelf.intro}</p>
        </header>

        <ShelfStage books={shelf.books} />

        <div className={styles.distribution}>
          <p className="label muted">{shelf.distributionLabel}</p>
          <ul role="list">
            {shelf.distribution.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

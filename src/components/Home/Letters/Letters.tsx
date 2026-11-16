import { letters } from "@/content/home";
import LettersReader from "./LettersReader";
import LettersMotion from "./LettersMotion";
import styles from "./Letters.module.css";

/** Chapter VII — testimonials from the live site, set as letters. */
export default function Letters() {
  return (
    <section
      id="letters"
      className={`surface-oxblood ${styles.section}`}
      data-surface="dark"
      data-chapter={letters.chapter}
      data-chapter-name={letters.label}
      aria-labelledby="letters-title"
    >
      <span className={styles.mark} data-anim="mark" aria-hidden="true">
        &ldquo;
      </span>
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <p className="chapter-mark">
            <b>{letters.chapter}</b>
            {letters.label}
          </p>
          <h2 id="letters-title" className={styles.title}>
            {letters.heading}
          </h2>
        </header>
        <LettersReader items={letters.items} />
      </div>
      <LettersMotion />
    </section>
  );
}

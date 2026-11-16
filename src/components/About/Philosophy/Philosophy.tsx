import { philosophy } from "@/content/about";
import PhilosophyMotion from "./PhilosophyMotion";
import styles from "./Philosophy.module.css";

/** What we believe — one sentence, inked word by word from a faint ghost to solid. */
export default function Philosophy() {
  return (
    <section className={`surface-white ${styles.section}`} data-surface="light" aria-labelledby="philosophy-title">
      <div className="container">
        <p className="label caret-label">{philosophy.label}</p>
        <h2 id="philosophy-title" className={`display ${styles.words}`}>
          {philosophy.words.split(" ").map((w, i) => (
            <span key={i}>
              <span className={/worth|saying/i.test(w) ? styles.key : undefined} data-anim="pw">
                {w}
              </span>{" "}
            </span>
          ))}
        </h2>
        <p className={styles.body} data-anim="body">
          {philosophy.body}
        </p>
      </div>
      <PhilosophyMotion />
    </section>
  );
}

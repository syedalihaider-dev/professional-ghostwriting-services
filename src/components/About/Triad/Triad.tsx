import { triad } from "@/content/about";
import TriadMotion from "./TriadMotion";
import styles from "./Triad.module.css";

/**
 * "Your story. Your voice. Our craft." — the About page's signature. The
 * client owns the first two; the company brings the third. Pinned on
 * motion-enabled screens, each phrase arrives in its own way.
 */
export default function Triad() {
  return (
    <section className={`surface-black ${styles.triad}`} data-surface="dark" aria-label="Your story. Your voice. Our craft.">
      <div className={styles.pin} data-anim="pin">
        <ol role="list" className={`container ${styles.list}`}>
          {triad.phrases.map((p, i) => (
            <li key={p.text} className={styles.item} data-anim={`p${i}`}>
              <span className={`display ${styles.phrase} ${i === 2 ? styles.ours : ""}`} data-anim="phrase">
                {p.text}
              </span>
              <span className={styles.note} data-anim="note">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                {p.note}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <TriadMotion />
    </section>
  );
}

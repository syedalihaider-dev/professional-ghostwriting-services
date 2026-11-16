import { process } from "@/content/home";
import ProcessMotion from "./ProcessMotion";
import Manuscript from "./Manuscript";
import styles from "./Process.module.css";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * Chapter III — the process told by a single page that evolves as you
 * scroll: an idea, an outline, prose, an editor's marks, and finally a bound
 * cover with the author's name on it.
 *
 * Default (no JS / reduced motion): a static list beside the finished page.
 * With motion, ProcessMotion sets data-mode="scroll" and pins the chapter.
 */
export default function Process() {
  return (
    <section
      id="process"
      className={`surface-ink ${styles.process}`}
      data-surface="dark"
      data-chapter={process.chapter}
      data-chapter-name={process.label}
      aria-labelledby="process-title"
    >
      <div className={styles.pin} data-anim="pin">
        <div className={`container ${styles.layout}`}>
          <header className={styles.head}>
            <p className="chapter-mark">
              <b>{process.chapter}</b>
              {process.label}
            </p>
            <h2 id="process-title" className={styles.title}>
              {process.heading}
            </h2>
          </header>

          <div className={styles.numerals} aria-hidden="true">
            <div className={styles.numTrack} data-anim="num-track">
              {process.steps.map((s, i) => (
                <span key={s.id}>{pad(i)}</span>
              ))}
            </div>
          </div>

          <ol role="list" className={styles.steps}>
            {process.steps.map((s, i) => (
              <li key={s.id} className={styles.step} data-anim="step">
                <h3 className={styles.stepTitle}>
                  <span className={styles.stepIdx}>{pad(i)}</span>
                  {s.title}
                </h3>
                <p className={styles.stepBody}>{s.body}</p>
              </li>
            ))}
          </ol>

          <div className={styles.desk} aria-hidden="true">
            <Manuscript />
          </div>

          <div className={styles.progress} aria-hidden="true">
            <span className={styles.progressFill} data-anim="progress" />
            {process.steps.map((s, i) => (
              <span key={s.id} className={styles.tick} data-anim="tick" style={{ left: `${(i / (process.steps.length - 1)) * 100}%` }}>
                <span className="label">{s.title}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <ProcessMotion />
    </section>
  );
}

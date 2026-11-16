import type { ServiceData } from "@/data/services";
import SvcProcessMotion from "./SvcProcessMotion";
import styles from "./SvcProcess.module.css";

/**
 * Our process — the steps for this specific service. Desktop with motion:
 * a pinned horizontal track with a progress line. Otherwise: a vertical
 * list whose rule draws down the margin.
 */
export default function SvcProcess({ process }: { process: ServiceData["process"] }) {
  const total = process.steps.length;
  return (
    <section className={`surface-graphite ${styles.section}`} data-surface="dark" aria-labelledby="svc-process-title">
      <div className={styles.pin} data-anim="pin">
        <span className={styles.progress} aria-hidden="true">
          <span className={styles.progressFill} data-anim="progress" />
        </span>
        <div className={styles.track} data-anim="track">
          <header className={styles.head}>
            <p className="label caret-label">Our process</p>
            <h2 id="svc-process-title" className={`display ${styles.title}`}>
              {process.heading}
            </h2>
            <p className={`label muted ${styles.hint}`}>
              {String(total).padStart(2, "0")} steps <span aria-hidden="true">→</span>
            </p>
          </header>
          <div className={styles.stepsWrap}>
            <span className={styles.rail} aria-hidden="true">
              <span className={styles.railFill} data-anim="rail" />
            </span>
          <ol role="list" className={styles.steps}>
            {process.steps.map((s, i) => (
              <li key={s.title} className={styles.step} data-anim="step">
                <span className={`display ${styles.num}`} data-anim="num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`display ${styles.stepTitle}`}>{s.title}</h3>
                <p className={styles.body}>{s.body}</p>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </div>
      <SvcProcessMotion />
    </section>
  );
}

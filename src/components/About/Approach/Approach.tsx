import Image from "next/image";
import { approach } from "@/content/about";
import ApproachMotion from "./ApproachMotion";
import styles from "./Approach.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * How we work — a teleprompter. Six verbs roll upward through a reading line;
 * the active one is lit, the photograph and copy change with it, and a
 * vertical progress line fills. Static list without motion.
 */
export default function Approach() {
  const steps = approach.steps;
  return (
    <section id="how-we-work" className={`surface-graphite ${styles.approach}`} data-surface="dark" aria-labelledby="approach-title">
      <div className={styles.pin} data-anim="pin">
        <div className={`container ${styles.layout}`}>
          <header className={styles.head}>
            <p className="label caret-label">{approach.label}</p>
            <h2 id="approach-title" className={styles.title}>
              {approach.heading}
            </h2>
          </header>

          <div className={styles.reader} aria-hidden="true">
            <span className={styles.track}>
              <span className={styles.fill} data-anim="fill" />
            </span>
            <div className={styles.window}>
              <div className={styles.column} data-anim="column">
                {steps.map((s) => (
                  <span key={s.word} className={`display ${styles.word}`} data-anim="word">
                    {s.word}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.media} aria-hidden="true">
            {steps.map((s) => (
              <div key={s.word} className={styles.shot} data-anim="shot">
                <div className={styles.shotInner} data-anim="shot-inner">
                  <Image src={s.image} alt="" fill sizes="(max-width: 1023px) 100vw, 36vw" />
                </div>
              </div>
            ))}
          </div>

          <ol role="list" className={styles.steps}>
            {steps.map((s, i) => (
              <li key={s.word} className={styles.step} data-anim="step">
                <h3 className={styles.stepTitle}>
                  <span className="label">
                    {pad(i + 1)} / {pad(steps.length)}
                  </span>
                  <span className={`display ${styles.stepWord}`}>{s.word}</span>
                </h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <ApproachMotion />
    </section>
  );
}

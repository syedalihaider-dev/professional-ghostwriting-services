import Image from "next/image";
import { process } from "@/content/home";
import Film from "@/components/UI/Film/Film";
import ProcessMotion from "./ProcessMotion";
import styles from "./Process.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Process as a cinematic timeline. Default (no JS / reduced motion): a list
 * of five steps over the first frame. With motion, ProcessMotion pins the
 * section (data-mode="scroll"): backgrounds wipe in, the giant step word
 * rolls letter by letter, the copy swaps and the progress bar fills.
 */
export default function Process() {
  const steps = process.steps;

  return (
    <section id="process" className={`surface-cobalt ${styles.process}`} data-surface="dark" aria-labelledby="process-title">
      <div className={styles.pin} data-anim="pin">
        <div className={styles.bgs} aria-hidden="true">
          {steps.map((s) => (
            <div key={s.id} className={styles.bg} data-anim="bg">
              <div className={styles.bgInner} data-anim="bg-inner">
                {"film" in s && s.film ? <Film name={s.film} className={styles.bgMedia} /> : <Image src={s.image} alt="" fill sizes="100vw" className={styles.bgMedia} />}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.veil} />

        <div className={`container ${styles.frame}`}>
          <header className={styles.head}>
            <p className="label caret-label">{process.label}</p>
            <h2 id="process-title" className={styles.title}>
              {process.heading}
            </h2>
          </header>

          <div className={styles.words} aria-hidden="true">
            {steps.map((s) => (
              <span key={s.id} className={`display ${styles.word}`} data-anim="word">
                {s.word}
              </span>
            ))}
          </div>

          <ol role="list" className={styles.steps}>
            {steps.map((s, i) => (
              <li key={s.id} className={styles.step} data-anim="step">
                <h3 className={styles.stepTitle}>
                  <span className="label">{pad(i + 1)}</span>
                  {s.word}
                </h3>
                <p className={styles.stepBody}>{s.body}</p>
              </li>
            ))}
          </ol>

          <div className={styles.progress} aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.id} className={styles.seg}>
                <span className={styles.fill} data-anim="fill" />
                <span className="label">
                  {pad(i + 1)} {s.word}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <ProcessMotion />
    </section>
  );
}

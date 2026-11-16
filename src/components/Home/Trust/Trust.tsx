import type { CSSProperties } from "react";
import { trust } from "@/content/home";
import TrustMotion from "./TrustMotion";
import styles from "./Trust.module.css";

const DIGITS = Array.from({ length: 20 }, (_, i) => i % 10);

/**
 * Odometer figure. Each digit is a strip of 0–9 twice; CSS parks it on the
 * final digit (so the number reads correctly without JS) and TrustMotion
 * rolls it in from zero — at least one full turn per column.
 */
function Figure({ value, pad, suffix }: { value: number; pad: number; suffix: string }) {
  const digits = String(value).padStart(pad, "0").split("");
  return (
    <span className={`display ${styles.num}`}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span className={styles.odometer} aria-hidden="true">
        {digits.map((d, i) => (
          <span key={i} className={styles.col}>
            <span className={styles.strip} data-anim="strip" style={{ "--d": Number(d) + 10 } as CSSProperties}>
              {DIGITS.map((n, k) => (
                <span key={k}>{n}</span>
              ))}
            </span>
          </span>
        ))}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </span>
    </span>
  );
}

/** Why us — the page floods to cobalt; figures roll; reasons follow. */
export default function Trust() {
  return (
    <section id="why-us" className={`surface-cobalt ${styles.trust}`} data-surface="dark" aria-labelledby="trust-title">
      <div className="container">
        <div className={styles.head}>
          <p className="label caret-label">{trust.label}</p>
          <h2 id="trust-title" className={`display ${styles.title}`} data-anim="title">
            {trust.heading}
          </h2>
        </div>

        <dl className={styles.figures}>
          {trust.figures.map((f) => (
            <div key={f.caption} className={styles.figure} data-anim="figure">
              <dt className={`label ${styles.caption}`}>{f.caption}</dt>
              <dd>
                <Figure value={f.value} pad={f.pad} suffix={f.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        <ol role="list" className={styles.reasons}>
          {trust.reasons.map((r, i) => (
            <li key={r.title} className={styles.reason} data-anim="reason">
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`display ${styles.reasonTitle}`}>{r.title}</h3>
              <p className={styles.reasonBody}>{r.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <TrustMotion />
    </section>
  );
}

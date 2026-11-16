import Image from "next/image";
import { intro, ticker } from "@/content/home";
import IntroMotion from "./IntroMotion";
import styles from "./Intro.module.css";

/** Renders a statement line: `[word]` → accent highlight, `{word}` → image capsule + word. */
function StatementLine({ text }: { text: string }) {
  const parts = text.split(/(\[.+?\]|\{.+?\})/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") ? (
          <em key={i} className={styles.hl}>
            {part.slice(1, -1)}
          </em>
        ) : part.startsWith("{") ? (
          <span key={i}>
            <span className={styles.capsule} data-anim="capsule" aria-hidden="true">
              <Image src="/images/studio/library.webp" alt="" fill sizes="20vw" />
            </span>{" "}
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/**
 * Intro — the company in one sentence, set huge. A volt ticker crosses the
 * seam from the hero; the statement lines drift in opposite directions as
 * the reader scrolls, then the supporting detail arrives beside a revealed image.
 */
export default function Intro() {
  return (
    <section id="intro" className={`surface-white ${styles.intro}`} data-surface="light" aria-labelledby="intro-title">
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.track} data-anim="track">
          {[0, 1].map((copy) => (
            <span key={copy} className={styles.run}>
              {ticker.map((t) => (
                <span key={t} className={styles.tick}>
                  {t}
                  <span className={styles.tickCaret} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <p className="label caret-label">{intro.label}</p>
        <h2 id="intro-title" className={`display ${styles.statement}`}>
          {intro.lines.map((line, i) => (
            <span key={line} className={styles.sline} data-anim="sline" data-dir={i % 2 ? -1 : 1}>
              <StatementLine text={line} />{" "}
            </span>
          ))}
        </h2>

        <div className={styles.grid}>
          <figure className={styles.figure}>
            <div className={styles.frame} data-anim="frame">
              <div className={styles.media} data-anim="media">
                <Image src="/images/studio/library.webp" alt="Rows of books on library shelves" fill sizes="(max-width: 1023px) 100vw, 40vw" />
              </div>
              <span className={styles.cover} data-anim="cover" />
            </div>
          </figure>

          <div className={styles.copy}>
            <h3 className={styles.heading} data-anim="heading">
              {intro.heading}
            </h3>
            {intro.body.map((p) => (
              <p key={p.slice(0, 12)} className={styles.body} data-anim="body">
                {p}
              </p>
            ))}

            <div className={styles.audience}>
              <p className="label muted">{intro.audienceLabel}</p>
              <ul role="list">
                {intro.audience.map((a, i) => (
                  <li key={a} data-anim="aud">
                    <span className="label muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`display ${styles.audName}`}>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href="#process" className={`label ${styles.link}`}>
              {intro.link} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <IntroMotion />
    </section>
  );
}

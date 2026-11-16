import { firstPage } from "@/content/contact";
import FirstPageMotion from "./FirstPageMotion";
import styles from "./FirstPage.module.css";

/**
 * The Contact page's signature: a blank page lifts upright and the line is
 * typed onto it by the scroll, caret leading. The heading is real text for
 * assistive tech; the typed copy on the page is its visual twin.
 */
export default function FirstPage() {
  return (
    <section className={`surface-black ${styles.section}`} data-surface="dark" aria-labelledby="first-page-title">
      <h2 id="first-page-title" className="sr-only">
        {firstPage.lines.join(" ")}
      </h2>
      <div className={styles.pin} data-anim="pin">
        <div className={styles.stage}>
          <div className={styles.page} data-anim="page" aria-hidden="true">
            <span className={`label ${styles.head}`}>
              <span>Chapter one</span>
              <span>Draft</span>
            </span>
            <p className={`display ${styles.typed}`} data-anim="typed">
              {firstPage.lines.map((l, i) => (
                <span key={l} className={styles.typedLine}>
                  {l}
                  {i < firstPage.lines.length - 1 && " "}
                </span>
              ))}
              <span className={styles.caret} data-anim="caret" />
            </p>
            <p className={styles.body} data-anim="body">
              {firstPage.body}
            </p>
            <span className={styles.folio}>— 1 —</span>
          </div>
        </div>
      </div>
      <FirstPageMotion />
    </section>
  );
}

import { reel } from "@/content/about";
import Film from "@/components/UI/Film/Film";
import ReelMotion from "./ReelMotion";
import styles from "./Reel.module.css";

/** Full-screen visual story: a small frame of a writer at work grows to fill the screen, then the line arrives over it. */
export default function Reel() {
  return (
    <section className={`surface-black ${styles.reel}`} data-surface="dark" aria-labelledby="reel-title">
      <div className={styles.pin} data-anim="pin">
        <div className={styles.frame} data-anim="frame">
          <div className={styles.media} data-anim="media">
            <Film name="writer" className={styles.video} />
          </div>
          <div className={styles.shade} data-anim="shade" />
        </div>

        <div className={`container ${styles.copy}`}>
          <h2 id="reel-title" className={`display ${styles.title}`}>
            {reel.lines.map((l) => (
              <span key={l} className={styles.line}>
                {l.split(" ").map((w, i) => (
                  <span key={i}>
                    <span className={styles.wordMask}>
                      <span data-anim="w">{w}</span>
                    </span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className={styles.caption} data-anim="caption">
            {reel.caption}
          </p>
        </div>
      </div>
      <ReelMotion />
    </section>
  );
}

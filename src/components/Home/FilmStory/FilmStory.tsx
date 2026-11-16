import { film } from "@/content/home";
import Film from "@/components/UI/Film/Film";
import FilmStoryMotion from "./FilmStoryMotion";
import styles from "./FilmStory.module.css";

/**
 * Chapter IV — an interlude on film. A small frame of a typewriter at work
 * opens to full bleed as you scroll, while three lines take turns over it.
 */
export default function FilmStory() {
  return (
    <section
      id="film"
      className={`surface-ink ${styles.section}`}
      data-surface="dark"
      data-chapter={film.chapter}
      data-chapter-name={film.label}
      aria-labelledby="film-title"
    >
      <div className={styles.pin} data-anim="pin">
        <div className={styles.frame} data-anim="frame">
          <div className={styles.media} data-anim="media">
            <Film name="typewriter" className={styles.video} />
          </div>
          <div className={styles.shade} data-anim="shade" />
        </div>

        <div className={styles.overlay}>
          <p className="chapter-mark">
            <b>{film.chapter}</b>
            {film.label}
          </p>

          <h2 id="film-title" className={styles.lines}>
            {film.lines.map((line, i) => (
              <span key={line} className={`line-mask ${styles.lineWrap}`} data-anim="fline-wrap">
                <span className={i === film.lines.length - 1 ? styles.final : undefined} data-anim="fline">
                  {line}{" "}
                </span>
              </span>
            ))}
          </h2>

          <p className={`label ${styles.caption}`} data-anim="caption">
            {film.caption}
          </p>
        </div>
      </div>
      <FilmStoryMotion />
    </section>
  );
}

import Image from "next/image";
import { work } from "@/content/home";
import WorkMotion from "./WorkMotion";
import styles from "./Work.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Selected work as a horizontal gallery. Default: a native, swipeable row
 * (phones, reduced motion, no JS). Desktop with motion: WorkMotion pins the
 * section and scroll drives the row sideways; covers swell through centre
 * while their outlined titles drift behind at a different speed.
 */
export default function Work() {
  return (
    <section id="work" className={`surface-black ${styles.work}`} data-surface="dark" aria-labelledby="work-title">
      <div className={styles.pin} data-anim="pin">
        <div className={styles.track} data-anim="track">
          <div className={styles.introPanel}>
            <p className="label caret-label">{work.label}</p>
            <h2 id="work-title" className={`display ${styles.title}`}>
              {work.heading}
            </h2>
            <p className={`muted ${styles.intro}`}>{work.intro}</p>
            <p className={`label muted ${styles.hint}`}>
              Scroll <span aria-hidden="true">→</span>
            </p>
          </div>

          <ul role="list" className={styles.books}>
            {work.books.map((b, i) => (
              <li key={b.id} className={styles.item} data-anim="item">
                <span className={`display ${styles.ghost}`} data-anim="ghost" aria-hidden="true">
                  {b.title}
                </span>
                <figure className={styles.figure}>
                  <div className={styles.cover} data-anim="cover">
                    <Image src={b.cover} alt={`Cover of ${b.title}`} width={264} height={380} sizes="(max-width: 767px) 60vw, 26vw" />
                  </div>
                  <figcaption className={styles.caption}>
                    <span className="label muted">{pad(i + 1)}</span>
                    <span className={styles.bookTitle}>{b.title}</span>
                    <span className={`label muted ${styles.meta}`}>
                      {b.author} — {b.note}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <div className={styles.endPanel}>
            <p className="label caret-label">{work.distributionLabel}</p>
            <ul role="list" className={styles.platforms}>
              {work.distribution.map((d) => (
                <li key={d} className="display">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <WorkMotion />
    </section>
  );
}

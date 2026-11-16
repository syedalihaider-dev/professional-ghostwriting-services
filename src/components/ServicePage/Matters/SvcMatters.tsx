import Image from "next/image";
import type { ServiceData } from "@/data/services";
import SvcMattersMotion from "./SvcMattersMotion";
import styles from "./SvcMatters.module.css";

/** Why this service matters — the argument, an image and three points, on cobalt. */
export default function SvcMatters({ matters }: { matters: ServiceData["matters"] }) {
  return (
    <section className={`surface-cobalt ${styles.section}`} data-surface="dark" aria-labelledby="svc-matters-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="label caret-label">Why it matters</p>
          <h2 id="svc-matters-title" className={`display ${styles.title}`} data-anim="title">
            {matters.heading}
          </h2>
          <p className={styles.body} data-anim="body">
            {matters.body}
          </p>
        </div>
        <figure className={styles.figure} data-anim="figure">
          <div className={styles.figInner} data-anim="fig-inner">
            <Image src={matters.image} alt={matters.alt} fill sizes="(max-width: 1023px) 100vw, 40vw" />
          </div>
        </figure>

        <ol role="list" className={styles.points}>
          {matters.points.map((p, i) => (
            <li key={p.title} className={styles.point} data-anim="point">
              <span className={`display ${styles.num}`} data-anim="num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={`display ${styles.pTitle}`}>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <SvcMattersMotion />
    </section>
  );
}

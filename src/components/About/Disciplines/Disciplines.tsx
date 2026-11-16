import Image from "next/image";
import { disciplines } from "@/content/about";
import DisciplinesMotion from "./DisciplinesMotion";
import styles from "./Disciplines.module.css";

/**
 * The people behind the pages — presented as disciplines, not invented
 * individuals (no real team assets exist yet). Desktop: tall strips that
 * expand on hover/focus to reveal the role. Phones: stacked blocks.
 * When real portraits arrive, swap `image` per role and add names.
 */
export default function Disciplines() {
  return (
    <section className={`surface-black ${styles.section}`} data-surface="dark" aria-labelledby="disciplines-title">
      <div className={`container ${styles.head}`}>
        <p className="label caret-label">{disciplines.label}</p>
        <h2 id="disciplines-title" className={`display ${styles.title}`}>
          {disciplines.heading}
        </h2>
        <p className="muted">{disciplines.note}</p>
      </div>

      <ul role="list" className={`container ${styles.strips}`}>
        {disciplines.items.map((d, i) => (
          <li key={d.role} className={styles.strip} tabIndex={0} data-anim="strip" data-cursor="Meet">
            <div className={styles.media}>
              <Image src={d.image} alt="" fill sizes="(max-width: 1023px) 100vw, 40vw" />
            </div>
            <div className={styles.shade} />
            <span className={`label ${styles.num}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className={`display ${styles.vertical}`} aria-hidden="true">
              {d.role}
            </span>
            <div className={styles.detail}>
              <h3 className={`display ${styles.role}`}>{d.role}</h3>
              <p>{d.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <DisciplinesMotion />
    </section>
  );
}

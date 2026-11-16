import { expertise } from "@/content/about";
import ExpertiseIndex from "./ExpertiseIndex";
import styles from "./Expertise.module.css";

/** Our expertise — the categories we write, set as one typographic paragraph. */
export default function Expertise() {
  return (
    <section id="expertise" className={`surface-black ${styles.section}`} data-surface="dark" aria-labelledby="expertise-title">
      <ExpertiseIndex items={expertise.items}>
        <div className={styles.head}>
          <p className="label caret-label">{expertise.label}</p>
          <h2 id="expertise-title" className={styles.title}>
            {expertise.heading}
          </h2>
        </div>
      </ExpertiseIndex>
    </section>
  );
}

import Image from "next/image";
import { serviceBySlug, servicePath } from "@/data/services";
import styles from "./SvcRelated.module.css";

/**
 * Related services — internal links set as large typographic rows. On
 * hover/focus the destination's hero image opens beside the title.
 */
export default function SvcRelated({ slugs }: { slugs: string[] }) {
  const related = slugs.map((s) => serviceBySlug[s]).filter(Boolean);
  if (!related.length) return null;
  return (
    <section className={`surface-graphite ${styles.section}`} data-surface="dark" aria-labelledby="svc-related-title">
      <div className="container">
        <h2 id="svc-related-title" className="label caret-label">
          Related services
        </h2>
        <ul role="list" className={styles.list}>
          {related.map((r) => (
            <li key={r.slug}>
              <a href={servicePath(r.slug)} className={styles.link} data-cursor="Open">
                <span className={`display ${styles.name}`}>{r.short}</span>
                <span className={styles.peek} aria-hidden="true">
                  <Image src={r.hero.image} alt="" fill sizes="240px" />
                </span>
                <span className={`label ${styles.cat}`}>{r.category}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

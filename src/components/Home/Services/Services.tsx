import Image from "next/image";
import { services } from "@/content/home";
import Film from "@/components/UI/Film/Film";
import Button from "@/components/UI/Button/Button";
import ServicesMotion from "./ServicesMotion";
import styles from "./Services.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Services as a stack of full-screen panels. Each panel is sticky, so the next
 * one slides over it (native CSS — works everywhere); ServicesMotion sinks the
 * covered panel back and dims it, and punches each title in.
 */
export default function Services() {
  const total = services.items.length;

  return (
    <section id="services" className={`surface-black ${styles.services}`} data-surface="dark" aria-labelledby="services-title">
      <header className={`container ${styles.head}`}>
        <div className={styles.headTop}>
          <p className="label caret-label">{services.label}</p>
          <p className="label muted">({pad(total)})</p>
        </div>
        <h2 id="services-title" className={`display ${styles.title}`} data-anim="title">
          {services.heading}
        </h2>
      </header>

      <ol role="list" className={styles.stack}>
        {services.items.map((s, i) => (
          <li key={s.id} className={styles.panel} data-tone={s.tone} data-anim="panel">
            <article className={styles.inner} data-anim="inner" data-cursor="Start" aria-labelledby={`svc-${s.id}`}>
              <div className={styles.media} data-anim="media">
                {s.film ? <Film name={s.film} className={styles.cover} /> : <Image src={s.image} alt="" fill sizes="100vw" className={styles.cover} />}
              </div>
              <div className={styles.shade} />
              <div className={styles.dim} data-anim="dim" />

              <div className={`container ${styles.content}`}>
                <div className={styles.meta}>
                  <span className={`display ${styles.num}`}>
                    {pad(i + 1)}
                    <span>/{pad(total)}</span>
                  </span>
                  <ul role="list" className={styles.tags}>
                    {s.tags.map((t) => (
                      <li key={t} className="label">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.bottom}>
                  <h3 id={`svc-${s.id}`} className={`display ${styles.name}`} data-anim="name">
                    {s.title}
                  </h3>
                  <div className={styles.detail}>
                    <p>{s.summary}</p>
                    <Button lead={s.title}>Start with this</Button>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
      <ServicesMotion />
    </section>
  );
}

import Image from "next/image";
import { services } from "@/content/home";
import Film from "@/components/UI/Film/Film";
import Button from "@/components/UI/Button/Button";
import ServicesMotion from "./ServicesMotion";
import styles from "./Services.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Services — a pinned stage on desktop: one scroll step presents one complete
 * service (the next panel wipes up over the last; headline, media and copy
 * follow), with an index and progress bar. Phones, reduced motion and no-JS
 * get the same panels in natural flow.
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

      <div className={styles.stage} data-anim="stage">
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
                  <div className={styles.meta} data-anim="meta">
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
                    <div className={styles.detail} data-anim="detail">
                      <p>{s.summary}</p>
                      <div className={styles.actions}>
                        <Button lead={s.title}>Start with this</Button>
                        {s.href && (
                          <a href={s.href} className={`label link-u ${styles.explore}`}>
                            Explore {s.title.toLowerCase()} →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        {/* Index + progress (scroll mode only) */}
        <div className={`container ${styles.hud}`} aria-hidden="true">
          <ol className={styles.index}>
            {services.items.map((s, i) => (
              <li key={s.id} data-anim="index" data-active={i === 0 || undefined}>
                <span>{pad(i + 1)}</span> {s.title}
              </li>
            ))}
          </ol>
          <div className={styles.bars}>
            {services.items.map((s) => (
              <span key={s.id} className={styles.bar}>
                <span className={styles.barFill} data-anim="bar" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <ServicesMotion />
    </section>
  );
}

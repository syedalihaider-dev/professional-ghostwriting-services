import { finale } from "@/content/home";
import { site } from "@/config/site";
import Film from "@/components/UI/Film/Film";
import Magnetic from "@/components/UI/Magnetic/Magnetic";
import FinaleMotion from "./FinaleMotion";
import LeadTrigger from "./LeadTrigger";
import styles from "./Finale.module.css";

/**
 * The climax: pages turning in the wind open through a widening aperture
 * behind the line "Your story deserves to be read." — answered by
 * "Let's write it." and a single magnetic seal-like button.
 */
export default function Finale() {
  return (
    <section id="begin" className={`surface-ink ${styles.section}`} data-surface="dark" aria-labelledby="finale-title">
      <div className={styles.film} data-anim="film">
        <div className={styles.filmInner} data-anim="film-inner">
          <Film name="pages" className={styles.video} />
        </div>
        <div className={styles.shade} />
      </div>

      <div className={`container ${styles.inner}`}>
        <h2 id="finale-title" className={styles.title}>
          {finale.lines.map((l) => (
            <span key={l} className="line-mask" data-anim="line-wrap">
              <span data-anim="line">{l} </span>
            </span>
          ))}
        </h2>

        <div className={styles.answerRow}>
          <p className={styles.answer} data-anim="answer">
            {finale.answer}
          </p>
          <Magnetic strength={0.45}>
            <LeadTrigger className={styles.seal} label={finale.cta} />
          </Magnetic>
        </div>

        <div className={styles.meta} data-anim="meta">
          <p className="muted">{finale.note}</p>
          <a href={site.contact.phone.href} className={styles.phone}>
            <span className="label muted">Call</span>
            <span className="link-line">{site.contact.phone.display}</span>
          </a>
        </div>
      </div>
      <FinaleMotion />
    </section>
  );
}

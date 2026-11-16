import { cta } from "@/content/home";
import { site } from "@/config/site";
import Magnetic from "@/components/UI/Magnetic/Magnetic";
import LeadTrigger from "@/components/UI/LeadTrigger/LeadTrigger";
import CtaMotion from "./CtaMotion";
import styles from "./Cta.module.css";

/**
 * The climax. Volt floods up over the page from a curved edge; the two lines
 * slide apart as you scroll; one magnetic seal. As the reader continues, the
 * whole page lifts away and the footer is revealed beneath it.
 */
export default function Cta() {
  return (
    <section id="start" className={`surface-volt ${styles.cta}`} data-surface="light" aria-labelledby="cta-title">
      <div className={styles.flood} data-anim="flood" aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <p className="label caret-label">Start a project</p>

        <h2 id="cta-title" className={`display ${styles.title}`}>
          {cta.lines.map((l, i) => (
            <span key={l} className={styles.line} data-anim="cline" data-dir={i % 2 ? -1 : 1}>
              {l}
              {i === cta.lines.length - 1 && <span className={styles.caret} aria-hidden="true" />}{" "}
            </span>
          ))}
        </h2>

        <div className={styles.row}>
          <p className={styles.lede}>{cta.lede}</p>
          <Magnetic strength={0.4} className={styles.sealWrap}>
            <LeadTrigger className={styles.seal} label={cta.button} cursor="Write" />
          </Magnetic>
          <div className={styles.contact}>
            <span className="label muted">Or call</span>
            <a href={site.contact.phone.href} className={`display ${styles.phone}`}>
              {site.contact.phone.display}
            </a>
          </div>
        </div>
      </div>
      <CtaMotion />
    </section>
  );
}

import type { ServiceData } from "@/data/services";
import { site } from "@/config/site";
import Magnetic from "@/components/UI/Magnetic/Magnetic";
import LeadTrigger from "@/components/UI/LeadTrigger/LeadTrigger";
import SvcCtaMotion from "./SvcCtaMotion";
import styles from "./SvcCta.module.css";

/** Service CTA — volt; the two lines close in from either side, one seal; the footer is revealed beneath. */
export default function SvcCta({ cta, lead }: { cta: ServiceData["cta"]; lead: string }) {
  return (
    <section className={`surface-volt ${styles.cta}`} data-surface="light" aria-labelledby="svc-cta-title">
      <div className={`container ${styles.inner}`}>
        <p className="label caret-label">Start a project</p>
        <h2 id="svc-cta-title" className={`display ${styles.title}`}>
          {cta.lines.map((l, i) => (
            <span key={l} className={styles.line} data-anim="cline" data-dir={i % 2 ? 1 : -1}>
              {l}{" "}
            </span>
          ))}
        </h2>
        <div className={styles.row}>
          <p className={styles.lede}>{cta.lede}</p>
          <Magnetic strength={0.4} className={styles.sealWrap}>
            <LeadTrigger className={styles.seal} label={cta.button} cursor="Start" service={lead} />
          </Magnetic>
          <div className={styles.contact}>
            <span className="label muted">Or call</span>
            <a href={site.contact.phone.href} className={`display ${styles.phone}`}>
              {site.contact.phone.display}
            </a>
          </div>
        </div>
      </div>
      <SvcCtaMotion />
    </section>
  );
}

import Image from "next/image";
import type { ServiceData } from "@/data/services";
import SvcIntroMotion from "./SvcIntroMotion";
import styles from "./SvcIntro.module.css";

/** Introduction — editorial statement, two paragraphs and a layered image pair. */
export default function SvcIntro({ service }: { service: ServiceData }) {
  const { intro } = service;
  return (
    <section id="svc-intro" className={`surface-white ${styles.intro}`} data-surface="light" aria-labelledby="svc-intro-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="label caret-label">The service</p>
          <h2 id="svc-intro-title" className={`display ${styles.statement}`} data-anim="statement">
            {intro.statement}
          </h2>
          <div className={styles.paras}>
            {intro.paragraphs.map((p) => (
              <p key={p.slice(0, 16)} data-anim="para">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.images}>
          <figure className={styles.main} data-anim="main">
            <div className={styles.mainInner} data-anim="main-inner">
              <Image src={intro.image} alt={intro.alt} fill sizes="(max-width: 1023px) 90vw, 36vw" />
            </div>
          </figure>
          <figure className={styles.detail} data-anim="detail">
            <Image src={intro.detail} alt={intro.detailAlt} fill sizes="(max-width: 1023px) 50vw, 18vw" />
          </figure>
        </div>
      </div>
      <SvcIntroMotion />
    </section>
  );
}

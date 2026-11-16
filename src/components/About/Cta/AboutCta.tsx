import Link from "next/link";
import { aboutCta } from "@/content/about";
import { site } from "@/config/site";
import Magnetic from "@/components/UI/Magnetic/Magnetic";
import AboutCtaMotion from "./AboutCtaMotion";
import styles from "./AboutCta.module.css";

/**
 * About CTA — an iris. A volt circle opens from the centre of a black screen
 * until it fills it; the invitation rises in black; the seal leads to Contact.
 * The footer is then revealed beneath the page, as on every page.
 */
export default function AboutCta() {
  return (
    <section className={`surface-volt ${styles.cta}`} data-surface="light" aria-labelledby="about-cta-title">
      <div className={styles.pin} data-anim="pin">
        <div className={styles.iris} data-anim="iris" aria-hidden="true" />
        <div className={`container ${styles.inner}`}>
          <h2 id="about-cta-title" className={`display ${styles.title}`}>
            {aboutCta.lines.map((l, i) => (
              <span key={l} className="line-mask">
                <span className={i === 2 ? styles.voice : undefined} data-anim="line">
                  {l}
                  {i === aboutCta.lines.length - 1 && <span className={styles.caret} aria-hidden="true" />}
                </span>{" "}
              </span>
            ))}
          </h2>
          <div className={styles.row} data-anim="row">
            <Magnetic strength={0.4}>
              <Link href="/contact/" className={styles.seal} data-cursor="Contact">
                <span>{aboutCta.button}</span>
                <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                  <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
            </Magnetic>
            <div className={styles.contact}>
              <span className="label muted">Or call</span>
              <a href={site.contact.phone.href} className={`display ${styles.phone}`}>
                {site.contact.phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
      <AboutCtaMotion />
    </section>
  );
}

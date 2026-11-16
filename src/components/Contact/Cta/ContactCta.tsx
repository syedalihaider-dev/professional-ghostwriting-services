import { contactCta } from "@/content/contact";
import Magnetic from "@/components/UI/Magnetic/Magnetic";
import ContactCtaMotion from "./ContactCtaMotion";
import styles from "./ContactCta.module.css";

const BLINDS = 8;

/**
 * Contact CTA — shutters. Cobalt blinds close in from alternating edges
 * until the screen is cobalt; then the invitation arrives and the seal
 * sends the reader back to the form. The footer is revealed beneath.
 */
export default function ContactCta() {
  return (
    <section className={`surface-cobalt ${styles.cta}`} data-surface="dark" aria-labelledby="contact-cta-title">
      <div className={styles.pin} data-anim="pin">
        <div className={styles.blinds} aria-hidden="true">
          {Array.from({ length: BLINDS }, (_, i) => (
            <span key={i} className={styles.blind} data-anim="blind" />
          ))}
        </div>
        <div className={`container ${styles.inner}`}>
          <h2 id="contact-cta-title" className={`display ${styles.title}`}>
            {contactCta.lines.map((l) => (
              <span key={l} className="line-mask">
                <span data-anim="line">{l}</span>{" "}
              </span>
            ))}
            <span className="line-mask">
              <span className={styles.answer} data-anim="line">
                {contactCta.answer}
              </span>
            </span>
          </h2>
          <div data-anim="seal">
            <Magnetic strength={0.4}>
              <a href="#start-conversation" className={styles.seal} data-cursor="Write">
                <span>{contactCta.button}</span>
                <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                  <path d="M10 3v13M4.5 10.5 10 16l5.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
      <ContactCtaMotion />
    </section>
  );
}

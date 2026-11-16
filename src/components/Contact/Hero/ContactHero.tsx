import { contactHero } from "@/content/contact";
import { site } from "@/config/site";
import ContactHeroMotion from "./ContactHeroMotion";
import styles from "./ContactHero.module.css";

/**
 * Contact hero — the question is typed out with the caret, then the answer
 * lands in volt. The three direct routes sit at the foot of the screen.
 */
export default function ContactHero() {
  const { contact } = site;
  return (
    <section className={`surface-black ${styles.hero}`} data-surface="dark" aria-labelledby="contact-title">
      <div className={`container ${styles.frame}`} data-anim="frame">
        <p className="label caret-label" data-anim="fade">
          {contactHero.label}
        </p>

        <h1 id="contact-title" className={`display ${styles.title}`}>
          {contactHero.question.map((l, i) => (
            <span key={l} className={styles.q} data-anim="q">
              {l}
              {i === contactHero.question.length - 1 && <span className={styles.caret} data-anim="caret" aria-hidden="true" />}{" "}
            </span>
          ))}
          <span className={styles.answer} data-anim="answer">
            {contactHero.answer}
          </span>
        </h1>

        <div className={styles.foot} data-anim="fade">
          <p className={styles.lede}>{contactHero.lede}</p>
          <ul role="list" className={styles.routes}>
            <li>
              <span className="label muted">Call</span>
              <a href={contact.phone.href} className="link-u">
                {contact.phone.display}
              </a>
            </li>
            <li>
              <span className="label muted">Email</span>
              <a href={contact.email.href} className={`link-u ${styles.email}`}>
                {contact.email.display}
              </a>
            </li>
            <li>
              <span className="label muted">Write to us</span>
              <a href="#start-conversation" className="link-u">
                Use the form ↓
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ContactHeroMotion />
    </section>
  );
}

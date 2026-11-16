import { site } from "@/config/site";
import { contactForm, nextSteps } from "@/content/contact";
import ConversationForm from "./ConversationForm";
import ContactMainMotion from "./ContactMainMotion";
import styles from "./ContactMain.module.css";

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.address.display)}`;

/**
 * The conversation. Left: the real contact details set as typography and
 * what happens after you write. Right: a form written as sentences.
 */
export default function ContactMain() {
  const { contact } = site;
  return (
    <section id="start-conversation" className={`surface-white ${styles.main}`} data-surface="light" aria-labelledby="form-title">
      <div className={`container ${styles.grid}`}>
        <aside className={styles.info} aria-label="Contact details">
          <dl className={styles.details}>
            <div data-anim="detail">
              <dt className="label muted">Call</dt>
              <dd>
                <a href={contact.phone.href} className={`display ${styles.phone}`}>
                  {contact.phone.display}
                </a>
              </dd>
            </div>
            <div data-anim="detail">
              <dt className="label muted">Email</dt>
              <dd>
                <a href={contact.email.href} className={`link-u ${styles.email}`}>
                  {contact.email.display}
                </a>
              </dd>
            </div>
            <div data-anim="detail">
              <dt className="label muted">Location</dt>
              <dd className={styles.address}>
                <span>{contact.address.street}</span>
                <span>
                  {contact.address.city}, {contact.address.region} {contact.address.postalCode}
                </span>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" className={`label ${styles.maps}`}>
                  Open in Google Maps ↗
                </a>
              </dd>
            </div>
          </dl>

          <div className={styles.next}>
            <h2 className="label caret-label">{nextSteps.label}</h2>
            <ol role="list">
              {nextSteps.steps.map((s, i) => (
                <li key={s.title} data-anim="next">
                  <span className={`display ${styles.nextNum}`}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className={styles.nextTitle}>{s.title}</h3>
                    <p className="muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className={styles.formCol}>
          <h2 id="form-title" className="label caret-label">
            {contactForm.label}
          </h2>
          <ConversationForm />
        </div>
      </div>
      <ContactMainMotion />
    </section>
  );
}

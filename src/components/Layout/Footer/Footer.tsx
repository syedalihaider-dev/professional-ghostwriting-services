import Image from "next/image";
import { site } from "@/config/site";
import { services, servicePath } from "@/data/services";
import Button from "@/components/UI/Button/Button";
import FooterMotion from "./FooterMotion";
import styles from "./Footer.module.css";

/** Same value for every visitor, so it is cached rather than computed per request. */
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

/**
 * Revealed beneath the page like a curtain (sticky, behind <main>). The
 * closing typography is the phone number itself — the most useful thing a
 * reader can act on at the end of the page.
 */
export default function Footer() {
  const { contact } = site;

  return (
    <footer className={`surface-black ${styles.footer}`} data-surface="dark">
      <div className={styles.inner} data-anim="inner">
        <div className={`container ${styles.top}`}>
          <div className={styles.brand}>
            <Image src={site.logo.light.src} alt={site.name} width={site.logo.light.width} height={site.logo.light.height} className={styles.logo} />
            <p className={styles.tagline}>{site.tagline}</p>
            <Button lead>Start your book</Button>
          </div>

          <nav aria-labelledby="f-explore" className={styles.col}>
            <h2 id="f-explore" className="label muted">
              Explore
            </h2>
            <ul role="list">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-u">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="f-services" className={styles.col}>
            <h2 id="f-services" className="label muted">
              Services
            </h2>
            <ul role="list">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={servicePath(s.slug)} className="link-u">
                    {s.short}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className="label muted">Studio</h2>
            <address className={styles.contact}>
              <a href={contact.email.href} className={`link-u ${styles.email}`}>
                {contact.email.display}
              </a>
              <span className="muted">{contact.address.display}</span>
            </address>
          </div>
        </div>

        <a href={contact.phone.href} className={`display ${styles.giant}`} aria-label={`Call ${contact.phone.display}`}>
          <span className={styles.giantLabel} aria-hidden="true">
            Call the studio
          </span>
          <span aria-hidden="true">{contact.phone.display.replace("+1-", "")}</span>
        </a>

        <div className={`container ${styles.bottom}`}>
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <ul role="list" className={styles.legal}>
            {site.legal.map((l) => (
              <li key={l.href}>{l.built ? <a href={l.href}>{l.label}</a> : <span>{l.label}</span>}</li>
            ))}
          </ul>
        </div>
      </div>
      <FooterMotion />
    </footer>
  );
}

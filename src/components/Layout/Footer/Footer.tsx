import Image from "next/image";
import { site } from "@/config/site";
import { footer, services } from "@/content/home";
import Button from "@/components/UI/Button/Button";
import FooterMotion from "./FooterMotion";
import styles from "./Footer.module.css";

/** Same value for every visitor, so it is cached rather than computed per request. */
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default function Footer() {
  const { contact } = site;

  return (
    <footer className={`surface-ink ${styles.footer}`} data-surface="dark">
      <div className={`container ${styles.top}`} data-anim="cols">
        <div className={styles.brand}>
          <Image src={site.logo.ivory.src} alt={site.name} width={site.logo.ivory.width} height={site.logo.ivory.height} className={styles.logo} />
          <p className={styles.tagline}>{site.tagline}</p>
          <p className={`muted ${styles.blurb}`}>{footer.blurb}</p>
        </div>

        <nav aria-labelledby="f-explore" className={styles.col}>
          <h2 id="f-explore" className="label muted">
            Explore
          </h2>
          <ul role="list">
            {site.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-line">
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
            {services.items.map((s) => (
              <li key={s.id}>
                <a href="#services" className="link-line">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className="label muted">Contact</h2>
          <address className={styles.contact}>
            <a href={contact.phone.href} className={styles.phone}>
              {contact.phone.display}
            </a>
            <a href={contact.email.href} className={`link-line ${styles.email}`}>
              {contact.email.display}
            </a>
            <span className="muted">{contact.address.display}</span>
          </address>
          <Button lead variant="outline">
            Begin your book
          </Button>
        </div>
      </div>

      <div className={styles.closing} aria-hidden="true">
        <span className={styles.closingWord} data-anim="word">{footer.closing}</span>
      </div>

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
      <FooterMotion />
    </footer>
  );
}

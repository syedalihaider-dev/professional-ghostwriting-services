import { studio } from "@/content/contact";
import { site } from "@/config/site";
import StudioMotion from "./StudioMotion";
import styles from "./Studio.module.css";

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.address.display)}`;

/**
 * Location, kept typographic: no embedded map (heavy, third-party, and not
 * better than an address). A giant outlined city drifts with the scroll.
 */
export default function Studio() {
  const { address } = site.contact;
  return (
    <section className={`surface-graphite ${styles.studio}`} data-surface="dark" aria-labelledby="studio-title">
      <p className={`display ${styles.city}`} data-anim="city" aria-hidden="true">
        {studio.city} · {studio.city} · {studio.city}
      </p>
      <div className={`container ${styles.inner}`}>
        <h2 id="studio-title" className="label caret-label">
          {studio.label}
        </h2>
        <address className={styles.address}>
          <span className={`display ${styles.street}`}>{address.street}</span>
          <span>
            {address.city}, {address.region} {address.postalCode}
          </span>
        </address>
        <div className={styles.meta}>
          <p className="muted">{studio.reach}</p>
          <a href={MAPS} target="_blank" rel="noopener noreferrer" className="label link-u">
            Open in Google Maps ↗
          </a>
        </div>
      </div>
      <StudioMotion />
    </section>
  );
}

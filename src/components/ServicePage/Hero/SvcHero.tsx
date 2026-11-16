import Image from "next/image";
import Link from "next/link";
import type { ServiceData } from "@/data/services";
import { site } from "@/config/site";
import Button from "@/components/UI/Button/Button";
import SvcHeroMotion from "./SvcHeroMotion";
import styles from "./SvcHero.module.css";

/**
 * Service hero. The <h1> carries the full service name (for search and
 * screen readers) above the page's own display headline. A tall portrait
 * sits behind a cobalt sheet that wipes away on entrance.
 */
export default function SvcHero({ service }: { service: ServiceData }) {
  const { hero } = service;
  const last = hero.lines.length - 1;
  return (
    <section className={`surface-black ${styles.hero}`} data-surface="dark" aria-labelledby="svc-title">
      <figure className={styles.figure} data-anim="figure">
        <div className={styles.media} data-anim="media">
          <Image src={hero.image} alt={hero.alt} fill priority sizes="(max-width: 1023px) 100vw, 46vw" />
        </div>
        <span className={styles.sheet} data-anim="sheet" aria-hidden="true" />
      </figure>

      <div className={`container ${styles.frame}`}>
        <nav aria-label="Breadcrumb" className={styles.crumbs} data-anim="fade">
          <ol role="list">
            <li>
              <Link href="/" className="label link-u">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#services" className="label link-u">
                Services
              </Link>
            </li>
            <li aria-current="page" className="label">
              {service.short}
            </li>
          </ol>
        </nav>

        <h1 id="svc-title" className={styles.title}>
          <span className={`label caret-label ${styles.kicker}`} data-anim="fade">
            {service.name}
          </span>
          {/* keeps "Service" and the headline apart in the accessible / indexed text */}
          <span className="sr-only">: </span>
          <span className={`display ${styles.lines}`}>
            {hero.lines.map((l, i) => (
              <span key={l} className={`${styles.line} ${i === last ? styles.accent : ""}`} data-anim="line">
                {l}
                {i === last && <span className={styles.caret} aria-hidden="true" />}{" "}
              </span>
            ))}
          </span>
        </h1>

        <div className={styles.foot} data-anim="fade">
          <p className={styles.lede}>{hero.lede}</p>
          <div className={styles.actions}>
            <Button lead={service.lead} size="lg" cursor="Start">
              Start your project
            </Button>
            <a href={site.contact.phone.href} className={styles.call}>
              <span className="label muted">Or call</span>
              <span className="link-u">{site.contact.phone.display}</span>
            </a>
          </div>
        </div>

        <a href="#svc-intro" className={`label ${styles.cue}`} data-anim="fade">
          <span className={styles.cueLine} aria-hidden="true" />
          Scroll
        </a>
      </div>
      <SvcHeroMotion />
    </section>
  );
}

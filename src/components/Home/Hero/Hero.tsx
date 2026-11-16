import { hero } from "@/content/home";
import { site } from "@/config/site";
import Film from "@/components/UI/Film/Film";
import Button from "@/components/UI/Button/Button";
import HeroMotion from "./HeroMotion";
import styles from "./Hero.module.css";

/**
 * Title sequence. Ivory smoke (inverted ink-in-water footage) drifts inside a
 * portrait "page" window; the headline is set across it in difference blend.
 * On scroll the window opens to full bleed and the headline parts.
 */
export default function Hero() {
  return (
    <section id="top" className={`surface-ink ${styles.hero}`} data-surface="dark" aria-labelledby="hero-title">
      <div className={styles.stage} data-anim="stage">
        <div className={styles.film} data-anim="film">
          <div className={styles.filmInner} data-anim="film-inner">
            <Film name="ink" eager afterLoader className={styles.video} />
          </div>
          <div className={styles.vignette} />
        </div>

        <div className={styles.frame}>
          <div className={styles.top}>
            <p className="label" data-anim="fade">
              {hero.eyebrow}
            </p>
            <p className={`label ${styles.place}`} data-anim="fade">
              {site.contact.address.city}, Texas — USA
            </p>
          </div>

          <h1 id="hero-title" className={styles.title} data-anim="title">
            {hero.lines.map((line, i) => (
              <span key={i} className={`line-mask ${styles.line} ${styles[line.align]}`} data-anim="line-wrap">
                <span data-anim="line">
                  {"italic" in line && line.italic ? <em>{line.text}</em> : line.text}
                  {"after" in line ? line.after : null}
                </span>
                {/* keeps words separate in the accessible / indexed text */}
                {i < hero.lines.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <div className={styles.bottom}>
            <p className={styles.lede} data-anim="fade">
              {hero.lede}
            </p>
            <div className={styles.actions} data-anim="fade">
              <Button lead size="lg" cursor="Begin">
                {hero.cta}
              </Button>
              <a href={site.contact.phone.href} className={styles.call}>
                <span className="label muted">Or call</span>
                <span className="link-line">{site.contact.phone.display}</span>
              </a>
            </div>
            <a href="#premise" className={styles.cue} data-anim="fade">
              <span className={styles.cueLine} aria-hidden="true" />
              <span className="label">{hero.scroll}</span>
            </a>
          </div>
        </div>
      </div>
      <HeroMotion />
    </section>
  );
}

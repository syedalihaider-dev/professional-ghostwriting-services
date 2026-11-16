import { hero } from "@/content/home";
import Film from "@/components/UI/Film/Film";
import Button from "@/components/UI/Button/Button";
import HeroMotion from "./HeroMotion";
import styles from "./Hero.module.css";

/**
 * "Your idea deserves A BOOK." — the last line is a knockout: footage of
 * turning pages shows only through the letters. On desktop the stage pins and
 * the camera zooms through the stem of the B until the footage fills the
 * screen. The real <h1> is plain text; the knockout is a visual echo.
 */
export default function Hero() {
  // Wrap the first "b" — the letter the camera flies through.
  const at = hero.knockout.search(/b/i);
  const first = hero.knockout.slice(0, at);
  const zoomChar = hero.knockout.charAt(at);
  const rest = hero.knockout.slice(at + 1);

  return (
    <section id="top" className={`surface-black ${styles.hero}`} data-surface="dark" aria-labelledby="hero-title">
      <div className={styles.stage} data-anim="stage">
        {/* Knockout band (decorative) */}
        <div className={styles.knock} data-anim="knock" aria-hidden="true">
          <div className={styles.film} data-anim="film">
            <Film name="pages" eager afterLoader className={styles.video} />
          </div>
          <div className={styles.mask} data-anim="mask">
            <span className={`display ${styles.word}`} data-anim="word">
              {first}
              <span data-anim="zoom">{zoomChar}</span>
              {rest}
            </span>
          </div>
        </div>

        <div className={styles.frame}>
          <div className={styles.top} data-anim="fade">
            <p className="label caret-label">{hero.kicker}</p>
            <p className={`label muted ${styles.location}`}>{hero.location}</p>
            <a href="#intro" className={`label ${styles.cue}`}>
              {hero.scroll} <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className={styles.middle}>
            <h1 id="hero-title" className={styles.title}>
              {hero.lines.map((line, i) => (
                <span key={line} className={`display ${styles.line}`} data-anim="line">
                  {line}
                  {i === hero.lines.length - 1 && <span className={styles.caret} aria-hidden="true" />}{" "}
                </span>
              ))}
              <span className="sr-only">{hero.knockout}</span>
            </h1>

            <div className={styles.aside} data-anim="fade">
              <p className={styles.lede}>{hero.lede}</p>
              <div className={styles.actions}>
                <Button lead size="lg" cursor="Start">
                  {hero.cta}
                </Button>
                <a href="#process" className={`label link-u ${styles.secondary}`}>
                  {hero.secondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeroMotion />
    </section>
  );
}

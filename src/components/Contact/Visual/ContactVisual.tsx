import Image from "next/image";
import ContactVisualMotion from "./ContactVisualMotion";
import styles from "./ContactVisual.module.css";

/**
 * A manuscript, opened through a slit that widens to full height, with a
 * writer's desk overlapping it at a faster depth. Decorative imagery framed
 * by one line of copy.
 */
export default function ContactVisual() {
  return (
    <section className={`surface-black ${styles.visual}`} data-surface="dark" aria-label="Where every book begins">
      <div className={styles.wide} data-anim="wide">
        <div className={styles.wideInner} data-anim="wide-inner">
          <Image src="/images/contact/pages.webp" alt="Close-up of printed book pages" fill sizes="100vw" />
        </div>
        <div className={styles.shade} />
      </div>

      <div className={`container ${styles.overlay}`}>
        <p className={`display ${styles.line}`} data-anim="line">
          Every book begins
          <br />
          with a <span className={styles.hl}>message.</span>
        </p>
        <figure className={styles.portrait} data-anim="portrait">
          <Image src="/images/contact/desk.webp" alt="A typewriter and an open book on a writer’s desk" fill sizes="(max-width: 767px) 50vw, 24vw" />
        </figure>
      </div>
      <ContactVisualMotion />
    </section>
  );
}

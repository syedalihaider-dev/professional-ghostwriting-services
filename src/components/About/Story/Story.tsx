import { aboutStory } from "@/content/about";
import StoryMotion from "./StoryMotion";
import styles from "./Story.module.css";

/**
 * Our story — one long sentence travels across a pinned screen (desktop),
 * then the supporting story and who we help. On phones the sentence wraps.
 */
export default function Story() {
  const words = aboutStory.sentence.split(" ");
  return (
    <section id="our-story" className={`surface-white ${styles.story}`} data-surface="light" aria-labelledby="story-title">
      <div className={styles.pin} data-anim="pin">
        <p className={`container label caret-label ${styles.label}`}>{aboutStory.label}</p>
        <p className={`display ${styles.sentence}`} data-anim="sentence">
          {words.map((w, i) => (
            <span key={i}>
              <span className={/book/i.test(w) ? styles.hl : undefined} data-anim="sw">
                {w}
              </span>{" "}
            </span>
          ))}
        </p>
      </div>

      <div className={`container ${styles.body}`}>
        <h2 id="story-title" className={`display ${styles.heading}`} data-anim="heading">
          {aboutStory.heading}
        </h2>
        <div className={styles.copy}>
          {aboutStory.body.map((p) => (
            <p key={p.slice(0, 14)} data-anim="para">
              {p}
            </p>
          ))}
        </div>

        <div className={styles.audience}>
          <p className="label muted">{aboutStory.audienceLabel}</p>
          <ul role="list">
            {aboutStory.audience.map((a) => (
              <li key={a.who} data-anim="aud">
                <span className={`display ${styles.who}`}>{a.who}</span>
                <span className={styles.what}>{a.what}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <StoryMotion />
    </section>
  );
}

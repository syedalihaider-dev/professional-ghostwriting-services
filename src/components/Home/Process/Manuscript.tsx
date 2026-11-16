import styles from "./Manuscript.module.css";

/**
 * The illustrated page used by the Process chapter. Purely decorative (the
 * steps list carries the meaning); every layer is tagged for ProcessMotion.
 * The excerpt is illustrative sample prose, not a client manuscript.
 */
export default function Manuscript() {
  return (
    <div className={styles.book} data-anim="book">
      <div className={styles.page} data-anim="page">
        <div className={styles.runningHead}>
          <span>Draft</span>
          <span>Chapter One</span>
        </div>

        <p className={styles.idea} data-anim="idea">
          What if<span className={styles.caret} />
        </p>

        <ol className={styles.outline} data-anim="outline">
          {["The letters", "Larkin Street", "What he never said", "The crossing", "Return"].map((c, i) => (
            <li key={c} data-anim="outline-item">
              <span>Ch. {i + 1}</span>
              <span>{c}</span>
              <span className={styles.outlineRule} />
            </li>
          ))}
        </ol>

        <div className={styles.prose} data-anim="prose">
          <p data-anim="para">
            The house on Larkin Street had been quiet for eleven years when the letters <span className={styles.strike} data-anim="edit-strike">first began</span>
            <span className={styles.insert} data-anim="edit-note">
              began
            </span>{" "}
            to arrive. My father kept them in a tin beneath the stairs, each one folded twice, each one signed with the same initial.
          </p>
          <p data-anim="para">
            I found them the winter he died. I read them all in one night, by the light of the hall, and understood for the first time that the man I had known was only <span className={styles.circle} data-anim="edit-circle">half</span> of
            him.
          </p>
          <p data-anim="para">
            This is the story of the other half — of the crossing he never spoke about, and of the woman who waited for him on the far side of it.
          </p>
          <span className={`${styles.margin} ${styles.m1}`} data-anim="edit-note">
            tighten
          </span>
          <span className={`${styles.margin} ${styles.m2}`} data-anim="edit-note">
            ¶ keep
          </span>
          <svg className={styles.bracket} viewBox="0 0 10 100" preserveAspectRatio="none" data-anim="edit-path">
            <path d="M9 1 Q1 1 1 12 L1 88 Q1 99 9 99" pathLength="1" />
          </svg>
        </div>

        <div className={styles.folio}>— 1 —</div>
      </div>

      <div className={styles.cover} data-anim="cover">
        <div className={styles.coverFrame}>
          <span className={styles.coverKicker}>A memoir</span>
          <span className={styles.coverTitle}>
            The Other <em>Half</em>
          </span>
          <span className={styles.coverRule} />
          <span className={styles.coverAuthor}>Your Name</span>
          <span className={styles.coverMark}>❦</span>
        </div>
      </div>
    </div>
  );
}

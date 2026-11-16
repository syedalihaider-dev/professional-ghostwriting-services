"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { contactForm } from "@/content/contact";
import { site } from "@/config/site";
import { submitLead, validateLead } from "@/lib/lead";
import { BEZIER } from "@/lib/motion";
import { scrollToTarget } from "@/lib/lenis";
import styles from "./ConversationForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";
type Values = { name: string; email: string; phone: string; message: string };

const FIELDS: { key: keyof Values; type: string; auto?: string; required?: boolean }[] = [
  { key: "name", type: "text", auto: "name", required: true },
  { key: "email", type: "email", auto: "email", required: true },
  { key: "phone", type: "tel", auto: "tel" },
];

/**
 * A form written as a conversation. Services are real checkboxes styled as
 * chips; each field is a sentence ("My name is ___"). On success the form
 * folds away and the confirmation is set letter by letter. Failures are
 * reported honestly with the direct phone and email.
 */
export default function ConversationForm() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [services, setServices] = useState<string[]>([]);
  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const toggle = (s: string) => setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    // Clear a field's error as soon as the reader starts correcting it.
    if (errors[k])
      setErrors((cur) => {
        const next = { ...cur };
        delete next[k];
        return next;
      });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = { ...values, service: services.join(", "), company: String(new FormData(form).get("company") ?? "") };
    const fieldErrors = validateLead(payload);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(fieldErrors)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const result = await submitLead(payload);
    if (result.ok) setStatus("sent");
    else if (result.reason === "validation") {
      setErrors(result.fieldErrors);
      setStatus("idle");
    } else setStatus("error");
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <Success key="sent" name={values.name} services={services} reduce={!!reduce} />
      ) : (
        <motion.form
          key="form"
          className={styles.form}
          onSubmit={onSubmit}
          noValidate
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -40, clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.7, ease: BEZIER.inOut }}
        >
          <fieldset className={styles.services} data-anim="field">
            <legend className={`display ${styles.prompt}`}>{contactForm.servicesPrompt}</legend>
            <div className={styles.chips}>
              {contactForm.services.map((s) => (
                <label key={s} className={styles.chip} data-on={services.includes(s) || undefined}>
                  <input type="checkbox" className="sr-only" checked={services.includes(s)} onChange={() => toggle(s)} />
                  <span className={styles.chipBox} aria-hidden="true" />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          {FIELDS.map((f, i) => {
            const id = `${uid}-${f.key}`;
            const err = errors[f.key];
            return (
              <div key={f.key} className={styles.row} data-anim="field" data-filled={values[f.key] ? true : undefined}>
                <label htmlFor={id} className={`display ${styles.prompt}`}>
                  <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
                  {contactForm.fields[f.key]}
                  {f.required && <span className={styles.req} aria-hidden="true"> *</span>}
                </label>
                <div className={styles.inputWrap}>
                  <input
                    id={id}
                    name={f.key}
                    type={f.type}
                    autoComplete={f.auto}
                    required={f.required}
                    value={values[f.key]}
                    onChange={set(f.key)}
                    placeholder={contactForm.placeholders[f.key]}
                    className={styles.input}
                    aria-invalid={err ? true : undefined}
                    aria-describedby={err ? `${id}-err` : undefined}
                  />
                  <span className={styles.line} aria-hidden="true" />
                </div>
                {err && (
                  <span id={`${id}-err`} className={styles.error}>
                    {err}
                  </span>
                )}
              </div>
            );
          })}

          <div className={styles.row} data-anim="field" data-filled={values.message ? true : undefined}>
            <label htmlFor={`${uid}-message`} className={`display ${styles.prompt}`}>
              <span className={styles.idx}>04</span>
              {contactForm.fields.message}
            </label>
            <div className={styles.inputWrap}>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={4}
                value={values.message}
                onChange={set("message")}
                placeholder={contactForm.placeholders.message}
                className={`${styles.input} ${styles.textarea}`}
              />
              <span className={styles.line} aria-hidden="true" />
            </div>
          </div>

          {/* Honeypot */}
          <div className={styles.hp} aria-hidden="true">
            <label htmlFor={`${uid}-company`}>Company</label>
            <input id={`${uid}-company`} name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <button type="submit" className={`display ${styles.submit}`} disabled={status === "sending"} data-anim="field" data-cursor="Send">
            <span className={styles.submitText}>{status === "sending" ? "Sending" : contactForm.submit}</span>
            <span className={styles.submitArrow} aria-hidden="true">
              {status === "sending" ? <span className={styles.sendingCaret} /> : "→"}
            </span>
          </button>

          <div aria-live="polite">
            {status === "error" && (
              <p className={styles.failure}>
                {contactForm.failure} <a href={site.contact.phone.href}>{site.contact.phone.display}</a> ·{" "}
                <a href={site.contact.email.href}>{site.contact.email.display}</a>
              </p>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/** Success: the confirmation is set letter by letter, then the follow-up line types in. */
function Success({ name, services, reduce }: { name: string; services: string[]; reduce: boolean }) {
  const { title, line, note } = contactForm.success;
  const ref = useRef<HTMLDivElement>(null);
  // The form folds away and the page shortens — bring the confirmation into view.
  useEffect(() => {
    const el = ref.current?.closest("section");
    if (el) scrollToTarget(el);
  }, []);
  const letter = {
    hidden: reduce ? { opacity: 0 } : { y: "110%" },
    show: (i: number) => ({ y: "0%", opacity: 1, transition: { delay: 0.25 + i * 0.03, duration: 0.8, ease: BEZIER.out } }),
  };
  let n = 0;
  return (
    <motion.div ref={ref} className={styles.success} role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <p className={`display ${styles.successTitle}`} aria-label={title.join(" ")}>
        {title.map((t) => (
          <span key={t} className={styles.successLine} aria-hidden="true">
            {t.split("").map((ch) => (
              <motion.span key={n} className={styles.successChar} custom={n++} variants={letter} initial="hidden" animate="show">
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
          </span>
        ))}
      </p>
      <motion.p className={`display ${styles.successLine2}`} initial={{ clipPath: "inset(0% 100% 0% 0%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} transition={{ delay: 0.25 + n * 0.03 + 0.3, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}>
        {line}
        <span className={styles.sendingCaret} aria-hidden="true" />
      </motion.p>
      <motion.div className={styles.successMeta} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.6 }}>
        <p>
          Thank you{name ? `, ${name.split(" ")[0]}` : ""}.{services.length ? ` We’ve noted your interest in ${services.join(", ").toLowerCase()}.` : ""}
        </p>
        <p className="muted">{note}</p>
        <p className={styles.successLinks}>
          <a href={site.contact.phone.href} className="link-u">
            {site.contact.phone.display}
          </a>
          <a href={site.contact.email.href} className="link-u">
            {site.contact.email.display}
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}

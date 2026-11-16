"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LEAD_FIELDS, submitLead, validateLead } from "@/lib/lead";
import { leadStore, useLeadState } from "@/lib/leadStore";
import { useDialog } from "@/hooks/useDialog";
import { BEZIER } from "@/lib/motion";
import { site } from "@/config/site";
import styles from "./LeadDialog.module.css";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";

/**
 * "Begin your book" — a letter-style enquiry sheet that slides in like a
 * page from the right. Shared by every CTA through leadStore.
 */
export default function LeadDialog() {
  const { open, service } = useLeadState();
  const reduce = useReducedMotion();
  const ref = useDialog<HTMLDivElement>(open, leadStore.close);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className={styles.root} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <button type="button" className={styles.scrim} onClick={leadStore.close} aria-label="Close" tabIndex={-1} />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-title"
            className={`surface-paper ${styles.sheet}`}
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: "0%" }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduce ? 0.2 : 0.85, ease: BEZIER.inOut }}
            data-lenis-prevent
          >
            {/* Remount the form on every open so it starts clean. */}
            <LeadForm key={service} initialService={service} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LeadForm({ initialService }: { initialService: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const fieldErrors = validateLead(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(fieldErrors)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const result = await submitLead(data);
    if (result.ok) setStatus("sent");
    else if (result.reason === "validation") {
      setErrors(result.fieldErrors);
      setStatus("idle");
    } else setStatus(result.reason === "unavailable" ? "unavailable" : "error");
  }

  return (
    <div className={styles.inner}>
      <div className={styles.head}>
        <p className="chapter-mark">
          <b>A new chapter</b>
        </p>
        <button type="button" className={styles.close} onClick={leadStore.close}>
          Close <span aria-hidden="true">×</span>
        </button>
      </div>

      <h2 id="lead-title" className={styles.title}>
        Tell us about <em>your</em> book.
      </h2>

      {status === "sent" ? (
        <div className={styles.done} role="status">
          <p className={styles.doneTitle}>Thank you — your letter is on our desk.</p>
          <p className="muted">We&rsquo;ll be in touch shortly. If it&rsquo;s easier to talk now, call us on {site.contact.phone.display}.</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          {LEAD_FIELDS.map((f) => {
            const id = `lead-${f.name}`;
            const err = errors[f.name];
            const common = {
              id,
              name: f.name,
              required: f.required,
              autoComplete: f.autoComplete,
              "aria-invalid": err ? true : undefined,
              "aria-describedby": err ? `${id}-err` : undefined,
              className: styles.input,
            };
            return (
              <div key={f.name} className={`${styles.field} ${f.type === "textarea" ? styles.full : ""}`}>
                <label htmlFor={id} className={styles.label}>
                  {f.label}
                  {f.required && <span aria-hidden="true"> *</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea {...common} rows={4} />
                ) : f.type === "select" ? (
                  <select {...common} defaultValue={f.options?.includes(initialService) ? initialService : "Ghostwriting"}>
                    {f.options?.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input {...common} type={f.type} data-autofocus={f.name === "name" ? true : undefined} />
                )}
                {err && (
                  <span id={`${id}-err`} className={styles.error}>
                    {err}
                  </span>
                )}
              </div>
            );
          })}

          {/* Honeypot */}
          <div className={styles.hp} aria-hidden="true">
            <label htmlFor="lead-company">Company</label>
            <input id="lead-company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div className={`${styles.full} ${styles.submitRow}`}>
            <button type="submit" className={styles.submit} disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send my enquiry"}
            </button>
            <p className={styles.alt}>
              Or call <a href={site.contact.phone.href}>{site.contact.phone.display}</a>
            </p>
          </div>

          <div aria-live="polite" className={styles.full}>
            {(status === "error" || status === "unavailable") && (
              <p className={styles.error}>
                We couldn&rsquo;t send your enquiry just now. Please call {site.contact.phone.display} or email {site.contact.email.display}.
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

/**
 * Lead form definition + validation, shared by the client (instant feedback)
 * and the /api/lead route handler (the trust boundary).
 */
export type LeadField = {
  name: "name" | "email" | "phone" | "service" | "message";
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  required?: boolean;
  autoComplete?: string;
  options?: readonly string[];
};

/** Service options mirror the live site's contact form. */
export const LEAD_SERVICES = [
  "Ghostwriting",
  "Book Editing",
  "Book Publishing",
  "Book Marketing",
  "Author Branding",
  "Book Cover",
  "Book Illustration",
  "Book Trailer",
  "Book Proofreading",
  "Content Writing",
  "Article Writing",
  "Business Plan Writing",
  "Not sure yet",
] as const;

export const LEAD_FIELDS: readonly LeadField[] = [
  { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "service", label: "What do you need?", type: "select", options: LEAD_SERVICES },
  { name: "message", label: "Tell us about your book", type: "textarea" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

export function validateLead(values: Record<string, string>) {
  const errors: Record<string, string> = {};
  for (const field of LEAD_FIELDS) {
    const value = (values[field.name] ?? "").trim();
    if (field.required && !value) {
      errors[field.name] = `${field.label} is required.`;
      continue;
    }
    if (!value) continue;
    if (field.type === "email" && !EMAIL_RE.test(value)) errors[field.name] = "Please enter a valid email address.";
    else if (field.type === "tel" && !PHONE_RE.test(value)) errors[field.name] = "Please enter a valid phone number.";
    // Select fields may carry several choices ("A, B") from the contact page's chips.
    else if (field.options && !value.split(", ").every((v) => field.options!.includes(v))) errors[field.name] = "Please choose from the listed options.";
    else if (value.length > (field.type === "textarea" ? 5000 : 200)) errors[field.name] = `${field.label} is too long.`;
  }
  return errors;
}

export type LeadResult =
  | { ok: true }
  | { ok: false; reason: "validation"; fieldErrors: Record<string, string> }
  | { ok: false; reason: "unavailable" | "network" | "server" };

export async function submitLead(values: Record<string, string>): Promise<LeadResult> {
  try {
    const res = await fetch("/api/lead/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true };
    if (res.status === 422) return { ok: false, reason: "validation", fieldErrors: data.fieldErrors ?? {} };
    if (res.status === 503) return { ok: false, reason: "unavailable" };
    return { ok: false, reason: "server" };
  } catch {
    return { ok: false, reason: "network" };
  }
}

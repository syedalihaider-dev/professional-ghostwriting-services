import { testimonials } from "@/content/home";
import TestimonialsReader from "./TestimonialsReader";
import styles from "./Testimonials.module.css";

/** Testimonials — the three real quotes from the live site, set large. */
export default function Testimonials() {
  return (
    <section id="testimonials" className={`surface-white ${styles.section}`} data-surface="light" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 id="testimonials-title" className="label caret-label">
          {testimonials.label}
        </h2>
        <TestimonialsReader items={testimonials.items} />
      </div>
    </section>
  );
}

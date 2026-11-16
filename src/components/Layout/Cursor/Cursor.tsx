"use client";

import { useEffect, useRef } from "react";
import { gsap, MQ } from "@/lib/gsap";
import styles from "./Cursor.module.css";

/**
 * A quiet custom cursor: a point that tracks exactly and a ring that trails.
 * Over interactive elements the ring opens; elements with `data-cursor="…"`
 * show that word inside it. Mouse-only — touch and reduced motion keep the
 * native cursor, and nothing is attached for them.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia(MQ.hover);
    const motionOk = window.matchMedia(MQ.motion);
    if (!fine.matches || !motionOk.matches || !dot.current || !ring.current || !label.current) return;

    const html = document.documentElement;
    html.classList.add("has-cursor");
    const d = dot.current;
    const r = ring.current;
    const l = label.current;

    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });

    let shown = false;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        shown = true;
        gsap.set([d, r], { x: e.clientX, y: e.clientY });
        gsap.to([d, r], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as Element).closest?.("[data-cursor], a, button, summary, label, select, input, textarea");
      const word = t?.getAttribute("data-cursor") ?? "";
      const textual = t?.matches("input, textarea, select");
      r.dataset.state = !t ? "" : textual ? "text" : word ? "label" : "link";
      l.textContent = word;
    };

    const leave = () => {
      shown = false;
      gsap.to([d, r], { opacity: 0, duration: 0.3 });
    };
    const down = () => r.classList.add(styles.down);
    const up = () => r.classList.remove(styles.down);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div className={styles.cursor} aria-hidden="true">
      <div ref={ring} className={styles.ring}>
        <span ref={label} className={styles.label} />
      </div>
      <div ref={dot} className={styles.dot} />
    </div>
  );
}

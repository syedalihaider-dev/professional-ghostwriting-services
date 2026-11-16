"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { revealLines, riseChars } from "@/animations/text";
import { gsap, MQ, SplitText } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

/** Scroll length given to each service, in % of the viewport height. */
const STEP = 120;

/**
 * Services motion language — "the stage".
 *
 * Desktop: the stage pins and one ScrollTrigger timeline presents the
 * services in sequence, each owning STEP vh of scroll. When a scroll gesture
 * comes to rest, Lenis glides to the next (or previous) service — one step
 * per gesture, never more — so every service is shown complete. Input stays
 * native: nothing intercepts the wheel.
 *   Transition: the incoming panel wipes up over the outgoing one, which
 *   sinks back and dims; the headline punches up letter by letter, the media
 *   settles from a push-in, the meta and copy follow; index + bar advance.
 *
 * Phones: no pin. Panels flow naturally with a light headline reveal and a
 * gentle media drift. Reduced motion: the static flow.
 */
export default function ServicesMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string, root: ParentNode = section) => Array.from(root.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const panels = q("panel");
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      const [title] = q("title");
      if (title) revealLines(title, { trigger: title });
    });

    mm.add(MQ.desktop, () => {
      section.dataset.mode = "scroll";
      const [stage] = q("stage");
      const indexItems = q("index");
      const bars = q("bar");
      const last = panels.length - 1;

      const parts = panels.map((panel) => ({
        panel,
        inner: q("inner", panel)[0],
        media: q("media", panel)[0],
        dim: q("dim", panel)[0],
        meta: q("meta", panel)[0],
        detail: q("detail", panel)[0],
        split: SplitText.create(q("name", panel)[0], { type: "words,chars", mask: "chars" }),
      }));

      // Opening state: only the first service is on stage.
      parts.forEach((p, i) => {
        gsap.set(p.panel, { zIndex: i + 1, clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" });
        if (i > 0) {
          gsap.set(p.media, { scale: 1.3 });
          gsap.set(p.split.chars, { yPercent: 105, skewY: 8 });
          gsap.set([p.meta, p.detail], { autoAlpha: 0, y: 30 });
        }
      });

      let current = -1;
      const setActive = (i: number) => {
        if (i === current) return;
        current = i;
        indexItems.forEach((el, k) => el.toggleAttribute("data-active", k === i));
      };
      setActive(0);

      // Gesture-stepped settling, done through Lenis (the site's one scroll
      // engine — ScrollTrigger's own snap tweens native scroll and fights it).
      // When scrolling comes to rest inside the stage, glide to the service the
      // reader was heading for: at most ONE step from the last settled service
      // per gesture (nudges under 12% of a step stay put). Entering from above
      // lands on the first service, from below on the last; moving on past the
      // final service releases the pin. Input stays native — no wheel hijack.
      const total = last + 0.5; // timeline length in steps (incl. final hold)
      let settled = 0;
      let gliding = false;
      let restTimer = 0;
      let glideTimer = 0;
      const rest = { immediateRender: false } as const;
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: `+=${panels.length * STEP}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onEnter: () => (settled = -1),
          onEnterBack: () => (settled = last + 1),
          onUpdate: (self) => setActive(Math.min(last, Math.round(self.progress * total))),
        },
      });

      // Bar i fills while service i is on stage.
      bars.forEach((bar, i) => tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: i === 0 ? 0.5 : 1, ...rest }, Math.max(0, i - 0.5)));

      tl.addLabel("s0", 0);
      for (let i = 1; i <= last; i++) {
        const prev = parts[i - 1];
        const next = parts[i];
        const at = i - 0.5;
        // Everything for service i must FINISH by its label (i), where the stage
        // settles — anything still running there would freeze half-revealed
        // (a long letter stagger did exactly that to two-line titles).
        tl.fromTo(next.panel, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ...rest }, at)
          .fromTo(prev.inner, { scale: 1 }, { scale: 0.9, duration: 0.45, ...rest }, at)
          .fromTo(prev.dim, { opacity: 0 }, { opacity: 0.75, duration: 0.45, ...rest }, at)
          .fromTo(next.media, { scale: 1.3 }, { scale: 1, duration: 0.5, ease: "power2.out", ...rest }, at)
          .fromTo(next.split.chars, { yPercent: 105, skewY: 8 }, { yPercent: 0, skewY: 0, duration: 0.25, stagger: { amount: 0.08 }, ease: "power3.out", ...rest }, at + 0.15)
          .fromTo([next.meta, next.detail], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.04, ease: "power3.out", ...rest }, at + 0.25)
          .addLabel(`s${i}`, i);
      }
      tl.to({}, { duration: 0.5 }, last); // hold the final service before releasing

      const st = tl.scrollTrigger!;
      const settle = () => {
        if (gliding) return;
        const y = window.scrollY;
        if (y < st.start - 1 || y > st.end + 1) return; // outside the stage
        const stepPx = (st.end - st.start) / total;
        let target: number;
        if (settled < 0) target = 0;
        else if (settled > last) target = last;
        else {
          const delta = (y - st.start) / stepPx - settled;
          target = delta > 0.12 ? settled + 1 : delta < -0.12 ? settled - 1 : settled;
        }
        if (target < 0) return; // heading back up out of the stage
        // Settle a few px INSIDE the stage: landing exactly on its start line can
        // round to just outside, and re-entering would restart at service one.
        const targetY = target > last ? st.end + 2 : st.start + 4 + target * stepPx; // past the last → release
        settled = Math.min(target, last);
        if (Math.abs(targetY - y) < 2) return;
        // No input lock: the reader can always interrupt a glide (a locked
        // glide swallowed the next gesture). A timer guarantees the flag clears
        // even when a glide is interrupted and never reports completion.
        gliding = true;
        window.clearTimeout(glideTimer);
        const done = () => {
          window.clearTimeout(glideTimer);
          gliding = false;
        };
        glideTimer = window.setTimeout(done, 950);
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(targetY, { duration: 0.85, easing: (t: number) => 1 - Math.pow(1 - t, 3), force: true, onComplete: done });
        else window.scrollTo({ top: targetY, behavior: "smooth" });
      };
      const onScroll = () => {
        window.clearTimeout(restTimer);
        if (!gliding) restTimer = window.setTimeout(settle, 140);
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.clearTimeout(restTimer);
        window.clearTimeout(glideTimer);
        parts.forEach((p) => p.split.revert());
        delete section.dataset.mode;
      };
    });

    // Phones: natural scroll, light reveals.
    mm.add(MQ.mobile, () => {
      panels.forEach((panel) => {
        const name = q("name", panel)[0];
        const media = q("media", panel)[0];
        riseChars(name, { trigger: panel, start: "top 60%", stagger: 0.015 });
        gsap.fromTo(media, { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });
  });

  return <span ref={marker} hidden />;
}

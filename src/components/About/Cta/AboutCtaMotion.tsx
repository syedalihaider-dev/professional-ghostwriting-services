"use client";

import { useSectionMotion } from "@/animations/useSectionMotion";
import { gsap, MQ } from "@/lib/gsap";

/**
 * About CTA motion language — "the iris":
 * pinned (desktop) or scrubbed (phones); a volt circle opens from the centre
 * until it fills the screen, then the invitation rises line by line and the
 * seal drops in. Reduced motion shows the finished volt composition.
 */
export default function AboutCtaMotion() {
  const marker = useSectionMotion((section) => {
    const q = (s: string) => Array.from(section.querySelectorAll<HTMLElement>(`[data-anim='${s}']`));
    const mm = gsap.matchMedia();

    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      const [iris] = q("iris");
      gsap.set(q("line"), { yPercent: 110 });
      gsap.set(q("row"), { opacity: 0, y: 30 });

      gsap
        .timeline({
          scrollTrigger: desktop
            ? { trigger: section, start: "top top", end: "+=120%", pin: q("pin")[0], scrub: 0.8, anticipatePin: 1 }
            : { trigger: section, start: "top 80%", end: "bottom bottom", scrub: 0.8 },
        })
        .fromTo(iris, { clipPath: "circle(0% at 50% 55%)" }, { clipPath: "circle(75% at 50% 50%)", duration: 1.2, ease: "power2.in" })
        .to(q("line"), { yPercent: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, ">-0.2")
        .to(q("row"), { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, ">-0.2")
        .to({}, { duration: 0.3 });
    });
  });
  return <span ref={marker} hidden />;
}

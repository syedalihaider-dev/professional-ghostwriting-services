"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { ScrollTrigger } from "@/lib/gsap";
import { onLoaderDone } from "@/lib/loader";
import { BEZIER } from "@/lib/motion";
import Button from "@/components/UI/Button/Button";
import Menu from "./Menu";
import styles from "./Header.module.css";

type Theme = "dark" | "light";

/**
 * Fixed header. Retreats while reading down, returns on any upward scroll,
 * and swaps between ivory and ink artwork to suit the chapter beneath it
 * (sections declare `data-surface="light"` when they are paper).
 */
export default function Header() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const lastY = useRef(0);

  useEffect(() => onLoaderDone(() => setReady(true)), []);

  // Direction-aware visibility.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 240);
        lastY.current = y;
      }
      setScrolled(y > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Surface detection: whichever section sits under the header's midline.
  useEffect(() => {
    let triggers: ScrollTrigger[] = [];
    const build = () => {
      triggers.forEach((t) => t.kill());
      triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-surface]")).map((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 40px",
          end: "bottom 40px",
          onToggle: (self) => {
            if (self.isActive) setTheme(section.dataset.surface === "light" ? "light" : "dark");
          },
        }),
      );
    };
    const off = onLoaderDone(build);
    return () => {
      off();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <motion.header
        className={styles.header}
        data-theme={menuOpen ? "dark" : theme}
        data-scrolled={scrolled || undefined}
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-110%" : "0%", opacity: ready ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: BEZIER.out }}
      >
        <div className={styles.bar}>
          <Link href="/" className={styles.logo} aria-label={`${site.name} — home`} data-cursor="Home">
            <Image className={styles.logoIvory} src={site.logo.ivory.src} alt="" width={site.logo.ivory.width} height={site.logo.ivory.height} priority />
            <Image className={styles.logoInk} src={site.logo.ink.src} alt="" width={site.logo.ink.width} height={site.logo.ink.height} />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul role="list">
              {site.nav.map((item, i) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.navLink}>
                    <span className={styles.navNum} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="link-line">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a href={site.contact.phone.href} className={`${styles.phone} link-line`}>
              {site.contact.phone.display}
            </a>
            <Button lead className={styles.cta}>
              Begin your book
            </Button>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span className={styles.toggleLabel} aria-hidden="true">
                {menuOpen ? "Close" : "Menu"}
              </span>
              <span className={styles.toggleLines} aria-hidden="true" data-open={menuOpen || undefined}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

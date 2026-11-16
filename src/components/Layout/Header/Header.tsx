"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { ScrollTrigger } from "@/lib/gsap";
import { onLoaderDone, onReveal } from "@/lib/loader";
import { normPath } from "@/lib/path";
import { BEZIER } from "@/lib/motion";
import Button from "@/components/UI/Button/Button";
import Menu from "./Menu";
import ServicesMenu from "./ServicesMenu";
import styles from "./Header.module.css";

type Theme = "dark" | "light";

/**
 * Minimal fixed header. Retreats while reading down, returns on any upward
 * scroll, and flips its artwork to suit the section beneath it (sections
 * declare `data-surface="light"`). The current surface is also published on
 * <html data-surface> so the cursor can match it.
 */
export default function Header() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  // The menu belongs to the page it was opened on — navigating closes it.
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const menuOpen = menuFor === pathname;
  const setMenuOpen = (open: boolean) => setMenuFor(open ? pathname : null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const lastY = useRef(0);

  useEffect(() => onLoaderDone(() => setReady(true)), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 240);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let triggers: ScrollTrigger[] = [];
    const build = () => {
      triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-surface]")).map((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 36px",
          end: "bottom 36px",
          onToggle: (self) => {
            if (!self.isActive) return;
            const next: Theme = section.dataset.surface === "light" ? "light" : "dark";
            setTheme(next);
            document.documentElement.dataset.surface = next;
          },
        }),
      );
    };
    // Rebuilt for every page, once its content is uncovered.
    const off = onReveal(build);
    return () => {
      off();
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  return (
    <>
      <motion.header
        className={styles.header}
        data-theme={menuOpen ? "dark" : theme}
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-110%" : "0%", opacity: ready ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.6, ease: BEZIER.out }}
      >
        <div className={styles.bar}>
          <Link href="/" className={styles.logo} aria-label={`${site.name} — home`}>
            <Image className={styles.logoLight} src={site.logo.light.src} alt="" width={site.logo.light.width} height={site.logo.light.height} priority />
            <Image className={styles.logoDark} src={site.logo.dark.src} alt="" width={site.logo.dark.width} height={site.logo.dark.height} />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul role="list">
              {site.nav.map((item, i) =>
                item.label === "Services" ? (
                  <ServicesMenu key={item.href} index={i} />
                ) : (
                <li key={item.href}>
                  {/* In-page anchors (/#…) never mark the current page. */}
                  <a href={item.href} className={styles.navLink} aria-current={!item.href.includes("#") && normPath(pathname) === normPath(item.href) ? "page" : undefined}>
                    <span className={styles.navNum} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.navText}>{item.label}</span>
                  </a>
                </li>
                ),
              )}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a href={site.contact.phone.href} className={`${styles.phone} link-u`}>
              {site.contact.phone.display}
            </a>
            <span className={styles.cta}>
              <Button lead>Start your book</Button>
            </span>
            <button type="button" className={styles.toggle} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span className={styles.toggleLabel} aria-hidden="true">
                {menuOpen ? "Close" : "Menu"}
              </span>
              <span className={styles.toggleIcon} aria-hidden="true" data-open={menuOpen || undefined}>
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

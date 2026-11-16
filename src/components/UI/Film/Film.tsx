"use client";

import { useEffect, useRef } from "react";
import { films, type FilmName } from "@/config/media";
import { onReveal } from "@/lib/loader";
import { prefersReducedMotion } from "@/lib/gsap";
import styles from "./Film.module.css";

type Props = {
  name: FilmName;
  className?: string;
  /** Start fetching immediately (hero). Others load only when near the viewport. */
  eager?: boolean;
  /** Wait for the preloader before playing. */
  afterLoader?: boolean;
};

/**
 * Decorative background film. Muted, looping and hidden from assistive tech.
 * Plays only while on screen, picks the 360p rendition on small screens and
 * stays on its poster frame for reduced-motion visitors or Save-Data.
 */
export default function Film({ name, className, eager = false, afterLoader = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const film = films[name];

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (prefersReducedMotion() || saveData) return;

    let visible = false;
    let ready = !afterLoader;
    let loaded = eager;

    const sync = () => {
      if (visible && ready) {
        if (!loaded) {
          loaded = true;
          video.preload = "auto";
          video.load();
        }
        video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    };

    // Start buffering a screen before the film is visible.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          loaded = true;
          video.preload = "auto";
          video.load();
          near.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    near.observe(video);
    onScreen.observe(video);

    const offLoader = afterLoader
      ? onReveal(() => {
          ready = true;
          sync();
        })
      : () => {};

    return () => {
      near.disconnect();
      onScreen.disconnect();
      offLoader();
    };
  }, [afterLoader, eager]);

  return (
    <video
      ref={ref}
      className={`${styles.film} ${className ?? ""}`}
      poster={film.poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    >
      <source src={film.mobile} type="video/mp4" media="(max-width: 767px)" />
      <source src={film.desktop} type="video/mp4" />
    </video>
  );
}

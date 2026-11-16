/**
 * Film library. Clips are from Mixkit (Mixkit Stock Video Free License —
 * commercial use, no attribution). 720p desktop + 360p mobile renditions,
 * and a graded WebP poster that doubles as the fallback.
 * Swap any entry for client-supplied footage without touching components.
 */
export const films = {
  /** Mixkit #25185 — pages turning. Seen through the hero's knockout letters. */
  pages: { desktop: "/videos/pages-720.mp4", mobile: "/videos/pages-360.mp4", poster: "/images/posters/pages.webp" },
  /** Mixkit #10396 — typewriter macro (Process: Write). */
  typewriter: { desktop: "/videos/typewriter-720.mp4", mobile: "/videos/typewriter-360.mp4", poster: "/images/posters/typewriter.webp" },
  /** Mixkit #16139 — a writer at work (Services: Book Ghostwriting). */
  writer: { desktop: "/videos/writer-720.mp4", mobile: "/videos/writer-360.mp4", poster: "/images/posters/writer.webp" },
} as const;

export type FilmName = keyof typeof films;

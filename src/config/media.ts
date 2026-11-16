/**
 * Film library. Clips are from Mixkit (Mixkit Stock Video Free License —
 * commercial use, no attribution). Each has a 720p desktop and a 360p mobile
 * rendition plus a lightweight WebP poster that doubles as the fallback.
 * Swap any entry for client-supplied footage without touching components.
 */
export const films = {
  /** Mixkit #152, inverted + graded in CSS: ivory smoke on ink. The poster is the RAW frame — the same CSS filter grades it. */
  ink: { desktop: "/videos/ink-720.mp4", mobile: "/videos/ink-360.mp4", poster: "/images/posters/ink.webp" },
  /** Mixkit #10396 — typewriter macro. */
  typewriter: { desktop: "/videos/typewriter-720.mp4", mobile: "/videos/typewriter-360.mp4", poster: "/images/posters/typewriter.webp" },
  /** Mixkit #25185 — pages moving in the wind. */
  pages: { desktop: "/videos/pages-720.mp4", mobile: "/videos/pages-360.mp4", poster: "/images/posters/pages.webp" },
  /** Mixkit #16139 — a writer at work by lamplight. */
  writer: { desktop: "/videos/writer-720.mp4", mobile: "/videos/writer-360.mp4", poster: "/images/posters/writer.webp" },
} as const;

export type FilmName = keyof typeof films;

# Professional Ghostwriting Services — website

Next.js 16 (App Router, Cache Components, React Compiler) · TypeScript · CSS Modules · GSAP + ScrollTrigger + SplitText · Lenis · Motion.

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Identity — "Idea → Book"

The brand motif is the **text caret**: a solid block that blinks at the moment of writing. It
appears as the preloader cursor, the headline accent, the label marker and the mouse cursor.

| Role | Token | Value |
| --- | --- | --- |
| Primary background | `--black` | `#0A0A0C` |
| Secondary background | `--graphite` | `#131317` |
| Main text / light surface | `--white` | `#F3F4F6` |
| Muted text (dark / light) | `--silver` / `--steel` | `#A3A6AE` / `#565A63` |
| Brand field (accent) | `--cobalt` | `#2B3CFF` |
| Interactive / caret | `--volt` | `#D4FF3F` |

Type: **Bricolage Grotesque** (display, condensed 75% width, weight 800), **Geist** (body),
**Geist Mono** (labels). Tokens live in `src/app/globals.css`, with surfaces `.surface-black|graphite|white|cobalt|volt`.

## Where things live

| What | Where |
| --- | --- |
| Business facts (phone, email, address, nav, SEO) | `src/config/site.ts` |
| Homepage copy | `src/content/home.ts` |
| Film clips + posters | `src/config/media.ts` → `public/videos`, `public/images/posters` |
| Graded stills | `public/images/{services,process,studio}` |
| GSAP / Lenis setup | `src/lib/gsap.ts`, `src/lib/lenis.ts` |
| Motion recipes | `src/animations/` |
| Site chrome | `src/components/Layout/` |
| Homepage sections | `src/components/Home/<Section>/` |

**Pattern:** each section is a Server Component (markup and copy) with a small client `*Motion.tsx`
sibling that attaches its choreography via `useSectionMotion`. Motion targets `data-anim="…"`
attributes, runs inside `gsap.matchMedia()`, and is reverted on unmount. Pinned sections switch
layout via `data-mode="scroll"`, so reduced-motion and no-JS visitors get a complete static layout.

**Gotchas**
- Never put a CSS `transition`/`scale` on an element GSAP tweens: GSAP writes `scale: none` and
  reads mid-transition matrices. Animate a wrapper or a child instead.
- Global utility classes (`.label`, `.link-u`) can load after module CSS. When a module needs to
  hide or override one, raise its specificity (e.g. `.top .location`).
- The footer is revealed beneath `<main>` (sticky, `z-index: 0`). Every section needs its own background.

## Lead form

Every "Start your book" CTA opens one dialog that posts to `/api/lead`, which forwards to
`LEAD_WEBHOOK_URL`. Until that is set the API returns **503** and the form tells the visitor to
call or email instead. It never claims a lead was sent when it wasn't.

## Media credits

Footage and stills: Mixkit clips #25185, #10396, #16139 and frames from #4723, #21603, #21588,
#48607, #13807, #45831, #42741, #50726, #18797 (Mixkit Stock Video Free License), graded in-house.
Book covers and logo come from the current live site.

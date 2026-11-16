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
| Page copy | `src/content/{home,about,contact}.ts` |
| Film clips + posters | `src/config/media.ts` → `public/videos`, `public/images/posters` |
| Graded stills | `public/images/{services,process,studio}` |
| GSAP / Lenis setup | `src/lib/gsap.ts`, `src/lib/lenis.ts` |
| Motion recipes | `src/animations/` |
| Site chrome | `src/components/Layout/` |
| Page sections | `src/components/{Home,About,Contact}/<Section>/` |
| Page transitions | `src/components/Layout/PageTransition/` (+ reveal signal in `src/lib/loader.ts`) |

**Pattern:** each section is a Server Component (markup and copy) with a small client `*Motion.tsx`
sibling that attaches its choreography via `useSectionMotion`. Motion targets `data-anim="…"`
attributes, runs inside `gsap.matchMedia()`, and is reverted on unmount. Pinned sections switch
layout via `data-mode="scroll"`, so reduced-motion and no-JS visitors get a complete static layout.

**Gotchas**
- Scroll-scrubbed tweens must use `fromTo` with explicit resting values (+ `immediateRender: false`). Plain `.to()`
  records start values at creation or on refresh — the cause of the old "hero breaks after scrolling back" bug.
- Never keep a huge scaled layer alive: the hero knockout mask is capped at 40× and hidden once the zoom completes
  (at 70× it exceeded GPU texture limits and left stale tiles in the pinned stage).
- Homepage Services settles one service per gesture through **Lenis** (`getLenis().scrollTo`), not ScrollTrigger
  `snap` — the two scroll engines fight each other.
- Never put a CSS `transition`/`scale` on an element GSAP tweens: GSAP writes `scale: none` and
  reads mid-transition matrices. Animate a wrapper or a child instead.
- Global utility classes (`.label`, `.link-u`) can load after module CSS. When a module needs to
  hide or override one, raise its specificity (e.g. `.top .location`).
- The footer is revealed beneath `<main>` (sticky, `z-index: 0`). Every section needs its own background.

## Pages & transitions

Routes: `/`, `/about-us/`, `/contact/` — matching the live WordPress URLs (`trailingSlash: true`).
Internal link clicks are intercepted (capture phase) by `PageTransition`: a black sheet rises, types the
destination name with the caret, swaps the route and lifts away. Entrance animations and autoplaying
films wait on `onReveal()`, which fires after the first-visit preloader **and** after every transition.
Add new routes to `NAMES` in `PageTransition.tsx`, `site.nav` and `app/sitemap.ts`.

## Service pages

Thirteen service pages live at the domain root (`/memoir-ghostwriting-services/` …), never under `/services/`.

- **Data:** `src/data/services.ts` — one entry per service (copy, imagery, process, FAQs, CTA, related links, SEO).
- **Template:** `src/components/ServicePage/` — one master page; only the data changes.
- **Route:** `src/app/[serviceSlug]/page.tsx` (all slugs prerendered via `generateStaticParams`).
- **Slugs:** `src/data/serviceSlugs.ts` — also read by `src/proxy.ts`, which turns unknown root URLs into real 404s
  (with Cache Components a dynamic segment would otherwise answer unknown slugs with a soft 200).
  The build fails if this list and the data disagree.
- **Imagery:** `public/images/svc/<service>-{hero,intro,detail,visual}.webp` (mono / cobalt duotone grades).

To add a service: add its slug to `serviceSlugs.ts`, its entry to `services.ts`, and its four images.
Navigation (header panel, mobile menu, footer, page-transition names) all update from the data.

## Search indexing (pre-launch)

`src/config/indexing.ts` → `INDEXABLE = false` sets **noindex, nofollow** site-wide: robots metadata in the root
layout, plus an `X-Robots-Tag` header on every response (`next.config.ts`). No sitemap is served and robots.txt
doesn't reference one; crawling stays *allowed* so crawlers can see the noindex.
**At launch:** set `INDEXABLE = true` and create `src/app/sitemap.ts` with
`export { sitemapEntries as default } from "@/lib/sitemapEntries";`.

## Lead form

Every "Start your book" CTA opens one dialog, and the Contact page has a conversational form; both post to `/api/lead/`, which forwards to
`LEAD_WEBHOOK_URL`. Until that is set the API returns **503** and the form tells the visitor to
call or email instead. It never claims a lead was sent when it wasn't.

## Media credits

Footage and stills: Mixkit clips #25185, #10396, #16139 and frames from #4723, #21603, #21588,
#48607, #13807, #45831, #42741, #50726, #18797 (Mixkit Stock Video Free License), graded in-house.
Book covers and logo come from the current live site.

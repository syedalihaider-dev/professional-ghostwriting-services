# Professional Ghostwriting Services — website

Next.js 16 (App Router, Cache Components, React Compiler) · TypeScript · CSS Modules · GSAP + ScrollTrigger · Lenis · Motion · three.js / React Three Fiber.

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
| --- | --- |
| Business facts (phone, email, address, nav, SEO) | `src/config/site.ts` |
| Homepage copy | `src/content/home.ts` |
| Film clips + posters | `src/config/media.ts` → `public/videos`, `public/images/posters` |
| Design tokens (colour, type, space, motion) | `src/app/globals.css` |
| GSAP / Lenis setup, motion tokens | `src/lib/gsap.ts`, `src/lib/lenis.ts`, `src/lib/motion.ts` |
| Reusable motion recipes | `src/animations/` |
| Site chrome (header, menu, footer, preloader, cursor, folio, lead dialog) | `src/components/Layout/` |
| Homepage chapters | `src/components/Home/<Chapter>/` |

**Pattern:** each section is a Server Component (markup + copy) with a small client `*Motion.tsx` sibling
that attaches its choreography via `useSectionMotion`. Motion hooks target `data-anim="…"` attributes,
never CSS-module class names. All motion runs inside `gsap.matchMedia()` and is reverted on unmount;
reduced-motion visitors get the composed static layout.

**Gotcha:** never put a CSS `transition: transform` on an element GSAP also tweens. Wrap it in a separate element.

## Lead form

Every "Begin your book" CTA opens one dialog that posts to `/api/lead`, which forwards to
`LEAD_WEBHOOK_URL`. Until that env var is set the API returns **503** and the form tells the visitor
to call or email. A lead is never reported as sent when it was not delivered.

## Media credits

Footage: Mixkit clips #152, #10396, #25185 and #16139 (Mixkit Stock Video Free License). Book covers
and logo come from the current live site.

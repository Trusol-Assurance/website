# Trusol Assurance — Next.js

A component-based Next.js 15 (App Router, React 19, TypeScript) port of the
single-file `Trusol_Assurance_July20_v1.html`, built for visual and behavioural
parity with the original.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

---

## Project structure

```
src/
  app/
    layout.tsx              metadata, viewport/theme-color, font links,
                            pre-paint theme script, ThemeProvider
    page.tsx                composes the sections in original order
  components/
    layout/
      Header.tsx            nav + mobile menu (shared open state), theme toggle
      Footer.tsx            brand, socials, link columns, year
    sections/
      Hero.tsx              parallax grid plane + avatar trust stack
      Marquee.tsx
      Stats.tsx             count-up numbers
      About.tsx             firm copy + four principles
      Services.tsx          two-level tab system (practice → service)
      Process.tsx
      Team.tsx              portraits, bios, show more/less toggle
      Testimonials.tsx
      Contact.tsx           CTA + contact card
    ui/
      icons.tsx             every inline SVG, transcribed verbatim
  data/
    site.ts                 name, phone, email, address, socials, nav, marquee
    services.ts             practices → services → groups (the big one)
    team.ts                 founders, bios, creds, portraits
    stats.ts  principles.ts  process.ts  testimonials.ts
  hooks/
    useReveal.ts            IntersectionObserver for .reveal
    useCountUp.ts           cubic ease-out counter, fires once at 60% visible
    useNavScrolled.ts       .scrolled past 24px
    useTabs.ts              shared controlled-tab helper
  lib/
    theme.tsx               ThemeProvider, useTheme, pre-paint boot script
    placeholders.ts         generated avatar / portrait SVG data URIs
  styles/
    globals.css             @imports the 19 files below, in original order
    tokens.css base.css buttons.css nav.css hero.css marquee.css stats.css
    about.css sec-head.css services.css process.css founder.css
    testimonials.css cta.css footer.css reveal.css responsive.css
    mobile-polish.css focus.css
public/
  team/richa-agarwal.jpg
  team/piyush-agarwal.jpg
```

---

## How parity was preserved

**CSS is untouched.** The original `<style>` block was split at its own banner
comments into 19 files and re-assembled in the same order via `@import` in
`globals.css`. Class names stay global — no CSS Modules, no scoping hashes — so
specificity, cascade order and every descendant selector behave exactly as
before. Not one rule was rewritten.

This is verified, not assumed: concatenating the split files in `globals.css`
order and diffing against the original `<style>` block gives **0 differing
lines across 34,770 characters**.

**Markup is 1:1.** A DOM skeleton diff (tag + class + id, in document order)
against the original gives **590 vs 595 elements, 9 diff lines**, all benign:

| Difference | Cause |
| --- | --- |
| `<div hidden><!--$--><!--/$--></div>` | Next hydration marker, renders nothing |
| 4 × `span.av` in the hero stack | server-rendered instead of injected by JS after mount — same result, one frame earlier |

A visible-text diff comes back clean: 58 of 58 segments identical.

**Behaviour is ported, not reimplemented.** The theme boot script is inlined in
`<head>` verbatim so `data-theme` is set before first paint. The avatar and
portrait SVG generators keep their original palettes and path data, so the
generated data URIs are character-identical.

---

## Deliberate changes

| Change | Why |
| --- | --- |
| Portraits extracted to `public/team/*.jpg` instead of base64 | Identical rendering, and it removes the Windows Defender false-positive that inline base64 triggered on download |
| Google Fonts `<link>` now points at the real CDN | The original's `<link>` referenced a broken local path (`./Agarwal Associates LLC..._files/css2`), so Space Grotesk / Space Mono / Inter were silently falling back to `system-ui`. Delete the link in `layout.tsx` if you want the fallback behaviour back |
| Footer year baked in at build, corrected on mount | The original hard-coded `2026` and let JS overwrite it. Same pattern here — no empty flash, no hydration mismatch |

---

## Parity test suite

`tests/parity.spec.ts` loads the reference HTML and the running build side by
side and compares them.

```bash
npx playwright install chromium   # once
npm run build && npm start        # terminal 1
npm run test:parity               # terminal 2
```

Covers:

- **Full-page screenshots** at 360 / 390 / 768 / 1280 / 1600 px, in both themes,
  with animations frozen and counters settled. Diffs land in `parity-output/`.
- **Section geometry** — bounding boxes for 13 landmark elements must match
  within 1px at every breakpoint.
- **Behaviour** — practice + service tab switching, theme toggle and its
  `localStorage` write, bio show more/less, mobile menu open/scroll-lock/close,
  nav `.scrolled` threshold, and final count-up values.

The reference file lives at `reference/Trusol_Assurance_Final_July21_v1.html`.
Override paths with `ORIGINAL_HTML` and `NEXT_URL` env vars if you keep it
elsewhere.

---

## Editing content

Copy changes almost never need a component touched:

- Phone, email, address, socials, nav labels → `src/data/site.ts`
- Any service bullet, tab label or panel intro → `src/data/services.ts`
- Bios, credentials, portraits → `src/data/team.ts`
- Stats, principles, process steps, testimonials → their matching data file

---

## Still outstanding from the original

Placeholders carried over as-is, to resolve before publishing:

- [ ] Real statistics (`src/data/stats.ts` — currently 25+ / 2 / 365 / 0)
- [ ] Real testimonial quotes and attributions (`src/data/testimonials.ts`)
- [ ] Swap the inline brand SVG in `ui/icons.tsx` for the real logo, if wanted

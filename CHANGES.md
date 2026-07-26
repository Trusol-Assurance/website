# July20 v1 → July21 Final — change log

Every difference between the two HTML files, and the file in the Next.js
project that carries it. Applied and verified; listed here so you can spot-check
or replay the edits by hand.

**Verification after applying:** CSS reassembles to 0 diff lines across 34,770
characters; DOM 590 → 595 elements with 9 benign diff lines (Next hydration
marker + 4 server-rendered hero avatar spans); visible text 58/58 segments
identical.

---

## 1. Mobile polish CSS — new

**File:** `src/styles/mobile-polish.css` *(new)*, `src/styles/focus.css` *(new)*, `src/styles/globals.css`

~100 lines of new CSS were appended in the source, sitting between the
`RESPONSIVE` block and the closing `:focus-visible` rule. To keep cascade order
exact, `:focus-visible` was split out of `responsive.css` into its own
`focus.css`, and `globals.css` now imports:

```css
@import "./responsive.css";
@import "./mobile-polish.css";
@import "./focus.css";
```

The new block covers: `section[id] { scroll-margin-top: 86px }`, 44px minimum
tap targets under `@media (pointer: coarse)`, marquee kept moving on touch,
portrait max-width and founder-grid spacing at ≤980px, frame-tag / heading /
cred / bio-toggle / marquee sizing at ≤560px, and iOS safe-area insets on the
nav and mobile menu via `@supports (padding: env(safe-area-inset-left))`.

## 2. Viewport meta

**File:** `src/app/layout.tsx`

```ts
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",   // ← added
  ...
};
```

## 3. Contact email — 4 call sites

**File:** `src/data/site.ts` *(one line; it propagates everywhere)*

```ts
email: "richa@trusolassurance.com",   // was richa.agarwal@agarwalassociatesllc.com
```

Feeds the CTA "Email us" button, the contact card row, the footer email icon,
and the footer "Email the firm" link.

## 4. Marquee wording

**File:** `src/data/site.ts`

`"GDPR · CCPA"` → `"GDPR & CCPA"`

## 5. Hero trust line

**File:** `src/components/sections/Hero.tsx`

`Remote-first · Flat-fee · Defensible` → `Remote-first · Fee agreed up front · Defensible`

## 6. Hero parallax gated to fine pointers

**File:** `src/components/sections/Hero.tsx`

```ts
const fineMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (!fineMouse) return;
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
```

## 7. Service bullets — 3 edits

**File:** `src/data/services.ts`

| Panel | Change |
| --- | --- |
| SOC → *How we run it* | "Fixed scope and flat fee agreed up front" → "Fixed scope and **fee** agreed up front" |
| SOC → *How we run it* | **Removed** "Fluent in Drata, Vanta, Secureframe, Sprinto" |
| Small Businesses → *Business entity design* | "Work with your attorney to set up the entity" → "Help in setting up the entity" |
| Small Businesses → *Accounting services* | **Removed** "Unlimited consultations" |

## 8. Team — Richa

**File:** `src/data/team.ts`

Frame tag `RICHA AGARWAL · CPA` → `RICHA AGARWAL · CPA · ACA`. Bio, role and
creds unchanged.

## 9. Team — Piyush, retitled and rewritten

**File:** `src/data/team.ts`

| Field | New value |
| --- | --- |
| Eyebrow | `Meet the COO` (was "Meet the co-founder") |
| Role | `CPA · CISA · CFE · FCA — Chief Operating Officer` |
| Visible bio | Now **2** paragraphs (was 1), both carrying `data-d="2"` |
| Hidden bio | Now **1** condensed COSO/SOC paragraph (was 2 long ones) |
| Photo alt | "… — Chief Operating Officer of Trusol Assurance" |

Creds and frame tag unchanged. The `BioPara` type gained a `d` field so each
paragraph carries its own reveal delay — Piyush's two visible paragraphs both
use `2`, where the previous auto-numbering would have produced `2` then `3`.

## 10. Portrait images — lazy loading

**File:** `src/components/sections/Team.tsx`

```tsx
<img loading="lazy" decoding="async" src={member.photo.src} alt={member.photo.alt} />
```

Image bytes are unchanged — both JPEGs hash identically to the July20 versions,
so `public/team/*.jpg` was left alone.

## 11. Bio toggle now self-hides on short bios

**File:** `src/components/sections/Team.tsx`

The source script grew logic that measures the bio and drops the toggle entirely
when it isn't needed: if total paragraphs ≤ 2 **and** total rendered lines ≤ 10,
the panel is forced open and the button removed.

Ported as a `useLayoutEffect` measurement — layout rather than passive effect, so
the button never paints before being removed:

```ts
const visibleParas = Array.from(founder.querySelectorAll<HTMLElement>(":scope > p"));
const hiddenParas  = inner.querySelectorAll("p").length;
const totalParas   = visibleParas.length + hiddenParas;

const lineHeight = parseFloat(getComputedStyle(sampleP).lineHeight) || 24;
const visibleH   = visibleParas.reduce((sum, p) => sum + p.scrollHeight, 0);
const totalLines = Math.round((visibleH + inner.scrollHeight) / lineHeight);

setNeedsToggle(!(totalParas <= 2 && totalLines <= 10));
```

With the current copy Piyush has 3 total paragraphs, so the toggle stays. Trim
his bio to 2 short paragraphs and it disappears on its own — same as the source.

---

## Files touched

```
src/styles/mobile-polish.css     new
src/styles/focus.css             new  (split out of responsive.css)
src/styles/responsive.css        :focus-visible removed from tail
src/styles/globals.css           two new @imports
src/app/layout.tsx               viewportFit
src/data/site.ts                 email, marquee item
src/data/services.ts             4 bullet edits
src/data/team.ts                 rewritten (BioPara type + Piyush + Richa tag)
src/components/sections/Hero.tsx trust line, pointer gate
src/components/sections/Team.tsx lazy img, per-para data-d, auto-hide toggle
reference/                       swapped to Trusol_Assurance_Final_July21_v1.html
```

Untouched: all other section components, `icons.tsx`, every hook, `lib/theme.tsx`,
`lib/placeholders.ts`, and the remaining 17 CSS files.

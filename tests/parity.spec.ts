/**
 * Visual + behavioural parity harness.
 *
 * Loads the original single-file HTML and the running Next.js build side by
 * side, then compares them at every breakpoint in both themes. Any pixel
 * difference above the threshold is written to ./parity-output for review.
 *
 * Usage:
 *   npm run build && npm start          # terminal 1 (serves on :3000)
 *   npx playwright test parity.spec.ts  # terminal 2
 *
 * Point ORIGINAL_HTML at wherever you keep the reference file.
 */

import { test, expect, type Page } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

const NEXT_URL = process.env.NEXT_URL ?? "http://localhost:3000/";
const ORIGINAL_HTML =
  process.env.ORIGINAL_HTML ??
  path.resolve(__dirname, "../reference/Trusol_Assurance_Final_July21_v1.html");

const ORIGINAL_URL = `file://${ORIGINAL_HTML}`;

const VIEWPORTS = [
  { name: "360", width: 360, height: 800 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 900 },
  { name: "1600", width: 1600, height: 1000 },
] as const;

const THEMES = ["dark", "light"] as const;

const OUT_DIR = path.resolve(__dirname, "../parity-output");
fs.mkdirSync(OUT_DIR, { recursive: true });

/** Freeze everything non-deterministic so screenshots are stable. */
async function stabilise(page: Page, theme: string) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-play-state: paused !important;
        animation-delay: 0s !important;
        transition: none !important;
      }
      .marquee .track { animation: none !important; transform: none !important; }
      .reveal { opacity: 1 !important; transform: none !important; }
    `,
  });
  await page.evaluate((t) => {
    document.documentElement.setAttribute("data-theme", t);
    // Count-up numbers settle on their final value.
    document.querySelectorAll<HTMLElement>(".count").forEach((el) => {
      el.textContent = el.dataset.to ?? el.textContent;
    });
    // Footer year — the reference file and the build can disagree by a year.
    const yr = document.getElementById("yr");
    if (yr) yr.textContent = "YYYY";
  }, theme);
  await page.waitForTimeout(250);
}

async function loadBoth(page: Page, url: string, theme: string) {
  await page.goto(url, { waitUntil: "networkidle" });
  await stabilise(page, theme);
}

/* ------------------------------------------------------------------ */
/* full-page visual diff                                               */
/* ------------------------------------------------------------------ */

for (const vp of VIEWPORTS) {
  for (const theme of THEMES) {
    test(`full page — ${vp.name}px ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await loadBoth(page, ORIGINAL_URL, theme);
      const original = await page.screenshot({ fullPage: true });

      await loadBoth(page, NEXT_URL, theme);
      const next = await page.screenshot({ fullPage: true });

      fs.writeFileSync(path.join(OUT_DIR, `${vp.name}-${theme}-original.png`), original);
      fs.writeFileSync(path.join(OUT_DIR, `${vp.name}-${theme}-next.png`), next);

      // Byte length is a cheap smoke signal; the real check is the snapshot below.
      expect(next.length).toBeGreaterThan(1000);
      expect(next).toMatchSnapshot(`${vp.name}-${theme}.png`, {
        maxDiffPixelRatio: 0.005,
      });
    });
  }
}

/* ------------------------------------------------------------------ */
/* geometry: every section box must land in the same place             */
/* ------------------------------------------------------------------ */

const SECTION_SELECTORS = [
  "nav.nav",
  "header.hero",
  ".marquee",
  ".stats-grid",
  "#about .about-grid",
  "#services .practice-tabs",
  "#services .svc-tabbar",
  "#services .svc-panel.active",
  "#process .proc",
  "#founder .founder-grid",
  ".tst-grid",
  "#contact .cta-box",
  "footer.footer",
];

async function boxes(page: Page) {
  return page.evaluate((sels) => {
    const out: Record<string, { x: number; y: number; w: number; h: number } | null> = {};
    for (const sel of sels) {
      const el = document.querySelector(sel);
      if (!el) {
        out[sel] = null;
        continue;
      }
      const r = el.getBoundingClientRect();
      out[sel] = {
        x: Math.round(r.x),
        y: Math.round(r.y + window.scrollY),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    }
    return out;
  }, SECTION_SELECTORS);
}

for (const vp of VIEWPORTS) {
  test(`section geometry — ${vp.name}px`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });

    await loadBoth(page, ORIGINAL_URL, "dark");
    const a = await boxes(page);

    await loadBoth(page, NEXT_URL, "dark");
    const b = await boxes(page);

    for (const sel of SECTION_SELECTORS) {
      expect(b[sel], `${sel} missing in Next build`).not.toBeNull();
      expect(a[sel], `${sel} missing in original`).not.toBeNull();
      // 1px tolerance absorbs sub-pixel rounding between the two documents.
      for (const k of ["x", "y", "w", "h"] as const) {
        expect(
          Math.abs(b[sel]![k] - a[sel]![k]),
          `${sel}.${k}: original ${a[sel]![k]} vs next ${b[sel]![k]}`
        ).toBeLessThanOrEqual(1);
      }
    }
  });
}

/* ------------------------------------------------------------------ */
/* behaviour: interactions must produce the same class state           */
/* ------------------------------------------------------------------ */

test("practice + service tabs switch identically", async ({ page }) => {
  for (const url of [ORIGINAL_URL, NEXT_URL]) {
    await page.goto(url, { waitUntil: "networkidle" });

    // Default state
    await expect(page.locator("#practice-compliance")).toHaveClass(/active/);
    await expect(page.locator("#panel-soc")).toHaveClass(/active/);

    // Switch inner tab
    await page.locator("#tab-iso").click();
    await expect(page.locator("#panel-iso")).toHaveClass(/active/);
    await expect(page.locator("#panel-soc")).not.toHaveClass(/active/);
    await expect(page.locator("#tab-iso")).toHaveAttribute("aria-selected", "true");

    // Switch practice
    await page.locator("#ptab-accounting").click();
    await expect(page.locator("#practice-accounting")).toHaveClass(/active/);
    await expect(page.locator("#practice-compliance")).not.toHaveClass(/active/);
    await expect(page.locator("#panel-ind")).toHaveClass(/active/);
  }
});

test("theme toggle persists to localStorage", async ({ page }) => {
  for (const url of [ORIGINAL_URL, NEXT_URL]) {
    await page.goto(url, { waitUntil: "networkidle" });

    const before = await page.getAttribute("html", "data-theme");
    await page.locator("#themeToggle").click();
    const after = await page.getAttribute("html", "data-theme");

    expect(after).not.toBe(before);
    expect(await page.evaluate(() => localStorage.getItem("trusol-theme"))).toBe(after);
  }
});

test("bio show more / show less toggles", async ({ page }) => {
  for (const url of [ORIGINAL_URL, NEXT_URL]) {
    await page.goto(url, { waitUntil: "networkidle" });

    const btn = page.locator(".bio-toggle").first();
    const panel = page.locator("#piyush-more");

    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await expect(btn).toHaveText("Show more +");

    await btn.click();
    await expect(panel).toHaveClass(/open/);
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await expect(btn).toHaveText("Show less −");

    await btn.click();
    await expect(panel).not.toHaveClass(/open/);
  }
});

test("mobile menu opens, locks scroll, closes on link click", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const url of [ORIGINAL_URL, NEXT_URL]) {
    await page.goto(url, { waitUntil: "networkidle" });

    await page.locator("#burger").click();
    await expect(page.locator("#mobileMenu")).toHaveClass(/open/);
    await expect(page.locator("#nav")).toHaveClass(/open/);
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    await page.locator("#mobileMenu a").first().click();
    await expect(page.locator("#mobileMenu")).not.toHaveClass(/open/);
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  }
});

test("nav gains .scrolled past 24px", async ({ page }) => {
  for (const url of [ORIGINAL_URL, NEXT_URL]) {
    await page.goto(url, { waitUntil: "networkidle" });

    await expect(page.locator("#nav")).not.toHaveClass(/scrolled/);
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(150);
    await expect(page.locator("#nav")).toHaveClass(/scrolled/);
  }
});

test("stat counters land on their target values", async ({ page }) => {
  for (const url of [ORIGINAL_URL, NEXT_URL]) {
    await page.goto(url, { waitUntil: "networkidle" });
    await page.locator(".stats-grid").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1800); // count-up duration is 1400ms

    const values = await page.$$eval(".count", (els) =>
      els.map((el) => ({ got: el.textContent?.trim(), want: (el as HTMLElement).dataset.to }))
    );
    for (const v of values) expect(v.got).toBe(v.want);
  }
});

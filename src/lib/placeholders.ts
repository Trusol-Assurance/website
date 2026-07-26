import type { Theme } from "./theme";

/* Palettes and SVG bodies are copied verbatim from the original script so the
   generated data URIs are character-identical. */

const PALETTES: Record<Theme, [string, string][]> = {
  dark: [
    ["#FF6A2C", "#0F0F11"],
    ["#A8ACB6", "#0F0F11"],
    ["#FF8A4C", "#161619"],
    ["#FF6A2C", "#1F1F25"],
    ["#C9CCD4", "#0F0F11"],
    ["#FF8A4C", "#1F1F25"],
  ],
  light: [
    ["#E85A1F", "#F1EFEA"],
    ["#5A5F6A", "#F1EFEA"],
    ["#F0763C", "#FFFFFF"],
    ["#E85A1F", "#EFEDE8"],
    ["#8A8F99", "#FFFFFF"],
    ["#F0763C", "#EFEDE8"],
  ],
};

/** Placeholder avatar — used by the hero trust stack and testimonial authors. */
export function avatarSVG(i: number, theme: Theme): string {
  const palettes = PALETTES[theme];
  const [a, b] = palettes[i % palettes.length];
  const fig = theme === "light" ? "rgba(60,55,50,.35)" : "rgba(9,12,22,.55)";
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
      <rect width='48' height='48' fill='url(#g)'/>
      <circle cx='24' cy='19' r='8' fill='${fig}'/>
      <path d='M9 44c0-8.3 6.7-13 15-13s15 4.7 15 13' fill='${fig}'/>
    </svg>`
  )}`;
}

/** Ready-to-assign CSS background shorthand for an avatar. */
export function avatarBackground(i: number, theme: Theme): string {
  return `url("${avatarSVG(i, theme)}") center/cover`;
}

/**
 * Placeholder portrait. In the original this only painted `.portrait` elements
 * that contained no `<img>`; both team portraits ship real photos, so it is a
 * no-op today — kept so a portrait can be dropped without a photo later.
 */
export function portraitBackground(theme: Theme): string {
  const light = theme === "light";
  const g1 = light ? "#E9E6E0" : "#1D1D22";
  const g2 = light ? "#DDD9D2" : "#0C0C0E";
  const org = light ? "232,90,31" : "255,106,44";
  const gry = light ? "90,95,106" : "168,172,182";
  return `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>
      <defs><linearGradient id='p' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${g1}'/><stop offset='1' stop-color='${g2}'/></linearGradient></defs>
      <rect width='400' height='500' fill='url(#p)'/>
      <circle cx='200' cy='190' r='72' fill='rgba(${org},.18)' stroke='rgba(${org},.4)'/>
      <path d='M70 500c0-95 58-150 130-150s130 55 130 150' fill='rgba(${gry},.10)' stroke='rgba(${gry},.3)'/>
    </svg>`
  )}") center/cover`;
}

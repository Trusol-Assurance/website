"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/data/site";

export type Theme = "dark" | "light";

/**
 * Runs before first paint (injected into <head> as a blocking script) so the
 * `data-theme` attribute is already on <html> when the first frame renders.
 * This is a verbatim port of the IIFE in the original document head — keeping
 * it inline is what prevents the flash of the wrong theme.
 */
export const themeBootScript = `(function(){var t='dark';try{t=localStorage.getItem('${site.themeStorageKey}')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');}catch(e){}document.documentElement.setAttribute('data-theme',t);})();`;

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Server render always assumes "dark" (same as the boot script default) and
  // we sync to the real attribute on mount, so nothing hydration-mismatches.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    setTheme(attr === "light" ? "light" : "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(site.themeStorageKey, next);
      } catch {
        /* private mode / storage disabled — ignore, same as the original */
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

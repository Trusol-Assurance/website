"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { useNavScrolled } from "@/hooks/useNavScrolled";
import { useTheme } from "@/lib/theme";
import Image from "next/image";
import { ArrowRight, MoonIcon, SunIcon } from "@/components/ui/icons";

/** Matches the `@media (max-width:980px)` burger breakpoint in responsive.css. */
const BURGER_BREAKPOINT = 980;

export function Header() {
  const scrolled = useNavScrolled();
  const [open, setOpen] = useState(false);
  const { toggle } = useTheme();

  // Lock the page behind the open menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape — the overlay covers the whole screen, so without this a
  // keyboard user has no way out.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close when the viewport grows past the burger breakpoint. Rotating a phone
  // or tablet to landscape used to hide the burger while leaving the overlay up
  // and the body scroll-locked, with no way to dismiss it.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(`(min-width: ${BURGER_BREAKPOINT + 1}px)`);
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  const navClass = ["nav", scrolled && "scrolled", open && "open"].filter(Boolean).join(" ");

  return (
    <>
      <nav className={navClass} id="nav">
        <a className="brand" href="#top" aria-label="Trusol Assurance home">
          <span className="mark" aria-hidden="true">
            <Image src="/logo/trusol_logo.svg" alt="" width={40} height={40} />
          </span>
          <span className="name">
            {site.name}
            <small>{site.tagline}</small>
          </span>
        </a>

        <div className="nav-links" id="navLinks">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-cta">
          <button
            className="theme-toggle"
            id="themeToggle"
            onClick={toggle}
            aria-label="Switch color theme"
            title="Switch theme"
          >
            <MoonIcon />
            <SunIcon />
          </button>
          <a href="#contact" className="btn btn--gold">
            Book a consult
            <ArrowRight />
          </a>
          <button
            className="burger"
            id="burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobileMenu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* `inert` while closed: the overlay is translated off-screen but its
          links stayed in the tab order, so keyboard users tabbed into five
          invisible destinations. */}
      <div
        className={open ? "mobile-menu open" : "mobile-menu"}
        id="mobileMenu"
        inert={!open}
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span>{link.n}</span>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
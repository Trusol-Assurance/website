"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { useNavScrolled } from "@/hooks/useNavScrolled";
import { useTheme } from "@/lib/theme";
import { ArrowRight, BrandMark, MoonIcon, SunIcon } from "@/components/ui/icons";

export function Header() {
  const scrolled = useNavScrolled();
  const [open, setOpen] = useState(false);
  const { toggle } = useTheme();

  // The original locked the page behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navClass = ["nav", scrolled && "scrolled", open && "open"].filter(Boolean).join(" ");

  return (
    <>
      <nav className={navClass} id="nav">
        <a className="brand" href="#top" aria-label="Trusol Assurance home">
          <span className="mark" aria-hidden="true">
            <BrandMark size={40} />
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
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={open ? "mobile-menu open" : "mobile-menu"} id="mobileMenu">
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

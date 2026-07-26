"use client";

import { useEffect, useState } from "react";
import { footerExplore, site } from "@/data/site";
import {
  BrandMark,
  FacebookIcon,
  LinkedInIcon,
  MailOutlineIcon,
} from "@/components/ui/icons";

/** Frozen at build time — see the note in <Footer>. */
const BUILD_YEAR = new Date().getFullYear();

export function Footer() {
  // The original shipped a hard-coded year in the markup and let JS correct it
  // on load. Same idea here: the build year is baked into the static HTML (so
  // there is no empty flash and no hydration mismatch), then the visitor's real
  // year is applied after mount.
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a className="brand" href="#top">
              <span className="mark" aria-hidden="true">
                <BrandMark size={38} />
              </span>
              <span className="name">
                {site.name}
                <small>{site.tagline}</small>
              </span>
            </a>
            <p className="foot-about">
              Independent security &amp; compliance audits and full-service accounting &amp; tax — one
              firm, one standard of rigor. Home of the Agarwal Associates CPA practice.
            </p>
            <div className="socials">
              <a href={site.socials.facebook} aria-label="Facebook" target="_blank" rel="noopener">
                <FacebookIcon />
              </a>
              <a href={site.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${site.email}`} aria-label="Email">
                <MailOutlineIcon />
              </a>
            </div>
          </div>

          <div className="foot-col">
            <h5>Explore</h5>
            {footerExplore.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="foot-col">
            <h5>Get in touch</h5>
            <a href={site.phone.href}>{site.phone.display}</a>
            <a href={`mailto:${site.email}`}>Email the firm</a>
            <a href="#contact">
              {site.address.street}
              <br />
              {site.address.cityStateZip}
            </a>
          </div>
        </div>

        <div className="foot-bottom">
          <p>
            © <span id="yr">{year}</span> {site.name} · Home of the Agarwal Associates CPA
            practice
          </p>
          <p>Princeton Junction, New Jersey</p>
        </div>
      </div>
    </footer>
  );
}

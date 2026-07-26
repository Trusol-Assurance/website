import type { JSX } from "react";

/* ------------------------------------------------------------------
   Every SVG below is a 1:1 transcription of the markup in the original
   single-file HTML. Attribute values (stroke widths, path data, the
   var(--gold) / var(--mint) fills) are intentionally left untouched so
   the rendered output is byte-for-byte equivalent.
   ------------------------------------------------------------------ */

export function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="1" y="1" width="38" height="38" rx="10" stroke="var(--gold)" strokeWidth="1.4" />
      <rect x="11" y="22" width="4.4" height="8" rx="1.4" fill="var(--mint)" />
      <rect x="18" y="16" width="4.4" height="14" rx="1.4" fill="var(--gold)" />
      <rect x="25" y="10" width="4.4" height="20" rx="1.4" fill="var(--gold-soft)" />
    </svg>
  );
}

export function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8h9M8 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg className="ic-moon" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 13.2A8.2 8.2 0 0 1 10.8 4a7 7 0 1 0 9.2 9.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg className="ic-sun" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.2 5.2l1.9 1.9M16.9 16.9l1.9 1.9M18.8 5.2l-1.9 1.9M7.1 16.9l-1.9 1.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------- service icons (keyed by ServiceIconName) ---------------- */

const serviceIcons: Record<string, JSX.Element> = {
  soc: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="var(--gold)" strokeWidth="1.6" />
      <path
        d="M9 12.4l2 2 4-4.6"
        stroke="var(--mint)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  iso: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="var(--gold)" strokeWidth="1.6" />
      <path d="M12 4v16M4 12h16" stroke="var(--mint)" strokeWidth="1.3" />
    </svg>
  ),
  hipaa: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 4v5c0 4.2-2.9 7.5-7 9-4.1-1.5-7-4.8-7-9V7l7-4Z"
        stroke="var(--gold)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 9v4M12 16.2v.1" stroke="var(--mint)" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  gdpr: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="3" stroke="var(--gold)" strokeWidth="1.6" />
      <path d="M6 21c0-3 2.7-5 6-5s6 2 6 5" stroke="var(--mint)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  individuals: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke="var(--gold)" strokeWidth="1.6" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke="var(--mint)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  smallBusiness: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 20V9l8-5 8 5v11" stroke="var(--gold)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 20v-5h6v5" stroke="var(--mint)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  corporations: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="var(--gold)" strokeWidth="1.6" />
      <path
        d="M8 15l3-3 2 2 3-4"
        stroke="var(--mint)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export type ServiceIconName = keyof typeof serviceIcons;

/** Renders `<span class="svc-ic">…</span>` — the exact wrapper used in both
 *  the tab button and the panel head. */
export function ServiceIcon({ name }: { name: ServiceIconName }) {
  return <span className="svc-ic">{serviceIcons[name]}</span>;
}

/* ---------------- contact card icons ---------------- */

export function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="var(--gold)" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="2.4" stroke="var(--mint)" strokeWidth="1.5" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M5 5l3 .6 1 3-2 1.4a11 11 0 0 0 5 5l1.4-2 3 1 .6 3a2 2 0 0 1-2 2A15 15 0 0 1 3 7a2 2 0 0 1 2-2Z"
        stroke="var(--gold)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="var(--gold)" strokeWidth="1.5" />
      <path d="M4 7l8 6 8-6" stroke="var(--mint)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------- footer social icons ---------------- */

export function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 9V7c0-1 .3-1.5 1.6-1.5H17V2.5h-2.6C11.5 2.5 10 4.2 10 7v2H8v3h2v9.5h4V12h2.4l.4-3H14Z" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 3.5A1.8 1.8 0 1 0 4.5 7a1.8 1.8 0 0 0 0-3.5ZM3 8.5h3V21H3V8.5ZM9 8.5h2.9v1.7h.04c.4-.75 1.4-1.55 2.86-1.55 3.06 0 3.62 2 3.62 4.6V21h-3v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21H9V8.5Z" />
    </svg>
  );
}

export function MailOutlineIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

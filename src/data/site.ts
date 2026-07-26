export const site = {
  name: "Trusol Assurance",
  tagline: "Audit · Accounting · Tax",
  title: "Trusol Assurance — Compliance Audits, Accounting & Tax",
  description:
    "Trusol Assurance is one firm with two disciplines: CPA-led security & compliance audits (SOC 1/2/3, ISO 27001, HIPAA, GDPR) and full-service accounting & tax through its Agarwal Associates practice. Based in Princeton Junction, NJ.",
  phone: {
    display: "(609) 945-0631",
    href: "tel:6099450631",
  },
  email: "richa@trusolassurance.com",
  address: {
    street: "54 Cartwright Dr",
    cityStateZip: "Princeton Junction, NJ 08550",
    full: "54 Cartwright Dr, Princeton Junction, NJ 08550",
  },
  socials: {
    facebook: "https://www.facebook.com/agarwalassociatesllc/",
    linkedin: "https://www.linkedin.com/company/agarwalassociatesllc/",
  },
  themeStorageKey: "trusol-theme",
} as const;

export const navLinks = [
  { href: "#about", label: "About", n: "01" },
  { href: "#services", label: "Services", n: "02" },
  { href: "#process", label: "How we work", n: "03" },
  { href: "#founder", label: "Team", n: "04" },
  { href: "#contact", label: "Contact", n: "05" },
] as const;

export const footerExplore = [
  { href: "#about", label: "About us" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "How we work" },
  { href: "#founder", label: "Team" },
  { href: "#contact", label: "Contact" },
] as const;

export const marqueeItems = [
  "SOC 1 · 2 · 3",
  "ISO 27001",
  "HIPAA",
  "GDPR & CCPA",
  "Tax & Accounting",
  "US GAAP",
] as const;

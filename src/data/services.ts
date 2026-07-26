import type { ServiceIconName } from "@/components/ui/icons";

/** A block inside a service panel — either a bullet list or a paragraph. */
export type ServiceGroup = {
  heading: string;
  items?: string[];
  body?: string;
  /** Spans the full width of the panel grid. */
  wide?: boolean;
};

export type Service = {
  /** DOM id suffix — panel becomes `panel-{id}`, tab becomes `tab-{id}`. */
  id: string;
  icon: ServiceIconName;
  tag: string;
  /** Label in the tab bar (may differ in line breaks from the panel title). */
  name: string;
  title: string;
  intro: string;
  groups: ServiceGroup[];
};

export type Practice = {
  /** DOM id — panel becomes `practice-{id}`, tab becomes `ptab-{id}`. */
  id: string;
  tabLabel: string;
  eyebrow: string;
  eyebrowMint?: boolean;
  heading: string;
  tabGroup: string;
  tablistLabel: string;
  services: Service[];
};

export const practices: Practice[] = [
  {
    id: "compliance",
    tabLabel: "Security & Compliance",
    eyebrow: "Practice 01",
    heading: "Security & compliance audits",
    tabGroup: "compliance",
    tablistLabel: "Security & compliance services",
    services: [
      {
        id: "soc",
        icon: "soc",
        tag: "Attestation",
        name: "SOC 1 · SOC 2 · SOC 3",
        title: "SOC 1 · SOC 2 · SOC 3",
        intro:
          "The reports your customers actually ask for — Type I and Type II examinations that prove your controls operate, not just exist.",
        groups: [
          {
            heading: "SOC 2 — the enterprise passport",
            items: [
              "Type I: design of controls at a point in time",
              "Type II: operating effectiveness over 3–12 months",
              "Trust Services Criteria: security, availability, confidentiality, processing integrity, privacy",
              "Report language your customers' security teams accept",
            ],
          },
          {
            heading: "SOC 1 & SOC 3",
            items: [
              "SOC 1 for controls relevant to financial reporting (ICFR)",
              "SOC 3 general-use report for public distribution",
              "Bridge letters between reporting periods",
            ],
          },
          {
            heading: "How we run it",
            wide: true,
            items: [
              "Fixed scope and fee agreed up front",
              "Remote-first fieldwork across AWS, GCP, Azure",
              "Readiness assessment available before first audit",
            ],
          },
        ],
      },
      {
        id: "iso",
        icon: "iso",
        tag: "Certification",
        name: "ISO 27001 & family",
        title: "ISO 27001 & family",
        intro:
          "Internationally recognized certification of your ISMS — plus the cloud, privacy, and AI extensions.",
        groups: [
          {
            heading: "ISO/IEC 27001",
            items: [
              "Stage 1 & Stage 2 certification audits of your ISMS",
              "Surveillance and recertification cycles",
              "Statement of Applicability and risk-treatment review",
            ],
          },
          {
            heading: "Extensions",
            items: [
              "ISO 27017 — cloud security controls",
              "ISO 27018 — PII protection in public cloud",
              "ISO 27701 — privacy information management",
              "ISO 42001 — AI management systems",
            ],
          },
          {
            heading: "Why it pairs with SOC 2",
            wide: true,
            body: "Much of the evidence overlaps. Run them as a blended audit and collect it once — one calendar, one team, two credentials.",
          },
        ],
      },
      {
        id: "hipaa",
        icon: "hipaa",
        tag: "Healthcare",
        name: "HIPAA",
        title: "HIPAA",
        intro:
          "Assessments built for regulated health data — HIPAA Security Rule, Privacy, and Breach Notification compliance for covered entities and business associates.",
        groups: [
          {
            heading: "HIPAA",
            items: [
              "Security Rule risk assessments",
              "Privacy and Breach Notification review",
              "Business associate compliance programs",
            ],
          },
          {
            heading: "Built for regulated data",
            body: "CPA-level documentation discipline applied to PHI — findings mapped to remediation you can actually schedule.",
          },
        ],
      },
      {
        id: "gdpr",
        icon: "gdpr",
        tag: "Privacy",
        name: "GDPR & CCPA",
        title: "GDPR & CCPA",
        intro:
          "Privacy program assessments that map how personal data actually moves through your business.",
        groups: [
          {
            heading: "GDPR",
            items: [
              "Readiness assessments and gap analysis",
              "Records of processing & data mapping",
              "DPIAs for high-risk processing",
              "Cross-border transfer mechanism review",
            ],
          },
          {
            heading: "CCPA / CPRA",
            items: [
              "Consumer-rights workflow audits",
              "Notice, opt-out, and disclosure review",
              "Service-provider contract assessment",
            ],
          },
          {
            heading: "Privacy as posture",
            wide: true,
            body: "We assess how personal data actually moves through your business — not just what the policy PDF says.",
          },
        ],
      },
    ],
  },
  {
    id: "accounting",
    tabLabel: "Accounting & Tax",
    eyebrow: "Practice 02",
    eyebrowMint: true,
    heading: "Accounting & financial services",
    tabGroup: "accounting",
    tablistLabel: "Accounting & financial services",
    services: [
      {
        id: "ind",
        icon: "individuals",
        tag: "For individuals",
        name: "Individuals & Families",
        title: "Individuals & Families",
        intro:
          "Federal and state tax preparation and review for all income levels — with planning throughout the year and audit representation whenever you need it.",
        groups: [
          {
            heading: "Tax preparation & review",
            items: [
              "Prepare individual federal and state tax returns",
              "Analyze prior filings for tax-saving opportunities",
              "Prepare quarterly tax estimates",
              "E-filing and direct deposit for faster refunds",
              "File extensions and estimate tax to avoid interest and penalties",
            ],
          },
          {
            heading: "Tax planning & consulting",
            items: [
              "Develop tax planning objectives",
              "Review transactions to determine tax outcomes",
              "Build tax projections for appropriate payments",
              "Track potential tax legislation and intent",
              "Strategies aligned to your personal financial goals",
            ],
          },
          {
            heading: "Tax audit representation",
            wide: true,
            body: "We help resolve IRS tax problems and put an end to the difficulties the IRS can pose — efficient, affordable, and extremely discreet.",
          },
        ],
      },
      {
        id: "sb",
        icon: "smallBusiness",
        tag: "For owners",
        name: "Small Businesses",
        title: "Small Businesses",
        intro:
          "The full spectrum of business and owner tax work, entity design and formation, and the accounting systems that keep you running.",
        groups: [
          {
            heading: "Tax preparation & review",
            items: [
              "Prepare all business and individual federal and state returns",
              "Review tax planning needs for the business and its owners",
              "Develop tax projections",
              "Spot tax-saving opportunities and pending legislation",
            ],
          },
          {
            heading: "Business entity design",
            items: [
              "Weigh the pros and cons of each structure",
              "C Corporations & S Corporations",
              "LLCs and LLPs",
              "Personal Service Corporations & self-employed",
              "Help in setting up the entity",
            ],
          },
          {
            heading: "Accounting services",
            items: [
              "Review, recommend, design and set up accounting systems",
              "QuickBooks and other software expertise",
              "Reconcile your bank accounts",
              "Income statements, balance sheets, general-ledger cleanup",
            ],
          },
          {
            heading: "Tax audit representation",
            wide: true,
            body: "We help resolve IRS tax problems and put an end to the difficulties the IRS can pose — efficient, affordable, and extremely discreet.",
          },
        ],
      },
      {
        id: "corp",
        icon: "corporations",
        tag: "For corporations",
        name: "Corporations",
        title: "Corporations",
        intro:
          "Financial statement review and preparation to US GAAP, plus corporate tax provisions — international compliance, R&D credits, transfer pricing.",
        groups: [
          {
            heading: "Financial statement review & compilation",
            items: [
              "Assist in developing financial statements",
              "Work with financial auditors on requests for information",
              "Income statements, balance sheets, cash-flow and comprehensive income statements",
              "Financial footnotes and disclosures",
              "Reviews and compilations to US GAAP standards",
            ],
          },
          {
            heading: "Corporate tax provisions",
            items: ["International tax compliance", "R&D tax credits", "Transfer pricing"],
          },
          {
            heading: "Tax audit representation",
            wide: true,
            body: "We help resolve IRS tax problems and put an end to the difficulties the IRS can pose — efficient, affordable, and extremely discreet.",
          },
        ],
      },
    ],
  },
];

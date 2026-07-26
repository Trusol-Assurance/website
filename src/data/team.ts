/** A credential pill is a run of segments so multi-bold pills (`CPA · CISA · …`)
 *  reproduce the original markup exactly. */
export type CredSegment = { t: string; b?: boolean };

/** A bio paragraph plus its `data-d` reveal-delay bucket. */
export type BioPara = { text: string; d?: string };

export type TeamMember = {
  id: string;
  eyebrow: string;
  name: string;
  role: string;
  /** Paragraphs always visible. */
  bio: BioPara[];
  /** Paragraphs hidden behind the "Show more" toggle. Omit for no toggle. */
  more?: string[];
  creds: CredSegment[][];
  photo: { src: string; alt: string };
  frameTag: string;
  /** When true the portrait sits on the right and the copy on the left. */
  flip?: boolean;
};

export const team: TeamMember[] = [
  {
    id: "richa",
    eyebrow: "Meet the founder",
    name: "Richa Agarwal",
    role: "CPA · Founder & Principal",
    bio: [
      {
        d: "2",
        text: "Richa is a proven professional with deep auditing, tax, and accounting experience, leveraging both CPA and CA credentials with a track record of significantly improving internal processes. She has planned and managed complex audit and tax engagements for listed and unlisted companies alike — which is exactly why Trusol runs both practices to the same standard.",
      },
      {
        d: "3",
        text: "Before founding the firm, she was a consultant at a boutique NJ CPA practice and a Senior Consultant at CohnReznick LLP — with domestic and international experience across pharmaceuticals, financial services, not-for-profit, and technology.",
      },
    ],
    creds: [
      [{ t: "CPA", b: true }, { t: " — New Jersey" }],
      [{ t: "M.S.", b: true }, { t: " Accounting · CCS University" }],
      [{ t: "Ex-CohnReznick LLP" }],
    ],
    photo: {
      src: "/team/richa-agarwal.jpg",
      alt: "Portrait of Richa Agarwal, CPA — Founder & Principal of Trusol Assurance",
    },
    frameTag: "RICHA AGARWAL · CPA · ACA",
  },
  {
    id: "piyush",
    eyebrow: "Meet the COO",
    name: "Piyush Agarwal",
    role: "CPA · CISA · CFE · FCA",
    // Both visible paragraphs carry data-d="2" in the source.
    bio: [
      {
        d: "2",
        text: "Piyush brings over two decades of global financial leadership and technical assurance experience across the Technology, Manufacturing, and Pharmaceutical sectors.",
      },
      {
        d: "2",
        text: "Prior to joining TruSol, Piyush served as VP of Finance for Risk, Treasury & Assurance at Jubilant Pharmova, directing enterprise-wide financial strategy, capital structures, and global ERM initiatives. His advisory background includes leading the West Coast GRC practice for CohnReznick LLP, where he advised C-suite executives on complex internal audits, SOX compliance, and fraud risk assessments.",
      },
    ],
    more: [
      "An expert in COSO principles, SOC Trust Services Criteria, and SAP-driven business process reengineering, Piyush helps high-growth organizations navigate digital security and financial health. He is dedicated to transforming regulatory compliance into a strategic asset for business growth and institutional trust.",
    ],
    creds: [
      [
        { t: "CPA", b: true },
        { t: " · " },
        { t: "CISA", b: true },
        { t: " · " },
        { t: "CFE", b: true },
        { t: " · " },
        { t: "FCA", b: true },
      ],
      [{ t: "Ex-VP Finance — Jubilant Pharmova" }],
      [{ t: "Ex-CohnReznick LLP · West Coast GRC Lead" }],
    ],
    photo: {
      src: "/team/piyush-agarwal.jpg",
      alt: "Portrait of Piyush Agarwal, CPA, CISA, CFE, FCA — Chief Operating Officer of Trusol Assurance",
    },
    frameTag: "PIYUSH AGARWAL · CPA · CISA · CFE · FCA",
    flip: true,
  },
];

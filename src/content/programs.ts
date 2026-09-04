/**
 * Programme catalogue. `status` drives the badge treatment everywhere a programme appears.
 * SkillSync and Circular Tech Bootcamp deliberately carry no metrics. Do not add any.
 */

export type ProgramStatus = "active" | "upcoming";

export type Program = {
  slug: string;
  name: string;
  status: ProgramStatus;
  partner?: string;
  summary: string;
  body: string[];
  /** Dated, verified results only. Omitted where none exist. */
  results?: { label: string; detail: string }[];
  target?: string;
};

export const programs: Program[] = [
  {
    slug: "school-tour-initiative",
    name: "School Tour Initiative",
    status: "active",
    summary:
      "E-waste literacy and digital awareness sessions delivered inside Lagos schools.",
    body: [
      "We take the circular economy into classrooms. Sessions cover what happens to a device at the end of its first life, why e-waste matters where students live, and how digital skills open a path forward.",
    ],
    target:
      "1,000 students across 10 schools in 12 months, with a 60% literacy improvement measured pre and post session.",
    results: [
      {
        label: "Whanyinna School, Makoko",
        detail: "Session delivered and 5 laptops donated.",
      },
      { label: "Lagos City School", detail: "100+ students reached." },
      { label: "Gbagada Junior High", detail: "60+ students reached." },
    ],
  },
  {
    slug: "breakthrough-series",
    name: "Breakthrough Series",
    status: "active",
    summary:
      "Refurbished device distribution paired with mentorship and storytelling for underserved youth aged 18 to 35.",
    body: [
      "A device on its own rarely changes a trajectory. The Breakthrough Series pairs each refurbished machine with mentorship and a platform to tell the story of what gets built with it.",
    ],
    results: [
      {
        label: "Faith Ojo, University of Lagos",
        detail:
          "A student interested in video editing and digital storytelling received one refurbished laptop in 2025, enabling consistent skill development.",
      },
    ],
  },
  {
    slug: "project-9-12",
    name: "Project 9-12",
    status: "active",
    partner: "Passback",
    summary: "Sports gear and technology access for young people aged 10 to 18.",
    body: [
      "Run with Passback, Project 9-12 meets young people where they already gather. Sport opens the door, and technology access follows.",
    ],
    results: [
      {
        label: "Phase 1, June 2025, Lagos District IV",
        detail: "5 schools, 200+ students engaged, 5 laptops awarded.",
      },
      {
        label: "Phase 2, August 2025, Makoko",
        detail: "100+ community members reached, sports gear donated to a community football team.",
      },
    ],
  },
  {
    slug: "greenbin-360",
    name: "GreenBin 360",
    status: "active",
    summary:
      "US-based corporate e-waste collection. This is the supply side of the whole device pipeline.",
    body: [
      "GreenBin 360 is how devices reach us. We collect end-of-life and surplus hardware from companies and institutions across St. Louis, then route it into assessment and refurbishment.",
    ],
  },
  {
    slug: "greenbin-360-ecosystem",
    name: "GreenBin 360 Smart Bin Ecosystem",
    status: "upcoming",
    summary:
      "The full GreenBin concept: solar-powered QR-tracked collection bins, a GreenPoints rewards layer, Green Entrepreneurship Hubs, and a Climate Impact Marketplace.",
    body: [
      "This is a future vision at pitch stage, not a service currently running. It extends today's collection programme into solar-powered bins with QR-tracked drop-offs, a GreenPoints rewards scheme for participants, Green Entrepreneurship Hubs, and a Climate Impact Marketplace built around carbon credits.",
    ],
  },
  {
    slug: "skillsync-initiative",
    name: "SkillSync Initiative",
    status: "active",
    partner:
      "Office of the Special Assistant to the President on Art, Culture and the Creative Economy",
    summary:
      "Support for emerging Nigerian creative talent, with entrepreneurship and income-generation pathways.",
    body: [
      "SkillSync works with youth, women, and persons with disabilities across Nigeria's creative economy, connecting emerging talent to entrepreneurship support and routes to earn from their craft.",
    ],
  },
  {
    slug: "circular-tech-bootcamp",
    name: "Circular Tech Bootcamp",
    status: "active",
    summary:
      "Refurbished devices become the training ground. Underserved youth learn diagnosis, repair, and certification in hardware technology.",
    body: [
      "Every device that arrives needs assessment before it can be redistributed. The bootcamp turns that work into a curriculum, so the people learning hardware repair are learning on real machines headed to real recipients.",
    ],
  },
];

/** Proposals and collaborations in development. Never presented as running programmes. */
export const inDevelopment: Program[] = [
  {
    slug: "google-hardware-recycling-workplan",
    name: "Google Hardware Recycling Workplan",
    status: "upcoming",
    summary:
      "A proposal to train 50 young people in hardware refurbishment, circular economy literacy, and e-waste reduction.",
    body: [
      "Currently a proposal. It would put 50 young people through structured training in hardware refurbishment alongside circular economy literacy and e-waste reduction practice.",
    ],
  },
  {
    slug: "tdlc-summer-camp",
    name: "TDLC Summer Camp",
    status: "upcoming",
    partner: "Thomas Dunn Learning Center",
    summary:
      "A proposed St. Louis collaboration on a Hardware Technology and Ethical AI Use program for young people aged 15 and up.",
    body: [
      "Proposed with Thomas Dunn Learning Center in St. Louis. The camp would cover hardware technology alongside ethical AI use for participants aged 15 and up.",
    ],
  },
];

export const activePrograms = programs.filter((p) => p.status === "active");
export const upcomingPrograms = [
  ...programs.filter((p) => p.status === "upcoming"),
  ...inDevelopment,
];

export const focusAreas = [
  "Digital Inclusion",
  "Circular Economy",
  "E-Waste Awareness",
  "Youth Empowerment",
  "Community Engagement",
];

export const coreValues = [
  { name: "Impact First", detail: "We prioritise real change." },
  { name: "Sustainability", detail: "Environmental responsibility guides our work." },
  { name: "Equity", detail: "Tech access shouldn't depend on privilege." },
  { name: "Collaboration", detail: "Strong partnerships scale our impact." },
  {
    name: "Integrity",
    detail: "Transparency and accountability are central to our operations.",
  },
];

export const model = [
  {
    step: "Collect",
    detail:
      "Donated and used devices come in from organisations, institutions, and individuals.",
  },
  {
    step: "Refurbish",
    detail: "Every device is assessed, repaired, and prepared for redistribution.",
  },
  {
    step: "Distribute",
    detail: "Machines reach students, young creatives, and underserved communities.",
  },
];

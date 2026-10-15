/**
 * Programme catalogue. `status` drives the badge treatment everywhere a programme appears.
 *
 * Order, summaries, first paragraphs, and figures follow the client's October 2026 website
 * review, which is the source of truth: Breakthrough Series first, as the review lists it,
 * which also makes it the featured cell on the home page. Figures come from
 * content/impact.ts where any other surface also states them.
 */

import {
  devicesToDate,
  ewasteToDate,
  listOf,
  schoolTourSchools2025,
  schoolTourSchools2026,
  schoolTourSchoolsCount2026,
  schoolTourStudents2025,
  schoolTourStudents2026,
  schoolTourUnderstanding2026,
  schoolsToDate,
  studentsToDate,
} from "@/content/impact";

export type ProgramStatus = "active" | "upcoming";

export type Program = {
  slug: string;
  name: string;
  status: ProgramStatus;
  partner?: string;
  summary: string;
  body: string[];
  /** Delivered results, under the review's own headings. Omitted where none exist. */
  results?: { label: string; detail: string }[];
  /**
   * Cumulative figures, as distinct from `results`: running totals with no single date,
   * rendered under "To date".
   */
  stats?: { label: string; detail: string }[];
  /**
   * The home page card's figures: up to three short figure + label pairs, so every card is
   * the same shape whatever the length of its full results. Only set where `stats` and
   * `results` are not already short figures; the card falls back to them otherwise. The full
   * write-ups stay on the programme page the card links to.
   */
  highlights?: { label: string; detail: string }[];
  target?: string;
};

export const programs: Program[] = [
  {
    slug: "breakthrough-series",
    name: "Breakthrough Series",
    status: "active",
    summary:
      "Connecting refurbished technology with mentorship and opportunity.",
    body: [
      "The Breakthrough Series supports underserved young people aged 18–35 by connecting access to refurbished devices with mentorship, personal development, and opportunities to strengthen digital skills.",
    ],
    /* The review's "Impacts". */
    results: [
      {
        label: "22",
        detail: "Upcycled laptop devices to underserved youth aged 18 to 35, in 2026",
      },
      {
        label: "85%",
        detail: "Of recipients actively using devices for learning or income",
      },
      {
        label: "80%",
        detail: "Of recipients in at least one structured mentorship interaction",
      },
    ],
  },
  {
    slug: "school-tour-initiative",
    name: "School Tour Initiative",
    status: "active",
    summary:
      "Building environmental awareness and digital responsibility among students.",
    body: [
      "The School Tour Initiative introduces students to electronic waste, responsible technology use, digital sustainability, and the importance of extending the useful life of electronic devices.",
    ],
    target:
      "1,000 students across 10 schools in 12 months, with a 60% literacy improvement measured pre and post session.",
    /* The review's "Reported achievements in 2025" and "2026 reporting", each with its schools. */
    results: [
      {
        label: "Reported achievements in 2025",
        detail: `Three schools reached Lagos State. ${schoolTourStudents2025.value} students engaged. Five refurbished laptops were donated.`,
      },
      {
        label: "Schools visited, 2025",
        detail: listOf(schoolTourSchools2025),
      },
      {
        label: "2026 reporting",
        detail: `${schoolTourSchoolsCount2026.value} schools in Lagos State Nigeria. ${schoolTourStudents2026.value} Students engaged. ${schoolTourUnderstanding2026.value} ${schoolTourUnderstanding2026.label}`,
      },
      {
        label: "Schools visited, 2026",
        detail: listOf(schoolTourSchools2026),
      },
    ],
    /*
      The review's headline successes. The home card shows the first two (the running totals
      the home glance leads with); the programme page shows all three as its Impacts.
    */
    highlights: [
      { label: schoolsToDate.value, detail: schoolsToDate.label },
      { label: studentsToDate.value, detail: studentsToDate.label },
      { label: schoolTourUnderstanding2026.value, detail: schoolTourUnderstanding2026.label },
    ],
  },
  {
    slug: "project-9-12",
    name: "Project 9-12",
    status: "active",
    partner: "Passback",
    summary:
      "Promoting youth development through sports, technology, and community engagement.",
    body: [
      "Project 9-12 combines access to sports equipment with opportunities for young people to participate in organised activities that encourage teamwork, inclusion, and personal development.",
    ],
    /*
      The review's "Programme activities". Its "Schools engaged" list and "Monitoring focus"
      are on the programme page, in content/program-details.ts. The 2026 event report link is
      left out until the client supplies it.
    */
    results: [
      {
        label: "Phase 1 – June 2025 (Lagos District IV)",
        detail:
          "Students from five secondary schools participated. Participating Schools included: Mainland Senior High School, Lagos City Senior School, Mobolaji Bank Anthony High School, Saint Francis Junior Grammar School, Akoka Junior Grammar School. Impact: 200+ students engaged, 200+ Upcycled sports gear donated, 5 refurbished laptops awarded to deserving students.",
      },
      {
        label: "Phase 2 – August 2025 (Makoko Community)",
        detail:
          "The second phase expanded beyond schools to serve the broader community. Impact: Sports gear donated to a community football team, 100+ children and community members reached.",
      },
      { label: "2025", detail: "300+ reached in 2025" },
      {
        label: "Project 9-12 Activity 2026",
        detail:
          "Event was hosted at the Bariga Stadium Yaba. 125+ students engaged, 450+ sports gears donated, 10 upcycled laptops donated to 10 schools. 125+ reached in 2026.",
      },
    ],
    stats: [
      { label: "425", detail: "students from 2025 till date" },
      { label: "700+", detail: "Sports gears donated in Lagos state" },
    ],
  },
  {
    slug: "greenbin-360",
    name: "GreenBin 360",
    status: "active",
    summary:
      "Responsible e-waste recovery for a more circular technology economy.",
    body: [
      "GreenBin 360 connects businesses and institutions with responsible electronic waste collection and recovery services. The initiative supports the collection of retired technology, the identification of devices suitable for reuse or refurbishment, and the responsible management of equipment that cannot be reused.",
    ],
    /*
      The review's "Reported impact", read from content/impact.ts rather than retyped. Its
      partner list is on the programme page, in content/program-details.ts.
    */
    stats: [
      {
        label: `More than ${ewasteToDate.value.replace("+", "")} lbs`,
        detail: "of e-waste upcycled across US operations since inception.",
      },
      {
        label: `More than ${devicesToDate.value.replace("+", "")}`,
        detail: "devices redistributed",
      },
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
    /* The review heads the programme "SkillSync Initiative in Partnership with the Federal
       Government of Nigeria". The Office is still named in its overview. */
    partner: "the Federal Government of Nigeria",
    summary:
      "Equipping emerging creatives with the tools to develop their potential.",
    body: [
      "The SkillSync Initiative supports emerging Nigerian creatives by improving access to functional technology and opportunities that can strengthen digital creativity, entrepreneurship, and income generation.",
    ],
    /* The review's "Impact". It gives no year, so it is a running total. */
    stats: [{ label: "15+", detail: "devices donated" }],
  },
  {
    slug: "circular-tech-bootcamp",
    name: "Circular Tech Bootcamp",
    status: "active",
    /*
      The partner belongs to one of the two deliveries, not to the whole programme. Thomas
      Dunn Learning Center hosts and co-runs the St. Louis cohort; the Lagos cohort runs
      without them. Credited here because the alternative was leaving a real partner off the
      programme entirely, and the detail page says which cohort is theirs.
    */
    partner: "Thomas Dunn Learning Center, in St. Louis, Missouri",
    summary:
      "Developing practical skills in technology refurbishment and responsible e-waste management.",
    body: [
      "The Circular Tech Bootcamp equips young people with practical knowledge and skills in electronic waste management, device recovery, refurbishment, and the circular technology economy.",
    ],
    /* The review's "Impact". It gives no year, so these are running totals. */
    stats: [
      {
        label: "21",
        detail: "young persons trained on device upcycling, repair and refurbishment.",
      },
      { label: "Location", detail: "St Louis USA and Lagos Nigeria" },
      { label: "14 Refurbished laptops", detail: "donated during this project" },
    ],
    /* The two figures from the stats above, without the Location line, which is not one. */
    highlights: [
      {
        label: "21",
        detail: "young persons trained on device upcycling, repair and refurbishment.",
      },
      { label: "14", detail: "Refurbished laptops donated during this project" },
    ],
  },
];

/*
  There was a second list here, `inDevelopment`, holding two entries that are now gone:

  - Google Hardware Recycling Workplan. An internal planning document, not a programme the
    public was ever meant to read about.
  - TDLC Summer Camp. It ran, so it is no longer upcoming. Written up as a completed event
    in content/news.ts instead.

  With both removed the list was empty, and `upcomingPrograms` was spreading an empty array
  into a filter, so the list and the spread came out with them. GreenBin 360 Smart Bin
  Ecosystem is now the only upcoming programme, and it already carries status: "upcoming"
  in the catalogue above, which is all the filter below needs.
*/

export const activePrograms = programs.filter((p) => p.status === "active");
export const upcomingPrograms = programs.filter((p) => p.status === "upcoming");

/**
 * The home page programmes section, from the October 2026 website review. The count is the
 * catalogue's, so the heading cannot say six while the grid shows five or seven.
 */
export const programsIntro = {
  title: `One circular technology model. ${activePrograms.length} Active Projects.`,
  lede: "Multiple pathways to impact.",
  body: [
    "JustUsedTech connects device collection and refurbishment with programmes that promote digital inclusion, environmental awareness, education, mentorship, and youth empowerment.",
    "From school-based e-waste awareness sessions to refurbished device distribution and community partnerships, our programmes aim to extend the useful life of technology while creating opportunities for underserved communities.",
    "Each programme has its own objectives, target beneficiaries, activities, and impact measures. Together, they connect responsible technology recovery with meaningful social outcomes.",
  ],
};

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

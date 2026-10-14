/**
 * Programme catalogue. `status` drives the badge treatment everywhere a programme appears.
 *
 * Summaries and first paragraphs follow the client's October 2026 website review. Figures
 * come from content/impact.ts where any other surface also states them, and are typed here
 * only where this catalogue is their one home. SkillSync and Circular Tech Bootcamp carry
 * the figures the client supplied in that review and nothing else.
 *
 * TODO(client): Q17. The review lists the programmes Breakthrough Series first. The order
 * below is unchanged, which keeps School Tour as the featured cell on the home page.
 */

import {
  devicesToDate,
  ewasteToDate,
  listOf,
  schoolTourSchools2025,
  schoolTourSchools2026,
  schoolTourStudents2025,
  schoolTourStudents2026,
  schoolTourUnderstanding2026,
  stLouisShare,
} from "@/content/impact";

export type ProgramStatus = "active" | "upcoming";

export type Program = {
  slug: string;
  name: string;
  status: ProgramStatus;
  partner?: string;
  summary: string;
  body: string[];
  /**
   * Dated, verified results only. Omitted where none exist. Every label leads with its year
   * or its date, because results now span 2025 and 2026 under one "Delivered" heading.
   */
  results?: { label: string; detail: string }[];
  /**
   * Cumulative figures, as distinct from `results`.
   *
   * The two are not interchangeable. `results` is dated delivery; these are running totals
   * with no single date, rendered under "To date", so filing them as results would put a year
   * on a number that has none.
   */
  stats?: { label: string; detail: string }[];
  target?: string;
};

export const programs: Program[] = [
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
    /*
      One student count per year, never per school: nothing supplied attributes a count to a
      single school. School counts and names come from impact.ts, and 2026's from the visit
      log, so this list cannot disagree with the record it summarises.
    */
    results: [
      {
        label: `2025: ${schoolTourSchools2025.length} schools reached`,
        detail: `${listOf(schoolTourSchools2025)}, in Lagos State.`,
      },
      {
        label: `2025: ${schoolTourStudents2025.value} students`,
        detail:
          "Engaged in structured e-waste and digital sustainability sessions.",
      },
      { label: "2025: 5 laptops", detail: "Refurbished laptops donated." },
      {
        label: `2026: ${schoolTourSchools2026.length} schools reached`,
        detail: "In Lagos State, Nigeria. Every visit is listed on the programme page.",
      },
      {
        label: `2026: ${schoolTourStudents2026.value} students`,
        detail:
          "Engaged in e-waste awareness and digital sustainability sessions.",
      },
      {
        label: `2026: ${schoolTourUnderstanding2026.value}`,
        detail: `${schoolTourUnderstanding2026.label}.`,
      },
    ],
  },
  {
    slug: "breakthrough-series",
    name: "Breakthrough Series",
    status: "active",
    summary:
      "Connecting refurbished technology with mentorship and opportunity.",
    body: [
      "The Breakthrough Series supports underserved young people aged 18 to 35 by connecting access to refurbished devices with mentorship, personal development, and opportunities to strengthen digital skills.",
    ],
    /*
      The first dated delivery this programme has carried since a named individual's 2025
      story was removed at the client's request.

      TODO(client): Q7. The review also reports 85% of recipients actively using devices for
      learning or income and 80% in at least one structured mentorship interaction. Both are
      held until the client gives the number of recipients who responded, which the
      programme's own measurement text promises to report alongside them.
    */
    results: [
      {
        label: "2026: 22 laptops",
        detail: "Upcycled laptops donated to underserved youth aged 18 to 35.",
      },
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
      TODO(client): Q9. Held from the review until answered: the "425 students from 2025 till
      date" total (the 2025 300+ includes community members, not only students), the "700+
      sports gears donated" total (200+ and 450+ make 650+), the 2026 "Schools engaged" list
      (identical to the School Tour 2026 list), and the 2026 event's date and venue ("Bariga
      Stadium Yaba"). The 2026 event report link is left out until the client supplies it.
    */
    results: [
      {
        label: "Phase 1, June 2025, Lagos District IV",
        /*
          The five schools are named rather than counted. The profile lists them, and a
          named school is a checkable claim where "5 schools" is only an assertion.
        */
        detail:
          "200+ students engaged across Mainland Senior High School, Lagos City Senior School, Mobolaji Bank Anthony High School, Saint Francis Junior Grammar School, and Akoka Junior Grammar School. 200+ upcycled sports gear donated, and 5 refurbished laptops awarded to deserving students.",
      },
      {
        label: "Phase 2, August 2025, Makoko",
        detail:
          "The second phase expanded beyond schools to the wider community. Sports gear donated to a community football team, and 100+ children and community members reached.",
      },
      {
        label: "2025 in total",
        detail: "300+ students, children, and community members reached.",
      },
      {
        label: "2026 event",
        detail:
          "125+ students engaged, 450+ sports gear donated, and 10 upcycled laptops donated to 10 schools.",
      },
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
      The US operations figures from content/impact.ts. Same numbers, not new ones: this
      programme IS the US collection operation, so its totals are that operation's. All three
      are read rather than retyped, because a retyped copy here went stale once already.

      TODO(client): Q13. The review lists the GreenBin partners as Cortex, CIC 2112, CIC 4200,
      WashU, AB Mauri, and Higher Education Metropolitan. Only Cortex STL and WashU IT are in
      content/partners.ts; the list goes in once the exact names and logos arrive.
    */
    stats: [
      {
        label: `${ewasteToDate.value} lbs`,
        detail: "E-waste upcycled across US operations since inception",
      },
      { label: devicesToDate.value, detail: "Devices redistributed" },
      { label: stLouisShare.value, detail: "Devices returned to the St. Louis community" },
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
    /*
      TODO(client): Q10. The review heads this programme "SkillSync Initiative in Partnership
      with the Federal Government of Nigeria", a wider claim than the Office credited above.
      Held until the client confirms the wording.
    */
    summary:
      "Equipping emerging creatives with the tools to develop their potential.",
    body: [
      "The SkillSync Initiative supports emerging Nigerian creatives by improving access to functional technology and opportunities that can strengthen digital creativity, entrepreneurship, and income generation.",
    ],
    /*
      A running total rather than a dated result: the review gives no year for it.
      TODO(client): Q10. Move it into `results` under its year once the client gives one.
    */
    stats: [{ label: "15+ devices", detail: "Donated to emerging creatives" }],
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
    /*
      Running totals rather than dated results: the review gives no year or cohort split.
      TODO(client): Q10. Move them into `results` once the client gives the year.
    */
    stats: [
      {
        label: "21 young people",
        detail:
          "Trained on device upcycling, repair, and refurbishment, in St. Louis, Missouri, and Lagos",
      },
      { label: "14 laptops", detail: "Refurbished and donated during the programme" },
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

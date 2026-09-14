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
  /**
   * Cumulative operating figures, as distinct from `results`.
   *
   * The two are not interchangeable. `results` is dated delivery and renders on /programs
   * under a "Delivered in 2025" heading; these are running totals with no single date, so
   * filing them as results would put a 2025 label on a number that is "to date". Same
   * figures as the Impact page, not new ones.
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
      "E-waste literacy and digital awareness sessions delivered inside Lagos schools.",
    body: [
      "We take the circular economy into classrooms. Sessions cover what happens to a device at the end of its first life, why e-waste matters in the neighbourhood students live in, and what responsible disposal involves in practice.",
    ],
    target:
      "1,000 students across 10 schools in 12 months, with a 60% literacy improvement measured pre and post session.",
    /*
      Restated against the 2026 organisation profile, which gives the 2025 reach as three
      named schools, over 100 students engaged, and 5 refurbished laptops donated.

      The per-school split that used to sit here credited 100+ to Lagos City School and 60+
      to Gbagada Junior High, which sums to 160+ against a source that says 100+ in total.
      Neither number was attributable to a single school in anything supplied, so the count
      is reported the way the profile reports it: once, across the three sites.
    */
    results: [
      {
        label: "Three schools reached",
        detail:
          "Whanyinna School in Makoko, Lagos City School, and Gbagada Junior High School.",
      },
      {
        label: "100+ students",
        detail:
          "Engaged in structured e-waste and digital sustainability sessions.",
      },
      { label: "5 laptops", detail: "Refurbished laptops donated." },
    ],
  },
  {
    slug: "breakthrough-series",
    name: "Breakthrough Series",
    status: "active",
    summary:
      "Refurbished device distribution paired with mentorship and storytelling for underserved youth aged 18 to 35.",
    /*
      Rewritten in plain terms. The previous line ran "A device on its own rarely changes a
      trajectory. The Breakthrough Series pairs each refurbished machine with mentorship and
      a platform to tell the story of what gets built with it." Grammatical, but it said
      almost nothing: "changes a trajectory" and "a platform to tell the story of what gets
      built with it" are both abstractions standing in for facts the concept note states
      outright. This says what actually happens and when.
    */
    body: [
      "A laptop on its own is rarely enough. Each machine goes out with mentorship from people already working in digital fields, and the team checks back at three and six months to record what the recipient has been able to do with it.",
    ],
    /*
      No `results`. The only entry was a named individual's 2025 story, removed at the
      client's request. Nothing replaced it: the programme's other 2025 figures are targets
      rather than delivery, and those live in content/program-details.ts under `targets`
      where they are labelled as plans.

      The same person is still written up at length in content/voices.ts. That is a separate
      surface and a separate decision, flagged rather than assumed.
    */
  },
  {
    slug: "project-9-12",
    name: "Project 9-12",
    status: "active",
    partner: "Passback",
    summary: "Sports gear and technology access for young people aged 10 to 18.",
    body: [
      "Passback collects used sports equipment and sends it on. JustUsedTech sorts it by condition, distributes what is usable through schools and community events, and runs the clinics and tournaments those distributions happen at.",
    ],
    results: [
      {
        label: "Phase 1, June 2025, Lagos District IV",
        /*
          The five schools are named rather than counted. The profile lists them, and a
          named school is a checkable claim where "5 schools" is only an assertion.
        */
        detail:
          "200+ students engaged across Mainland Senior High School, Lagos City Senior School, Mobolaji Bank Anthony High School, Saint Francis Junior Grammar School, and Akoka Junior Grammar School. 5 laptops awarded and upcycled sports gear donated.",
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
    /* The US operations figures from content/impact.ts. Same numbers, not new ones: this
       programme IS the US collection operation, so its totals are that operation's. */
    stats: [
      { label: "95,000+ lbs", detail: "E-waste upcycled to date" },
      { label: "60%", detail: "Devices returned to the St. Louis community" },
      { label: "800+", detail: "Devices redistributed" },
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

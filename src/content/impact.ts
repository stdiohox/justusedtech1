/**
 * The figures ledger. Every number the site states about its own work is declared here once
 * and read everywhere else: the home hero and impact glance, the Impact page, the programme
 * pages, and /impact/statistics. Do not round or embellish.
 *
 * Series are stored raw and totals are derived from them, so a corrected year moves every
 * total that depends on it. Where the client's October 2026 website review disagrees with a
 * figure already on the site, the site's figure is held and the line carries a
 * `TODO(client): Qn` naming the open question in the review audit. Search for TODO(client)
 * to find every one.
 */

import { schoolsVisited } from "@/content/news";

export type Stat = {
  value: string;
  label: string;
  detail?: string;
};

/*
  There was a `heroStats` list here, three pills for the home hero. Nothing imported it: the
  hero renders floating cards, not pills, and had been carrying its own hardcoded strings
  since. It was a third copy of the weight figure, reading 45,000+ against 95,000+ in
  `usOperations` below, and the only reason it never showed a wrong number on screen is that
  it never reached the screen at all. The hero now reads `ewasteToDate`.
*/

/*
  The 2025 set, one constant per fact.

  Each figure is declared once and then composed into the lists below, so the impact
  dashboard can pull a specific number into a specific slot without a second copy of it
  drifting out of step with the flat list. `impact2025` is still the whole set in order and
  is still the thing to map over when a surface just wants every 2025 number.
*/

/* TODO(client): Q5. The review does not restate this figure; keep, update, or drop. */
export const reached2025: Stat = {
  value: "460+",
  label: "Students and community members reached",
  detail: "Across 8 schools in Lagos State.",
};

/* TODO(client): Q11, for this and the next two. Not mentioned in the review. */
export const laptopsNigeria2025: Stat = {
  value: "300+",
  label: "Refurbished laptops donated in Nigeria",
};

export const devicesUs2025: Stat = {
  value: "200+",
  label: "Devices donated in the US",
  detail: "Including Saint Louis University and IISTL.",
};

export const volunteers2025: Stat = {
  value: "20+",
  label: "Active volunteers supporting programmes",
};

/*
  TODO(client): Q2. The review gives 2025 as 39,880 lbs (see `ewasteByYear`) and the Impact
  page draft adds "31,000+ lbs upcycled", which matches 2024. Held at 45,000+ until answered.
*/
export const ewasteTotal2025: Stat = {
  value: "45,000+",
  label: "lbs of e-waste upcycled",
  detail: "20,000+ lbs direct, plus 25,000+ lbs through partner Spectrum E-cycle.",
};

export const impact2025: Stat[] = [
  reached2025,
  laptopsNigeria2025,
  devicesUs2025,
  volunteers2025,
  ewasteTotal2025,
];

/**
 * The 2025 e-waste figure kept as its two stated parts, so it can be drawn as a proportion
 * rather than only read as a total.
 *
 * `lbs` is the floor of each stated figure, not a measured value: the source numbers carry
 * a "+", so 20,000 and 25,000 are the smallest each part can be. They are here to set the
 * relative width of the two bar segments, which is the one thing a reader takes from the
 * shape. Every number shown as text comes from `display`, with the "+" intact, so nothing
 * on screen claims more precision than the figures actually have.
 *
 * There is no time series anywhere in this file, and this is not one. Do not turn it into
 * a trend line by inventing months.
 */
export const ewasteSplit2025 = {
  total: ewasteTotal2025.value,
  unit: "lbs",
  caption: "Weight recovered in 2025, by route.",
  segments: [
    {
      display: "20,000+",
      label: "Collected and upcycled directly",
      lbs: 20000,
    },
    {
      display: "25,000+",
      label: "Through partner Spectrum E-cycle",
      lbs: 25000,
    },
  ],
};

/** The 2025 figures that sit in the dashboard's tile row, under the two feature cards. */
export const impactTiles2025: Stat[] = [
  laptopsNigeria2025,
  devicesUs2025,
  volunteers2025,
];

export const communitiesReached = ["Makoko", "Gbagada", "Lagos Mainland"];

/**
 * Lifetime weight recovered, US operations. Distinct from `ewasteTotal2025`, which is the
 * 2025 slice of it and stays 45,000+.
 *
 * Declared on its own because three surfaces state it: the impact page's US operations row,
 * the GreenBin 360 stats in content/programs.ts, and the hero's floating card. Those three
 * had drifted to 95,000, 95,000, and 90,000. 90,000+ is the figure, confirmed by the client
 * on 2026-09-28, and it is now stated once.
 *
 * TODO(client): Q1. The review gives 200,000+ lbs since 2017, and its annual series below
 * sums to that. Held at 90,000+ until the client confirms the series can be published as
 * fact. Q3: the review's caption for it, "during the year", is wrong for a lifetime total.
 */
export const ewasteToDate: Stat = {
  value: "90,000+",
  label: "lbs of e-waste upcycled to date",
};

/* TODO(client): Q6. The review gives 1,200+ devices redistributed since 2017. */
export const devicesToDate: Stat = {
  value: "800+",
  label: "Devices redistributed",
  detail: "To underserved and minority communities.",
};

/* TODO(client): Q11, for both. Not mentioned in the review. */
export const stLouisShare: Stat = {
  value: "60%",
  label: "of devices upcycled back into St. Louis, Missouri",
};

export const stLouisPartners: Stat = {
  value: "20+",
  label: "Community and corporate partners in St. Louis, Missouri",
};

export const usOperations: Stat[] = [
  ewasteToDate,
  stLouisShare,
  devicesToDate,
  stLouisPartners,
];

/**
 * Impact page copy, from the October 2026 website review. Kept beside the figures it
 * introduces so the words and the numbers change in the same file.
 *
 * TODO(client): Q2. The review's "Reported 2025 results" (39,880+ lbs, and 31,000+ lbs) are
 * not printed; the 2025 total stays in the dashboard at the held 45,000+.
 * TODO(client): Q1. Its "Cumulative results: 200,000+ lbs" is held at 90,000+.
 * TODO(client): Q21. The review's Impact page ends after this section. Ask if more follows.
 */
export const impactPage = {
  title: "Our Impact",
  lede: "At JustUsedTech, we measure impact through the environmental value of technology recovery, the redistribution of functional devices, and the opportunities created through our education and youth empowerment programmes.",
  method: [
    "Our Monitoring, Evaluation and Learning approach tracks programme activities, beneficiary engagement, device handovers, and outcomes where data are available. We distinguish annual achievements from cumulative results, and programme targets from verified outcomes.",
    "This enables us to communicate our progress transparently, learn from implementation, and strengthen the effectiveness of our programmes.",
  ],
  environment: {
    title: "Environmental Impact: Extending the Life of Technology",
    lede: "Electronic waste contains materials that require responsible management. Recovering and reusing suitable devices can reduce premature disposal and preserve the value of existing technology.",
    close:
      "We work to strengthen the collection, assessment, refurbishment, and redistribution processes that support a more circular approach to technology.",
  },
};

/* ------------------------------------------------------------------ *
 * E-waste by year, 2017 to date. From the October 2026 website review.
 * ------------------------------------------------------------------ */

export type EwasteYear = {
  year: number;
  lbs: number;
  /** The current year, still counting. Drawn and labelled apart so it never reads as a drop. */
  partial?: boolean;
  /** The client's own explanation for a year that stands out, where they gave one. */
  note?: string;
};

/**
 * Pounds of e-waste diverted per year, US operations. This is the series the statistics
 * page and the home glance chart draw.
 *
 * TODO(client): Q1. The review calls these "proposed" annual figures, to be reconciled
 * against collection registers, partner reports, and weight records before being adopted as
 * official. They sum to 200,120 lbs while the lifetime figure is held at 90,000+, so the
 * statistics page shows them with that caveat and no running total until Q1 is answered.
 * TODO(client): Q2. 2025 here is 39,880 against the 45,000+ held in `ewasteTotal2025`.
 */
export const ewasteByYear: EwasteYear[] = [
  { year: 2017, lbs: 9000 },
  { year: 2018, lbs: 14090 },
  { year: 2019, lbs: 17450 },
  { year: 2020, lbs: 7000, note: "Lower because of the COVID-19 pandemic." },
  { year: 2021, lbs: 9200, note: "Gradual recovery from the pandemic." },
  { year: 2022, lbs: 17900 },
  { year: 2023, lbs: 27100 },
  { year: 2024, lbs: 31650 },
  { year: 2025, lbs: 39880 },
  { year: 2026, lbs: 26850, partial: true, note: "So far this year, and still counting." },
];

/** When the series was last updated. The partial year is "to date" as of this. */
export const ewasteAsOf = "October 2026";

/**
 * "90,000+" is 90000. The floor a display figure commits to, for the check below.
 *
 * Throws on a value with no digits rather than returning NaN: NaN compares false against
 * everything, so the check below would pass without checking anything.
 */
export function floorOf(value: string): number {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) throw new Error(`impact.ts: floorOf("${value}") has no digits`);
  return Number(digits);
}

/** "A, B, and C", the site's list style, for names composed from a record. */
export function listOf(items: string[]) {
  return new Intl.ListFormat("en-US").format(items);
}

/** Pounds, with thousands separators, as every surface prints them. */
export function formatLbs(lbs: number) {
  return lbs.toLocaleString("en-US");
}

/*
  The lifetime figure can never claim more than the years it is made of. Thrown at module
  load, which happens at build time for every page that imports this file, so a headline that
  outgrows its series fails the build rather than reaching a reader. Same rule as
  galleryFrame in content/program-details.ts.
*/
const ewasteSeriesTotal = ewasteByYear.reduce((sum, y) => sum + y.lbs, 0);
if (floorOf(ewasteToDate.value) > ewasteSeriesTotal) {
  throw new Error(
    `impact.ts: ewasteToDate (${ewasteToDate.value}) exceeds the annual series total (${ewasteSeriesTotal})`,
  );
}

/* ------------------------------------------------------------------ *
 * School Tour Initiative, by year.
 * ------------------------------------------------------------------ */

/*
  TODO(client): Q12. The review calls the second school "Lagos City College"; the site has
  carried "Lagos City School" since the 2026 organisation profile. It may also be the 2026
  "Lagos City Senior College", which is why no combined school count is shown anywhere.
*/
export const schoolTourSchools2025 = [
  "Whanyinna School",
  "Lagos City School",
  "Gbagada Junior High School",
];

/*
  The 2026 schools are the visit log's, so the count cannot drift from the record.
  TODO(client): Q4. The review says 18 schools and 18 sessions across 2025 and 2026, and
  "10+" for 2026. The records name 3 schools in 2025 and 10 in 2026, with 11 visits in 2026.
  TODO(client): Q12. The review spells Victokev Schools as "Victotev" and "Vitokev", and
  Aiyetoro as "Ayetoro". The log keeps its own spellings until the client says which is right.
*/
export const schoolTourSchools2026 = schoolsVisited;

/* TODO(client): Q5. The review gives 360 students engaged in 2025. Held at 100+. */
export const schoolTourStudents2025: Stat = {
  value: "100+",
  label: "Students engaged in 2025",
};

export const schoolTourStudents2026: Stat = {
  value: "510",
  label: "Students engaged in 2026",
};

/*
  No two-year total is stated. TODO(client): Q5. The review's total is 870 (360 + 510),
  which depends on the held 2025 figure.
*/

export const schoolTourUnderstanding2026: Stat = {
  value: "85%",
  label:
    "Of students recorded improved understanding of e-waste, the circular economy, and environmental sustainability",
};

/* ------------------------------------------------------------------ *
 * Laptops, 2026.
 * ------------------------------------------------------------------ */

/*
  TODO(client): Q7. The review states 22 laptops donated in 2026 twice: here, across six
  places, and as Breakthrough Series' 2026 delivery. They are declared apart because nothing
  supplied says they are the same 22, and nothing here adds them to Project 9-12's 10 or the
  bootcamp's 14.
*/
export const laptops2026: Stat = {
  value: "22",
  label: "Laptops donated in 2026",
  detail:
    "Across St. Louis, Missouri, Kenya, and Lagos, Ibadan, Delta, and Kwara State in Nigeria.",
};

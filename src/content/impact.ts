/**
 * The figures ledger. Every number the site states about its own work is declared here once
 * and read everywhere else: the home hero and impact glance, the Impact page, the programme
 * pages, and /impact/statistics. Do not round or embellish.
 *
 * Figures and wording follow the client's October 2026 website review, which is the source
 * of truth. Series are stored raw and totals are derived from them where the review's total
 * is the sum of its parts, so a corrected year moves every total that depends on it.
 */

export type Stat = {
  value: string;
  label: string;
  detail?: string;
};

/* ------------------------------------------------------------------ *
 * E-waste by year, 2017 to date.
 * ------------------------------------------------------------------ */

export type EwasteYear = {
  year: number;
  lbs: number;
  /** The current year, still counting. Drawn and labelled apart so it never reads as a drop. */
  partial?: boolean;
  /** The review's own words for a year that stands out, where it gave any. */
  note?: string;
};

/** Pounds of e-waste diverted per year, US operations, as the review lists them. */
export const ewasteByYear: EwasteYear[] = [
  { year: 2017, lbs: 9000 },
  { year: 2018, lbs: 14090 },
  { year: 2019, lbs: 17450 },
  { year: 2020, lbs: 7000, note: "Due to the COVID-19 pandemic." },
  { year: 2021, lbs: 9200, note: "Gradual recovery from the pandemic." },
  { year: 2022, lbs: 17900 },
  { year: 2023, lbs: 27100 },
  { year: 2024, lbs: 31650 },
  { year: 2025, lbs: 39880 },
  { year: 2026, lbs: 26850, partial: true, note: "So far and still counting." },
];

/** When the series was last updated. The partial year is "to date" as of this. */
export const ewasteAsOf = "October 2026";

/** The review's title for the series, used as the chart's caption. */
export const ewasteSeriesTitle = "Yearly e-waste upcycled in US operations";

/** The review's "Historical E-Waste Collection Performance" copy, as written. */
export const ewasteHistory = {
  title: "Historical E-Waste Collection Performance (2017–2026)",
  body: [
    "From its establishment in 2017 through October 2026, JustUsedTech is working toward documenting a cumulative total of 200,000 pounds of electronic waste collected through its e-waste recovery and collection activities.",
    "Collection volumes are expected to vary from year to year in response to operational capacity, collection partnerships, institutional participation, and wider economic conditions. Collection activity during 2020 and 2021 was particularly affected by the COVID-19 pandemic, which disrupted normal business operations, movement, institutional activities, and collection logistics.",
    "The proposed annual breakdown reflects lower collection volumes during the pandemic period, followed by a gradual recovery and subsequent growth as collection activities and partnerships expanded.",
  ],
};

/** "90,000+" is 90000. Throws on a value with no digits, where NaN would pass any check. */
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

const ewasteYear = (year: number) => {
  const found = ewasteByYear.find((y) => y.year === year);
  if (!found) throw new Error(`impact.ts: no e-waste figure for ${year}`);
  return found;
};

/** Lifetime weight, 2017 to date. The review's figure; the series below sums to 200,120. */
export const ewasteToDate: Stat = {
  value: "200,000+",
  label: "Pounds (lbs) of e-waste collected from 2017 till date",
  detail:
    "Electronic waste processed through reported US collection and upcycling activities.",
};

/* Read off the series, so the 2025 total and the 2025 bar cannot disagree. */
export const ewasteTotal2025: Stat = {
  value: formatLbs(ewasteYear(2025).lbs),
  label: "lbs of e-waste upcycled through reported US activities in 2025",
};

/**
 * The weights the pounds-to-kilograms converter offers as one-tap presets: the lifetime
 * total and the two most recent years. Declared here so every converter on the site offers
 * the same figures, read off the same series.
 */
export const weightPresets = [
  { label: "Since 2017", lbs: floorOf(ewasteToDate.value) },
  ...ewasteByYear
    .filter((y) => y.year >= 2025)
    .map((y) => ({ label: y.partial ? `${y.year} so far` : String(y.year), lbs: y.lbs })),
];

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
 * Devices and running totals.
 * ------------------------------------------------------------------ */

export const devicesToDate: Stat = {
  value: "1,200+",
  label: "Devices redistributed from 2017 till date",
  detail:
    "Devices reported as redistributed through JustUsedTech's programmes and community activities.",
};

/* Not in the review, and not superseded by it, so they stand as they were. */
export const stLouisShare: Stat = {
  value: "60%",
  label: "of devices upcycled back into St. Louis, Missouri",
};

export const stLouisPartners: Stat = {
  value: "20+",
  label: "Community and corporate partners in St. Louis, Missouri",
};

export const communitiesReached = ["Makoko", "Gbagada", "Lagos Mainland"];

/* ------------------------------------------------------------------ *
 * School Tour Initiative.
 * ------------------------------------------------------------------ */

/*
  The two school lists exactly as the review writes them. They are the review's lists, not
  the dated visit log in content/news.ts, which keeps its own spellings and dates.
*/
export const schoolTourSchools2025 = [
  "Whanyinna School",
  "Lagos City College",
  "Gbagada Junior High School",
];

export const schoolTourSchools2026 = [
  "Eletu Odibo Senior High School",
  "Birrel Avenue Senior High School",
  "Victokev School Lagos",
  "Lagos City Senior College",
  "Wesley Girls' Senior Secondary School",
  "Mainland Junior High School",
  "Senior High School",
  "Aiyetoro Senior Grammar School",
  "Oke-Odo Junior High School",
  "Jibowu Junior High School",
];

/*
  Stated, not derived: the review gives 18 schools and 18 sessions, while its two named
  lists hold 13 schools between them.
*/
export const schoolsToDate: Stat = {
  value: "18",
  label: "Secondary schools reached from 2025 - 2026",
  detail:
    "through our School Tour Initiative activities delivered in District 4, Lagos State.",
};

export const sessionsToDate: Stat = {
  value: "18",
  label: "School Tour Sessions conducted from 2025 till date",
};

export const schoolTourSchoolsCount2026: Stat = {
  value: "10+",
  label: "schools in Lagos State, Nigeria, 2026",
};

export const schoolTourStudents2025: Stat = {
  value: "360",
  label: "students engaged in 2025",
};

export const schoolTourStudents2026: Stat = {
  value: "510",
  label: "students engaged in 2026",
};

/* 870 in the review, and the sum of its two years. */
export const studentsToDate: Stat = {
  value: String(
    floorOf(schoolTourStudents2025.value) + floorOf(schoolTourStudents2026.value),
  ),
  label: "students reached from 2025 till date",
  detail: `${schoolTourStudents2025.value} students engaged in 2025 and ${schoolTourStudents2026.value} in 2026. Students participated in e-waste awareness and digital sustainability sessions for the School Tour Initiative project.`,
};

export const schoolTourUnderstanding2026: Stat = {
  value: "85%",
  label:
    "of student records show improved understanding of e-waste, the circular economy and environmental sustainability",
};

/* ------------------------------------------------------------------ *
 * 2025, other figures. Not in the review, and not superseded by it.
 * ------------------------------------------------------------------ */

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

/** The 2025 figures that sit in the Impact page dashboard's tile row. */
export const impactTiles2025: Stat[] = [
  laptopsNigeria2025,
  devicesUs2025,
  volunteers2025,
];

/* ------------------------------------------------------------------ *
 * Laptops, 2026.
 * ------------------------------------------------------------------ */

export const laptops2026: Stat = {
  value: "22",
  label: "Laptops donated in 2026 alone",
  detail: "across St. Louis, USA; Kenya; and Lagos, Ibadan, Delta and Kwara State, Nigeria",
};

/* ------------------------------------------------------------------ *
 * Impact page copy, as the review writes it.
 * ------------------------------------------------------------------ */

/** 1 lb is exactly 0.45359237 kg (the international avoirdupois pound). */
export const KG_PER_LB = 0.45359237;

/* The lifetime floor in kilograms, for readers who think in kg: 200,000 lbs is 90,718 kg. */
const lifetimeKg = Math.round(floorOf(ewasteToDate.value) * KG_PER_LB);

export const impactPage = {
  title: "Our Impact",
  /* The page's lead figure: the review's cumulative result, at hero size. */
  lifetime: {
    eyebrow: "Since 2017",
    value: ewasteToDate.value,
    unit: "lbs",
    caption: "of e-waste upcycled across US operations since inception",
    metric: `About ${lifetimeKg.toLocaleString("en-US")} kg (${(lifetimeKg / 1000).toFixed(1)} tonnes)`,
    link: "See it year by year",
  },
  lede: "At JustUsedTech, we measure impact through the environmental value of technology recovery, the redistribution of functional devices, and the opportunities created through our education and youth empowerment programmes.",
  method: [
    "Our Monitoring, Evaluation and Learning approach tracks programme activities, beneficiary engagement, device handovers, and outcomes where data are available. We distinguish annual achievements from cumulative results and programme targets from verified outcomes.",
    "This enables us to communicate our progress transparently, learn from implementation, and strengthen the effectiveness of our programmes.",
  ],
  environment: {
    title: "Environmental Impact: Extending the Life of Technology",
    lede: "Electronic waste contains materials that require responsible management. Recovering and reusing suitable devices can reduce premature disposal and preserve the value of existing technology.",
    results2025: {
      heading: "Reported 2025 results",
      items: [
        `${ewasteTotal2025.value}+ lbs of e-waste upcycled through reported US activities.`,
        "31,000+ lbs upcycled.",
      ],
    },
    cumulative: {
      heading: "Cumulative results",
      items: [
        `${ewasteToDate.value} lbs of e-waste upcycled across US operations since inception.`,
      ],
    },
    close:
      "We work to strengthen the collection, assessment, refurbishment, and redistribution processes that support a more circular approach to technology.",
  },
};

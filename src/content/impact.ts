/**
 * Confirmed 2025 numbers and US lifetime operations numbers.
 * These supersede the figures in the older onboarding guide. Do not round or embellish.
 */

export type Stat = {
  value: string;
  label: string;
  detail?: string;
};

/** The three headline pills in the hero. */
export const heroStats: Stat[] = [
  { value: "300+", label: "Laptops donated" },
  { value: "460+", label: "Students and community reached" },
  { value: "45,000+", label: "lbs e-waste diverted" },
];

/*
  The 2025 set, one constant per fact.

  Each figure is declared once and then composed into the lists below, so the impact
  dashboard can pull a specific number into a specific slot without a second copy of it
  drifting out of step with the flat list. `impact2025` is still the whole set in order and
  is still the thing to map over when a surface just wants every 2025 number.
*/

export const reached2025: Stat = {
  value: "460+",
  label: "Students and community members reached",
  detail: "Across 8 schools in Lagos State.",
};

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

export const usOperations: Stat[] = [
  {
    value: "95,000+",
    label: "lbs of e-waste upcycled to date",
  },
  {
    value: "60%",
    label: "of devices upcycled back into St. Louis",
  },
  {
    value: "800+",
    label: "Devices redistributed",
    detail: "To underserved and minority communities.",
  },
  {
    value: "20+",
    label: "Community and corporate partners in St. Louis",
  },
];

/** St. Louis is the origin of every route. Coordinates are [lat, lng]. */
export const corridors = [
  {
    from: { label: "St. Louis, MO", city: "St. Louis", lat: 38.627, lng: -90.1994 },
    to: { label: "Lagos, Nigeria", city: "Lagos", lat: 6.5244, lng: 3.3792 },
  },
  {
    from: { label: "St. Louis, MO", city: "St. Louis", lat: 38.627, lng: -90.1994 },
    to: { label: "Accra, Ghana", city: "Accra", lat: 5.6037, lng: -0.187 },
  },
  {
    from: { label: "St. Louis, MO", city: "St. Louis", lat: 38.627, lng: -90.1994 },
    to: { label: "Nairobi, Kenya", city: "Nairobi", lat: -1.2921, lng: 36.8219 },
  },
];

/**
 * Key copy for the corridor globe. cobe draws no text on the sphere itself, so the
 * city names and the meaning of each color have to live in HTML beside it.
 */
export const corridorLegend = {
  hub: "Collection hub",
  spoke: "Distribution",
};

/**
 * The four corridor cities as one ordered list, hub first. Shared so the globe's pin
 * projection and the legend in the text column cannot fall out of step with each other.
 */
export const corridorCities = [
  { ...corridors[0].from, role: corridorLegend.hub, hub: true },
  ...corridors.map((corridor) => ({ ...corridor.to, role: corridorLegend.spoke, hub: false })),
];

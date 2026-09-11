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

export const impact2025: Stat[] = [
  {
    value: "460+",
    label: "Students and community members reached",
    detail: "Across 8 schools in Lagos State.",
  },
  {
    value: "300+",
    label: "Refurbished laptops donated in Nigeria",
  },
  {
    value: "200+",
    label: "Devices donated in the US",
    detail: "Including Saint Louis University and IISTL.",
  },
  {
    value: "20+",
    label: "Active volunteers supporting programmes",
  },
  {
    value: "45,000+",
    label: "lbs of e-waste upcycled",
    detail: "20,000+ lbs direct, plus 25,000+ lbs through partner Spectrum E-cycle.",
  },
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

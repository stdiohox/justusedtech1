/**
 * The St. Louis distribution corridors, for the globe, the map, and their legends.
 *
 * Split out of content/impact.ts because the globe is a client component: importing the
 * figures ledger from it pulled the ledger, and through it the news and programme content,
 * into the browser bundle. This module imports nothing, so the client gets only routes.
 */

/** St. Louis is the origin of every route. Coordinates are [lat, lng]. */
export const corridors = [
  {
    from: { label: "St. Louis, Missouri", city: "St. Louis", lat: 38.627, lng: -90.1994 },
    to: { label: "Lagos, Nigeria", city: "Lagos", lat: 6.5244, lng: 3.3792 },
  },
  {
    from: { label: "St. Louis, Missouri", city: "St. Louis", lat: 38.627, lng: -90.1994 },
    to: { label: "Accra, Ghana", city: "Accra", lat: 5.6037, lng: -0.187 },
  },
  {
    from: { label: "St. Louis, Missouri", city: "St. Louis", lat: 38.627, lng: -90.1994 },
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

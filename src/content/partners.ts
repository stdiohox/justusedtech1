/**
 * Partner organisations. No logo files have been delivered, so these render as wordmarks.
 * TODO: swap wordmarks for supplied partner logo SVGs when the client delivers them.
 */

export const usPartners = [
  "Passback",
  "10 Billion Strong",
  "Cortex STL",
  "Product Tent",
  "WashU IT",
  "ReeGen",
  "Claim Academy",
  "Revise Robotics",
  "Employment Connection",
  "Thomas Dunn Learning Center",
  "Google",
];

export const nigeriaPartners = [
  "Lagos Educational District IV",
  "Heroes Dreams Alive Foundation (HDA)",
  "Sporty Lagos",
  "Gtech",
  "AreaI",
  "Office of the Special Assistant to the President on Art, Culture and the Creative Economy",
  "Cafe One",
  "Buyscraps Nigeria",
  "Rotaract District 9111",
];

export const allPartners = [...usPartners, ...nigeriaPartners];

/** Long names break the marquee rhythm, so it runs on the shorter wordmarks. */
export const marqueePartners = allPartners.filter((name) => name.length <= 30);

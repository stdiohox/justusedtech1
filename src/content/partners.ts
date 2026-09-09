/**
 * Partner organisations.
 *
 * Seven have supplied a logo. The other thirteen render as typeset wordmarks, and that is
 * the correct end state until real files arrive: a fabricated mark, or a name set in a
 * typeface chosen to look logo-ish, misrepresents the partner.
 *
 * TODO: add a `logo` to the remaining thirteen as the client delivers them. Nothing else
 * needs to change; the render path already branches per partner.
 */

export type Partner = {
  name: string;
  /**
   * The supplied mark, or omitted where none exists.
   *
   * Intrinsic pixel dimensions are recorded alongside the path because next/image needs the
   * true ratio to reserve the right box before the file loads. Guessing one ratio for all
   * seven would shift the strip as each mark arrives: they run from a 1.00 square badge to
   * a 1.91 wordmark.
   */
  logo?: { src: string; width: number; height: number };
};

export const usPartners: Partner[] = [
  { name: "Passback" },
  { name: "10 Billion Strong" },
  { name: "Cortex STL" },
  { name: "Product Tent" },
  { name: "WashU IT" },
  { name: "ReeGen" },
  { name: "Claim Academy" },
  { name: "Revise Robotics" },
  { name: "Employment Connection" },
  {
    name: "Thomas Dunn Learning Center",
    logo: { src: "/partners/thomas-dunn-learning-center.png", width: 478, height: 396 },
  },
  { name: "Google" },
];

export const nigeriaPartners: Partner[] = [
  {
    name: "Lagos Educational District IV",
    logo: { src: "/partners/lagos-education-district-iv.png", width: 536, height: 373 },
  },
  {
    name: "Heroes Dreams Alive Foundation (HDA)",
    logo: { src: "/partners/heroes-dreams-alive.png", width: 236, height: 124 },
  },
  { name: "Sporty Lagos", logo: { src: "/partners/sporty-lagos.png", width: 447, height: 447 } },
  { name: "Gtech", logo: { src: "/partners/gtech.png", width: 573, height: 542 } },
  /* Corrected from "AreaI". The supplied logo sets it AREAi, for Aid for Rural Education
     Access initiative, which is also how the organisation writes it. */
  { name: "AREAi", logo: { src: "/partners/areai.png", width: 1049, height: 548 } },
  {
    /*
      NAMING QUESTION, unresolved, needs the client.

      The supplied logo is the coat of arms of the FEDERAL MINISTRY of Art, Culture and the
      Creative Economy: it reads "Ministry of Art, Culture and the Creative Economy /
      FMACCE / Federal Republic of Nigeria". The partner profile we were given names the
      "Office of the Special Assistant to the President on Art, Culture and the Creative
      Economy". A federal ministry and a presidential adviser's office are not the same
      body, so one of the two is wrong.

      The profile name is displayed here, because that is the confirmed content and it is
      also the partner credited on the SkillSync Initiative in content/programs.ts. The logo
      renders beside it as supplied. If the client confirms the ministry is the real
      partner, the fix is this `name` plus the `partner` field on skillsync-initiative.
    */
    name: "Office of the Special Assistant to the President on Art, Culture and the Creative Economy",
    logo: { src: "/partners/fmacce-art-culture-creative-economy.png", width: 341, height: 329 },
  },
  { name: "Cafe One" },
  { name: "Buyscraps Nigeria" },
  { name: "Rotaract District 9111" },
];

export const allPartners: Partner[] = [...usPartners, ...nigeriaPartners];

/**
 * The home-page marquee.
 *
 * Long names break the marquee's rhythm, so text-only entries are capped at 30 characters.
 * A partner with a logo is exempt: a mark occupies a fixed, predictable slot no matter how
 * long the organisation's legal name runs, which is how the Art and Culture partner earns
 * a place here that its 89-character name would otherwise lose.
 */
export const marqueePartners: Partner[] = allPartners.filter(
  (partner) => partner.logo || partner.name.length <= 30,
);

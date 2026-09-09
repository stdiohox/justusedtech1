/**
 * Partner organisations.
 *
 * Every partner here has supplied a logo, and that is a hard invariant rather than a
 * happy accident: `logo` is required, so a partner cannot be added without a file. Two
 * earlier entries, Product Tent and Claim Academy, were removed rather than carried as
 * name-only rows, which is why the list runs to eighteen and not twenty. Any copy that
 * states a partner count has to be read against this file.
 */

export type Partner = {
  name: string;
  /**
   * The supplied mark.
   *
   * Intrinsic pixel dimensions are recorded alongside the path because next/image needs the
   * true ratio to reserve the right box before the file loads. Guessing one ratio for all
   * eighteen would shift the strip as each mark loads: they run from a 0.77 portrait lockup
   * to a 3.10 wordmark.
   *
   * `scale` multiplies the rendered size inside the shared slot, defaulting to 1. It exists
   * because a single height treats every mark as equally dense, and they are not: a wide
   * one-line wordmark is legible at 44px where a crest or a four-line stacked lockup is a
   * grey smudge. Only raise it for a mark that genuinely loses detail, and check the result
   * in the row rather than picking a number: the point is equal LEGIBILITY, and overshooting
   * just recreates the imbalance from the other direction.
   */
  logo: { src: string; width: number; height: number; scale?: number };
};

export const usPartners: Partner[] = [
  {
    /* Scaled as a PICTORIAL mark, not a typographic one: there is no type in the artwork,
       so the target is equal presence beside the square badges (Sporty Lagos, Gtech, Cafe
       One), not the larger multiplier the type-bearing marks need. It is portrait at 0.77,
       so at a shared height it covers about three quarters the area of a square badge, and
       this makes up the difference. Lowest of the four: solid black and the highest
       contrast in the set, so it needs the least help. */
    name: "Passback",
    logo: { src: "/partners/partner-passback.png", width: 527, height: 683, scale: 1.15 },
  },
  {
    /* Pictorial, like Passback, and portrait at 0.87 so the area correction is smaller.
       Scaled higher anyway: the mark is thin teal strokes on white, the faintest artwork
       here, and low contrast costs legibility the same way small type does. */
    name: "10 Billion Strong",
    logo: { src: "/partners/partner-10-billion-strong.png", width: 132, height: 152, scale: 1.25 },
  },
  {
    name: "Cortex STL",
    logo: { src: "/partners/partner-cortex-stl.png", width: 668, height: 182 },
  },
  { name: "WashU IT", logo: { src: "/partners/partner-washu.png", width: 670, height: 175 } },
  { name: "ReeGen", logo: { src: "/partners/partner-reegen.png", width: 543, height: 190 } },
  {
    name: "Revise Robotics",
    logo: { src: "/partners/partner-revise-robotics.png", width: 875, height: 248 },
  },
  {
    /* Typographic, so it is scaled to the band the other type-bearing marks sit in. The
       wordmark is a single band across the middle of the artwork with a tagline under it,
       roughly a third of the total height, so at the shared height the tagline lands near
       4px. The widest of the four once scaled, but still level with Cortex and WashU. */
    name: "Employment Connection",
    logo: { src: "/partners/partner-employment-connection.png", width: 654, height: 305, scale: 1.5 },
  },
  {
    /* Scaled: the wordmark is four stacked lines occupying only the right half of the
       artwork, so at the shared height its type lands under 8px. */
    name: "Thomas Dunn Learning Center",
    logo: { src: "/partners/thomas-dunn-learning-center.png", width: 478, height: 396, scale: 1.45 },
  },
  { name: "Google", logo: { src: "/partners/partner-google.png", width: 2597, height: 837 } },
];

export const nigeriaPartners: Partner[] = [
  {
    /* Scaled least of the three: the crest is the widest artwork here at 1.44, so it
       reaches a legible ring at a smaller multiplier than the rounder two. */
    name: "Lagos Educational District IV",
    logo: { src: "/partners/lagos-education-district-iv.png", width: 536, height: 373, scale: 1.4 },
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
    /* Scaled most of the three: the finest ring type of the set, and the squarest artwork
       at 1.04, so the extra size costs the least horizontal room in the row. */
    name: "Office of the Special Assistant to the President on Art, Culture and the Creative Economy",
    logo: { src: "/partners/fmacce-art-culture-creative-economy.png", width: 341, height: 329, scale: 1.5 },
  },
  { name: "Cafe One", logo: { src: "/partners/partner-cafe-one.png", width: 554, height: 532 } },
  {
    name: "Buyscraps Nigeria",
    logo: { src: "/partners/partner-buyscraps-nigeria.png", width: 362, height: 99 },
  },
  {
    /*
      NAMING QUESTION, unresolved, needs the client. Same shape as the FMACCE one above.

      The supplied logo reads "Rotary District 9111", so that is what is displayed: the
      name on the page matches the mark beside it. The partner profile we were given says
      "Rotaract District 9111". Rotary and Rotaract are related but distinct bodies, the
      second being Rotary's young-adult programme, so one of the two is wrong.

      Displaying the logo's own wording is the safer default until the client confirms. If
      Rotaract is the real partner, this `name` changes and the logo file needs replacing
      with the Rotaract mark, because the current artwork would then be the wrong org's.
    */
    /*
      The supplied file needed fixing before any multiplier was worth choosing, so the
      artwork here is not byte-identical to what was delivered:

      1. A stray opaque 1px grey rule ran the full width of the top edge, a crop artifact.
         Invisible at the old size, a hairline above the mark once scaled.
      2. With that rule gone, the real ink turned out to fill only the bottom half of the
         canvas: 53% of the height, against 84-100% for every other file here. Scale could
         not fix that, because scale grows the empty space too. The box would have had to
         run half again as tall as anything else in the row just to bring the type up.

      Cropped to its ink bounds, which is the same normalisation the other seventeen
      already have, so the multiplier below only has to do the job it does elsewhere.
    */
    /* Modest, because the crop did most of the work. "Rotary" is set large; the multiplier
       is here for the "District 9111" line under it, the finest type in the set and the
       only thing distinguishing this partner from Rotary generally. */
    name: "Rotary District 9111",
    logo: { src: "/partners/partner-rotary-district-9111.png", width: 420, height: 160, scale: 1.2 },
  },
];

export const allPartners: Partner[] = [...usPartners, ...nigeriaPartners];

/**
 * The four marks in the hero trust row.
 *
 * Resolved out of the list above rather than retyped, so the row cannot name an
 * organisation this file does not carry. That used to be a comment asking the next editor
 * to keep the two in step, and it had already been broken once: the row still named Claim
 * Academy after that partner was dropped. The throw makes it a build failure instead.
 */
export const heroTrustPartners: Partner[] = [
  "Passback",
  "Google",
  "Cortex STL",
  "Thomas Dunn Learning Center",
].map((name) => {
  const partner = allPartners.find((candidate) => candidate.name === name);
  if (!partner) throw new Error(`heroTrustPartners: no partner named "${name}"`);
  return partner;
});

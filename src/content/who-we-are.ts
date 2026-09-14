/**
 * The four photographs that open the About page, with the label each one carries.
 *
 * These are real JustUsedTech frames, supplied by the client, not stock. That is why this
 * set exists at all: the Who we are masthead is the one place on the site where showing the
 * organisation is the content, and until these arrived there was nothing to show.
 *
 * Rules this file is held to, same as every other photo surface on the site:
 *   - alt text describes what is in the frame and stops there. No names, no claim about who
 *     any person pictured is, no assertion about what a person in shot received from us.
 *   - `kicker` is a fact that already exists elsewhere in src/content (dates from site.ts,
 *     school and volunteer counts from impact.ts). Nothing is invented for the caption.
 */

export type WhoWeAreFrame = {
  id: string;
  /** The name line in the list beside the photos. */
  title: string;
  /** The small uppercase line under it. Stored in sentence case; the component uppercases. */
  kicker: string;
  src: string;
  alt: string;
};

export const whoWeAreFrames: WhoWeAreFrame[] = [
  {
    id: "us-operations",
    title: "US operations",
    kicker: "University City, MO",
    src: "/about/who-we-are-us-operations.jpg",
    alt: "Five people, most in JustUsedTech shirts, standing in conversation around a high table in a community space.",
  },
  {
    id: "lagos-field",
    title: "Lagos field work",
    kicker: "Lagos, since 2017",
    src: "/about/who-we-are-lagos-field.jpg",
    alt: "Team members in JustUsedTech shirts talking with residents in a Lagos waterfront community.",
  },
  {
    id: "school-sessions",
    title: "School sessions",
    kicker: "8 schools in Lagos State",
    src: "/about/who-we-are-school-session.jpg",
    /*
      The source frame carried the JUSTUSED watermark burned across its bottom edge, the same
      way school_tour.jpg did. It was trimmed above the mark before anything else was done to
      the file, rather than left for a crop window to miss.
    */
    alt: "Five team members in JustUsedTech shirts standing beside a Building A Sustainable Future banner on a school walkway.",
  },
  {
    id: "volunteers",
    title: "Volunteers and partners",
    kicker: "20+ active volunteers",
    src: "/about/who-we-are-volunteers.jpg",
    alt: "Two people in conversation at an indoor community event, with team members in JustUsedTech shirts and supplies laid out on tables behind them.",
  },
];

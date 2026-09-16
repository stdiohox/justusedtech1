/**
 * Real roster. No personal social links exist for anyone here, and no card renders one.
 *
 * Portraits: the two board members have real photographs, supplied by the client. Titobi's
 * is their own studio headshot; Christopher's is the one carried on the old justusedtech.org
 * about page. Everyone else still has no photograph and still renders an initials avatar.
 * The team page branches on whether a whole group has portraits, so a group only switches to
 * the portrait treatment once nobody in it would be left as the odd one out.
 *
 * The old blanket rule was "no headshots exist, do not add any". That was true when written
 * and is no longer. The part that has not changed: never put a stock portrait against a real
 * person's name. A photograph goes here only when the client has supplied that person's own.
 */

export type Member = {
  name: string;
  role: string;
  org?: string;
  /** A real, client-supplied photograph of this person. Never a stock portrait. */
  photo?: { src: string; alt: string };
  /*
    Personal profiles, supplied by the client. These are NOT on the old justusedtech.org
    about page: every social icon there points at the bare facebook.com homepage, which is
    Elementor's placeholder for an unfilled field. Do not go back there for these, and do not
    fill a gap here by searching for a name. "Christopher Wise" alone matches hundreds of
    strangers, and attaching one of them to a real person on their own charity's site is the
    kind of mistake that is hard to take back.

    Share links are stored clean. The URLs arrived with utm_* tracking and, on the Instagram
    one, an `stkn` share token tied to the sender. Publishing those leaks how the link was
    passed around and pins an analytics trail to every visitor who clicks.
  */
  socials?: { label: string; href: string }[];
};

export type TeamGroup = {
  id: string;
  title: string;
  blurb: string;
  members: Member[];
};

export const teamGroups: TeamGroup[] = [
  {
    id: "board",
    title: "Board",
    /*
      Longer than the other three blurbs, and deliberately. Those sit beside grids of cards
      that fill their column; this one sits beside the portrait accordion, which is a single
      420px block, so one short line left most of the column empty.

      Every fact here is already in content/site.ts: `founded` and `incorporated`, plus the
      two countries the other groups on this page cover. Nothing about what the board decides,
      meets about, or is responsible for beyond direction and accountability, because nobody
      has told us any of that.
    */
    blurb:
      "JustUsedTech started in Lagos in 2017 and incorporated as a US 501(c)(3) nonprofit in February 2024. Direction and accountability for both sides of that work sit with two people, who also run it day to day.",
    members: [
      {
        name: "Titobi Oreolorun",
        role: "Founder & CEO",
        photo: {
          src: "/titobi-services-sm.jpg",
          alt: "Titobi Oreolorun, Founder and CEO of JustUsedTech",
        },
        socials: [
          { label: "LinkedIn", href: "https://www.linkedin.com/in/titobioreolorun" },
          { label: "Instagram", href: "https://www.instagram.com/teetobee" },
        ],
      },
      {
        name: "Christopher Wise",
        role: "COO",
        photo: {
          src: "/team/christopher-wise.jpg",
          alt: "Christopher Wise, COO of JustUsedTech",
        },
        socials: [
          { label: "LinkedIn", href: "https://www.linkedin.com/in/clwise439" },
        ],
      },
    ],
  },
  {
    id: "us",
    title: "US Team",
    blurb: "Device recovery, refurbishment, and warehouse operations in University City, MO.",
    members: [
      { name: "Gospel Ajibade", role: "Technician" },
      { name: "Moses Kolawale Fajimokun", role: "US Operations" },
    ],
  },
  {
    id: "nigeria",
    title: "Nigeria Team",
    blurb: "Programme delivery, partnerships, and field operations across Lagos State.",
    members: [
      { name: "Hazel Iwendi", role: "Operations & Programs Lead" },
      { name: "Daniel Yashim", role: "MEL Officer" },
      { name: "Oreoluwa Adeniyi", role: "Consultant HR Manager" },
      {
        name: "Eniola Adewodu",
        role: "Strategic Partnerships & Resource Mobilisation Officer",
      },
      { name: "Esther Fashola", role: "Communications & Digital Growth Associate" },
      { name: "Gbenga Falope", role: "Digital Video Editor / Creative Director" },
      /* Placed with the other creative roles rather than appended, which is how this list groups. */
      { name: "Desmond Ronald", role: "Brand Designer" },
      { name: "Ajulo Olajide", role: "Consultant Finance" },
      { name: "Ebenezer Dada", role: "Technician" },
      { name: "Olumide Kolawole", role: "Lagos State Coordinator" },
    ],
  },
  {
    id: "advisors",
    title: "Advisors",
    blurb: "Senior guidance on hardware, brand, and sector strategy.",
    members: [
      { name: "Adrian Weinberg", role: "VP Systems Hardware", org: "IBM" },
      {
        name: "Nenfort Gomwalk",
        role: "Strategic Advisor, people management and brand communications",
      },
      {
        name: "Barnabas Usman",
        role: "Director of Sector Networks",
        org: "African Leadership Academy",
      },
    ],
  },
];

export const volunteerNote =
  "Supported by 20+ active volunteers across content, training, outreach, and operations.";

/**
 * The four areas in the note above, each with the work it covers, for the volunteer card on
 * /get-involved. The four names are the note's own words and are not restated loosely
 * anywhere: change one here and change it in the sentence above too.
 *
 * Every detail line names work the site already documents rather than describing a volunteer
 * role nobody has written down. Content is the creative and communications work carried on
 * the Nigeria team's own roster above. Training is the facilitation the Circular Tech and
 * Breakthrough programme pages describe. Outreach is the School Tour sessions and the
 * GreenBin collection days. Operations is the GreenBin pipeline in its own words: sorting,
 * repair, refurbishment.
 *
 * What none of them claims is a count, a location, or who does which. The card lists the
 * work, not the people.
 */
export const volunteerAreas: { area: string; detail: string }[] = [
  { area: "Content", detail: "Photography, video, and design." },
  { area: "Training", detail: "Session facilitation and mentoring." },
  { area: "Outreach", detail: "School visits and collection days." },
  { area: "Operations", detail: "Sorting, repair, and refurbishment." },
];

export const teamCount = teamGroups.reduce((n, g) => n + g.members.length, 0);

/*
  The same count spelled out, for the team page headline.

  That headline used to read "Sixteen people across two countries." as a literal string while
  the lede directly beneath it interpolated teamCount. The two agreed only by luck, and they
  stopped agreeing the moment someone joined the roster. Deriving both from the same number is
  the point of this export; do not type the word back into the headline.

  The table stops at twenty because the roster is nowhere near it and a nonprofit this size is
  not about to need "thirty-seven". Past the end it falls back to digits, which is wrong-looking
  enough to prompt whoever hits it to extend the list, and still not a lie.
*/
const COUNT_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen", "Twenty",
];

export const teamCountWord = COUNT_WORDS[teamCount] ?? String(teamCount);

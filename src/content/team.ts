/**
 * Real roster. No personal social links exist for anyone here, and no card renders one.
 *
 * Portraits: everyone on the roster has one, all client-supplied. Titobi's is their own
 * studio headshot; Christopher's is the one carried on the old justusedtech.org about page;
 * ten more arrived together as a folder of headshots, and Olumide Kolawole's came last.
 *
 * Nobody renders an initials avatar today. The branch that draws one is still there and is
 * still the right default, because the next person to join will not arrive with a photograph.
 *
 * The all-or-nothing group rule is gone, at the client's instruction: a group shows a
 * photograph per person where one exists and initials where it does not, rather than
 * holding every member on initials until the set is complete.
 *
 * Which of the two layouts a group gets is a separate question, and now that every member
 * has a photograph it is decided entirely by `display` below. Board opens as the portrait
 * accordion. US Team and Nigeria Team are pinned to the roster list.
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
  /**
   * Force the avatar stack on a group that would otherwise qualify for the portrait
   * accordion.
   *
   * Left off, the team page decides for itself: accordion when every member has a
   * photograph, stack when only some do. That is still what Board, Nigeria Team, and
   * Advisors do. This only exists to override it downward, never upward, so a group can
   * never be asked for an accordion it has no photographs for.
   */
  display?: "stack";
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
          src: "/team/titobi-oreolorun.jpg",
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
    blurb: "Device recovery, refurbishment, and warehouse operations in Saint Louis, Missouri.",
    /*
      Both members have a photograph, so this group would default to the portrait accordion.
      It is held on the roster list instead, to match the Nigeria Team below.

      There is a practical reason as well as the client's preference. The accordion renders a
      panel around 420px tall, and moses-fajimokun.jpg is 242x358, the smallest file on the
      roster. At 80px in the list it is sharp; blown up to a panel it is visibly soft next to
      gospel-ajibade.jpg, which is a full studio frame. Revisit if a larger file of his
      arrives.
    */
    display: "stack",
    members: [
      {
        name: "Gospel Ajibade",
        role: "Technician",
        photo: {
          src: "/team/gospel-ajibade.jpg",
          alt: "Gospel Ajibade, Technician at JustUsedTech",
        },
      },
      {
        name: "Moses Kolawale Fajimokun",
        role: "US Operations",
        photo: {
          src: "/team/moses-fajimokun.jpg",
          alt: "Moses Kolawale Fajimokun, US Operations at JustUsedTech",
        },
      },
    ],
  },
  {
    id: "nigeria",
    title: "Nigeria Team",
    blurb: "Programme delivery, partnerships, and field operations across Lagos State.",
    /*
      Pinned to the roster list. This group was mixed until Olumide Kolawole's photograph
      arrived and so had no choice; now that everyone here has one it would otherwise flip to
      the accordion, which is not what it should do. Eight faces is a long accordion, the
      client picked this layout for the US Team by asking for it to match this section, and
      the page changing shape because a photograph arrived is not a decision anybody made.
    */
    display: "stack",
    members: [
      {
        name: "Hazel Iwendi",
        role: "Operations & Programs Lead",
        photo: {
          src: "/team/hazel-iwendi.jpg",
          alt: "Hazel Iwendi, Operations and Programs Lead at JustUsedTech",
        },
      },
      {
        name: "Daniel Yashim",
        role: "MEL Officer",
        photo: {
          src: "/team/daniel-yashim.jpg",
          alt: "Daniel Yashim, MEL Officer at JustUsedTech",
        },
      },
      {
        name: "Eniola Adewodu",
        role: "Strategic Partnerships & Resource Mobilisation Officer",
        photo: {
          src: "/team/eniola-adewodu.jpg",
          alt: "Eniola Adewodu, Strategic Partnerships and Resource Mobilisation Officer at JustUsedTech",
        },
      },
      {
        name: "Esther Fashola",
        role: "Communications & Digital Growth Associate",
        photo: {
          src: "/team/esther-fashola.jpg",
          alt: "Esther Fashola, Communications and Digital Growth Associate at JustUsedTech",
        },
      },
      {
        name: "Gbenga Falope",
        role: "Digital Video Editor / Creative Director",
        photo: {
          src: "/team/gbenga-falope.jpg",
          alt: "Gbenga Falope, Digital Video Editor and Creative Director at JustUsedTech",
        },
      },
      /* Placed with the other creative roles rather than appended, which is how this list groups. */
      {
        name: "Desmond Ronald",
        role: "Brand Designer",
        photo: {
          src: "/team/desmond-ronald.jpg",
          alt: "Desmond Ronald, Brand Designer at JustUsedTech",
        },
      },
      /*
        Oreoluwa Adeniyi (Consultant HR Manager) and Ajulo Olajide (Consultant Finance)
        sat here and in the slot above. Removed at the client's request on 2026-09-28,
        described as "for now", so they are recorded here rather than only in the history.
        Neither had a photograph. Put them back with their roles as written above.
      */
      {
        name: "Ebenezer Dada",
        role: "Technician",
        photo: {
          src: "/team/ebenezer-dada.jpg",
          alt: "Ebenezer Dada, Technician at JustUsedTech",
        },
      },
      {
        name: "Olumide Kolawole",
        role: "Lagos State Coordinator",
        photo: {
          src: "/team/olumide-kolawole.jpg",
          alt: "Olumide Kolawole, Lagos State Coordinator at JustUsedTech",
        },
      },
    ],
  },
  /*
    An "advisors" group sat here, removed at the client's request on 2026-09-28. It held
    Adrian Weinberg (VP Systems Hardware, IBM), Nenfort Gomwalk (Strategic Advisor, people
    management and brand communications), and Barnabas Usman (Director of Sector Networks,
    African Leadership Academy), under the blurb "Senior guidance on hardware, brand, and
    sector strategy."

    Nenfort was the only one with a photograph and public/team/nenfort-gomwalk.jpg went with
    the group, so restoring him means asking the client for that file again.

    `org` is now unused by every remaining member. It is left on the Member type because it
    is what an advisor entry needs and this group may come back.
  */
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

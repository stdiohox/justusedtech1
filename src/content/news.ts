/**
 * News. Seeded with the one verified event we have. Add entries only from confirmed facts.
 */

export type Post = {
  slug: string;
  title: string;
  /**
   * Display date and its machine-readable form, set together or not at all.
   *
   * Optional because a confirmed event can reach us without a confirmed date, and inventing
   * one to satisfy a type is exactly the failure the content rules exist to prevent. Every
   * render site treats a missing date as "no date line", never as a blank or a placeholder.
   */
  date?: string;
  iso?: string;
  location: string;
  excerpt: string;
  body: string[];
  tags: string[];
  /**
   * Photographs from the event, shown under the body.
   *
   * `width` and `height` are the file's real pixel dimensions, so the gallery can lay each
   * frame out at its own aspect rather than crop it into a fixed box. Same contract as the
   * programme galleries in content/program-details.ts.
   */
  gallery?: { src: string; alt: string; width: number; height: number }[];
};

export const posts: Post[] = [
  {
    slug: "skate-lagos-3",
    title: "25 roller skates donated at Skate Lagos 3.0",
    date: "Saturday 30 May 2026",
    iso: "2026-05-30",
    location: "National Stadium Surulere, Lagos",
    excerpt:
      "JustUsedTech partnered with Passback to donate 25 roller skates at the Lagos State Government's Sporty Lagos initiative.",
    body: [
      "Skate Lagos 3.0 took place on Saturday 30 May 2026 at the National Stadium Surulere in Lagos, as part of the Lagos State Government's Sporty Lagos initiative.",
      "JustUsedTech partnered with Passback for the event and donated 25 roller skates. Sport is how Project 9-12 reaches young people in the first place, and events like this are where those relationships start.",
      "Lagos Television (LTV) conducted a media interview with the team on site.",
    ],
    tags: ["Project 9-12", "Passback", "Lagos"],
  },
  {
    /*
      TODO, needs the client: this post is thin, and deliberately so.
      Confirmed here is the programme DESIGN only, which is what we were given: the partner,
      the location, the two tracks, the age floor, and the e-waste collection component.

      Not confirmed, and therefore absent rather than estimated: the dates it ran, how many
      young people took part, how much e-waste came in, and what the participants finished
      with. Nothing in this file may be filled in from a plausible guess, which is why the
      date fields are omitted entirely rather than set to a likely month.

      Any of those four, plus photographs, would turn this from a description of a plan that
      happened into a record of what it achieved. Same request as the one that settled the
      2025 figures: send the real numbers and this post gets rewritten around them.
    */
    slug: "tdlc-summer-technology-ethical-ai",
    title: "Summer technology and ethical AI programme with Thomas Dunn Learning Center",
    location: "Thomas Dunn Learning Center, St. Louis",
    excerpt:
      "A two-track summer programme run with Thomas Dunn Learning Center in St. Louis, covering ethical AI use and computer hardware refurbishment for participants aged 15 and up.",
    body: [
      "JustUsedTech ran a summer technology programme with Thomas Dunn Learning Center in St. Louis, open to participants aged 15 and up.",
      "The programme was built on two tracks. The first covered ethical AI use: what these tools are good for, where they fail, and how to think about using them responsibly. The second covered computer hardware, taking participants through coupling and refurbishment on real machines rather than on diagrams.",
      "An e-waste collection component ran alongside both tracks, which is the same route every JustUsedTech programme depends on: hardware comes in, gets assessed, and goes back out.",
    ],
    tags: ["Ethical AI", "Thomas Dunn Learning Center", "St. Louis"],
    gallery: [
      {
        src: "/news/tdlc-summer/01.jpg",
        alt: "Close-up of an opened laptop with its back panel removed, hands working on the internals.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/news/tdlc-summer/02.jpg",
        alt: "Two participants seated at a table behind a laptop that has been opened up, its back panel laid beside it.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/news/tdlc-summer/03.jpg",
        alt: "A team member in a JustUsedTech shirt handing a laptop to a participant in front of a JustUsedTech banner.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/news/tdlc-summer/04.jpg",
        alt: "A team member handing a laptop to a young participant in a red shirt.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/news/tdlc-summer/05.jpg",
        alt: "A team member handing a laptop to a participant beside a JustUsedTech banner.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/news/tdlc-summer/06.jpg",
        alt: "A team member and a participant holding a laptop between them for a photograph.",
        width: 2400,
        height: 1600,
      },
    ],
  },
];

/**
 * The post surfaced as the Impact page's event recap.
 *
 * The first DATED post rather than simply the first, because that recap renders a date line
 * and an undated post would leave it blank. This used to be `posts[0]`, which was the same
 * entry only for as long as the newest post happened to have a date.
 */
export const latestPost = posts.find((post) => post.date) ?? posts[0]!;

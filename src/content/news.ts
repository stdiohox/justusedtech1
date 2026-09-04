/**
 * News. Seeded with the one verified event we have. Add entries only from confirmed facts.
 */

export type Post = {
  slug: string;
  title: string;
  date: string;
  /** ISO date used for <time dateTime> and sorting. */
  iso: string;
  location: string;
  excerpt: string;
  body: string[];
  tags: string[];
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
];

export const latestPost = posts[0];

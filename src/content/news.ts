/**
 * News. Three kinds of content, all from confirmed facts only: posts (events and programme
 * updates, each with its own page), the school tour log (dated visits, no page each), and
 * press (coverage elsewhere, linked out). Photo collections live in content/gallery.ts.
 */

import { galleryFrame } from "@/content/program-details";

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
   * One link out of the article, shown after the body. For a post that summarises something
   * the site holds in full elsewhere (a log, a programme page), so the summary can point at
   * the record rather than repeat it.
   */
  related?: { label: string; href: string };
  /**
   * The picture that fronts the post, on its card and above its body. Distinct from
   * `gallery`, which is photographs taken at the event: a cover can come from the
   * programme's own set when the event itself was not photographed. Where a post has no
   * cover, the first gallery frame fronts it, and where it has neither, the placeholder does.
   */
  cover?: { src: string; alt: string; width: number; height: number };
  /**
   * Photographs from the event, shown under the body.
   *
   * `width` and `height` are the file's real pixel dimensions, so the gallery can lay each
   * frame out at its own aspect rather than crop it into a fixed box. Same contract as the
   * programme galleries in content/program-details.ts.
   */
  gallery?: { src: string; alt: string; width: number; height: number }[];
};

/**
 * One School Tour Initiative visit. `area` is the part of Lagos the school sits in, as it was
 * supplied; omitted where it was not. Date fields follow the same rule as Post: set together
 * from a confirmed date, or left off. Every visit in the 2026 run has one; the rule stands
 * for the next one that arrives without.
 */
export type SchoolVisit = {
  school: string;
  area?: string;
  date?: string;
  iso?: string;
};

/**
 * The 2026 School Tour Initiative run, in the order supplied. Aiyetoro appears twice because
 * the team went twice; the list is visits, not schools. Nothing about what
 * happened on each visit was supplied, which is why this is a log of dates and not a set of
 * posts: a post per visit would have needed a body, and a body would have had to be invented.
 *
 * TODO, needs the client: attendance, laptops handed over, or photographs from any of these
 * visits would let the summary post below say what the tour did rather than where it went.
 */
export const schoolVisits: SchoolVisit[] = [
  {
    school: "Wesley Girls' Senior Secondary School",
    date: "1 July 2026",
    iso: "2026-07-01",
  },
  {
    school: "Lagos City Senior College",
    area: "Sabo, Yaba",
    date: "1 July 2026",
    iso: "2026-07-01",
  },
  {
    school: "Aiyetoro Senior Grammar School",
    area: "Ebute Metta",
    date: "2 July 2026",
    iso: "2026-07-02",
  },
  {
    school: "Oke-Odo Junior High School",
    date: "7 July 2026",
    iso: "2026-07-07",
  },
  {
    school: "Mainland Senior High School",
    area: "Fadeyi",
    date: "8 July 2026",
    iso: "2026-07-08",
  },
  {
    school: "Mainland Junior High School",
    area: "Fadeyi",
    date: "8 July 2026",
    iso: "2026-07-08",
  },
  {
    school: "Aiyetoro Senior Grammar School",
    area: "Ebute Metta",
    date: "9 July 2026",
    iso: "2026-07-09",
  },
  {
    school: "Victokev Schools",
    area: "Ikorodu",
    date: "20 August 2026",
    iso: "2026-08-20",
  },
];

/** Distinct schools in the log, for the summary post's count. */
export const schoolsVisited = [
  ...new Set(schoolVisits.map((visit) => visit.school)),
];

/**
 * Coverage of JustUsedTech elsewhere. Every entry links out; nothing here is hosted.
 *
 * Titles are the outlets' own headlines, taken from the pages, not rewritten. Dates are the
 * pages' published dates where the page gave one, and omitted where it did not: The Guardian
 * blocks automated reads, so its date is unknown and left off rather than guessed from the
 * others in the set.
 */
export type PressItem = {
  outlet: string;
  title: string;
  href: string;
  /** How the outlet framed it. "social" is a post on a platform rather than an article. */
  kind: "article" | "feature" | "press release" | "social";
  date?: string;
  iso?: string;
  /** One line on what the piece is about, where the headline alone does not say. */
  note?: string;
};

export const press: PressItem[] = [
  {
    outlet: "Punch",
    title:
      "Presidential Office confers Distinguished Leadership Award on Titobiloluwa Oreolorun for pioneering circular economy innovation",
    href: "https://punchng.com/presidential-office-confers-distinguished-leadership-award-on-titobiloluwa-oreolorun-for-pioneering-circular-economy-innovation",
    kind: "article",
    date: "2 April 2026",
    iso: "2026-04-02",
    note: "JustUsedTech's founder recognised for circular economy work in Nigeria.",
  },
  {
    outlet: "AREAi",
    title:
      "Press Statement: AREAi launches Project55, announces JustUsedTech as first technical partner",
    href: "https://areai4africa.org/press-statement-areai-launches-project55-announces-justusedtech-as-first-technical-partner",
    kind: "press release",
    date: "13 November 2025",
    iso: "2025-11-13",
  },
  {
    outlet: "City Voice",
    title: "Project 9-12 equips Lagos students with technology, sports skills",
    href: "https://cityvoice.ng/2025/07/10/project-9-12-equips-lagos-students-with-technology-sports-skills",
    kind: "article",
    date: "10 July 2025",
    iso: "2025-07-10",
  },
  {
    outlet: "ThisDay",
    title:
      "Firms empower 100 Lagos students with tech, sports gear, sustainability training",
    href: "https://www.thisdaylive.com/2025/07/09/firms-empower-100-lagos-students-with-tech-sports-gear-sustainability-training",
    kind: "article",
    date: "9 July 2025",
    iso: "2025-07-09",
    note: "Project 9-12 coverage.",
  },
  {
    outlet: "News Wings",
    title:
      "Project 9-12 equips Lagos students with technology and sports for a sustainable future",
    href: "https://newswings.com.ng/project-9-12-equips-lagos-students-with-technology-and-sports-for-a-sustainable-future",
    kind: "article",
    date: "9 July 2025",
    iso: "2025-07-09",
  },
  {
    outlet: "This Is Lagos",
    title:
      "Project 9-12 empowers students with tech, sports, sustainability skills",
    href: "https://thisislagos.ng/project-9-12-empowers-students-with-tech-sports-sustainability-skills",
    kind: "article",
    date: "9 July 2025",
    iso: "2025-07-09",
  },
  {
    outlet: "CanvasRebel",
    title: "Meet Titobi Oreolorun",
    href: "https://canvasrebel.com/meet-titobi-oreolorun",
    kind: "feature",
    date: "27 December 2024",
    iso: "2024-12-27",
    note: "The founder's story, in interview.",
  },
  {
    outlet: "West Africa Business News",
    title: "Circular economy models as e-waste management strategy",
    href: "https://wabusinessnewsng.com/wp-content/uploads/2024/06/Wednesday-June-12-2024_compressed.pdf",
    kind: "article",
    date: "12 June 2024",
    iso: "2024-06-12",
    note: "Page 11 of the print edition, as a PDF.",
  },
  {
    outlet: "Blueprint",
    title: "Circular economy models as e-waste management strategy",
    href: "https://blueprint.ng/circular-economy-models-as-e-waste-management-strategy/",
    kind: "article",
    date: "11 June 2024",
    iso: "2024-06-11",
  },
  {
    outlet: "Nairametrics",
    title: "COVID-19: Startups groan over losses, may shut down in months",
    href: "https://nairametrics.com/2020/03/26/covid-19-startups-groan-over-losses-may-shutdown-in-months/",
    kind: "article",
    date: "26 March 2020",
    iso: "2020-03-26",
    note: "JustUsedTech among the Lagos startups interviewed on the pandemic's first weeks.",
  },
  {
    outlet: "The Guardian Nigeria",
    title:
      "New era in e-waste beckons as experts proffer solutions for sustainable future",
    href: "https://guardian.ng/features/new-era-in-e-waste-beckons-as-experts-proffer-solutions-for-sustainable-future/",
    kind: "feature",
  },
  {
    outlet: "Facebook",
    title: "JustUsed Tech pulled up big at Skate Lagos 3.0",
    href: "https://www.facebook.com/honskibanjgbeleyi/posts/justused-tech-pulled-up-big-at-skate-lagos-30-yesterday-25-pairs-of-professional/2212415886226233/",
    kind: "social",
    note: "Post on the 25 pairs of skates donated at Skate Lagos 3.0.",
  },
  {
    outlet: "LGTV on Instagram",
    title: "Skate Lagos 3.0",
    href: "https://www.instagram.com/reel/DZFJFJrinCP/",
    kind: "social",
    note: "Lagos Television's reel from the event.",
  },
];

export const posts: Post[] = [
  {
    /*
      The 2026 school tour, as a summary of the log above rather than a report. What was
      supplied is where the team went and when; the body stays inside that. The visits
      themselves render from `schoolVisits` on the news page, so this post links to that
      log rather than repeating it.

      The cover is the programme's own lead frame, from an earlier School Tour session, and
      it keeps that frame's caption via galleryFrame. It is not in `gallery`, because it is
      not a photograph of these visits; when pictures from the 2026 run arrive they go in
      `gallery` and this cover comes off, so the first of them fronts the post instead.
    */
    slug: "school-tour-2026",
    cover: {
      ...galleryFrame("/programs/school-tour-initiative/01.jpg"),
      width: 2400,
      height: 1506,
    },
    title: "School Tour Initiative visits seven Lagos schools",
    date: "July to August 2026",
    iso: "2026-07-01",
    location: "Lagos State",
    excerpt:
      "Eight visits across seven schools in Yaba, Ebute Metta, Fadeyi, and Ikorodu between 1 July and 20 August, with the team returning to Aiyetoro Senior Grammar School for a second session.",
    body: [
      "The School Tour Initiative's 2026 run took the team into seven Lagos schools: Wesley Girls' Senior Secondary School, Lagos City Senior College in Sabo Yaba, Aiyetoro Senior Grammar School in Ebute Metta, Oke-Odo Junior High School, Mainland Senior High School and Mainland Junior High School in Fadeyi, and Victokev Schools in Ikorodu. The visits ran from 1 July to 20 August, with the Ikorodu session closing the run.",
      "Aiyetoro Senior Grammar School had two visits, on 2 July and 9 July. The programme is built for that: a first session introduces e-waste and the circular economy, and a follow-up visit is where selected students are trained as peer educators, so the material carries on inside the school after the team has left.",
    ],
    tags: ["School Tour Initiative", "Lagos"],
    related: {
      label: "See every visit in the school tour log",
      href: "/news#school-tour",
    },
  },
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
      TODO, needs the client: the date, the venue, and anything the team did there beyond
      attending. What arrived was three photographs and the name of the event, and the body
      stays inside that: the delegate badge in the first frame is the source for "attended
      as a delegate", the banner for the event's name. The two people photographed with the
      team member are not named, because their names were not supplied. No date, so no date
      line, and the location is the country rather than a city that was not confirmed.
    */
    slug: "recyclers-conference",
    title: "JustUsedTech at the 3rd Annual Recyclers Conference",
    location: "Nigeria",
    excerpt:
      "The team attended the Recyclers Association of Nigeria's 3rd Annual Recyclers Conference as a delegate, alongside the recyclers, processors, and policy people the circular economy in Nigeria runs on.",
    body: [
      "JustUsedTech attended the 3rd Annual Recyclers Conference, the RAN conference, as a delegate. The conference brings together the recyclers, processors, and policy people the circular economy in Nigeria depends on, which is the same set of people JustUsedTech's e-waste work in Lagos sits among.",
      "Recovering electronics is only half of the model: what cannot be refurbished has to go somewhere responsible, and that means knowing the recyclers who can take it. Conferences like this one are where those relationships get made.",
    ],
    tags: ["RAN", "Circular economy", "Nigeria"],
    gallery: [
      {
        src: "/news/ran-conference/03.jpg",
        alt: "The conference hall seen from the audience, with delegates seated at round tables under green drapes and the stage screens reading Welcome to the 3rd Annual Recyclers Conference.",
        width: 2400,
        height: 1800,
      },
      {
        src: "/news/ran-conference/01.jpg",
        alt: "A JustUsedTech team member in a JUSTUSED shirt and a delegate badge standing with another attendee in front of the conference backdrop.",
        width: 1800,
        height: 2400,
      },
      {
        src: "/news/ran-conference/02.jpg",
        alt: "A JustUsedTech team member in a JUSTUSED shirt standing with another attendee in a suit and medal in front of the conference stage.",
        width: 1800,
        height: 2400,
      },
    ],
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
    title:
      "Summer technology and ethical AI programme with Thomas Dunn Learning Center",
    location: "Thomas Dunn Learning Center, St. Louis",
    excerpt:
      "A two-track summer programme run with Thomas Dunn Learning Center in St. Louis, covering ethical AI use and computer hardware refurbishment for participants aged 15 and up.",
    body: [
      "JustUsedTech ran a summer technology programme with Thomas Dunn Learning Center in St. Louis, open to participants aged 15 and up. It is the St. Louis delivery of the Circular Tech Bootcamp, the same programme that runs in Lagos, adapted for a US community learning hub.",
      "The programme was built on two tracks. The first covered ethical AI use: what these tools are good for, where they fail, and how to think about using them responsibly. The second covered computer hardware, taking participants through coupling and refurbishment on real laptops rather than on diagrams.",
      "An e-waste collection component ran alongside both tracks, which is the same route every JustUsedTech programme depends on: hardware comes in, gets assessed, and goes back out.",
    ],
    tags: ["Ethical AI", "Thomas Dunn Learning Center", "St. Louis"],
    gallery: [
      {
        src: "/programs/circular-tech-bootcamp/11.jpg",
        alt: "Close-up of an opened laptop with its back panel removed, hands working on the internals.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/programs/circular-tech-bootcamp/12.jpg",
        alt: "Two participants seated at a table behind a laptop that has been opened up, its back panel laid beside it.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/programs/circular-tech-bootcamp/13.jpg",
        alt: "A team member in a JustUsedTech shirt handing a laptop to a participant in front of a JustUsedTech banner.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/programs/circular-tech-bootcamp/14.jpg",
        alt: "A team member handing a laptop to a young participant in a red shirt.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/programs/circular-tech-bootcamp/15.jpg",
        alt: "A team member handing a laptop to a participant beside a JustUsedTech banner.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/programs/circular-tech-bootcamp/16.jpg",
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

/**
 * The four scenes in the news masthead's photo showcase, the same block the about page
 * opens on. An item is a scene, not a person, and each one is something on this page: the
 * three posts that have photographs, and the press coverage, which is illustrated with a
 * Project 9-12 frame because that is what the bulk of the coverage was about.
 *
 * Titles and kickers are short by design. The showcase sets its labels at display size, and
 * a post's full headline would run to three lines there; the card on the page below carries
 * the full title. Kickers are held to three or four words because the label list is capped
 * at the mosaic's width in two columns, which gives each one about 200px at lg. Pictures
 * are looked up from the posts and the programme gallery rather than restated, so their alt
 * text stays written once.
 */
function postCover(slug: string) {
  const post = posts.find((p) => p.slug === slug);
  const frame = post?.cover ?? post?.gallery?.[0];
  if (!frame) throw new Error(`newsShowcase: post ${slug} has no picture`);
  return frame;
}

export const newsShowcase = [
  {
    id: "school-tour-2026",
    title: "School tour 2026",
    kicker: "Seven Lagos schools",
    ...postCover("school-tour-2026"),
  },
  {
    id: "recyclers-conference",
    title: "RAN conference",
    kicker: "Team as delegates",
    ...postCover("recyclers-conference"),
  },
  {
    id: "thomas-dunn",
    title: "Thomas Dunn",
    kicker: "Ethical AI, St. Louis",
    ...postCover("tdlc-summer-technology-ethical-ai"),
  },
  {
    id: "press",
    title: "In the press",
    kicker: "Project 9-12",
    ...galleryFrame("/programs/project-9-12/04.jpg"),
  },
].map(({ id, title, kicker, src, alt }) => ({ id, title, kicker, src, alt }));

/**
 * Long-form programme content, for the individual /programs/[slug] pages.
 *
 * Sourced from the project design documents the client supplied: the School Tour design, the
 * Breakthrough Series concept note and its storytelling journey map, the Project 9-12 concept
 * note, the GreenBin 360 project concept, and the hardware recycling programme document that
 * the Circular Tech Bootcamp is drawn from.
 *
 * Four rules govern what crossed over from those documents into this file.
 *
 * Targets are labelled as targets. Every figure here that has not happened yet lives under
 * `targets`, never under the `results` in content/programs.ts, which is dated delivery only.
 * The two must not blur: a target reprinted without its label becomes a claim.
 *
 * Internal planning did not cross over. Budget lines, cost areas, staffing gaps, risk
 * registers, trainer stipends, and the Google workplan spreadsheet are all operational
 * documents for the team, not public programme copy. The workplan in particular was removed
 * from this site once before for exactly that reason.
 *
 * Every tagline, overview, and headed section follows the client's October 2026 website
 * review, as written. Its "How we measure progress", "Monitoring focus", "Our approach", and
 * "Our commitment" blocks, and its partner and school lists, are `sections`.
 *
 * The GreenBin document describes both the running collection operation and the future
 * ecosystem. Only the operating half is here. Smart bins, GreenPoints, the entrepreneurship
 * hubs, and the climate marketplace belong to greenbin-360-ecosystem, which is Upcoming and
 * has no detail page.
 */

import { forms } from "@/content/site";
import { videos, type VideoClip } from "@/content/videos";

export type ProgramDetail = {
  /** One line under the title on the detail page. Not the same as the catalogue summary. */
  tagline: string;
  /**
   * An application form, for a programme that is taking people in. Rendered as the primary
   * action in the masthead, above everything else on the page, because a reader who came to
   * apply should not have to read the programme design first to find out how.
   *
   * Only for a programme whose form is actually open. Nothing renders when it is absent, and
   * an upcoming programme must never carry one.
   */
  apply?: { label: string; href: string };
  /** Opening prose. Two or three paragraphs, no headings. */
  overview: string[];
  /**
   * The review's headed blocks, in its order, rendered right under the overview: a heading
   * with prose (`body`) or with a list of names (`items`).
   */
  sections?: { heading: string; body?: string[]; items?: string[] }[];
  /**
   * A three-card band under the overview.
   *
   * It began as "why this exists", drawn from each document's background section, and most
   * programmes still use it that way. Circular Tech uses it for something else: that
   * programme runs in two places, so its cards describe the Lagos cohort, the St. Louis
   * cohort, and what they share. `contextHeading` is how a programme says which it is,
   * rather than the page asserting one heading over both uses.
   */
  context?: { title: string; body: string }[];
  contextHeading?: { title: string; lede: string };
  /** What the programme is trying to do. Rendered as the bento grid. */
  objectives?: { label: string; detail: string }[];
  /**
   * Shown in place of the missing sections where a programme design has not been published.
   * Better than a page that quietly omits half its template, and far better than one padded
   * with plausible-sounding objectives nobody wrote.
   */
  pending?: string;
  /**
   * Show the programme's headline figures as interactive figure cards under the overview:
   * its `highlights` where it has them, else its `results`. When the cards are the results
   * themselves (Breakthrough), the plain "Delivered" list further down is not repeated;
   * when they are highlights (School Tour), the fuller results list stays.
   */
  featureResults?: boolean;
  /** Spin the Targets figures as odometer reels when they come into view. */
  spinTargets?: boolean;
  /** Centre the gallery section: heading, lede, the gallery itself, and its hint. */
  galleryCentered?: boolean;
  /** Show the pounds-to-kilograms converter under the figures, for a weight-led programme. */
  weightConverter?: boolean;
  /** Numbers that have not happened yet. Never rendered without the "Target" framing. */
  targets?: { figure: string; detail: string }[];
  audience: { primary: string[]; secondary: string[] };
  /**
   * One paragraph under "Who it is for", above the two lists.
   *
   * The lists are bare noun phrases, which is right for a list and thin on its own once a
   * programme has nothing else in that section. This says how the groups relate: who is in
   * the room, and how the programme reaches the people who are not.
   *
   * Every claim in it has to be somewhere else in this file already. It is a restatement of
   * the objectives and activities for readers who will not scroll back up, not a place to
   * add facts that no supplied document carries.
   */
  audienceLede?: string;
  activities?: { title: string; detail: string }[];
  phases?: { window: string; label: string; detail: string }[];
  outcomes?: string[];
  measurement?: string[];
  sdgs?: { code: string; detail: string }[];
  /**
   * `width` and `height` are the file's real pixel dimensions, not a display size.
   *
   * They are here so a gallery can lay a photograph out at its own aspect instead of forcing
   * it into a fixed box. The mosaic needs that: GreenBin's set is mostly portrait at 0.75,
   * and the fixed-height grid it used before had cells between 2.26 and 4.61 wide, so cover
   * was showing a third of a tall frame and sometimes a sixth.
   */
  gallery?: { src: string; alt: string; width?: number; height?: number }[];
  /**
   * The line under "From the field".
   *
   * Written per programme, about what is actually in that programme's frames. It replaced a
   * generated line that counted the photographs and then explained how to work the widget,
   * which told the reader two things they could already see and nothing about the pictures.
   * How to work the widget still gets said, once, by the gallery itself underneath.
   */
  galleryLede?: string;
  /** The gallery's heading where "From the field" would be wrong, such as campaign fliers. */
  galleryHeading?: string;
  /**
   * Which gallery treatment this programme's photographs get.
   *
   * Four styles, one per programme, so the pages do not all move alike. The choice is not
   * decoration: it follows what the set of photographs actually is.
   *
   * `elastic`  one panel opens against its siblings and fills the row. For a short sequence.
   * `accordion` fixed-width panel against narrow spines. Also short, different rhythm.
   * `bento`    a draggable run of mixed-size cells. For a set too large to accordion, where
   *            collapsed panels would be slivers. Project 9-12 has ten frames.
   * `mosaic`   every frame visible at rest in an asymmetric grid. For a set rather than a
   *            sequence, where hiding frames behind hover would hide the point.
   * `posters`  two-up, every frame whole at its own shape. For fliers and other images that
   *            carry text, where any crop would cut words off.
   *
   * A single photograph ignores this and renders as one frame.
   */
  galleryStyle?: "elastic" | "accordion" | "bento" | "mosaic" | "posters";
  /**
   * The School Tour visit log, rendered on this programme's own page.
   *
   * Only the heading and lede live here; the visits themselves are `schoolVisits` in
   * content/news.ts, which is the record and stays the record. This field exists so the
   * page does not have to test the slug: a programme that should show the log says so, and
   * every other programme renders no section.
   *
   * `related` is one link out, the same shape Post uses. Deliberately not a link back to
   * the log on /news: that is the identical component reading the identical array, so it
   * would send a reader from a list to the same list. What this page has no version of is
   * the write-up, so that is where it points.
   */
  visitLog?: {
    heading: string;
    lede: string;
    related?: { label: string; href: string };
  };
  /**
   * A clip from someone the programme reached, shown in its own section after the
   * photographs. Content lives in content/videos.ts; this only points at it. Programmes
   * without one render no section, the same rule as the gallery.
   */
  video?: { heading: string; lede: string; clip: VideoClip };
};

export const programDetails: Record<string, ProgramDetail> = {
  /* ---------------------------------------------------------------- */
  "school-tour-initiative": {
    tagline:
      "Building environmental awareness and digital responsibility among students.",
    /*
      The review's opening paragraph ("The School Tour Initiative introduces students to
      electronic waste...") is off this page at the client's request; the programme's
      headline figures take its place, as on Breakthrough Series. It still opens the
      /programs panel, from content/programs.ts.
    */
    overview: [
      "Through school-based engagement sessions, students learn how electronic waste affects the environment and how responsible disposal, reuse, and refurbishment can support a more sustainable digital future.",
    ],
    featureResults: true,
    spinTargets: true,
    sections: [
      {
        heading: "Our approach",
        body: [
          "We combine environmental awareness with practical learning and opportunities to understand how technology can be reused to support education and digital participation.",
        ],
      },
    ],
    context: [
      {
        title: "Knowledge gaps",
        body: "Environmental sustainability and the circular economy are largely absent from the formal curriculum, so most students have no foundation for understanding how electronic consumption turns into environmental damage.",
      },
      {
        title: "Behavioural gaps",
        body: "Awareness and action come apart. E-waste goes out with household waste out of convenience and habit, and dumping, burning, and informal dismantling are normalised inside communities.",
      },
      {
        title: "Policy awareness",
        body: "Waste management guidelines exist, but awareness and enforcement are weak at community and institutional level. Students and teachers alike are often unaware of what the rules already say.",
      },
    ],
    objectives: [
      {
        label: "Raise e-waste literacy",
        detail:
          "Improve e-waste and environmental sustainability literacy among secondary school students, measured by pre and post session assessment rather than attendance.",
      },
      {
        label: "Change consumption behaviour",
        detail:
          "Increase student participation in follow-ups, surveys, inter-school debates, competitions, and quizzes, so engagement continues past the session itself.",
      },
      {
        label: "Change disposal behaviour",
        detail:
          "Increase practical knowledge of proper e-waste disposal, tracked through follow-up surveys alongside the pre and post assessments.",
      },
      {
        label: "Build peer educators",
        detail:
          "Train selected students as environmental champions who carry the material back into their own schools and communities.",
      },
    ],
    targets: [
      {
        figure: "1,000",
        detail: "Students across 10 schools within 12 months",
      },
      {
        figure: "60%",
        detail: "Literacy improvement, measured pre and post session",
      },
      { figure: "10", detail: "Schools onboarded, engaged, and evaluated" },
    ],
    audience: {
      primary: [
        "Secondary school students, JSS1 to SS3, aged 10 to 18",
        "Teachers and school administrators, as facilitators and enablers",
      ],
      secondary: ["Parents and guardians", "Surrounding school communities"],
    },
    /*
      Nothing new is asserted here. "Delivered inside the school" and "between visits" are
      from `activities`, "trained as environmental champions" and "carry the material back
      into their own schools and communities" are from `objectives`, and the two groups
      named at the end are the `secondary` list directly above.
    */
    audienceLede:
      "The sessions run inside the school, so the room holds the students the programme is written for and the teachers and administrators who make the visit possible. Selected students are then trained as environmental champions and carry the material back into their own schools and communities between visits. That is how it reaches the second group below, none of whom sit in the session itself.",
    activities: [
      {
        title: "School sensitisation visits",
        detail:
          "Interactive sessions on e-waste, environmental sustainability, and the circular economy, delivered inside the school.",
      },
      {
        title: "Eco-friendly learning materials",
        detail:
          "Flyers, posters, and digital content developed and distributed, produced as reusable materials rather than throwaway print.",
      },
      {
        title: "Peer educator training",
        detail:
          "Selected students trained as environmental champions to continue the work between visits.",
      },
    ],
    /*
      `phases` and `outcomes` were here and are out at the client's request, which removes
      the Timeline section and the Expected outcomes column from this programme's page.

      Both fields are optional, so this is a content removal and not a page change: the
      Circular Tech Bootcamp still renders a Timeline, and Breakthrough Series and Project
      9-12 still render Expected outcomes. Nothing here affects them.

      `measurement` has since gone the same way, so the section this page renders for those
      three fields is now just "Who it is for". At lg that leaves the right half of the grid
      empty. GreenBin 360 and SkillSync already sit like that, carrying none of the three
      either, so this matches them rather than being a one-off.

      The removed content is in the git history.
    */
    sdgs: [
      {
        code: "SDG 4.7",
        detail:
          "Learners acquire the knowledge and skills needed to promote sustainable development and sustainable lifestyles.",
      },
      {
        code: "SDG 12.5",
        detail:
          "Substantially reduce waste generation through prevention, reduction, recycling, and reuse.",
      },
      {
        code: "SDG 13.3",
        detail:
          "Improve education and awareness raising on climate change mitigation and impact reduction.",
      },
    ],
    /*
      The log was only ever on /news, under a "Field log" heading, which is a page somebody
      reading about this programme has no particular reason to open. It is the most concrete
      thing the programme has, so it belongs on the programme too.
    */
    visitLog: {
      heading: "Every visit, 2026",
      lede: "The schools the team has been into this year and when. A visit without a confirmed date is listed without one rather than given a likely one.",
      /* The post is the prose the log has none of: which schools were revisited and why,
         and how the peer educator sessions work. The log answers where and when, the post
         answers what happened. */
      related: {
        label: "Read the 2026 write-up",
        href: "/news/school-tour-2026",
      },
    },
    gallery: [
      {
        src: "/programs/school-tour-initiative/01.jpg",
        alt: "A large group of students in purple and blue school uniforms crowded together outside a school building, smiling towards the camera.",
        width: 2400,
        height: 1506,
      },
      /*
        02.jpg sat here and is out at the client's request. It is a solo portrait of a team
        member posing beside the Building A Sustainable Future banner: a good photograph, but
        the only frame in a School Tour gallery that is not of students, and it was landing
        second, directly after the opening group shot.

        Taken out rather than moved to the end, because the objection was to a staff portrait
        being in a students' gallery at all, not to where it fell. The four frames left are
        all of students in session, which is what the lede below promises.

        The file is still in public/programs/school-tour-initiative/ and nothing else in the
        site points at it. Put the block back here to restore it. If more school tour
        photography arrives, this is also the obvious place for a real replacement.
      */
      {
        src: "/programs/school-tour-initiative/03.jpg",
        alt: "Students in navy and cream uniforms gathered outside a school entrance, several with their hands raised.",
        width: 2400,
        height: 1800,
      },
      {
        src: "/programs/school-tour-initiative/04.jpg",
        alt: "Students in green and cream uniforms crowded together inside a classroom during a session.",
        width: 2400,
        height: 1646,
      },
      {
        src: "/programs/school-tour-initiative/05.jpg",
        alt: "Black and white photograph of students at classroom desks leaning over open exercise books.",
        width: 828,
        height: 413,
      },
    ],
    galleryLede:
      "Students gathering outside their schools and in classrooms during the sessions we run in Lagos.",
    galleryStyle: "elastic",
  },

  /* ---------------------------------------------------------------- */
  "breakthrough-series": {
    tagline:
      "Connecting refurbished technology with mentorship and opportunity.",
    /*
      The review's opening paragraph ("The Breakthrough Series supports underserved young
      people aged 18–35...") is off this page at the client's request; its place is taken by
      the programme's figures (`featureResults`). It still opens the /programs panel, from
      content/programs.ts.
    */
    overview: [
      "Access to a functional device can help young people practise new skills, explore creative interests, complete learning activities, and build portfolios that support their future opportunities.",
      "The programme combines device redistribution with follow-up engagement to understand whether beneficiaries can use their devices effectively and whether the support contributes to their learning or professional development.",
    ],
    featureResults: true,
    spinTargets: true,
    galleryCentered: true,
    /*
      The review's "How we measure progress" section is off this page at the client's
      request. It is in git history if it is wanted back.
    */
    objectives: [
      {
        label: "Put devices in hands",
        detail:
          "Provide functional refurbished laptops and tablets to underserved youth, each assessed for functionality and quality before it is distributed.",
      },
      {
        label: "Reduce digital inequality",
        detail:
          "Move recipients into active use of digital tools for learning or income generation, tracked rather than assumed.",
      },
      {
        label: "Connect to mentorship",
        detail:
          "Link every recipient to industry professionals, freelancers, and digital career coaches for real-world guidance and network access.",
      },
      {
        label: "Document the journey",
        detail:
          "Produce short storytelling films following recipients from selection to early outcomes, for programme communications and advocacy.",
      },
    ],
    targets: [
      {
        figure: "100",
        detail:
          "Refurbished devices to underserved youth aged 18 to 35, from 2027 - 2030",
      },
      {
        figure: "75%",
        detail: "Of recipients actively using devices for learning or income",
      },
      {
        figure: "100%",
        detail:
          "Of recipients in at least one structured mentorship interaction",
      },
    ],
    audience: {
      primary: [
        "Underserved youth aged 18 to 35",
        "Aspiring freelancers, digital creators, and early-stage tech enthusiasts from low-income communities",
      ],
      secondary: [
        "Families benefiting from improved household income",
        "SMEs and employers gaining access to skilled youth talent",
      ],
    },
    activities: [
      {
        title: "Identification and selection",
        detail:
          "Prospective recipients mapped through social media campaigns, school partnerships, and youth organisation referrals, then selected through a transparent process.",
      },
      {
        title: "Orientation",
        detail:
          "An inception session formally welcomes recipients into the programme and sets expectations on both sides.",
      },
      {
        title: "Device assessment and handover",
        detail:
          "Each laptop is assessed and prepared before distribution, and the handover is tracked through distribution records.",
      },
      {
        title: "Mentorship and follow-up",
        detail:
          "Structured mentorship sessions, then follow-up surveys and check-in calls at three and six months.",
      },
      {
        title: "Storytelling",
        detail:
          "A baseline profile, handover footage, progress check-ins, and a final interview, edited into a documentary and short-form cuts.",
      },
    ],
    /*
      `outcomes` was here and is out at the client's request, the same call made for the
      School Tour. `measurement` stays, so this programme keeps its second column and the
      section keeps its two column layout, with "How it is measured" where Expected outcomes
      used to sit above it. The removed content is in the git history.
    */
    /*
      `measurement` was here and is out at the client's request, following `outcomes`. With
      both gone from every programme, no page renders a second column beside "Who it is
      for", so every audience section now runs full width with Primary and Secondary side by
      side. The removed content is in the git history.
    */
    gallery: [
      {
        src: "/programs/breakthrough-series/01.jpg",
        alt: "Four people standing together indoors, two of them in JustUsedTech shirts.",
        width: 1340,
        height: 893,
      },
      {
        src: "/programs/breakthrough-series/02.jpg",
        alt: "Young people working at laptops around a long table, with team members alongside them.",
        width: 1340,
        height: 893,
      },
      {
        src: "/programs/breakthrough-series/03.jpg",
        alt: "A child holding a laptop, standing beside a JustUsedTech roll-up banner.",
        width: 596,
        height: 893,
      },
      {
        src: "/programs/breakthrough-series/04.jpg",
        alt: "Team members in JustUsedTech shirts talking with visitors at an indoor event.",
        width: 1340,
        height: 893,
      },
      {
        src: "/programs/breakthrough-series/05.jpg",
        alt: "Two people sharing a laptop at a table, one of them typing.",
        width: 1109,
        height: 1477,
      },
    ],
    galleryLede:
      "Laptop handovers, mentoring sessions, and recipients getting started on the laptops they were given.",
    galleryStyle: "accordion",
    /*
      The heading says who is speaking and the lede says what the clip is, and neither
      says what is said in it, because no transcript was supplied. When one is, it belongs
      in content/videos.ts against the clip, and this lede can quote from it.
    */
    video: {
      heading: "Hear from a beneficiary",
      lede: "A Breakthrough Series recipient, on camera in the training room with the laptop.",
      clip: videos.breakthroughBeneficiary,
    },
  },

  /* ---------------------------------------------------------------- */
  "project-9-12": {
    tagline:
      "Promoting youth development through sports, technology, and community engagement.",
    /*
      The review's opening paragraph ("Project 9-12 combines access to sports equipment...")
      is off this page at the client's request; the headline figures take its place, as on
      Breakthrough Series and School Tour. It still opens the /programs panel.
    */
    overview: [
      "Through collaboration with Passback and other community partners, the programme supports the redistribution of usable sports equipment and technology to schools and youth communities.",
    ],
    featureResults: true,
    spinTargets: true,
    sections: [
      {
        heading: "Schools engaged",
        items: [
          "Ayetoro Senior Grammar School",
          "Eletu Odibo Senior High School Abule-Oja",
          "Jibowu Junior High School Yaba",
          "Mainland Junior High School",
          "Lagos City",
          "Wesley Girls Senior Secondary School",
          "Birrel Avenue Senior High School Sabo",
          "Mainland Senior High School Fadeyi",
          "Oke - Odo Junior High School, Ebute Metta",
          "Victokev Schools",
        ],
      },
      {
        heading: "Monitoring focus",
        body: [
          "We document participating schools and communities, attendance, equipment donated, recipient confirmation, and feedback on the usefulness of the support.",
        ],
      },
    ],
    objectives: [
      {
        label: "Engage young people",
        detail:
          "Bring children and youth aged 10 to 18 into sports activities and community events across Lagos schools and neighbourhoods.",
      },
      {
        label: "Redistribute gear",
        detail:
          "Get upcycled and donated sports kits into underserved schools and communities, extending the lifecycle of equipment that would otherwise be discarded.",
      },
      {
        label: "Run community events",
        detail:
          "Organise sports events, clinics, training sessions, and tournaments that build teamwork, leadership, and social cohesion.",
      },
      {
        label: "Prove the reuse model",
        detail:
          "Demonstrate a circular economy model for donated sports gear, with items sorted by condition and damaged goods responsibly disposed of.",
      },
    ],
    targets: [
      {
        figure: "500",
        detail:
          "Children and youth engaged in sports activities within 12 months",
      },
      {
        figure: "500+",
        detail: "Upcycled or donated kits distributed within 12 months",
      },
      { figure: "3", detail: "Community-based sports events and tournaments" },
    ],
    audience: {
      primary: [
        "Children and youth aged 10 to 18 in schools, with an interest in sport",
      ],
      secondary: [
        "Families and local communities",
        "Coaches and sports facilitators",
        "Schools and community organisations receiving equipment",
      ],
    },
    activities: [
      {
        title: "Receipt and sorting",
        detail:
          "Donated equipment received through Passback is sorted and categorised as good, refurbishable, or damaged, with usable gear prioritised for distribution.",
      },
      {
        title: "Distribution",
        detail:
          "Trained volunteers run distribution exercises across target schools and communities, documented through inventory records and photographs.",
      },
      {
        title: "Sports programming",
        detail:
          "Clinics, training sessions, and tournaments engaging youth from participating schools, used for talent identification as well as play.",
      },
      {
        title: "Post-event evaluation",
        detail:
          "Participation data, community feedback, and impact evidence captured after each event.",
      },
    ],
    /*
      `outcomes` was here and is out at the client's request, which has now been made for
      every programme that had one. `measurement` stays, so this page keeps its second
      column and the section keeps its two column layout. The removed content is in the git
      history.
    */
    /*
      `measurement` was here and is out at the client's request, following `outcomes`. With
      both gone from every programme, no page renders a second column beside "Who it is
      for", so every audience section now runs full width with Primary and Secondary side by
      side. The removed content is in the git history.
    */
    gallery: [
      {
        src: "/programs/project-9-12/01.jpg",
        alt: "Children in coloured bibs playing football on a sandy pitch.",
        width: 2400,
        height: 1590,
      },
      {
        src: "/programs/project-9-12/02.jpg",
        alt: "Sports kit bags, boots, balls, and training cones laid out on the ground with people standing behind them.",
        width: 2400,
        height: 1347,
      },
      {
        src: "/programs/project-9-12/03.jpg",
        alt: "Young people crouching on a sandy pitch trying on football boots, with more boots laid out in front of them.",
        width: 2048,
        height: 1365,
      },
      {
        src: "/programs/project-9-12/04.jpg",
        alt: "Two young players in team kit holding a Project 9-12 photo frame.",
        width: 1590,
        height: 2400,
      },
      {
        src: "/programs/project-9-12/05.jpg",
        alt: "Students in school uniform crowded around a registration table while a volunteer writes on a form.",
        width: 2048,
        height: 1365,
      },
      {
        src: "/programs/project-9-12/06.jpg",
        alt: "A volunteer in a JustUsedTech shirt speaking with a seated young person at an outdoor event.",
        width: 2048,
        height: 1365,
      },
      {
        src: "/programs/project-9-12/07.jpg",
        alt: "A person handing equipment to young people in front of a Passback and JustUsedTech backdrop.",
        width: 2400,
        height: 1347,
      },
      {
        src: "/programs/project-9-12/08.jpg",
        alt: "Two people standing together holding a Project 9-12 photo frame in front of an event backdrop.",
        width: 2400,
        height: 1590,
      },
      {
        src: "/programs/project-9-12/09.jpg",
        alt: "Four people in formal dress standing with Project 9-12 photo props in front of a Passback and JustUsedTech backdrop.",
        width: 2400,
        height: 1347,
      },
      {
        src: "/programs/project-9-12/10.jpg",
        alt: "People moving between wooden canoes at a waterfront community, with stilt houses behind them.",
        width: 2400,
        height: 1590,
      },
    ],
    galleryLede:
      "Children trying on donated football boots, the kit laid out before it is handed over, and the matches that follow.",
    galleryStyle: "bento",
  },

  /* ---------------------------------------------------------------- */
  "greenbin-360": {
    tagline:
      "Responsible e-waste recovery for a more circular technology economy.",
    /*
      The opening sentences ("GreenBin 360 connects businesses and institutions...") are off
      this page at the client's request, as on the other programme pages; they still open the
      /programs panel. The figures and the weight converter take their place.
    */
    overview: [
      "Recovered devices can enter JustUsedTech's upcycling, refurbishment and redistribution pipeline, helping extend the useful life of functional equipment and support digital inclusion programmes.",
    ],
    featureResults: true,
    weightConverter: true,
    sections: [
      {
        heading: "Our commitment",
        body: [
          "We work with corporate, institutional, and community partners to improve technology recovery, promote responsible resource management, and document the outcomes of collected equipment.",
        ],
      },
      {
        heading: "Partners for the Green Bin project",
        items: [
          "Cortex",
          "CIC 2112",
          "CIC 4200",
          "WashU",
          "AB Mauri",
          "Higher Education Metropolitan",
        ],
      },
    ],
    context: [
      {
        title: "The volume",
        body: "The world generates around 60 million tonnes of e-waste a year. Nigeria alone generates over 500 thousand metric tonnes annually, while millions of young people and underserved communities remain digitally excluded.",
      },
      {
        title: "The loss",
        body: "Valuable materials worth millions are lost every year through improper disposal, informal recycling, open burning, and landfill dumping.",
      },
    ],
    objectives: [
      {
        label: "Collect",
        detail:
          "Community, school, corporate, municipal, and retail collection points feeding a single stream of recoverable hardware.",
      },
      {
        label: "Recover",
        detail:
          "Sorting, repair, refurbishment, material recovery, and secure data destruction on every device that comes in.",
      },
      {
        label: "Redistribute",
        detail:
          "Devices out to schools, libraries, innovation hubs, women-led businesses, and community centres.",
      },
      {
        label: "Supply the programmes",
        detail:
          "Every refurbished device that reaches the Breakthrough Series or a school donation started here.",
      },
    ],
    audience: {
      primary: [
        "Companies and institutions retiring hardware across St. Louis, Missouri",
        "Schools, libraries, and community centres receiving refurbished devices",
      ],
      secondary: [
        "Students and low-income households",
        "Women-led businesses and youth innovation hubs",
      ],
    },
    activities: [
      {
        title: "Corporate and institutional collection",
        detail:
          "Scheduled pickups and drop-off events for end-of-life and surplus hardware from organisations across the region.",
      },
      {
        title: "Assessment and data destruction",
        detail:
          "Every device is assessed on arrival and wiped before it goes any further, so nothing leaves carrying a previous owner's data.",
      },
      {
        title: "Refurbishment",
        detail:
          "Repair, re-imaging, and quality testing, turning recoverable devices back into working computers.",
      },
      {
        title: "Redistribution",
        detail:
          "Refurbished devices donated or sold at subsidised prices into the communities and programmes that need them.",
      },
    ],
    gallery: [
      {
        src: "/programs/greenbin-360/01.jpg",
        alt: "Two people carrying boxes across a plaza towards a collection point.",
        width: 810,
        height: 1080,
      },
      {
        src: "/programs/greenbin-360/02.jpg",
        alt: "Team members loading equipment into the back of a van at an outdoor collection event.",
        width: 1536,
        height: 1024,
      },
      {
        src: "/programs/greenbin-360/03.jpg",
        alt: "People working at a collection table under a canopy at an outdoor event.",
        width: 810,
        height: 1080,
      },
      {
        src: "/programs/greenbin-360/04.jpg",
        alt: "A person sorting laptops in a storage area stacked with cartons and boxed equipment.",
        width: 1080,
        height: 810,
      },
      {
        src: "/programs/greenbin-360/05.jpg",
        alt: "Two people packing a box at an outdoor collection table.",
        width: 1800,
        height: 2400,
      },
    ],
    galleryLede:
      "Collection days around St. Louis, Missouri, and the storage room where donated equipment is sorted before repair.",
    galleryStyle: "mosaic",
  },

  /* ---------------------------------------------------------------- */
  "skillsync-initiative": {
    tagline:
      "Equipping emerging creatives with the tools to develop their potential.",
    overview: [
      "The SkillSync Initiative supports emerging Nigerian creatives by improving access to functional technology and opportunities that can strengthen digital creativity, entrepreneurship, and income generation.",
      "The initiative focuses on connecting young people with tools that support creative practice, digital production, and the development of marketable skills.",
      "Through collaboration with partners, including the Office of the Special Assistant to the President on Art, Culture and the Creative Economy, JustUsedTech aims to reduce technology barriers faced by emerging creatives.",
    ],
    /* Its one figure (15+ devices) as a spinning figure card in place of the "To date" list. */
    featureResults: true,
    sections: [
      {
        heading: "Monitoring focus",
        body: [
          "We track devices distributed, recipient profiles, intended use, continued device functionality, beneficiary feedback, and evidence of progress in creative or entrepreneurial activities.",
        ],
      },
    ],
    objectives: [
      {
        label: "Develop indigenous creative skill",
        detail:
          "Build the skills of indigenous creatives, nurturing and empowering the next generation of creative minds across Nigeria's creative industry.",
      },
      {
        label: "Open routes to income",
        detail:
          "Provide opportunities for employment, entrepreneurship, and income generation from creative work.",
      },
      {
        label: "Reach who is left out",
        detail:
          "Prioritise youth, women, and persons living with disabilities, the groups least served by existing routes into the creative economy.",
      },
      {
        label: "Strengthen the sector",
        detail:
          "Strengthen employment in arts and culture through entrepreneurship support and investment for innovation.",
      },
    ],
    audience: {
      primary: [
        "Youth across Nigeria's creative economy",
        "Women in the creative economy",
        "Persons with disabilities",
      ],
      secondary: ["Emerging creative enterprises and the people they employ"],
    },
    /*
      The two SkillSync fliers, supplied by the client. They replace the device handover
      photograph that was this gallery's only frame. The alt text carries each flier's words,
      since a poster's text is its content. The people pictured are campaign imagery and are
      not named or described as beneficiaries.
    */
    gallery: [
      {
        src: "/programs/skillsync-initiative/01.jpg",
        alt: "SkillSync flier: Introducing Skill Sync. Empowering Nigeria's future creatives with the tools they need. Skill Sync is providing young Nigerian creatives with access to the tools, mentorship, and opportunities they need to transform their craft into lasting success. For more information, visit bit.ly/SKSYNC2025.",
        width: 1027,
        height: 1280,
      },
      {
        src: "/programs/skillsync-initiative/02.jpg",
        alt: "SkillSync flier: Have you applied yet? Your creative future starts here. Don't miss your chance to join Skill Sync. Gain access to digital tools, mentorship, and opportunities that can help you build a thriving creative career. Apply today at bit.ly/SKSYNC2025.",
        /* The supplied file carried a 5px black strip along its top edge; trimmed off. */
        width: 1025,
        height: 1275,
      },
    ],
    galleryHeading: "Campaign fliers",
    galleryLede: "The SkillSync launch flier and the call for applications.",
    galleryStyle: "posters",
  },

  /* ---------------------------------------------------------------- */
  "circular-tech-bootcamp": {
    tagline:
      "Developing practical skills in technology refurbishment and responsible e-waste management.",
    /* The URL is in site.ts with the other external forms, so a replacement lands once. */
    apply: {
      label: "Apply for the bootcamp",
      href: forms.circularTechBootcamp,
    },
    /*
      The cohort detail that used to run here (the Lagos curriculum, the St. Louis ethical AI
      track, Google Classroom, the capstone) is still on this page, in "Where it runs" and
      "How it runs" below. The overview now carries the review's copy.
    */
    overview: [
      "The Circular Tech Bootcamp equips young people with practical knowledge and skills in electronic waste management, device recovery, refurbishment, and the circular technology economy. Through structured learning and practical engagement, participants explore how electronic devices can be assessed, repaired where feasible, and returned to productive use. The programme also introduces the environmental and social value of extending device lifecycles.",
      "The initiative connects technical skills development with digital inclusion and the potential for future employment and entrepreneurship.",
    ],
    sections: [
      {
        heading: "Monitoring focus",
        body: [
          "We document enrolment, attendance, completion, practical skills gained, devices assessed or refurbished, and participants' subsequent learning or employment pathways where follow-up data are available.",
        ],
      },
    ],
    contextHeading: {
      title: "Where it runs",
      lede: "The same programme runs in two places. Here is what each one does, and what they have in common.",
    },
    context: [
      {
        title: "Lagos",
        body: "A workforce development cohort, built around hardware assembly, troubleshooting, and refurbishment, with circular economy and e-waste education running alongside and participants supporting real collection drives.",
      },
      {
        title: "St. Louis, Missouri",
        body: "Run with Thomas Dunn Learning Center, a community learning hub with over 9,000 annual visits and 900+ classes delivered. Open to participants aged 15 and up, across two tracks: ethical AI use, and computer hardware coupling and refurbishment.",
      },
      {
        title: "What both share",
        body: "Both are blended: instructor-led sessions and hands-on lab work in the room, Google Classroom for materials and assessment, e-waste collection supplying the laptops the training runs on, and a capstone exhibition to finish.",
      },
    ],
    objectives: [
      {
        label: "Hardware skills",
        detail:
          "Train participants on computer hardware assembly, troubleshooting, and refurbishment through physical practical sessions and lab work.",
      },
      {
        label: "Circular economy literacy",
        detail:
          "Build practical understanding of circular economy principles, e-waste reduction, and the environmental impact of electronic waste.",
      },
      {
        label: "Ethical AI use",
        detail:
          "In the St. Louis cohort, a full track on what AI tools are good for, where they fail, and the bias, privacy, and accountability questions around them, alongside digital citizenship and online safety.",
      },
      {
        label: "Responsible technology use",
        detail:
          "Promote digital citizenship and sustainability practice alongside the technical curriculum.",
      },
      {
        label: "Feed the device pipeline",
        detail:
          "Collect and refurbish used devices for reuse, redistribution, and future community learning initiatives.",
      },
    ],
    targets: [
      {
        figure: "50",
        detail:
          "Youth enrolled and trained on hardware and circular economy skills",
      },
      { figure: "85%", detail: "Training completion rate" },
      {
        figure: "70%",
        detail: "Knowledge improvement, pre and post assessment",
      },
      {
        figure: "20",
        detail: "Devices refurbished and presented at the capstone exhibition",
      },
    ],
    audience: {
      primary: [
        "Youth aged 16 to 35",
        "Students and recent graduates",
        "Underserved and digitally excluded youth",
        "Early-stage entrepreneurs",
      ],
      secondary: [
        "Community schools",
        "Local youth organisations",
        "Low-income households receiving refurbished devices",
      ],
    },
    activities: [
      {
        title: "Hardware training",
        detail:
          "Component identification, laptop and desktop assembly and disassembly, troubleshooting, RAM, SSD, and battery replacement, maintenance, and networking basics.",
      },
      {
        title: "Practical lab work",
        detail:
          "Participants work directly on donated laptops, desktop systems, peripherals, and reusable components.",
      },
      {
        title: "Circular economy and e-waste education",
        detail:
          "Environmental impact, reuse and repair principles, safe disposal of damaged components, and community awareness work.",
      },
      {
        title: "E-waste collection drives",
        detail:
          "Participants support collection, sorting exercises, and reusable device recovery in their own communities.",
      },
      {
        title: "Ethical AI track",
        detail:
          "In St. Louis, Missouri, a parallel track on artificial intelligence in everyday life, bias, privacy, accountability, responsible use of AI tools, and online safety, taught through case studies.",
      },
      {
        title: "Capstone innovation challenge",
        detail:
          "Teams refurbish devices, design sustainability solutions, or build awareness campaigns, presented at a final exhibition and graduation event.",
      },
    ],
    phases: [
      {
        window: "Week 1 to 6",
        label: "Setup",
        detail:
          "Curriculum development, trainer and volunteer recruitment, participant recruitment, device collection, and lab setup.",
      },
      {
        window: "Month 2",
        label: "Training delivery",
        detail:
          "Instructor-led workshops, hands-on lab work, peer learning groups, and practical assessments.",
      },
      {
        window: "Month 3",
        label: "Projects and exhibition",
        detail:
          "Practical projects, mentorship, and the final capstone exhibition.",
      },
      {
        window: "Month 4",
        label: "Reporting and evaluation",
        detail:
          "Programme reporting and evaluation against the training targets.",
      },
    ],
    /*
      `outcomes` was here and is out at the client's request, which has now been made for
      every programme that had one. `measurement` stays, so this page keeps its second
      column and the section keeps its two column layout. The removed content is in the git
      history.
    */
    /*
      `measurement` was here and is out at the client's request, following `outcomes`. With
      both gone from every programme, no page renders a second column beside "Who it is
      for", so every audience section now runs full width with Primary and Secondary side by
      side. The removed content is in the git history.
    */
    gallery: [
      {
        src: "/programs/circular-tech-bootcamp/01.jpg",
        alt: "A facilitator in a JustUsedTech shirt standing at the front of a training room, with participants seated at desks.",
        width: 2400,
        height: 1722,
      },
      {
        src: "/programs/circular-tech-bootcamp/02.jpg",
        alt: "Participants seated at a long desk taking notes during a session.",
        width: 2400,
        height: 1722,
      },
      {
        src: "/programs/circular-tech-bootcamp/03.jpg",
        alt: "A facilitator pointing at a screen showing slides on CPUs, motherboards, and RAM, with a JustUsedTech banner beside it.",
        width: 2400,
        height: 1722,
      },
      {
        src: "/programs/circular-tech-bootcamp/04.jpg",
        alt: "Two participants leaning over an opened laptop on a desk while a third looks on.",
        width: 2400,
        height: 1722,
      },
      {
        src: "/programs/circular-tech-bootcamp/05.jpg",
        alt: "A facilitator holding an opened laptop chassis up to the room, with the component slide on the screen behind.",
        width: 2400,
        height: 1722,
      },
      {
        src: "/programs/circular-tech-bootcamp/06.jpg",
        alt: "Two participants working together over a tablet at a desk.",
        width: 2400,
        height: 1722,
      },
      {
        src: "/programs/circular-tech-bootcamp/07.jpg",
        alt: "A group of participants talking together during a break, one in a JustUsedTech shirt.",
        width: 2400,
        height: 1697,
      },
      {
        src: "/programs/circular-tech-bootcamp/08.jpg",
        alt: "A facilitator presenting a slide headed Computer Hardware Coupling and Refurbishment to a seated audience.",
        width: 2400,
        height: 1600,
      },
      {
        src: "/programs/circular-tech-bootcamp/09.jpg",
        alt: "A team member leaning across a table to show a laptop to a young participant, beside a JustUsedTech poster.",
        width: 960,
        height: 1280,
      },
      {
        src: "/programs/circular-tech-bootcamp/10.jpg",
        alt: "Participants at a table examining an open laptop together.",
        width: 2400,
        height: 1600,
      },
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
    galleryLede:
      "Training sessions in Lagos, where participants take laptops apart to learn what is inside them, and the St. Louis sessions run with Thomas Dunn, where they take a repaired laptop home at the end.",
    galleryStyle: "bento",
  },
};

/** Programmes that have a detail page. Drives the Learn more link and the static params. */
export function hasDetailPage(slug: string) {
  return slug in programDetails;
}

/**
 * One gallery photograph, looked up by its path, so a surface outside the programme pages can
 * show a frame without restating its alt text.
 *
 * Alt text is held to the same standard everywhere on this site and is written once, against
 * the picture, in the gallery it belongs to. A second copy pasted into a page component is a
 * second copy to keep true, and the one that drifts is always the copy nobody is looking at.
 *
 * It throws on a path that is not in any gallery rather than rendering an empty description.
 * Every caller runs at build time on a statically prerendered page, so a wrong path fails the
 * build rather than reaching a reader.
 */
export function galleryFrame(src: string): { src: string; alt: string } {
  for (const detail of Object.values(programDetails)) {
    const found = detail.gallery?.find((frame) => frame.src === src);
    if (found) return { src: found.src, alt: found.alt };
  }
  throw new Error(`galleryFrame: no gallery entry for ${src}`);
}

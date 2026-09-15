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
 * SkillSync is still the thin one, but less so than it was. The 2026 organisation profile
 * carries a real description of it, so its overview and objectives are now drawn from that
 * document like every other programme's. What it still has no source for is numbers: no
 * targets, no delivery timeline, and no dated results, which is what `pending` says. That
 * absence is stated rather than filled, because content/programs.ts forbids inventing
 * figures for this programme specifically.
 *
 * The GreenBin document describes both the running collection operation and the future
 * ecosystem. Only the operating half is here. Smart bins, GreenPoints, the entrepreneurship
 * hubs, and the climate marketplace belong to greenbin-360-ecosystem, which is Upcoming and
 * has no detail page.
 */

export type ProgramDetail = {
  /** One line under the title on the detail page. Not the same as the catalogue summary. */
  tagline: string;
  /** Opening prose. Two or three paragraphs, no headings. */
  overview: string[];
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
  /** Numbers that have not happened yet. Never rendered without the "Target" framing. */
  targets?: { figure: string; detail: string }[];
  audience: { primary: string[]; secondary: string[] };
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
   *
   * A single photograph ignores this and renders as one frame.
   */
  galleryStyle?: "elastic" | "accordion" | "bento" | "mosaic";
};

export const programDetails: Record<string, ProgramDetail> = {
  /* ---------------------------------------------------------------- */
  "school-tour-initiative": {
    tagline:
      "E-waste literacy and environmental sustainability, taught inside Lagos secondary schools.",
    overview: [
      "Nigeria's digital consumption is rising faster than its capacity to deal with what that consumption leaves behind. Devices arrive, devices fail, and what happens next is usually a dump site or an open fire. The School Tour Initiative goes into secondary schools and closes the gap between knowing a device is finished and knowing what to do with it.",
      "Sessions are interactive rather than lectured. Students work through what a device is made of, where its materials go, why e-waste matters in the neighbourhood they live in, and what the circular economy asks of them as consumers. Selected students are then trained as peer educators, so the session does not end when the team leaves the compound.",
      "The initiative is measured on movement, not attendance. Every school is assessed before and after, so the change in what students know is a number rather than an impression.",
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
      { figure: "1,000", detail: "Students across 10 schools within 12 months" },
      { figure: "60%", detail: "Literacy improvement, measured pre and post session" },
      { figure: "10", detail: "Schools onboarded, engaged, and evaluated" },
    ],
    audience: {
      primary: [
        "Secondary school students, JSS1 to SS3, aged 10 to 18",
        "Teachers and school administrators, as facilitators and enablers",
      ],
      secondary: ["Parents and guardians", "Surrounding school communities"],
    },
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
    phases: [
      {
        window: "Month 1 to 3",
        label: "Planning and preparation",
        detail:
          "Finalise the design and materials, identify partner schools, train facilitators and volunteers, develop the awareness materials.",
      },
      {
        window: "Month 3 to 10",
        label: "Implementation",
        detail:
          "Deliver sensitisation sessions across the selected schools and roll out the awareness campaigns.",
      },
      {
        window: "Month 11 to 12",
        label: "Evaluation and reporting",
        detail:
          "Post-assessment on knowledge and behaviour, lessons learned documented, impact report shared.",
      },
    ],
    outcomes: [
      "Students demonstrate improved knowledge of responsible e-waste disposal practices.",
      "Schools integrate e-waste and sustainability lessons into their own activities.",
      "A trained cohort of student environmental champions in each participating school.",
    ],
    measurement: [
      "Pre and post session assessment scores",
      "Follow-up surveys on disposal practice",
      "Attendance sheets and session reports",
      "Observation checklists and training assessments",
    ],
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
    gallery: [
      {
        src: "/programs/school-tour-initiative/01.jpg",
        alt: "A large group of students in purple and blue school uniforms crowded together outside a school building, smiling towards the camera.",
        width: 2400,
        height: 1506,
      },
      {
        src: "/programs/school-tour-initiative/02.jpg",
        alt: "A person in a JustUsedTech shirt standing beside a roll-up banner reading Building A Sustainable Future.",
        width: 1800,
        height: 2400,
      },
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
      "Refurbished laptops and mentorship for underserved young people aged 18 to 35, with their progress recorded over the following months.",
    overview: [
      "Digital exclusion compounds. Without a device a young person cannot build digital skills. Without the skills they cannot reach income. Without income they cannot afford the device. The Breakthrough Series exists to break that loop at the point where it is cheapest to break: the machine itself.",
      "A laptop on its own is rarely enough, so each one is paired with structured mentorship from industry professionals, freelancers, and digital career coaches. Recipients are found through social media campaigns, school partnerships, and referrals from youth organisations, and selection prioritises underserved youth, women in technology, and unemployed graduates.",
      "Then the team follows up. Recipients are surveyed and called at three and six months to record what they have built, learned, or earned, and their account of it is filmed and edited into a short documentary and social cuts.",
    ],
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
      { figure: "10", detail: "Refurbished devices to underserved youth aged 18 to 35, within 12 months" },
      { figure: "75%", detail: "Of recipients actively using devices for learning or income" },
      { figure: "100%", detail: "Of recipients in at least one structured mentorship interaction" },
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
    outcomes: [
      "Recipients using their devices for learning, freelance work, or business.",
      "Documented success stories produced and shared across JustUsedTech platforms.",
      "A recipient tracking report produced at the close of the programme.",
    ],
    measurement: [
      "Device distribution records and recipient tracking",
      "Follow-up surveys at three and six months post-distribution",
      "Mentorship session reports and attendance",
      "Final outcome evaluation on skills, device use, and employment status",
    ],
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
  },

  /* ---------------------------------------------------------------- */
  "project-9-12": {
    tagline:
      "Sports gear and technology access for children and youth aged 10 to 18, run with Passback.",
    overview: [
      "Young people in underserved communities face a double barrier: no equipment, and no structured programme to use it in. Sports materials sit financially out of reach for most families, schools have nothing to lend, and usable gear elsewhere is routinely thrown away rather than passed on.",
      "Project 9-12 closes that distribution gap. Working with Passback, an organisation that specialises in collecting and redistributing used sports equipment, JustUsedTech receives, sorts, and quality-assesses donated gear, then puts it into the hands of schools and communities through a collect, refurbish, and distribute model.",
      "The events are not only distributions. Coaches use them to spot players worth developing, and the sessions carry the same reuse and responsible consumption message the school tours do, on the grounds that the gear being handed out is itself second hand.",
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
      { figure: "500", detail: "Children and youth engaged in sports activities within 12 months" },
      { figure: "500+", detail: "Upcycled or donated kits distributed within 12 months" },
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
    outcomes: [
      "Upcycled sports kits and equipment in the hands of underserved schools and communities.",
      "Children and youth actively engaged in sport within the project period.",
      "A documented reuse and redistribution model showing the circular economy value of donated gear.",
      "A final impact report shared with Passback, partner schools, and community stakeholders.",
    ],
    measurement: [
      "Inventory distribution logs and equipment condition records",
      "Participant attendance sheets from events and sessions",
      "Community feedback forms and post-event evaluation reports",
      "Photographic and video documentation of activities",
    ],
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
      "E-waste collection from companies and institutions across St. Louis. This is where the devices every other programme hands out come from.",
    overview: [
      "Existing e-waste solutions mostly stop at collection and recycling. They rarely touch digital poverty, youth employment, or community participation, which means the material moves but nothing else does. GreenBin 360 treats a discarded device as a community asset rather than a disposal problem.",
      "In practice this is the operation that feeds everything else JustUsedTech runs. Companies and institutions across St. Louis hand over end-of-life and surplus hardware, and the programme routes it into sorting, data destruction, repair, and refurbishment. What can be brought back is brought back; what cannot is dismantled for material recovery.",
      "Recovered devices then go out through the redistribution pillar, to schools, libraries, innovation hubs, women-led businesses, and community centres. One organisation's retired hardware becomes another person's first computer.",
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
        "Companies and institutions retiring hardware across St. Louis",
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
      "Collection days around St. Louis, and the storage room where donated equipment is sorted before repair.",
    galleryStyle: "mosaic",
  },

  /* ---------------------------------------------------------------- */
  "skillsync-initiative": {
    tagline:
      "Support for emerging Nigerian creative talent, with entrepreneurship and income-generation pathways.",
    overview: [
      "SkillSync sets out to empower emerging creative talent in Nigeria. Its focus is the skills of indigenous creatives, and its aim is to nurture and empower the next generation of creative minds. It runs with the Office of the Special Assistant to the President on Art, Culture and the Creative Economy.",
      "The programme seeks to provide opportunities for employment, entrepreneurship, and income generation, particularly for youth, women, and persons living with disabilities. Nigeria's creative industry has boundless possibilities for closing the unemployment gap, and through SkillSync the Office aims to strengthen employment in arts and culture, provide an entrepreneurship support programme, and make investments for innovation.",
      "It sits alongside the device work rather than inside it. Where the Breakthrough Series answers what a young person builds with a laptop, SkillSync answers what a creative practitioner does with a skill they already have and no route to market.",
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
    pending:
      "SkillSync has no separate project design document, so this page carries no targets, delivery timeline, or dated results. Those will be added when the document exists rather than estimated in the meantime.",
    audience: {
      primary: [
        "Youth across Nigeria's creative economy",
        "Women in the creative economy",
        "Persons with disabilities",
      ],
      secondary: ["Emerging creative enterprises and the people they employ"],
    },
    gallery: [
      {
        src: "/programs/skillsync_initiative.jpg",
        alt: "Five people standing together for a photograph at a device handover event, with a desktop computer in front of them.",
        width: 1400,
        height: 933,
      },
    ],
    galleryLede: "A photograph taken at a device handover event.",
  },

  /* ---------------------------------------------------------------- */
  "circular-tech-bootcamp": {
    tagline:
      "Hands-on hardware training in Lagos and St. Louis, on the same laptops that go back out to the community afterwards.",
    overview: [
      "Every device that arrives at JustUsedTech needs assessment before it can be redistributed. The bootcamp turns that necessary work into a curriculum, so the people learning hardware repair are learning on real laptops that are going to real people afterwards, not on spare hardware kept for practice.",
      "The same programme runs in two places. In Lagos it is a jobs-focused course, taking participants through computer hardware from the component level up: identification, assembly and disassembly, troubleshooting, RAM, SSD and battery replacement, maintenance and optimisation, refurbishment, quality testing, and networking basics. Alongside that runs the circular economy and e-waste half, covering environmental impact, reuse and repair principles, safe disposal of damaged components, and community awareness.",
      "In St. Louis it runs with Thomas Dunn Learning Center as a summer programme for participants aged 15 and up, and carries a second track alongside the hardware one: the ethical use of artificial intelligence, covering where these tools fail, bias, privacy, accountability, and digital citizenship. Both cohorts use Google Classroom for materials, assignments, and progress, and both close on a capstone exhibition where teams present what they refurbished or built.",
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
        title: "St. Louis",
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
      { figure: "50", detail: "Youth enrolled and trained in the Lagos cohort" },
      { figure: "85%", detail: "Training completion rate" },
      { figure: "70%", detail: "Knowledge improvement, pre and post assessment" },
      { figure: "20", detail: "Devices refurbished and presented at the capstone exhibition" },
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
          "In St. Louis, a parallel track on artificial intelligence in everyday life, bias, privacy, accountability, responsible use of AI tools, and online safety, taught through case studies.",
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
        detail: "Practical projects, mentorship, and the final capstone exhibition.",
      },
      {
        window: "Month 4",
        label: "Reporting and evaluation",
        detail: "Programme reporting and evaluation against the training targets.",
      },
    ],
    outcomes: [
      "Increased hardware and refurbishment skills among participants.",
      "Increased awareness of e-waste management and circular economy practice.",
      "Improved youth employability and growth in local circular economy activity.",
      "Refurbished devices supporting future cohorts, community learning hubs, and low-income recipients.",
      "An alumni network for mentorship, volunteering, job referrals, and collaboration.",
    ],
    measurement: [
      "Registration forms and attendance records",
      "Pre and post assessment results",
      "Capstone project exhibition outputs",
      "Participant evaluation forms and satisfaction surveys",
    ],
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

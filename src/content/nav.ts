/**
 * Header navigation, including the dropdown menus.
 *
 * Copy lives here; the icon map lives in the header component. Icons are named rather than
 * imported so this file stays free of React and remains a pure content module, matching how
 * the programme card media picks its icon.
 *
 * Anchors are real: /about#vision, #model and #values are ids on the About page sections,
 * and the /get-involved anchors are the section ids on that page. A menu entry pointing at
 * an anchor that does not exist lands the visitor at the top of the page with no
 * explanation, so check the target before adding one.
 *
 * Programme entries go to /programs/<slug>, the programme's own page, not to an anchor on
 * the listing. They used to be anchors, which put a visitor who picked a programme by name
 * partway down a page of all seven and left them to find the Learn more pill. Every slug
 * here must exist in content/program-details.ts, since that is what the route renders.
 */

export type NavIcon =
  | "Compass"
  | "RefreshCw"
  | "HeartHandshake"
  | "Handshake"
  | "GraduationCap"
  | "Sparkles"
  | "Trophy"
  | "Recycle"
  | "Palette"
  | "Wrench"
  | "FileText"
  | "Laptop"
  | "HandCoins"
  | "Users";

export type NavMenuItem = {
  label: string;
  description: string;
  href: string;
  icon: NavIcon;
  /** Mirrors ProgramStatus. Drives the same quiet treatment the StatusBadge gives. */
  status?: "active" | "upcoming";
};

export type NavMenuColumn = {
  /** Rendered as the column heading. Omitted when a menu is a single unlabelled list. */
  title?: string;
  items: NavMenuItem[];
};

export type NavEntry = {
  label: string;
  href: string;
  /** Present on the three entries that open a dropdown. Absent means a plain link. */
  columns?: NavMenuColumn[];
  /**
   * Label for the link to the section's own page, shown at the foot of the menu.
   * A dropdown trigger is a button, not a link, so without this row the landing page
   * behind the menu has no route in from the header at all.
   */
  overview?: string;
};

export const nav: NavEntry[] = [
  {
    label: "About",
    href: "/about",
    overview: "About JustUsedTech",
    columns: [
      {
        items: [
          {
            label: "Vision & Mission",
            description: "A world where technology access is equitable...",
            href: "/about#vision",
            icon: "Compass",
          },
          {
            label: "Our Model",
            description: "Collect, Refurbish, Distribute",
            href: "/about#model",
            icon: "RefreshCw",
          },
          {
            label: "Core Values",
            description:
              "Impact First, Sustainability, Equity, Collaboration, Integrity",
            href: "/about#values",
            icon: "HeartHandshake",
          },
          {
            label: "Partners",
            description: "18 partners across two continents",
            href: "/partners",
            icon: "Handshake",
          },
        ],
      },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    overview: "All programmes",
    columns: [
      {
        title: "Active",
        items: [
          {
            label: "School Tour Initiative",
            description: "Digital awareness in schools",
            href: "/programs/school-tour-initiative",
            icon: "GraduationCap",
            status: "active",
          },
          {
            label: "Breakthrough Series",
            description: "Support for young professionals",
            href: "/programs/breakthrough-series",
            icon: "Sparkles",
            status: "active",
          },
          {
            label: "Project 9-12",
            description: "Tech + sports integration",
            href: "/programs/project-9-12",
            icon: "Trophy",
            status: "active",
          },
          {
            label: "GreenBin 360",
            description: "E-waste collection from organizations and institutions",
            href: "/programs/greenbin-360",
            icon: "Recycle",
            status: "active",
          },
          {
            label: "SkillSync Initiative",
            description: "Support for young creatives",
            href: "/programs/skillsync-initiative",
            icon: "Palette",
            status: "active",
          },
          {
            label: "Circular Tech Bootcamp",
            description: "Hardware repair & certification training",
            href: "/programs/circular-tech-bootcamp",
            icon: "Wrench",
            status: "active",
          },
        ],
      },
      /*
        The "Upcoming" column held only the Google workplan and the TDLC camp. The first was
        an internal document and the second has run, so both went, and a column heading with
        nothing under it is worse than no column: the menu removes it rather than render an
        empty one.

        GreenBin 360 Smart Bin Ecosystem is now the sole upcoming programme and is still
        listed in the In development section on /programs. It was never in this menu, so it
        is not added here either. If the column should come back, that entry is what fills
        it: /programs#greenbin-360-ecosystem.
      */
    ],
  },
  { label: "Impact", href: "/impact" },
  { label: "Team", href: "/team" },
  {
    label: "Get Involved",
    href: "/get-involved",
    overview: "All ways to help",
    columns: [
      {
        title: "Ways to help",
        items: [
          {
            label: "Donate a Device",
            description: "Unused laptops and electronics, put to work",
            href: "/get-involved#donate-devices",
            icon: "Laptop",
          },
          {
            label: "Fund Our Programmes",
            description: "Support device refurbishment and outreach costs",
            href: "/get-involved#fund",
            icon: "HandCoins",
          },
          {
            label: "Partner With Us",
            description: "Schools, companies, and community organizations",
            href: "/get-involved#partner",
            icon: "Handshake",
          },
          {
            label: "Volunteer",
            description: "Support programme delivery and training",
            href: "/get-involved#volunteer",
            icon: "Users",
          },
        ],
      },
    ],
  },
];

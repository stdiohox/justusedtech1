/**
 * Canonical organisation facts. Every page reads from here so a correction lands once.
 * Wordmark is JUSTUSED. Legal name is JustUsedTech.
 */

export const site = {
  wordmark: "JUSTUSED",
  legalName: "JustUsedTech",
  tagline: "Refurbished tech, redistributed where it changes the most.",
  url: "https://justusedtech.org",
  founded: "2017, Lagos, Nigeria",
  incorporated: "February 2024, as a US 501(c)(3) nonprofit",
  vision:
    "A world where technology access is equitable, electronic waste is minimized, and young people are empowered to thrive in a sustainable digital future.",
  mission:
    "To reduce e-waste, promote a circular economy, and bridge the technology gap by providing underserved students and youth with access to functional tech devices and opportunities that support learning, creativity, and career growth.",
} as const;

export const contact = {
  hqLabel: "US Headquarters",
  hqAddress: "725 Kingsland Ave, Suite 100",
  hqCity: "University City, MO 63130",
  hqCountry: "United States",
  phone: "+1 314-643-1990",
  phoneHref: "tel:+13146431990",
  fieldLabel: "Nigeria Field Operations",
  fieldAddress: "Lagos State, Nigeria",
  emails: [
    { label: "General enquiries", address: "info@justusedtech.org" },
    { label: "Partnerships", address: "collabs@justusedtech.org" },
  ],
  /** University City, MO. The old site embedded a London map by mistake. */
  mapEmbed:
    "https://www.google.com/maps?q=725+Kingsland+Ave+Suite+100,+University+City,+MO+63130&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=725+Kingsland+Ave+Suite+100,+University+City,+MO+63130",
} as const;

function mailto(address: string, subject: string) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}

/**
 * The three asks open the reader's mail client rather than a form. Every "Donate a device",
 * "Fund a programme", and "Partner with us" button on the site reads its href from here, so
 * the address and the subject line change once. Each ask has its own subject so the inbox
 * can sort them on arrival; partnerships go to the collabs address because that is who
 * answers them.
 */
export const asks = {
  donateDevice: mailto(contact.emails[0].address, "Device donation"),
  fundProgramme: mailto(contact.emails[0].address, "Funding a programme"),
  partner: mailto(contact.emails[1].address, "Partnership enquiry"),
} as const;

/**
 * The newsletter, on Substack. Kept apart from `socials` on purpose: those are places the
 * organisation posts, this is a thing a reader signs up for, and the footer and contact page
 * each give it its own line rather than burying it at the end of the platform row.
 */
export const newsletter = {
  name: "Newsletter",
  platform: "Substack",
  href: "https://justusedtech.substack.com/",
  /**
   * Substack's subscribe page accepts a prefilled address, so the prompt below can collect
   * the email on-site in the brand's own field and hand off with it already typed in.
   */
  subscribeHref: "https://justusedtech.substack.com/subscribe",
  /**
   * The site-wide prompt. It fires thirty seconds after every page load and thirty seconds
   * after every dismiss, and remembers nothing across a reload. See `NewsletterPrompt`.
   */
  prompt: {
    eyebrow: "Newsletter",
    title: "Follow the devices from St. Louis to the classroom.",
    body: "Refurbishment updates, programme news, and the students on the other end. A few times a month, never more.",
    placeholder: "you@example.com",
    cta: "Subscribe",
    dismiss: "Not now",
    footnote: "Delivered by Substack. Unsubscribe any time.",
  },
} as const;

/**
 * External forms the site sends people to. Every one is a link off the site, so each opens
 * in a new tab and says so in its label's icon; none of them is embedded here.
 *
 * URLs live here and nowhere else, so when a form is replaced the change lands once.
 */
export const forms = {
  volunteer: "https://forms.gle/uUpehQ1UneYHQsju7",
  circularTechBootcamp: "https://bit.ly/JUTCircularTechBootcamp",
} as const;

export const socials = [
  { name: "Facebook", href: "https://facebook.com/profile.php?id=61561340373391" },
  { name: "X", href: "https://x.com/JustusedTech", handle: "@JustusedTech" },
  { name: "LinkedIn", href: "https://linkedin.com/company/justused-tech" },
  { name: "Instagram", href: "https://instagram.com/justusedtech", handle: "@justusedtech" },
  { name: "TikTok", href: "https://tiktok.com/@justusedtech", handle: "@justusedtech" },
  { name: "YouTube", href: "https://youtube.com/@justusedtech", handle: "@justusedtech" },
  { name: "Linktree", href: "https://linktr.ee/justusedtech" },
] as const;

/*
  Header navigation moved to content/nav.ts when the centre links gained dropdown menus.
  It is a larger structure than a flat list of facts and earns its own module.
*/

/**
 * Footer navigation carries every page. Partners and News are not in the header's own
 * link row, so this is the route by which they stay reachable and crawlable. About and
 * Partners are also reachable from the header's About menu.
 */
export const footerNav = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Team", href: "/team" },
  { label: "Partners", href: "/partners" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

/** Announcement bar above the header. */
export const announcement = {
  badge: "New",
  text: "Now accepting device donations across the US and Nigeria",
  href: "/get-involved#donate-devices",
} as const;

/* The hero trust row moved to content/partners.ts, where it is resolved from the partner
   list rather than kept as a parallel set of names. */

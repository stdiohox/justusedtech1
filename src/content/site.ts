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

export const socials = [
  { name: "Facebook", href: "https://facebook.com/profile.php?id=61561340373391" },
  { name: "X", href: "https://x.com/JustusedTech", handle: "@JustusedTech" },
  { name: "LinkedIn", href: "https://linkedin.com/company/justused-tech" },
  { name: "Instagram", href: "https://instagram.com/justusedtech", handle: "@justusedtech" },
  { name: "TikTok", href: "https://tiktok.com/@justusedtech", handle: "@justusedtech" },
  { name: "YouTube", href: "https://youtube.com/@justusedtech", handle: "@justusedtech" },
  { name: "Linktree", href: "https://linktr.ee/justusedtech" },
] as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Team", href: "/team" },
  { label: "Partners", href: "/partners" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

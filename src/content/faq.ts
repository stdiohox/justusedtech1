import { contact, deviceRequest, forms, newsletter, site } from "@/content/site";

/**
 * The FAQ page, added in November 2026 at the client's request while the team sorts out its
 * email inboxes. The email addresses and the US phone line are off the contact page and
 * footer for now, so this page is where a visitor reads the answer or finds the right form
 * instead of writing in.
 *
 * Every answer is composed from copy the site already carries (site.ts, the get-involved and
 * request-a-device pages). Nothing here is new policy: if a question needs an answer the
 * client has not given, it is left out rather than guessed at.
 */

export type FaqLink = { label: string; href: string; external?: boolean };

export type FaqItem = {
  /** Stable id, used as the anchor so a single answer can be linked to. */
  id: string;
  question: string;
  answer: string[];
  link?: FaqLink;
};

export type FaqGroup = { title: string; items: FaqItem[] };

export const faqPage = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  lede: "Most of what people write in to ask is answered below. If you need a device, want to volunteer, or want to join a bootcamp, the forms are the quickest way to reach our team.",
  formsTitle: "Start with a form",
  formsLede:
    "Each form goes straight to the team that handles it, and every response is tracked, so nothing gets lost in an inbox.",
  questionsTitle: "Frequently asked questions",
} as const;

/** The forms, in the order people most often need them. */
export const faqForms: (FaqLink & { description: string })[] = [
  {
    label: "Request a device",
    description: "Need a laptop or computer? Fill in our device needs survey.",
    href: deviceRequest.href,
  },
  {
    label: "Apply to volunteer",
    description: "Support content, training, outreach, and operations.",
    href: forms.volunteer,
    external: true,
  },
  {
    label: "Apply for the Circular Tech Bootcamp",
    description: "Hardware repair and certification training.",
    href: forms.circularTechBootcamp,
    external: true,
  },
];

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting a device",
    items: [
      {
        id: "request-a-device",
        question: "How do I request a laptop or computer?",
        answer: [deviceRequest.lede],
        link: { label: deviceRequest.cta, href: deviceRequest.href },
      },
      {
        id: "device-guarantee",
        question: "Does filling in the form guarantee me a device?",
        answer: [deviceRequest.note],
      },
      {
        id: "device-by-email",
        question: "Can I send my device request by email instead?",
        answer: [deviceRequest.emailNote],
        link: { label: deviceRequest.cta, href: deviceRequest.href },
      },
    ],
  },
  {
    title: "Giving and getting involved",
    items: [
      {
        id: "what-devices",
        question: "What devices do you accept?",
        answer: [
          "Laptops, desktops, tablets, phones, and peripherals. Working or not, we assess everything that comes in. Corporate and institutional lots are collected through GreenBin 360.",
        ],
        link: { label: "About GreenBin 360", href: "/programs/greenbin-360" },
      },
      {
        id: "drop-off",
        question: "Where do I drop off a device?",
        answer: [
          `Device drop-offs happen at our warehouse: ${contact.hqAddress}, ${contact.hqCity}.`,
        ],
        link: { label: "Open in Google Maps", href: contact.mapLink, external: true },
      },
      {
        id: "volunteer",
        question: "How can I volunteer?",
        answer: [
          "More than 20 volunteers already support content, training, outreach, and operations. If you have hardware repair skills, teaching experience, or time for outreach, there is work for you. Apply through the volunteer form.",
        ],
        link: { label: "Apply to volunteer", href: forms.volunteer, external: true },
      },
      {
        id: "bootcamp",
        question: "How do I apply for the Circular Tech Bootcamp?",
        answer: [
          "Applications go through the bootcamp form. The programme page has the details of what the bootcamp covers and where it runs.",
        ],
        link: {
          label: "Apply for the bootcamp",
          href: forms.circularTechBootcamp,
          external: true,
        },
      },
    ],
  },
  {
    title: "About JustUsedTech",
    items: [
      {
        id: "who-we-are",
        question: "Who is JustUsedTech?",
        answer: [
          `${site.legalName} was founded in ${site.founded}, and incorporated in ${site.incorporated}.`,
          site.mission,
        ],
        link: { label: "About us", href: "/about" },
      },
      {
        id: "where",
        question: "Where do you work?",
        answer: [
          `Our ${contact.hqLabel} is at ${contact.hqAddress}, ${contact.hqCity}. Our ${contact.fieldLabel} are in ${contact.fieldAddress}.`,
        ],
        link: { label: "See our programmes", href: "/programs" },
      },
      {
        id: "news",
        question: "How do I keep up with your news?",
        answer: [
          `Subscribe to our ${newsletter.name.toLowerCase()} on ${newsletter.platform}: programme updates, device drives, and stories from the students we reach.`,
        ],
        link: { label: "Subscribe on Substack", href: newsletter.href, external: true },
      },
      {
        id: "email",
        question: "Why is there no email address on the site?",
        answer: [
          "We are updating our email inboxes. Until that is done, please use the forms above or find your answer on this page, so your message reaches the right person and can be tracked.",
        ],
      },
    ],
  },
];

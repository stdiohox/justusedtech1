import { contact, deviceRequest, forms, newsletter, site } from "@/content/site";

/**
 * The FAQ page, added in November 2026 at the client's request while the team sorts out its
 * email inboxes. The email addresses and the US phone line are off the contact page and
 * footer for now, so this page is where a visitor reads the answer or finds the right form
 * instead of writing in.
 *
 * Answers are composed from copy the site already carries (site.ts, the get-involved and
 * request-a-device pages) plus the client's FAQ changes of 18 Nov 2026, which supplied the
 * device eligibility, donation and closing copy. If a question needs an answer the client
 * has not given, it is left out rather than guessed at.
 */

export type FaqLink = { label: string; href: string; external?: boolean };

/**
 * One block of an answer: a plain paragraph, a paragraph with inline links, a small heading,
 * or a bulleted list.
 */
export type FaqBlock =
  | string
  | { parts: (string | FaqLink)[] }
  | { heading: string }
  | { list: string[] };

export type FaqItem = {
  /** Stable id, used as the anchor so a single answer can be linked to. */
  id: string;
  question: string;
  answer: FaqBlock[];
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

/**
 * Organisation device requests may be sent by email (client FAQ changes, 18 Nov 2026). The
 * Partnerships inbox is used because the client treats every organisation request as a
 * partnership. Individual requests by email get no response, so this is only offered to
 * organisations.
 */
const orgEmail = contact.emails[1].address;
const orgEmailLink: FaqLink = { label: orgEmail, href: `mailto:${orgEmail}` };
const surveyLink: FaqLink = { label: "device needs survey", href: deviceRequest.href };

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
        answer: [
          "It depends on who is asking.",
          {
            parts: [
              "Organisations: Yes. If you need laptops for your organisation, an event or a program, you can email us at ",
              orgEmailLink,
              " or fill out the device request form.",
            ],
          },
          {
            parts: [
              "Individuals: No. We do not respond to individual requests for laptops or phones sent by email. Please fill out our ",
              surveyLink,
              " and wait for the Breakthrough Series application form to open.",
            ],
          },
        ],
        link: { label: deviceRequest.cta, href: deviceRequest.href },
      },
      {
        id: "who-can-request",
        question: "Who can request a device right now?",
        answer: [
          { heading: "Organisations" },
          {
            parts: [
              "Organisations can request laptops for events, program and similar work by emailing us at ",
              orgEmailLink,
              " or filling out the device request form.",
            ],
          },
          "We see every organisation request as a partnership, not a one-off donation. Your request should connect to our core focus areas, such as reducing e-waste and giving underserved communities and young people access to technology, or to the programs we run. When you get in touch, tell us how the devices will create impact and how we could work together.",
          "Every request is reviewed and verified before it is approved. We check that it aligns with our work and that your organisation qualifies, and we may ask for more information first. Devices are limited, so not every request can be approved.",
          { heading: "Individuals" },
          // TODO: add the Breakthrough Series application link once the client sends it.
          "If you need a device for yourself, please apply when our Breakthrough Series applications open. Priority is given to:",
          {
            list: [
              "Students and young people in underserved communities",
              "Individuals learning digital or vocational skills",
              "People who demonstrate clear use and impact",
            ],
          },
          {
            parts: [
              "In the meantime, you can fill out our ",
              surveyLink,
              " so we know about your need. Individual requests sent by email will not receive a response.",
            ],
          },
        ],
      },
      {
        id: "devices-given",
        question: "What devices do you give out?",
        answer: [
          "Right now, we only give out laptops. We do not give out phones, so individual requests for phones will not be considered.",
        ],
      },
      {
        id: "fee",
        question: "Is there a fee to receive a device?",
        answer: [
          "In most cases, devices are donated or subsidised, but logistics costs or minimal commitments may apply depending on the program.",
        ],
      },
      {
        id: "multiple-devices",
        question: "Can I request multiple devices?",
        answer: [
          "Requests for multiple devices are only considered for:",
          { list: ["Schools", "Community programmes", "Verified organisations"] },
        ],
      },
      {
        id: "not-considered",
        question: "What kind of requests will NOT be considered?",
        answer: [
          {
            list: [
              "Urgent \u201cI need a laptop now\u201d requests without a clear purpose",
              "Requests without proper information",
              "Requests for resale or non-impact purposes",
              "Requests for phones (we currently give out laptops only)",
              "Individual requests for laptops or phones sent by email (please use the device needs survey or wait for our Breakthrough Series program)",
            ],
          },
        ],
      },
      {
        id: "response-time",
        question: "How long does it take to get a response?",
        answer: [
          "Due to high demand, response times may vary. Only shortlisted or qualified applicants will be contacted.",
        ],
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
        id: "who-can-donate",
        question: "Who can donate devices?",
        answer: [
          "Anyone can donate: individuals, companies, schools and organisations.",
        ],
      },
      {
        id: "wipe-data",
        question: "Do I need to wipe my data before donating?",
        answer: [
          "Yes. Please back up and wipe your data before you donate. We can also help with secure data wiping if needed.",
        ],
      },
      {
        id: "after-donating",
        question: "What happens after I donate?",
        answer: [
          {
            list: [
              "Devices are assessed and refurbished",
              "Usable devices are redistributed to beneficiaries",
              "Non-repairable parts are responsibly handled to reduce e-waste",
            ],
          },
        ],
      },
      {
        id: "drop-off",
        question: "Where do I drop off a device?",
        answer: [
          `Device drop-offs happen at our warehouse: ${contact.hqAddress}, ${contact.hqCity}.`,
          "This is currently our only drop-off location.",
        ],
        link: { label: "Open in Google Maps", href: contact.mapLink, external: true },
      },
      {
        id: "nigeria-drop-off",
        question: "Can I drop off a device in Nigeria?",
        answer: [
          "Not yet. We are not collecting devices in Nigeria at the moment. We are looking to set up collections in Nigeria next year, working with partners, and we will announce it once it is ready.",
        ],
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
        id: "why-reuse",
        question: "Why do you focus on device reuse?",
        answer: [
          "Many electronic devices are thrown away while they still work. By refurbishing and redistributing them, we:",
          {
            list: [
              "Reduce environmental pollution",
              "Extend device lifespan",
              "Provide access to those who need them most",
            ],
          },
        ],
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
    ],
  },
];

/** The two call-to-action blocks at the foot of the page, after the last question. */
export const faqClosing: { title: string; body: string; link: FaqLink }[] = [
  {
    title: "Want to support?",
    body: "Donate a device and help reduce e-waste while empowering someone\u2019s future.",
    link: { label: "Donate a device", href: "/get-involved#donate-devices" },
  },
  {
    title: "Need a device?",
    body: "Fill out our device needs survey and look out for the Breakthrough Series application form. Tell us your story and how the device will create impact.",
    link: { label: deviceRequest.cta, href: deviceRequest.href },
  },
];

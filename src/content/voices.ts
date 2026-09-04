/**
 * Community Voices.
 *
 * Only ONE verbatim quote exists, and it is already public on the live site. Everything
 * else on this section is narrative case study written in our own voice. Never attribute
 * invented words to a named person.
 */

export type Voice = {
  kind: "quote";
  body: string;
  name: string;
  role: string;
};

export type CaseStudy = {
  kind: "case-study";
  title: string;
  body: string;
  name: string;
  role: string;
  program: string;
};

export const voices: (Voice | CaseStudy)[] = [
  {
    kind: "quote",
    body:
      "We appreciate JustUsed Tech's partnership & excellent work in our organization. Many lives have been changed as a result. When we see the smiles on the faces of the children impacted, we just know we can do more.",
    name: "Damilare Akintunde",
    role: "CEO, Petty System Ltd",
  },
  {
    kind: "case-study",
    title: "One laptop, and consistent practice",
    body:
      "Faith Ojo is a University of Lagos student interested in video editing and digital storytelling. Through the Breakthrough Series she received one refurbished laptop in 2025. Access to a machine of her own is what made consistent skill development possible.",
    name: "Faith Ojo",
    role: "University of Lagos",
    program: "Breakthrough Series",
  },
];

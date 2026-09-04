/**
 * Real roster. No photos and no personal social links exist for anyone here.
 * Cards render initials avatars only. Do not add headshots or per-person social icons.
 */

export type Member = {
  name: string;
  role: string;
  org?: string;
};

export type TeamGroup = {
  id: string;
  title: string;
  blurb: string;
  members: Member[];
};

export const teamGroups: TeamGroup[] = [
  {
    id: "board",
    title: "Board",
    blurb: "Direction and accountability for the organisation.",
    members: [
      { name: "Titobi Oreolorun", role: "Founder & CEO" },
      { name: "Christopher Wise", role: "COO" },
    ],
  },
  {
    id: "us",
    title: "US Team",
    blurb: "Device recovery, refurbishment, and warehouse operations in University City, MO.",
    members: [
      { name: "Gospel Ajibade", role: "Technician" },
      { name: "Moses Kolawale Fajimokun", role: "US Operations" },
    ],
  },
  {
    id: "nigeria",
    title: "Nigeria Team",
    blurb: "Programme delivery, partnerships, and field operations across Lagos State.",
    members: [
      { name: "Hazel Iwendi", role: "Operations & Programs Lead" },
      { name: "Daniel Yashim", role: "MEL Officer" },
      { name: "Oreoluwa Adeniyi", role: "Consultant HR Manager" },
      {
        name: "Eniola Adewodu",
        role: "Strategic Partnerships & Resource Mobilisation Officer",
      },
      { name: "Esther Fashola", role: "Communications & Digital Growth Associate" },
      { name: "Gbenga Falope", role: "Digital Video Editor / Creative Director" },
      { name: "Ajulo Olajide", role: "Consultant Finance" },
      { name: "Ebenezer Dada", role: "Technician" },
      { name: "Olumide Kolawole", role: "Lagos State Coordinator" },
    ],
  },
  {
    id: "advisors",
    title: "Advisors",
    blurb: "Senior guidance on hardware, brand, and sector strategy.",
    members: [
      { name: "Adrian Weinberg", role: "VP Systems Hardware", org: "IBM" },
      {
        name: "Nenfort Gomwalk",
        role: "Strategic Advisor, people management and brand communications",
      },
      {
        name: "Barnabas Usman",
        role: "Director of Sector Networks",
        org: "African Leadership Academy",
      },
    ],
  },
];

export const volunteerNote =
  "Supported by 20+ active volunteers across content, training, outreach, and operations.";

export const teamCount = teamGroups.reduce((n, g) => n + g.members.length, 0);

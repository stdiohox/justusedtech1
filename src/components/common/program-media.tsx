import Image from "next/image";
import {
  GraduationCap,
  Palette,
  QrCode,
  Recycle,
  Rocket,
  Trophy,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgramStatus } from "@/content/programs";

/*
  The media band at the top of a programme card.

  No programme photography has been delivered, and putting a stock photo here would imply
  it shows our sessions. So the band is an icon on a branded wash: obviously a graphic
  device, obviously not a photograph. When real photos arrive this component is the single
  place to swap: same box, same height, same flush edges.

  Icon choice is presentation, not copy, so the map lives here rather than in src/content.
*/
const PROGRAM_ICONS: Record<string, LucideIcon> = {
  "school-tour-initiative": GraduationCap,
  "breakthrough-series": Rocket,
  "project-9-12": Trophy,
  "greenbin-360": Recycle,
  "greenbin-360-ecosystem": QrCode,
  "skillsync-initiative": Palette,
  "circular-tech-bootcamp": Wrench,
};

/*
  Real photographs, which take precedence over the icon wash above. This is the swap point
  the comment above promised: a programme with a file here gets its photograph, one without
  keeps the icon, and nothing else in either consumer changes.

  All four are pre-cropped to a single 1500x500 and dropped in at object-cover, so the band
  crops the same way for every card. school_tour.jpg was trimmed above the JUSTUSED
  watermark burned into the bottom of the source before that crop was taken, rather than
  left for the band's own crop window to miss.

  Alt text describes what is in the frame and stops there, the same standard as the hero
  photograph: no names, and no claim about who any person pictured is or which programme
  they benefited from.
*/
const PROGRAM_PHOTOS: Record<string, { src: string; alt: string }> = {
  "school-tour-initiative": {
    src: "/programs/school_tour.jpg",
    alt: "Two students in school uniform writing in an exercise book at a classroom desk.",
  },
  "breakthrough-series": {
    src: "/programs/breakthroughseries.jpg",
    alt: "Young people working at laptops around a table, with team members in JustUsedTech shirts standing alongside.",
  },
  "project-9-12": {
    src: "/programs/project_9-12.jpg",
    alt: "Young people crouching on a sandy pitch lacing football boots, with more boots laid out in front of them.",
  },
  "greenbin-360": {
    src: "/programs/green_bin.jpg",
    alt: "Team members loading equipment into the back of a van at an outdoor collection event.",
  },
  /*
    Scene only, and deliberately not described as SkillSync work: the photograph is a device
    handover, and nothing in the frame depicts the creative-economy support this programme
    actually runs. Naming the programme in the alt text would assert something the picture
    does not show.

    Worth a look before this one stays: the banner and three of the shirts in frame read
    "Product Tent", an organisation removed from the partner list a few commits ago for
    having no logo. The card credits a different partner in its body copy.
  */
  "skillsync-initiative": {
    src: "/programs/skillsync_initiative.jpg",
    alt: "Five people standing together for a photograph at a device handover event, with a desktop computer in front of them.",
  },
};

/* Three washes, cycled by index, so a grid of cards does not repeat the same fill. */
const WASHES = [
  "linear-gradient(135deg, #dceee2 0%, #eef7f0 55%, #fff2cc 100%)",
  "linear-gradient(135deg, #d6eefb 0%, #eef7f0 60%, #dceee2 100%)",
  "linear-gradient(135deg, #fff0c2 0%, #f6f4ea 55%, #d6eefb 100%)",
];

export function ProgramMedia({
  slug,
  status,
  tone = 0,
  onDark = false,
  className,
}: {
  slug: string;
  status: ProgramStatus;
  tone?: number;
  /** For the featured cell, which is already a deep green fill. */
  onDark?: boolean;
  className?: string;
}) {
  const photo = PROGRAM_PHOTOS[slug];
  const Icon = PROGRAM_ICONS[slug] ?? Recycle;
  const upcoming = status === "upcoming";

  /*
    A photograph is content, so unlike the icon band it is not aria-hidden and it carries
    real alt text. The band keeps its exact height either way, so swapping one programme to
    a photo cannot shift the card next to it.
  */
  if (photo) {
    return (
      <div className={cn("relative h-24 overflow-hidden sm:h-28", className)}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          /* Widest case is the home page's featured cell, roughly two thirds of the shell. */
          sizes="(min-width: 1280px) 800px, (min-width: 768px) 66vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  /*
    Upcoming programmes get the recessed neutral rather than a branded wash, and a hairline
    along the bottom where the wash would otherwise mark the edge. One more quiet signal
    that the programme is not running, layered under the Upcoming badge.
  */
  const background = onDark
    ? "rgba(255, 255, 255, 0.08)"
    : upcoming
      ? "var(--surface-subtle)"
      : WASHES[tone % WASHES.length];

  return (
    <div
      aria-hidden
      className={cn(
        "flex h-24 items-end px-7 pb-5 sm:h-28",
        upcoming && !onDark && "border-b border-edge",
        className,
      )}
      style={{ background }}
    >
      <Icon
        className={cn(
          "size-9 sm:size-10",
          onDark
            ? "text-white/45"
            : upcoming
              ? "text-ink-faint/45"
              : "text-brand-green-dark/40",
        )}
        strokeWidth={1.25}
      />
    </div>
  );
}

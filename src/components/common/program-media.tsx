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

  Five programmes now have real photographs and take them. The rest keep the icon on a
  branded wash, which was the original treatment for the whole set while no photography had
  been delivered: obviously a graphic device, obviously not a photograph, so nothing here
  ever implies a stock image shows our sessions.

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

  Every file is the complete frame at its own aspect, dropped in at object-contain, so no
  card ever crops a photograph to fit. school_tour was trimmed above the JUSTUSED watermark
  burned into the bottom of its source before anything else was done to it, rather than left
  for a crop window to miss.

  Alt text describes what is in the frame and stops there, the same standard as the hero
  photograph: no names, and no claim about who any person pictured is or which programme
  they benefited from.
*/
const PROGRAM_PHOTOS: Record<
  string,
  /*
    `wideSrc` is a second crop of the same original for the featured cell, not a replacement.
    Both are re-derived from the untouched source and both are trimmed above the watermark
    first; they differ only in the region framed, so one alt text describes both. Every other
    surface, /programs included, keeps `src`.
  */
  /*
    `position` is an object-position class, set only where cover's default centre crop cuts
    through something that matters. Cover is the rule; this is how a specific photograph is
    steered inside it, rather than the band going back to letterboxing for one picture.

    `widePosition` pairs with `wideSrc`. The two variants are different framings of the same
    original, so they do not crop alike and cannot share one value.
  */
  {
    src: string;
    alt: string;
    position?: string;
    wideSrc?: string;
    widePosition?: string;
  }
> = {
  "school-tour-initiative": {
    src: "/programs/school_tour.jpg",
    /*
      The portrait in the /programs band shows about a fifth of its height, and centred that
      fifth lands on arms and the desk with both faces above the cut. The faces sit at 12% to
      28% of the file, so the window is pulled up to hold them.
    */
    position: "object-[center_12%]",
    /* Landscape window on the same frame, holding both students and the exercise book. */
    wideSrc: "/programs/school_tour_wide.jpg",
    alt: "Two students in school uniform writing in an exercise book at a classroom desk.",
  },
  "breakthrough-series": {
    src: "/programs/breakthroughseries.jpg",
    /*
      The /programs band shows about 39% of this file's height, and the standing adults' heads
      sit further from the seated young people's faces than that window is tall, so no value
      holds both. Every candidate was rendered before this one was picked: at 50% and 38% the
      standing figures are cut at the neck, at 25% the nearer one is cut through the brow. 15%
      is the only window that slices no face at all, keeping both adults whole with the seated
      subjects along the lower edge.

      It is a compromise, and the reason it has to be made is the band's 3.83 ratio on that
      page, not this photograph.
    */
    position: "object-[center_15%]",
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

/**
 * One height for every media band, photo or icon, so the cards line up in a grid whatever
 * each programme happens to have.
 *
 * 20rem is chosen for the portrait: school_tour.jpg is 0.82, and contained at anything
 * shorter it shrinks to a stamp. Landscape marks are 1.50 and sit comfortably inside it.
 */
const MEDIA_HEIGHT = "h-80";

/**
 * The one band that does not share MEDIA_HEIGHT: the home bento's featured cell.
 *
 * That cell is roughly 777px wide against every other cell's 380, so a contained photograph
 * there is limited by height while the same photograph elsewhere is limited by width. At the
 * shared 320px the portrait rendered 262px wide and left 257px of mat on each side, a third
 * of the cell per side. Height is the only lever that widens a height-limited image, so this
 * cell gets its own.
 *
 * 25rem is 400px. Paired with the 1.60 wide variant below it renders 640px across, leaving
 * about 68px of mat each side, which is roughly 9%: framing rather than a field.
 */
const FEATURED_MEDIA_HEIGHT = "h-[25rem]";

/**
 * Width cap for the icon wash on /programs, where the panel runs the full shell width and an
 * icon alone in a 1226px field reads as stranded.
 *
 * Photographs no longer use it. They fill the band edge to edge under object-cover, so there
 * is no mat to cap and a cap would only hold them off the card's edges.
 */
const MEDIA_CAP = "max-w-[46rem]";

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
  capped = false,
  wide = false,
  className,
}: {
  slug: string;
  status: ProgramStatus;
  tone?: number;
  /** For the featured cell, which is already a deep green fill. */
  onDark?: boolean;
  /**
   * Caps the mat, for a band running the full width of the shell.
   *
   * Only /programs needs it. Those panels are about 1200px wide and the band is 320px tall,
   * so a contained photograph is limited by HEIGHT, not width: a 1.50 landscape renders
   * 480px across whatever the panel does, leaving some 720px of mat around it. Capping the
   * image itself would therefore change nothing, since the image never reaches the cap.
   * What gets capped is the mat, which turns one wide field into two flanking margins with
   * the card's own surface outside them.
   *
   * The home bento leaves this off. Its cells are narrow enough that the mat already reads
   * as framing, and MEDIA_HEIGHT stays shared across both pages either way.
   */
  capped?: boolean;
  /**
   * The home bento's featured cell: takes FEATURED_MEDIA_HEIGHT, and the landscape crop of
   * the photograph where the programme has one. Both are that cell's problem alone, which is
   * why they travel together on one flag rather than two.
   */
  wide?: boolean;
  className?: string;
}) {
  const photo = PROGRAM_PHOTOS[slug];
  const Icon = PROGRAM_ICONS[slug] ?? Recycle;
  const upcoming = status === "upcoming";
  const height = wide ? FEATURED_MEDIA_HEIGHT : MEDIA_HEIGHT;

  /*
    Width hint per surface, so a 380px cell does not pull the same file a 1226px panel needs.
    `capped` still marks the /programs panel here even though photographs no longer cap: that
    prop is the only signal this component gets for which surface it is on.
  */
  const photoSizes = capped
    ? "(min-width: 1280px) 1200px, 100vw"
    : wide
      ? "(min-width: 1280px) 800px, (min-width: 768px) 66vw, 100vw"
      : "(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw";

  /*
    A photograph is content, so unlike the icon band it is not aria-hidden and it carries
    real alt text. The band keeps its exact height either way, so swapping one programme to
    a photo cannot shift the card next to it.
  */
  if (photo) {
    /* Written as two ternaries rather than one flag so the wideSrc check narrows the type. */
    const src = wide && photo.wideSrc ? photo.wideSrc : photo.src;
    const position = wide && photo.wideSrc ? photo.widePosition : photo.position;

    return (
      /*
        One layer, filling the band edge to edge. object-cover crops whatever does not fit,
        which is the intent: no mat, no letterbox, nothing to fill.

        No width cap here even on /programs. That cap existed to shrink the mat object-contain
        left behind, and under cover it would do the opposite of what it was for, holding the
        photograph off the card's edges with card surface either side. The icon band below
        keeps it, being unchanged.

        The background colour survives as a load state only. It is covered the moment the
        photograph paints, and is there so the band is never briefly empty.
      */
      <div
        className={cn(
          height,
          "relative overflow-hidden",
          onDark ? "bg-white/[0.08]" : "bg-mint",
          className,
        )}
      >
        <Image
          src={src}
          alt={photo.alt}
          fill
          sizes={photoSizes}
          className={cn("object-cover", position)}
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
        /*
          Same height as a photo band, so a programme without a photograph still lines up
          in the grid. The icon centres rather than sitting on the baseline: at this height
          a bottom-left icon reads as a small mark stranded under a large empty wash.
        */
        height,
        "overflow-hidden",
        /*
          The hairline stays on the full-width element even when the wash inside it is
          capped. It is there to divide the band from the body, and a divider that stops
          short of the card's edges reads as an underline drawn under nothing.
        */
        upcoming && !onDark && "border-b border-edge",
        className,
      )}
    >
      {/* Capped on the same terms as a photo mat, so a wash and a photograph flank alike. */}
      <div
        className={cn(
          "mx-auto flex h-full w-full items-center justify-center px-7",
          capped && MEDIA_CAP,
        )}
        style={{ background }}
      >
        <Icon
          className={cn(
            "size-14 sm:size-16",
            onDark
              ? "text-white/45"
              : upcoming
                ? "text-ink-faint/45"
                : "text-brand-green-dark/40",
          )}
          strokeWidth={1.25}
        />
      </div>
    </div>
  );
}

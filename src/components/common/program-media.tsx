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
  { src: string; alt: string; wideSrc?: string }
> = {
  "school-tour-initiative": {
    src: "/programs/school_tour.jpg",
    /* Landscape window on the same frame, holding both students and the exercise book. */
    wideSrc: "/programs/school_tour_wide.jpg",
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
 * Width cap for the mat, applied only where `capped` is set. See that prop for why it caps
 * the mat and not the image.
 *
 * 46rem is 736px, against a contained landscape that renders 480px wide and a portrait that
 * renders 262px. That leaves the landscape 128px of mat each side and the portrait 237px:
 * enough that both still read as framed rather than cropped tight, and far short of the
 * ~720px and ~938px the uncapped panel was giving them.
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
    A photograph is content, so unlike the icon band it is not aria-hidden and it carries
    real alt text. The band keeps its exact height either way, so swapping one programme to
    a photo cannot shift the card next to it.
  */
  if (photo) {
    return (
      <div className={cn(height, "overflow-hidden", className)}>
        <div
          className={cn(
            /*
              overflow-hidden is load-bearing now, not tidiness. The backdrop below is scaled
              past 100%, and on /programs this element is also the width cap, so without a
              clip here the blur would bleed past the capped mat and past the card's rounded
              corner.
            */
            "relative mx-auto h-full w-full overflow-hidden",
            /*
              The fill behind the photograph, which shows only where the letterbox does. It
              stays under the backdrop as the colour during load and decode, so the band is
              never briefly empty. --mint is the light tint of --brand-green used for soft
              surfaces across the site; the dark featured cell lifts its own fill instead,
              since a mint block there would be a hole in the card.
            */
            onDark ? "bg-white/[0.08]" : "bg-mint",
            capped && MEDIA_CAP,
          )}
        >
          {/*
            Backdrop. The same photograph, cropped to fill and blurred, so the letterbox
            carries that picture's own colour instead of one flat tint repeated down the
            grid. Same `src` and the same `sizes` as the foreground on purpose: it resolves
            to the identical optimised URL, so this costs one more decode and no more bytes.

            scale-110 because a blur samples past its own edges and would otherwise fade to
            transparent at the border, leaving a pale halo inside the frame. brightness-90
            keeps it behind the sharp copy rather than competing with it.

            Decorative by construction: it is the same image as the foreground, which already
            carries the alt text, so announcing it twice would be noise.
          */}
          <Image
            src={wide && photo.wideSrc ? photo.wideSrc : photo.src}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1280px) 800px, (min-width: 768px) 66vw, 100vw"
            className="scale-110 object-cover blur-xl brightness-90"
          />

          {/* Foreground, unchanged: the complete photograph, uncropped, over the backdrop. */}
          <Image
            src={wide && photo.wideSrc ? photo.wideSrc : photo.src}
            alt={photo.alt}
            fill
            /* Widest case is the home page's featured cell, roughly two thirds of the shell. */
            sizes="(min-width: 1280px) 800px, (min-width: 768px) 66vw, 100vw"
            className="object-contain"
          />
        </div>
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

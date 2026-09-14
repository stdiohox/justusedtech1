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
import { PhotoPending } from "@/components/ui/photo-pending";
import { cn } from "@/lib/utils";
import type { ProgramStatus } from "@/content/programs";

/*
  The media band at the top of a programme card.

  Six programmes now have real photographs and take them. The rest keep the icon on a
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

  Every file is the complete frame at its own aspect, and each band fills itself with
  object-cover, so what a card shows is a crop of the whole picture rather than a picture
  fitted into a box. school_tour and circular_tech_bootcamp were trimmed above the JUSTUSED
  watermark burned into the bottom of their sources before anything else was done to them,
  rather than left for a crop window to miss.

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
      The portrait shows 29% of its height in the /programs band, and centred that window
      lands on arms and the desk with both faces above the cut. The faces sit at 12% to 28%
      of the file, so it is pulled up to hold them. Re-checked against the taller band and
      kept: 8% centres the faces more exactly but trades the framing for empty classroom
      above them.
    */
    position: "object-[center_12%]",
    /* Landscape window on the same frame, holding both students and the exercise book. */
    wideSrc: "/programs/school_tour_wide.jpg",
    alt: "Two students in school uniform writing in an exercise book at a classroom desk.",
  },
  "breakthrough-series": {
    src: "/programs/breakthroughseries.jpg",
    /*
      Still needed at the taller band: centred, the /programs window starts below the standing
      figures and takes their heads off. What changed is that it stopped being a compromise.

      At the old 320px band only 39% of this file was visible, and 15% was the single value
      that sliced no face, managing it by pushing the seated young people to the very edge. At
      440px the window shows 56%, which is enough to hold the standing figures and all three
      seated faces at once, so the value moved to 10%: it keeps headroom above the adults and
      brings the seated faces fully inside the frame instead of clipping them at the bottom.
      Retuned against the band's measured 1174px width, not an assumed one.
    */
    position: "object-[center_10%]",
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
  "circular-tech-bootcamp": {
    src: "/programs/circular_tech_bootcamp.jpg",
    /*
      /programs is the only surface this one renders on: the home bento takes the first five
      active programmes and this is the sixth, so the panel band is the crop worth tuning and
      the card and featured bands are theory. Worth knowing if the catalogue order changes.

      The panel shows 51% of the file's height, and the frame spans more than that: the
      standing figure's head sits at 2%, the seated faces at 42% to 58%, the board he is
      holding at 56% to 73%, and the laptops on the table at 81%. No window that height holds
      the head and the work at once, so it holds the work. 65% starts the window at 32%, which
      keeps headroom above both seated faces and the whole board inside the frame; centred it
      cut the board off at the bottom edge, and anything higher started slicing the faces to
      buy back a head that a 2.79 band was never going to fit.
    */
    position: "object-[center_65%]",
    alt: "Three people examining an opened laptop, one holding the chassis up by its exposed board while the others study it, with a slide about motherboards on the screen behind them.",
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
 * The /programs band, which is its own height for the same reason the featured cell is: that
 * panel runs the full shell width, about 1226px, so its ratio is set by the page rather than
 * by the card.
 *
 * 27.5rem is 440px, taking the band from 3.83 to 2.79. What that buys is crop room: at 320px
 * a cover crop showed 39% of a landscape file's height, which was not enough to hold the
 * standing figures and the seated young people in the Breakthrough photograph at once, and
 * forced a position that kept faces whole only by pushing subjects to the edge. At 440px the
 * same crop shows 54% and holds every face in that frame. 400px was tried first and still
 * cut one group or the other.
 */
const PANEL_MEDIA_HEIGHT = "h-[27.5rem]";

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
  panel = false,
  wide = false,
  className,
}: {
  slug: string;
  status: ProgramStatus;
  tone?: number;
  /** For the featured cell, which is already a deep green fill. */
  onDark?: boolean;
  /**
   * Rendered as a /programs panel: full shell width, its own band height, and the width cap
   * on an icon wash.
   *
   * Renamed from `capped`, which described only one of those three and had stopped being
   * true of photographs at all once they went to object-cover. This is the component's only
   * signal for which surface it is on, so it is worth a name that says so.
   */
  panel?: boolean;
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
  const height = panel
    ? PANEL_MEDIA_HEIGHT
    : wide
      ? FEATURED_MEDIA_HEIGHT
      : MEDIA_HEIGHT;

  /*
    Width hint per surface, so a 380px cell does not pull the same file a 1226px panel needs.
  */
  const photoSizes = panel
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
          quality={90}
          className={cn("object-cover", position)}
        />
      </div>
    );
  }

  /*
    An upcoming programme has no photograph for a reason the reader can be told: it is a
    concept at pitch stage, so the session it would show has not happened. PhotoPending says
    that in the band, where the icon wash previously said nothing at all.

    Scoped to upcoming deliberately. An active programme without a photograph has simply not
    been shot yet, which is a different fact and not one this copy would state truthfully, so
    that case keeps the icon wash below. onDark is excluded because it belongs to the home
    bento's featured cell, which draws from activePrograms and can never be upcoming; the
    guard is here so the combination cannot render an untested light panel on a green fill.

    Same height and same hairline as every other band, so a programme moving onto this
    treatment cannot shift the card beside it.
  */
  if (upcoming && !onDark) {
    return (
      <div className={cn(height, "overflow-hidden border-b border-edge", className)}>
        <PhotoPending />
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
          panel && MEDIA_CAP,
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

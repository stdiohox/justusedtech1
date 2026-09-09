import Image from "next/image";
import type { Partner } from "@/content/partners";
import { cn } from "@/lib/utils";

/**
 * One partner in a logo strip.
 *
 * Every partner has a supplied mark, so there is one branch and no fallback. The typeset
 * wordmark this component used to render for logo-less partners is gone, along with the
 * hover treatment built around it.
 *
 * On full colour. The strip used to rest greyscaled and resolve to colour on hover, because
 * a handful of real marks sitting beside typeset names would have read as the only real
 * partners on the page. With eighteen marks and no names, that problem does not exist: the
 * row is already uniform, so there is nothing to equalise and nothing to reveal. Greyscale
 * now only costs each partner its own brand colour for no gain, so it is off, and the hover
 * transition that carried it went with it.
 *
 * On the slot. Marks are normalised by HEIGHT so a square badge and a long wordmark share a
 * baseline. max-width is a backstop for the widest lockups, which at a common height would
 * otherwise run nearly twice the length of anything else in the row.
 *
 * Sizing is inline rather than a passed-in class because the same number has to reach two
 * places at once, the image height and the wrapper that holds the row's baseline, and a
 * className prop can only carry it to one of them.
 */

const SIZES = {
  /** Home marquee. Tighter, because the strip scrolls past. */
  sm: { slot: 2.25, maxWidth: 7 },
  /** The /partners page, where the marks are the content rather than a passing credit. */
  md: { slot: 2.75, maxWidth: 8.5 },
} as const;

export function PartnerMark({
  partner,
  size = "md",
  className,
}: {
  partner: Partner;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const { slot, maxWidth } = SIZES[size];
  const scale = partner.logo.scale ?? 1;

  return (
    /*
      The wrapper is fixed at the slot height and the image is allowed to overflow it.
      That is what keeps a scaled mark from dragging the row taller: the box every item
      contributes to the row stays the same, so the baseline holds and only the artwork
      grows past it, centred.
    */
    <span
      style={{ height: `${slot}rem` }}
      className="flex shrink-0 items-center justify-center"
    >
      <Image
        src={partner.logo.src}
        alt={partner.name}
        width={partner.logo.width}
        height={partner.logo.height}
        /* Both dimensions are set, so next/image does not warn about a modified aspect. */
        style={{
          height: `${slot * scale}rem`,
          width: "auto",
          maxWidth: `${maxWidth * scale}rem`,
        }}
        className={cn("object-contain", className)}
      />
    </span>
  );
}

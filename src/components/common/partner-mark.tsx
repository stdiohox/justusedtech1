import Image from "next/image";
import type { Partner } from "@/content/partners";
import { cn } from "@/lib/utils";

/**
 * One partner in a logo strip: the supplied mark where there is one, the typeset name
 * where there is not.
 *
 * The two branches are deliberately interchangeable inside a single row. A partner without
 * a logo is not a lesser partner, and pulling the seven with files into their own block
 * would say exactly that, so they interleave in whatever order the content file lists.
 *
 * On the grey. The strip's whole idea is quiet-until-hovered. A full-colour mark beside a
 * muted wordmark breaks it: G-TECH's teal and Sporty Lagos's badge would read as the only
 * real partners on the page. grayscale flattens them to the weight of a word, and hover
 * releases both together.
 *
 * Marks rest at 80% where text rests at 65%, which is not an inconsistency. Desaturating a
 * mid-tone logo already lightens it a great deal, so matching the text's number made the
 * seven real logos read FAINTER than the wordmarks beside them, which is the same failure
 * as the one above with the sign flipped. The pair is tuned to equal optical weight, not to
 * equal numbers.
 *
 * On the slot. Marks are normalised by HEIGHT so a square badge and a long wordmark share a
 * baseline, and the row reserves that height for text entries too so the two branches line
 * up. max-width is a backstop for the widest lockups, which at a common height would
 * otherwise run nearly twice the length of anything else in the row.
 *
 * Sizing is inline rather than a passed-in class because the same number has to reach three
 * places at once, the image height, the image width:auto and the row's min-height, and a
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
  const motion =
    "transition-[filter,opacity,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]";

  if (partner.logo) {
    return (
      <Image
        src={partner.logo.src}
        alt={partner.name}
        width={partner.logo.width}
        height={partner.logo.height}
        /* Both dimensions are set, so next/image does not warn about a modified aspect. */
        style={{ height: `${slot}rem`, width: "auto", maxWidth: `${maxWidth}rem` }}
        className={cn(
          "object-contain opacity-80 grayscale",
          "group-hover/partner:opacity-100 group-hover/partner:grayscale-0",
          motion,
          className,
        )}
      />
    );
  }

  return (
    <span
      style={{ minHeight: `${slot}rem` }}
      className={cn(
        "flex items-center text-[1.0625rem] leading-snug font-extrabold tracking-[-0.02em] text-ink/65 text-balance",
        "group-hover/partner:text-brand-green-dark sm:text-lg",
        motion,
        className,
      )}
    >
      {partner.name}
    </span>
  );
}

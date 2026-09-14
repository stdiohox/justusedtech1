import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The brand CTA: a pill with a nested circular icon flush against the inner padding.
 *
 * Contrast note. The bright brand green (#00A652) carries white text at only 3.2:1, which
 * fails WCAG AA for label-sized text. So the filled CTA uses --brand-green-dark (#007A37),
 * which reaches 5.5:1 against white, and the bright green is kept for the nested circle,
 * large display numerals, and accent surfaces where 3:1 large-text is the applicable bar.
 */

type Variant = "primary" | "gold" | "outline" | "onDark" | "ghostOnDark";

const shell: Record<Variant, string> = {
  primary:
    "bg-brand-green-dark text-white shadow-[0_10px_30px_-12px_rgba(0,122,55,0.6)] hover:bg-[#00682f]",
  gold: "bg-brand-gold text-ink shadow-[0_10px_30px_-14px_rgba(180,140,20,0.55)] hover:brightness-[0.97]",
  outline:
    "bg-white text-ink border border-[color:var(--hairline)] shadow-[var(--shadow-soft)] hover:border-[color:rgba(0,122,55,0.35)]",
  onDark: "bg-white text-brand-green-dark hover:bg-white/90",
  /* The secondary on a green ground: outlined, no fill, so it cannot rival `onDark`. */
  ghostOnDark:
    "bg-transparent text-white border border-[rgba(255,255,255,0.7)] hover:bg-white/10",
};

const dot: Record<Variant, string> = {
  primary: "bg-brand-green text-white",
  gold: "bg-ink text-brand-gold",
  outline: "bg-mint text-brand-green-dark",
  onDark: "bg-brand-green-dark text-white",
  /* Tinted rather than filled: a solid disc here would read as a second filled button. */
  ghostOnDark: "bg-white/15 text-white",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  /** Render without the nested circle, for tertiary placements. */
  bare?: boolean;
  /**
   * The crossing-icon hover: the disc travels the width of the pill and rotates, and the
   * label slides the other way. Overrides `bare`, which has no disc to travel.
   */
  travel?: boolean;
};

/*
  `travel` is the crossing-icon behaviour, adapted from the shadcn button-with-icon
  reference: the disc starts at the right, and on hover it slides the full width of the pill
  to the left and rotates 45 degrees while the padding swaps, so the label slides right to
  meet it. The reference's geometry is kept, a 48px pill with a 40px disc inset by 4px, and
  the 44px offset below is that inset plus the disc.

  It did not need its own component. The reference is a bespoke button wrapping shadcn's
  Button, and this project already has a pill with a nested disc in exactly that position;
  copying it in would have meant a second button system, its own palette, and its own radius
  next to the one the whole site uses. It is a flag on the existing pill instead.

  Reduced motion gets the end state instantly rather than no state change. That is the call
  this codebase already made for the programme card's hover lift: what the setting asks us to
  remove is the travel between two states, not the fact that hovering changes something.

  On the easing, which is the one place this deliberately leaves the house curve.

  Everything else on the site moves on cubic-bezier(0.32, 0.72, 0, 1), a hard ease-out that
  is right for the distances it was chosen for: a 2px card lift, a half-pixel icon nudge, a
  panel sliding its own height. Over those, front-loading the motion reads as responsive.

  This disc crosses about 150px. Measured on that curve it was 82% of the way there at 150ms
  of a 500ms transition, then spent the remaining 350ms covering the last 18%. That is a snap
  followed by a drift, and it is what made this feel less smooth than the reference rather
  than more. TRAVEL_EASE is the symmetric ease-in-out the reference uses, which accelerates
  and decelerates evenly and holds a constant-looking speed across the middle of the move.

  Applied to the travel only. Buttons that are not travelling keep the house curve, so this
  is an exception earned by one long distance, not a new default.
*/
const TRAVEL_EASE = "ease-[cubic-bezier(0.4,0,0.2,1)]";
function classes(
  variant: Variant,
  bare: boolean,
  travel: boolean,
  className?: string,
) {
  return cn(
    "group/pill inline-flex items-center rounded-full font-bold tracking-[-0.01em]",
    "text-[0.9375rem] leading-none transition-all duration-500",
    travel ? TRAVEL_EASE : "ease-[cubic-bezier(0.32,0.72,0,1)]",
    "active:scale-[0.98] motion-reduce:transition-none",
    travel
      ? [
          "relative h-12 overflow-hidden ps-6 pe-14",
          /*
            Hover-capable pointers only. On touch there is no hover, so the padding would
            never swap and the disc would never move; gating it keeps the resting shape
            honest rather than leaving a state that cannot be reached.
          */
          "[@media(hover:hover)]:hover:ps-14 [@media(hover:hover)]:hover:pe-6",
        ]
      : ["gap-3", bare ? "px-6 py-3.5" : "py-1.5 pr-1.5 pl-6"],
    shell[variant],
    className,
  );
}

function Inner({
  children,
  variant,
  icon,
  bare,
  travel,
}: Required<Pick<BaseProps, "children" | "variant" | "bare" | "travel">> &
  Pick<BaseProps, "icon">) {
  const mark = icon ?? <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />;

  if (travel) {
    return (
      <>
        <span className={cn("relative z-10 transition-all duration-500 motion-reduce:transition-none", TRAVEL_EASE)}>
          {children}
        </span>
        <span
          className={cn(
            "absolute top-1 right-1 flex size-10 items-center justify-center rounded-full",
            /* Only the two properties that move, so nothing else is dragged onto the curve. */
            "transition-[right,transform] duration-500 motion-reduce:transition-none",
            TRAVEL_EASE,
            /* 2.75rem is the 0.25rem inset plus the 2.5rem disc. */
            "[@media(hover:hover)]:group-hover/pill:right-[calc(100%-2.75rem)]",
            "[@media(hover:hover)]:group-hover/pill:rotate-45",
            dot[variant],
          )}
        >
          {mark}
        </span>
      </>
    );
  }

  return (
    <>
      <span className={bare ? "" : "py-2"}>{children}</span>
      {!bare && (
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-full transition-transform",
            "duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-px group-hover/pill:scale-105",
            dot[variant],
          )}
        >
          {mark}
        </span>
      )}
    </>
  );
}

export function PillLink({
  children,
  variant = "primary",
  icon,
  className,
  bare = false,
  travel = false,
  ...props
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link className={classes(variant, bare, travel, className)} {...props}>
      <Inner variant={variant} icon={icon} bare={bare} travel={travel}>
        {children}
      </Inner>
    </Link>
  );
}

export function PillButton({
  children,
  variant = "primary",
  icon,
  className,
  bare = false,
  travel = false,
  ...props
}: BaseProps & ComponentProps<"button">) {
  return (
    <button className={classes(variant, bare, travel, className)} {...props}>
      <Inner variant={variant} icon={icon} bare={bare} travel={travel}>
        {children}
      </Inner>
    </button>
  );
}

export function PillAnchor({
  children,
  variant = "primary",
  icon,
  className,
  bare = false,
  travel = false,
  ...props
}: BaseProps & ComponentProps<"a">) {
  return (
    <a className={classes(variant, bare, travel, className)} {...props}>
      <Inner variant={variant} icon={icon} bare={bare} travel={travel}>
        {children}
      </Inner>
    </a>
  );
}

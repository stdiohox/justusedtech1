import type { ReactNode } from "react";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Section scaffolding
 * ------------------------------------------------------------------ */

export function Section({
  children,
  className,
  id,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "deep" | "mint" | "green" | "white";
}) {
  const tones = {
    paper: "bg-paper text-ink",
    deep: "bg-paper-deep text-ink",
    mint: "bg-mint text-ink",
    white: "bg-white text-ink",
    green: "bg-green-surface text-white",
  } as const;

  return (
    <section id={id} className={cn("py-20 md:py-28", tones[tone], className)}>
      <div className="shell">{children}</div>
    </section>
  );
}

/**
 * Section header. Deliberately a vertical stack: headline, then supporting line directly
 * beneath it. No small floating paragraph in the top-right corner.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  onGreen = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  onGreen?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex rounded-full px-3.5 py-1.5 text-[0.6875rem] font-extrabold tracking-[0.18em] uppercase",
            onGreen ? "bg-white/15 text-white" : "bg-mint text-brand-green-dark",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-4xl md:text-[2.75rem]",
          onGreen ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-5 max-w-[62ch] text-[1.0625rem] leading-relaxed text-pretty",
            align === "center" && "mx-auto",
            onGreen ? "text-white/85" : "text-ink-soft",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Cards
 * ------------------------------------------------------------------ */

/** Outer shell plus inner core, with concentric radii. Used for every major card. */
export function Bezel({
  children,
  className,
  coreClassName,
}: {
  children: ReactNode;
  className?: string;
  coreClassName?: string;
}) {
  return (
    <div className={cn("bezel", className)}>
      <div className={cn("bezel-core h-full bg-white p-6 sm:p-8", coreClassName)}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Status badge. Drives the ACTIVE / UPCOMING distinction site-wide.
 * ------------------------------------------------------------------ */

/**
 * Active reads as a filled pill, Upcoming as a hairline outline with no fill: quieter on
 * purpose, so "not yet running" is legible at a glance without shouting in a second colour.
 *
 * The fill is --brand-green-dark, not the bright --brand-green. White on #00A652 is 3.2:1
 * and this label is 11px, which puts it under the AA bar for small text. #007A37 clears it
 * at 5.5:1 and is indistinguishable at badge size.
 */
export function StatusBadge({
  status,
  className,
}: {
  status: "active" | "upcoming";
  className?: string;
}) {
  const active = status === "active";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-badge px-2 py-1 text-[0.6875rem] font-extrabold tracking-[0.12em] uppercase",
        active
          ? "bg-brand-green-dark text-white"
          : "border border-edge bg-transparent text-ink-faint",
        className,
      )}
    >
      {active ? "Active" : "Upcoming"}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Tag pill. The general-purpose category/filter tag.
 * ------------------------------------------------------------------ */

/**
 * Outline is the default and is safe to use anywhere a category, region, or focus area
 * appears. The filled variant is deliberately scarce: it belongs to the Active status badge
 * and nothing else, because a green fill that shows up on every tag stops meaning "live".
 *
 * `size="lg"` exists for the one place tags are the section's content rather than metadata
 * attached to something else (the About page's focus areas), where 13px would read as a
 * footnote instead of a list.
 */
export function TagPill({
  children,
  size = "sm",
  onGreen = false,
  className,
}: {
  children: ReactNode;
  size?: "sm" | "lg";
  onGreen?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-badge border font-bold tracking-[-0.01em]",
        size === "sm"
          ? "px-2 py-1 text-[0.8125rem]"
          : "px-3.5 py-2 text-[0.9375rem]",
        onGreen
          ? "border-white/30 text-white"
          : "border-edge text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Stat block. Number and label sit tight together, no card around them.
 * ------------------------------------------------------------------ */

/**
 * The figure carries the weight; the label is a caption under it, not a competing line.
 * A hairline rule above each block does the separating work a card border used to do,
 * which keeps a row of numbers reading as one set rather than as five boxed objects.
 */
export function StatBlock({
  value,
  label,
  detail,
  onGreen = false,
  className,
}: {
  value: string;
  label: string;
  detail?: string;
  onGreen?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("border-t pt-6", onGreen ? "border-white/25" : "border-edge", className)}>
      <p
        className={cn(
          "text-[2.75rem] leading-[0.95] font-bold tracking-[-0.04em] sm:text-[3.5rem]",
          onGreen ? "text-white" : "text-brand-green-dark",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-2 max-w-[28ch] text-[0.875rem] leading-snug font-normal",
          onGreen ? "text-white/80" : "text-ink-faint",
        )}
      >
        {label}
      </p>
      {detail && (
        <p
          className={cn(
            "mt-3 max-w-[34ch] text-[0.8125rem] leading-relaxed font-normal",
            onGreen ? "text-white/70" : "text-ink-faint",
          )}
        >
          {detail}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Initials avatar. No headshots exist for anyone on the roster.
 * ------------------------------------------------------------------ */

/* Foreground per tone is picked for contrast: white on #00A652 is only 3.2:1, ink is 5.2:1. */
const AVATAR_TONES = [
  { bg: "var(--brand-green)", fg: "var(--ink)" },
  { bg: "var(--brand-blue)", fg: "#06283a" },
  { bg: "var(--brand-gold)", fg: "#3d2f05" },
  { bg: "var(--brand-green-dark)", fg: "#ffffff" },
];

/*
  A second palette, for avatars that sit in a tight overlapping stack rather than one per card.

  Why not AVATAR_TONES: those are meant to be seen one at a time beside a name, and four of
  them butted together at 25% overlap fight each other, partly because #007A37 is far darker
  than the other three so the row lands in clumps.

  Why not one green stepping light to deep, which is what this was first: sleek, and too
  quiet. A whole roster rendered in a single hue reads as a gradient swatch rather
  than as a group of people, and this brand owns three colours, not one.

  So: all three brand hues in rotation, with the value moving as well as the hue, which is
  what keeps it from looking shuffled. No two neighbours share a hue or a weight, and the
  sequence is even enough to survive wrapping on a nine person group.

  Every pairing is measured, not guessed. The worst is #00A652 on ink at 5.23:1 and the rest
  run to 12.22, so all clear WCAG AA for the small bold initials they carry. Check any new
  entry before adding it: a deeper blue is the obvious next step and #0086BD already fails at
  4.09:1 against ink and is worse against white, which is why there isn't one.
*/
const AVATAR_STACK = [
  { bg: "#ffd966", fg: "#12211a" }, // gold
  { bg: "#00a652", fg: "#12211a" }, // brand green
  { bg: "#8ed8f5", fg: "#12211a" }, // blue, pale
  { bg: "#007a37", fg: "#ffffff" }, // green, deep
  { bg: "#00adef", fg: "#12211a" }, // brand blue
  { bg: "#a8dcc0", fg: "#12211a" }, // green, pale
];

export function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function InitialsAvatar({
  name,
  index,
  className,
  circle = false,
  palette = "brand",
}: {
  name: string;
  index: number;
  className?: string;
  /** Circular rather than the default squircle. Used by the Community Voices cards. */
  circle?: boolean;
  /**
   * "brand" is the default and is what every standalone avatar uses. "stack" is for avatars
   * overlapping each other in a row, where the tones have to hold up side by side rather than
   * one at a time. See AVATAR_STACK.
   */
  palette?: "brand" | "stack";
}) {
  const tones = palette === "stack" ? AVATAR_STACK : AVATAR_TONES;
  const tone = tones[index % tones.length]!;
  return (
    <div
      aria-hidden
      className={cn(
        "flex size-14 shrink-0 items-center justify-center text-lg font-extrabold tracking-[-0.02em]",
        circle ? "rounded-full" : "rounded-[1.125rem]",
        className,
      )}
      style={{ background: tone.bg, color: tone.fg }}
    >
      {initialsOf(name)}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Photo placeholder. Real programme photography has not been delivered.
 * Swapping in a real <Image> later needs no layout change: same box, same radius.
 * ------------------------------------------------------------------ */

export function PhotoPlaceholder({
  caption,
  className,
  tone = 0,
}: {
  caption: string;
  className?: string;
  tone?: number;
}) {
  const gradients = [
    "linear-gradient(150deg, #dceee2 0%, #f6f4ea 55%, #ffe9a8 100%)",
    "linear-gradient(150deg, #d6eefb 0%, #eef7f0 60%, #dceee2 100%)",
    "linear-gradient(150deg, #fff0c2 0%, #eef7f0 55%, #d6eefb 100%)",
  ];
  return (
    <figure
      className={cn(
        "flex flex-col justify-between gap-4 overflow-hidden rounded-[var(--radius-inner)] p-4 sm:p-5",
        className,
      )}
      style={{ background: gradients[tone % gradients.length] }}
    >
      {/* Icon and caption are stacked, never layered, so short boxes cannot overlap. */}
      <Camera
        className="size-7 shrink-0 text-brand-green-dark/40 sm:size-8"
        strokeWidth={1.5}
        aria-hidden
      />
      <figcaption className="text-[0.75rem] leading-snug font-semibold text-brand-green-dark sm:text-[0.8125rem]">
        Photo coming soon
        <span className="block font-medium text-ink-soft">{caption}</span>
      </figcaption>
    </figure>
  );
}

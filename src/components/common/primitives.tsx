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
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6875rem] font-extrabold tracking-[0.14em] uppercase",
        active
          ? "bg-brand-green-dark text-white"
          : "border border-dashed border-[color:rgba(18,33,26,0.28)] bg-transparent text-ink-soft",
        className,
      )}
    >
      {active ? "Running now" : "In development"}
    </span>
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
}: {
  name: string;
  index: number;
  className?: string;
}) {
  const tone = AVATAR_TONES[index % AVATAR_TONES.length]!;
  return (
    <div
      aria-hidden
      className={cn(
        "flex size-14 shrink-0 items-center justify-center rounded-[1.125rem] text-lg font-extrabold tracking-[-0.02em]",
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

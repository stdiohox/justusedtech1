import {
  Cpu,
  GraduationCap,
  Palette,
  QrCode,
  Recycle,
  Rocket,
  Tent,
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
  "google-hardware-recycling-workplan": Cpu,
  "tdlc-summer-camp": Tent,
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
  const Icon = PROGRAM_ICONS[slug] ?? Recycle;
  const upcoming = status === "upcoming";

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

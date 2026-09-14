import type { ComponentType, ReactNode, SVGProps } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  Bento grid, adapted from the magicui reference rather than copied from it.

  What carried over is the whole structure: an auto-row grid, a card that holds a background
  layer under its content, an icon that shrinks as the body lifts on hover, and a call to
  action that slides up from below the fold of the card.

  What changed is everything the reference hardcoded to its own palette. The original ships
  neutral greys with a dark-mode variant, radix icons, the shadcn Button, and a 0.75rem
  radius. This site has one light theme, lucide icons, its own pill CTA, and a shape language
  that is explicitly round, so the card takes --radius-card and the brand's hairline and wash
  instead. The reference's three stacked box-shadows became the site's --shadow-soft for the
  same reason: two shadow systems on one page read as two sites.

  `href` and `cta` are optional here where the reference required them. Most of what this grid
  holds on a programme page is an objective, which is a statement rather than a link, and a
  card that reveals an empty CTA on hover is worse than one that does not move.
*/

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[minmax(14rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  tone = "paper",
}: {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  description: string;
  href?: string;
  cta?: string;
  /** `mint` for the cell that should carry weight in the grid. One per grid at most. */
  tone?: "paper" | "mint";
}) {
  const linked = Boolean(href && cta);

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-card",
        "border border-edge shadow-[var(--shadow-soft)]",
        tone === "mint" ? "bg-mint" : "bg-white",
        className,
      )}
    >
      {background}

      {/*
        The reference lifts the body by 2.5rem on hover to uncover the CTA. That distance is
        tuned to its own 22rem fixed row; here the rows size to content, so the lift is the
        height of the CTA strip and nothing more. Cards without a CTA do not lift at all,
        which is the point of making the pair optional.
      */}
      <div
        className={cn(
          "pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-7",
          "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          linked && "[@media(hover:hover)]:group-hover:-translate-y-9",
          "motion-reduce:transition-none",
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              "mb-2 size-9 origin-left transform-gpu text-brand-green-dark",
              "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "group-hover:scale-90 motion-reduce:transition-none",
            )}
            strokeWidth={1.5}
            aria-hidden
          />
        )}
        <h3 className="text-lg font-extrabold tracking-[-0.02em] text-ink text-balance">
          {name}
        </h3>
        <p className="text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
          {description}
        </p>
      </div>

      {linked && (
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 flex w-full translate-y-9 transform-gpu",
            "flex-row items-center p-6 opacity-0 transition-all duration-500",
            "ease-[cubic-bezier(0.32,0.72,0,1)]",
            "[@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100",
            /*
              Touch has no hover, so on a phone the strip would never arrive. It is shown
              outright there instead of being unreachable.
            */
            "[@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100",
            "motion-reduce:transition-none",
          )}
        >
          <a
            href={href}
            className={cn(
              "pointer-events-auto inline-flex items-center gap-1.5 rounded-full",
              "text-[0.875rem] font-bold text-brand-green-dark",
              "underline-offset-4 hover:underline",
            )}
          >
            {cta}
            <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
          </a>
        </div>
      )}
    </div>
  );
}

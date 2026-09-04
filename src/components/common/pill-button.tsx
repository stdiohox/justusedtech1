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

type Variant = "primary" | "gold" | "outline" | "onDark";

const shell: Record<Variant, string> = {
  primary:
    "bg-brand-green-dark text-white shadow-[0_10px_30px_-12px_rgba(0,122,55,0.6)] hover:bg-[#00682f]",
  gold: "bg-brand-gold text-ink shadow-[0_10px_30px_-14px_rgba(180,140,20,0.55)] hover:brightness-[0.97]",
  outline:
    "bg-white text-ink border border-[color:var(--hairline)] shadow-[var(--shadow-soft)] hover:border-[color:rgba(0,122,55,0.35)]",
  onDark: "bg-white text-brand-green-dark hover:bg-white/90",
};

const dot: Record<Variant, string> = {
  primary: "bg-brand-green text-white",
  gold: "bg-ink text-brand-gold",
  outline: "bg-mint text-brand-green-dark",
  onDark: "bg-brand-green-dark text-white",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  /** Render without the nested circle, for tertiary placements. */
  bare?: boolean;
};

function classes(variant: Variant, bare: boolean, className?: string) {
  return cn(
    "group/pill inline-flex items-center gap-3 rounded-full font-bold tracking-[-0.01em]",
    "text-[0.9375rem] leading-none transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "active:scale-[0.98]",
    bare ? "px-6 py-3.5" : "py-1.5 pr-1.5 pl-6",
    shell[variant],
    className,
  );
}

function Inner({ children, variant, icon, bare }: Required<Pick<BaseProps, "children" | "variant" | "bare">> & Pick<BaseProps, "icon">) {
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
          {icon ?? <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />}
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
  ...props
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link className={classes(variant, bare, className)} {...props}>
      <Inner variant={variant} icon={icon} bare={bare}>
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
  ...props
}: BaseProps & ComponentProps<"button">) {
  return (
    <button className={classes(variant, bare, className)} {...props}>
      <Inner variant={variant} icon={icon} bare={bare}>
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
  ...props
}: BaseProps & ComponentProps<"a">) {
  return (
    <a className={classes(variant, bare, className)} {...props}>
      <Inner variant={variant} icon={icon} bare={bare}>
        {children}
      </Inner>
    </a>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll entry animation, driven entirely by CSS scroll-driven animations.
 *
 * Why not Motion's `whileInView`: that renders the element at `opacity: 0` on the server
 * and depends on client JavaScript to reveal it. If a chunk fails to load or hydration is
 * slow, the page renders blank. For a nonprofit whose readers arrive on varied devices and
 * networks, content must never be gated behind JavaScript.
 *
 * Here the resting state is fully visible. The fade-up is layered on top only where
 * `animation-timeline: view()` is supported and the reader has not asked for reduced
 * motion. Everywhere else the content simply appears, which is the correct fallback.
 *
 * Motivation for the motion itself: it establishes reading order down a long page, so the
 * eye lands on a section headline before its supporting cards.
 */

type As = "div" | "section" | "li" | "article" | "header";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Seconds-like offset, mapped to a later point in the scroll range. */
  delay?: number;
  as?: As;
}) {
  return (
    <Tag
      className={cn("rise", className)}
      style={delay ? ({ "--rise-delay": delay } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/** Wraps a list so its `RevealItem` children cascade rather than arrive together. */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  return <Tag className={cn("rise-group", className)}>{children}</Tag>;
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return <Tag className={cn("rise", className)}>{children}</Tag>;
}

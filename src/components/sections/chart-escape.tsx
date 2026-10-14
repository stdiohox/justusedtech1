"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Lets Escape dismiss a chart's hover tooltip without moving the pointer (WCAG 1.4.13).
 *
 * The tooltip itself stays CSS: this only sets `data-dismissed` on the wrapper, which the
 * tooltip's `[[data-dismissed]_&]:hidden!` reads. Leaving the plot clears it, so the next
 * hover shows the tooltip again. The children are server rendered and pass straight through.
 */
export function ChartEscape({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDismissed(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className={className}
      data-dismissed={dismissed || undefined}
      onPointerLeave={() => setDismissed(false)}
    >
      {children}
    </div>
  );
}

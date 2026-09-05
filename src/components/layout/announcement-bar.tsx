import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { announcement } from "@/content/site";

/**
 * Full-width announcement bar above the header. Scrolls away; only the nav sticks.
 *
 * The badge uses --green-surface rather than --brand-green-dark for its text: dark green
 * on the gold reaches 5.5:1 that way, against 4.0:1 with the lighter token, and the label
 * is small enough to need the higher bar.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-brand-green-dark text-white">
      <Link
        href={announcement.href}
        className="group/ann flex w-full items-center justify-center gap-3 px-4 py-2.5 text-center"
      >
        <span className="inline-flex shrink-0 items-center rounded-full bg-brand-gold px-2.5 py-1 text-[0.625rem] font-extrabold tracking-[0.14em] text-[color:var(--green-surface)] uppercase">
          {announcement.badge}
        </span>
        <span className="text-[0.8125rem] font-semibold text-balance sm:text-[0.875rem]">
          {announcement.text}
        </span>
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/ann:translate-x-1"
          strokeWidth={2}
          aria-hidden
        />
      </Link>
    </div>
  );
}

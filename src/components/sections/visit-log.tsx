import { MapPin } from "lucide-react";
import { MONTHS, type SchoolVisit } from "@/content/news";
import { cn } from "@/lib/utils";

/**
 * The School Tour Initiative visit log: every visit, grouped by month.
 *
 * Lifted out of the news page so the School Tour programme page can show the same thing.
 * It was private to /news, which meant the only route to the record of where the team has
 * actually been was a page a reader looking up the programme has no reason to open. Two
 * copies would have been the other way to do it, and the second one would have been the one
 * that went stale.
 *
 * It takes its visits as a prop rather than importing `schoolVisits` directly, so a caller
 * can pass a filtered set later, for instance one year of a multi-year log.
 *
 * Visits are grouped by month, in supplied order within each month. The grouping comes from
 * the ISO date, so a visit with no date falls into its own group at the end, labelled as
 * such, rather than being sorted somewhere plausible.
 */
function monthLabel(iso?: string) {
  if (!iso) return "Date to be confirmed";
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/**
 * The day of the month on its own, for a row that already sits under a month heading.
 *
 * The rows used to print `visit.date` in full, so a heading reading "August 2026" was
 * followed by "20 August 2026", saying the month and the year twice within about 40px. The
 * grouping exists precisely so each row does not have to carry them.
 *
 * Read off the ISO string rather than parsed into a Date. "2026-08-20" passed to the Date
 * constructor is treated as UTC midnight and then rendered in the local zone, which is the
 * day before anywhere west of Greenwich. Splitting the string cannot drift.
 */
function dayLabel(iso: string) {
  return String(Number(iso.split("-")[2]));
}

export function VisitLog({ visits }: { visits: SchoolVisit[] }) {
  const groups = new Map<string, SchoolVisit[]>();
  for (const visit of visits) {
    const key = monthLabel(visit.iso);
    groups.set(key, [...(groups.get(key) ?? []), visit]);
  }

  return (
    <div className="card p-0">
      {[...groups.entries()].map(([label, items], gi) => (
        <div key={label} className={cn(gi > 0 && "border-t border-edge")}>
          <p className="px-6 pt-6 text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase sm:px-8">
            {label}
          </p>
          <ol className="divide-y divide-edge">
            {items.map((visit, i) => (
              <li
                key={`${visit.school}-${visit.iso ?? i}`}
                className="grid gap-1 px-6 py-5 sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:px-8"
              >
                {/*
                  An undated visit leaves the date cell empty rather than saying "TBC": its
                  group heading already says the date is to be confirmed, and the empty cell
                  keeps the school aligned with the dated rows above it on wide screens.

                  The column dropped from 7.5rem to 3.5rem with the month and year, and the
                  space went to the school names, which are long and were wrapping.

                  tabular-nums so the single and double digit days sit on the same edge. A
                  column of dates that does not line up is the kind of thing a reader feels
                  without being able to say why.

                  The full date stays for assistive tech. The visible text is now just "20",
                  and the month heading above it is a paragraph, not a label tied to these
                  rows, so a screen reader moving through the list on its own would otherwise
                  lose the month.
                */}
                <p className="text-[0.875rem] font-bold text-ink-soft tabular-nums">
                  {visit.date && visit.iso && (
                    <time dateTime={visit.iso}>
                      <span aria-hidden>{dayLabel(visit.iso)}</span>
                      <span className="sr-only">{visit.date}</span>
                    </time>
                  )}
                </p>
                <div>
                  <p className="text-[1.0625rem] leading-snug font-extrabold text-ink">
                    {visit.school}
                  </p>
                  {visit.area && (
                    <p className="mt-1 flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink-soft">
                      <MapPin
                        className="size-3.5"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {visit.area}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

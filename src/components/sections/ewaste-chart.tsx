import { ewasteAsOf, ewasteByYear, formatLbs } from "@/content/impact";
import { ChartEscape } from "@/components/sections/chart-escape";
import { SpinOnView } from "@/components/sections/impact-figures";
import { cn } from "@/lib/utils";

/**
 * E-waste upcycled per year, as a bar chart.
 *
 * Bars, not a line: each value is a year's total, a discrete amount rather than a reading
 * taken along a continuous curve. One series, so one hue (brand green dark, validated
 * against white, paper-deep, and mint) and no legend; the heading names it.
 *
 * The current year is still counting, so it is hatched and labelled "to date" rather than
 * drawn like the others. Drawn solid, a part-year reads as a collapse.
 *
 * Server rendered, no chart library: ten bars do not need one. The hover tooltip is CSS
 * (group-hover on the whole column, so the hit target is the full slot, not the bar) and
 * uses display rather than opacity, because a hidden tooltip at the chart's edge would still
 * widen the page on a phone. Escape dismisses it, through the one small client wrapper,
 * ChartEscape. Touch has no hover, which is why the full chart also carries the same
 * figures as a table.
 *
 * The bars grow from the baseline the first time the chart is in view, one after another
 * left to right, through the same SpinOnView trigger as the odometer figures. The fill is
 * its own layer under the labels, so only the colour scales and the text never stretches.
 * At rest (server render, no script, reduced motion) every bar is at its full height.
 *
 * A tap shows a bar's tooltip too: each column takes focus on click (tabIndex -1, so it is
 * focusable by pointer but stays out of the tab order, which keeps it legal inside the
 * aria-hidden plot; keyboard and screen reader users have the aria-label and the table).
 * Tapping elsewhere blurs it and the tooltip goes.
 *
 * `compact` is the home page glance: shorter, no notes, no table. The plot's aria-label
 * lists every year's value in both, since the bars themselves are not readable by assistive
 * tech and the compact chart has no table to fall back on.
 */

const TICK = 10_000;

export function EwasteChart({
  caption,
  compact = false,
}: {
  /** The figure's name, shown above the plot. */
  caption: string;
  compact?: boolean;
}) {
  const max = Math.max(...ewasteByYear.map((y) => y.lbs));
  const top = Math.ceil(max / TICK) * TICK;
  const ticks = Array.from({ length: top / TICK + 1 }, (_, i) => i * TICK);
  const peak = ewasteByYear.find((y) => y.lbs === max)!;
  const first = ewasteByYear[0]!;
  const last = ewasteByYear[ewasteByYear.length - 1]!;
  const n = ewasteByYear.length;

  const values = ewasteByYear
    .map((y) => `${y.year}${y.partial ? " to date" : ""}, ${formatLbs(y.lbs)}`)
    .join("; ");
  const summary = `Bar chart of pounds of e-waste upcycled each year from ${first.year} to ${last.year}. ${values}. The highest year is ${peak.year}.`;

  /* Plot height lives in one place so the y-axis column and the bars always match. */
  const plotHeight = compact ? "h-40 sm:h-48" : "h-56 sm:h-72";

  return (
    <figure>
      <figcaption className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
        {caption}
      </figcaption>
      <SpinOnView>
      <ChartEscape className="mt-4">
      <div role="img" aria-label={summary} className="flex gap-2 sm:gap-3">
        {/* Y axis. Labels sit on their gridlines, so each is centred on its own value. */}
        <div aria-hidden className={cn("relative mt-6 w-7 shrink-0", plotHeight)}>
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-0 translate-y-1/2 text-[0.6875rem] leading-none font-semibold text-ink-faint tabular-nums"
              style={{ bottom: `${(t / top) * 100}%` }}
            >
              {t === 0 ? "0" : `${t / 1000}k`}
            </span>
          ))}
        </div>

        <div aria-hidden className="min-w-0 flex-1">
          {/* mt-6 is headroom for the direct label over the tallest bar. */}
          <div className={cn("relative mt-6", plotHeight)}>
            {ticks.map((t) => (
              <span
                key={t}
                className={cn(
                  "absolute inset-x-0 border-t",
                  t === 0 ? "border-ink/30" : "border-edge",
                )}
                style={{ bottom: `${(t / top) * 100}%` }}
              />
            ))}

            <ol className="absolute inset-0 grid gap-1 sm:gap-2" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {ewasteByYear.map((y, i) => {
                const labelled = y === peak || y.partial;
                return (
                  <li
                    key={y.year}
                    tabIndex={-1}
                    className="group relative flex h-full cursor-pointer items-end rounded-t-[6px] outline-none transition-colors duration-150 hover:bg-mint/70 focus:bg-mint/70"
                  >
                    <div
                      className="relative w-full"
                      style={{ height: `${(y.lbs / top) * 100}%` }}
                    >
                      <span
                        className={cn(
                          "jut-bar absolute inset-0 rounded-t-[4px]",
                          y.partial
                            ? "border-[1.5px] border-b-0 border-brand-green-dark bg-mint [background-image:repeating-linear-gradient(135deg,var(--brand-green-dark)_0_1.5px,transparent_1.5px_6px)]"
                            : "bg-brand-green-dark",
                        )}
                        style={{ "--i": i } as React.CSSProperties}
                      />
                      {labelled && (
                        <span
                          className={cn(
                            "absolute bottom-full mb-1.5 text-[0.6875rem] leading-none font-bold whitespace-nowrap text-ink tabular-nums jut-bar-label group-hover:opacity-0 group-focus:opacity-0 [[data-dismissed]_&]:opacity-100!",
                            i === n - 1 ? "right-0" : "left-1/2 -translate-x-1/2",
                            /* Below sm a slot is ~26px, and the year-to-date label runs
                               into the peak bar beside it. The value is still in the
                               aria-label, the tooltip, and the table. */
                            y.partial && "max-sm:hidden",
                          )}
                        >
                          {formatLbs(y.lbs)}
                        </span>
                      )}
                      <span
                        className={cn(
                          "absolute bottom-full z-10 mb-2 hidden rounded-[var(--radius-badge)] bg-ink px-3 py-2 text-left whitespace-nowrap text-white shadow-lg group-hover:block group-focus:block [[data-dismissed]_&]:hidden!",
                          i < 2 ? "left-0" : i > n - 3 ? "right-0" : "left-1/2 -translate-x-1/2",
                        )}
                      >
                        <span className="block text-[0.6875rem] font-bold text-white/75">
                          {y.year}
                          {y.partial ? `, to ${ewasteAsOf}` : ""}
                        </span>
                        <span className="block text-[0.9375rem] font-extrabold tabular-nums">
                          {formatLbs(y.lbs)} lbs
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Years. Two digits below sm, where ten four-digit labels do not fit their slots. */}
          <div
            className="mt-2 grid gap-1 sm:gap-2"
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
          >
            {ewasteByYear.map((y) => (
              <span
                key={y.year}
                className="text-center text-[0.6875rem] leading-tight font-semibold text-ink-faint tabular-nums"
              >
                <span className="sm:hidden">&rsquo;{String(y.year).slice(2)}</span>
                <span className="hidden sm:inline">{y.year}</span>
                {y.partial && <span className="block text-[0.625rem]">to date</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
      </ChartEscape>
      </SpinOnView>

      {!compact && (
        <>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] leading-relaxed text-ink-soft">
            {ewasteByYear
              .filter((y) => y.note)
              .map((y) => (
                <li key={y.year}>
                  <span className="font-bold text-ink">{y.year}:</span> {y.note}
                </li>
              ))}
          </ul>

          {/*
            The same figures as a table, for touch, for screen readers, and for anyone who
            wants the exact numbers. Native details: no script, and closed by default so the
            chart stays the first read. The running total is summed from the rows above it,
            so it reaches the series total (200,120) in the last row.
          */}
          {/*
            One constant label: the open state is already announced by the details element,
            so a label that also flipped to "Hide" was said twice. list-none and the webkit
            pseudo-element drop the default marker, which Safari still draws on a flex summary.
          */}
          <details className="mt-6">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-[var(--radius-pill)] border border-edge px-4 py-2 text-[0.875rem] font-bold text-ink transition-colors duration-200 hover:border-brand-green hover:bg-mint [&::-webkit-details-marker]:hidden">
              The figures as a table
            </summary>
            {/* Focusable and named, so the table can be scrolled from the keyboard on a phone. */}
            <div
              role="region"
              aria-label="E-waste by year, table"
              tabIndex={0}
              className="mt-4 overflow-x-auto"
            >
              <table className="w-full min-w-[28rem] text-left text-[0.9375rem]">
                <caption className="sr-only">
                  Pounds of e-waste upcycled per year, {first.year} to {last.year}
                </caption>
                <thead>
                  <tr className="border-b border-edge text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                    <th scope="col" className="py-3 pr-6">Year</th>
                    <th scope="col" className="py-3 pr-6 text-right">Pounds</th>
                    <th scope="col" className="py-3 pr-6 text-right">Running total</th>
                    <th scope="col" className="py-3">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-edge">
                  {ewasteByYear.map((y, i) => (
                    <tr key={y.year}>
                      <th scope="row" className="py-3 pr-6 font-bold text-ink tabular-nums">
                        {y.year}
                      </th>
                      <td className="py-3 pr-6 text-right font-semibold text-ink tabular-nums">
                        {formatLbs(y.lbs)}
                      </td>
                      <td className="py-3 pr-6 text-right text-ink-soft tabular-nums">
                        {formatLbs(
                          ewasteByYear.slice(0, i + 1).reduce((sum, row) => sum + row.lbs, 0),
                        )}
                      </td>
                      <td className="py-3 text-ink-soft">
                        {[y.partial && `To ${ewasteAsOf}.`, y.note].filter(Boolean).join(" ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </>
      )}
    </figure>
  );
}

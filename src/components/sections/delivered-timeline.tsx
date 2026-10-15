import { Check, MapPin } from "lucide-react";
import { SectionHead, TagPill } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import type { TimelineYear } from "@/content/programs";

/**
 * A programme's delivered work as a timeline, grouped by year.
 *
 * Each year is a label with the review's total for it, then its events down a vertical
 * line. An event is a card: when and where on top, its title, the one summary sentence, its
 * schools as tags, and its impacts pulled out as figures. The plain results list this
 * replaces ran all of that together as paragraphs, with the numbers mid-sentence; here the
 * numbers are the first thing the eye lands on in each card.
 *
 * Impacts with no number (Phase 2's football team) are a ticked line under the figures,
 * rather than a figure cell with nothing large in it.
 *
 * Server component; the entry motion is the site's CSS .rise (see reveal.tsx).
 */
export function DeliveredTimeline({ timeline }: { timeline: TimelineYear[] }) {
  return (
    <>
      <Reveal>
        <SectionHead
          align="center"
          title="Delivered"
          lede="Work that has already happened, with the dates it happened on."
        />
      </Reveal>

      <div className="mt-14 flex flex-col gap-14">
        {timeline.map((year) => (
          <div key={year.year} className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-12">
            {/* The year and its total; held in view beside its events on wide screens. */}
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-5xl leading-none font-extrabold tracking-[-0.04em] text-ink tabular-nums">
                {year.year}
              </p>
              {year.total && (
                <p className="mt-4 inline-flex rounded-[var(--radius-pill)] bg-mint px-4 py-2 text-[0.875rem] font-bold text-brand-green-dark">
                  {year.total}
                </p>
              )}
            </Reveal>

            {/* Events down a line, each with a node where it joins. */}
            <RevealGroup as="ol" className="relative flex flex-col gap-5 border-l-2 border-edge pl-6 sm:pl-8">
              {year.events.map((event) => {
                const figures = event.impacts.filter((i) => i.value);
                const notes = event.impacts.filter((i) => !i.value);
                return (
                  <RevealItem as="li" key={event.title} className="relative">
                    <span
                      aria-hidden
                      className="absolute top-8 -left-[calc(1.5rem+7px)] size-3 rounded-full bg-brand-green-dark ring-4 ring-white sm:-left-[calc(2rem+7px)]"
                    />
                    <article className="card">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="rounded-[var(--radius-pill)] bg-brand-green-dark px-3 py-1 text-[0.75rem] font-extrabold tracking-[0.06em] text-white uppercase">
                          {event.when}
                        </span>
                        {event.place && (
                          <span className="flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink-soft">
                            <MapPin className="size-3.5" strokeWidth={2} aria-hidden />
                            {event.place}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 text-xl font-extrabold tracking-[-0.02em] text-ink sm:text-2xl">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-[1rem] leading-relaxed text-ink-soft text-pretty">
                        {event.summary}
                      </p>

                      {event.schools && (
                        <div className="mt-5">
                          <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                            Participating schools
                          </p>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {event.schools.map((school) => (
                              <li key={school}>
                                <TagPill>{school}</TagPill>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {figures.length > 0 && (
                        <dl className="mt-6 grid gap-x-6 gap-y-5 border-t border-edge pt-6 sm:grid-cols-3">
                          {figures.map((impact) => (
                            <div key={impact.label} className="flex flex-col-reverse justify-end gap-1">
                              <dt className="text-[0.875rem] leading-snug text-ink-soft text-pretty">
                                {impact.label}
                              </dt>
                              <dd className="text-[2rem] leading-none font-bold tracking-[-0.03em] text-brand-green-dark tabular-nums">
                                {impact.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      {notes.length > 0 && (
                        <ul className="mt-5 flex flex-col gap-2">
                          {notes.map((note) => (
                            <li
                              key={note.label}
                              className="flex items-start gap-2 text-[0.9375rem] font-semibold text-ink"
                            >
                              <Check
                                className="mt-0.5 size-4 shrink-0 text-brand-green-dark"
                                strokeWidth={2.5}
                                aria-hidden
                              />
                              {note.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        ))}
      </div>
    </>
  );
}

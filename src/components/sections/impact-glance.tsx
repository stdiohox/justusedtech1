import { MapPin } from "lucide-react";
import { PillLink } from "@/components/common/pill-button";
import { Section, SectionHead, TagPill } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { EwasteChart } from "@/components/sections/ewaste-chart";
import {
  communitiesReached,
  devicesToDate,
  ewasteToDate,
  laptops2026,
  schoolTourSchools2025,
  schoolTourSchools2026,
  schoolTourStudents2026,
  type Stat,
} from "@/content/impact";

/**
 * Home: "Our Impact at a Glance", from the October 2026 website review.
 *
 * The chart and four figures, then where the work happened, then a way into the full
 * statistics page. Every value is read from content/impact.ts; this file states none.
 *
 * TODO(client): Q22. The review puts both years' full school lists here. They are on
 * /impact/statistics instead, with only the counts here, until the client confirms.
 * TODO(client): Q4, Q5. The review's "18 schools", "18 sessions", and "870 students" are
 * not stated; see content/impact.ts.
 */

const tiles: Stat[] = [
  /* Details are the review's own captions, minus "during the year" (TODO(client): Q3). */
  {
    ...ewasteToDate,
    detail:
      "Electronic waste processed through reported US collection and upcycling activities.",
  },
  {
    ...schoolTourStudents2026,
    detail:
      "Took part in e-waste awareness and digital sustainability sessions for the School Tour Initiative.",
  },
  laptops2026,
  devicesToDate,
];

export function ImpactGlance() {
  return (
    <Section tone="deep">
      <Reveal>
        <SectionHead title="Our Impact at a Glance" />
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="card h-full">
            <EwasteChart caption="E-waste upcycled each year, lbs" compact />
          </div>
        </Reveal>

        <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2">
          {tiles.map((stat) => (
            <RevealItem as="li" key={stat.label}>
              <div className="card h-full">
                <p className="text-[2.25rem] leading-[0.95] font-bold tracking-[-0.04em] text-brand-green-dark tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-3 text-[0.875rem] leading-snug font-bold text-ink">
                  {stat.label}
                </p>
                {stat.detail && (
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-faint">
                    {stat.detail}
                  </p>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Reveal className="mt-4">
        <div className="card flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="flex items-center gap-2 text-[0.9375rem] font-extrabold text-ink">
              <MapPin className="size-4 text-brand-green-dark" strokeWidth={2} aria-hidden />
              Schools visited: {schoolTourSchools2025.length} in 2025,{" "}
              {schoolTourSchools2026.length} in 2026
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Communities reached">
              {communitiesReached.map((community) => (
                <li key={community}>
                  <TagPill>{community}</TagPill>
                </li>
              ))}
            </ul>
          </div>
          <PillLink href="/impact/statistics" variant="outline" flow>
            See all statistics
          </PillLink>
        </div>
      </Reveal>
    </Section>
  );
}

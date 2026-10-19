import { MapPin } from "lucide-react";
import { PillLink } from "@/components/common/pill-button";
import { Section, SectionHead, TagPill } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { EwasteChart } from "@/components/sections/ewaste-chart";
import { SpinFigure, SpinOnView } from "@/components/sections/impact-figures";
import {
  communitiesReached,
  devicesToDate,
  ewasteHistory,
  ewasteSeriesTitle,
  ewasteToDate,
  laptops2026,
  schoolTourSchools2025,
  schoolTourSchools2026,
  schoolsToDate,
  sessionsToDate,
  studentsToDate,
  type Stat,
} from "@/content/impact";

/**
 * Home: "Our Impact at a Glance", the review's section 1.2, as written: the figures and the
 * annual chart, then communities, the two years' school lists, and the review's historical
 * note on the e-waste figures. Every value is read from content/impact.ts.
 */

const tiles: Stat[] = [
  schoolsToDate,
  studentsToDate,
  ewasteToDate,
  devicesToDate,
  laptops2026,
  sessionsToDate,
];

export function ImpactGlance() {
  return (
    <Section tone="deep">
      <Reveal>
        <SectionHead title="Our Impact at a Glance" />
      </Reveal>

      {/*
        Chart on its own row, tiles three across under it. Side by side, six tiles ran far
        taller than the chart and left its card mostly empty.
      */}
      <div className="mt-12 flex flex-col gap-4">
        <Reveal>
          <div className="card">
            <EwasteChart caption={ewasteSeriesTitle} compact />
          </div>
        </Reveal>

        {/*
          The figures roll in as odometers the first time the tiles are in view, the same
          reels as the /impact cards (see ImpactFigures), and the tile lifts on hover.
          leading-none, not 0.95: the reels are 1em windows and a shorter line clips them.
        */}
        <SpinOnView>
        <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((stat) => (
            <RevealItem as="li" key={stat.label}>
              <div className="card h-full transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-brand-green motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <p className="text-[2.25rem] leading-none font-bold tracking-[-0.04em] text-brand-green-dark tabular-nums">
                  <SpinFigure value={stat.value} />
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
        </SpinOnView>
      </div>

      <Reveal className="mt-4">
        <div className="card grid gap-8 lg:grid-cols-[0.8fr_1fr_1.2fr] lg:gap-10">
          <div>
            <p className="flex items-center gap-2 text-[0.9375rem] font-extrabold text-ink">
              <MapPin className="size-4 text-brand-green-dark" strokeWidth={2} aria-hidden />
              Communities reached
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {communitiesReached.map((community) => (
                <li key={community}>
                  <TagPill>{community}</TagPill>
                </li>
              ))}
            </ul>
          </div>
          {[
            { year: "2025", schools: schoolTourSchools2025 },
            { year: "2026", schools: schoolTourSchools2026 },
          ].map((group) => (
            <div key={group.year}>
              <p className="text-[0.9375rem] font-extrabold text-ink">
                Schools Visited across Lagos State: {group.year}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5 text-[0.9375rem] leading-snug text-ink-soft">
                {group.schools.map((school) => (
                  <li key={school}>{school}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-4">
        <div className="card grid gap-6 lg:grid-cols-[0.8fr_2.2fr] lg:gap-10">
          <div className="flex flex-col items-start gap-6">
            <h3 className="text-xl font-extrabold tracking-[-0.02em] text-ink text-balance">
              {ewasteHistory.title}
            </h3>
            <PillLink href="/impact/statistics" variant="outline" flow>
              See all statistics
            </PillLink>
          </div>
          <div className="flex flex-col gap-4">
            {ewasteHistory.body.map((para) => (
              <p key={para} className="text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

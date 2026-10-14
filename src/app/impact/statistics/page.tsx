import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import {
  Section,
  SectionHead,
  StatBlock,
  TagPill,
} from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { EwasteChart } from "@/components/sections/ewaste-chart";
import { VisitLog } from "@/components/sections/visit-log";
import {
  communitiesReached,
  ewasteAsOf,
  impactTiles2025,
  laptops2026,
  reached2025,
  schoolTourSchools2025,
  schoolTourSchools2026,
  schoolTourStudents2025,
  schoolTourStudents2026,
  schoolTourUnderstanding2026,
  usOperations,
  type Stat,
} from "@/content/impact";
import { schoolVisits } from "@/content/news";
import { hasDetailPage } from "@/content/program-details";
import { activePrograms } from "@/content/programs";

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "E-waste upcycled by year since 2017, and every figure JustUsedTech reports, with the year it belongs to.",
};

/**
 * /impact/statistics. Every figure the site states, in one place, read from the ledger in
 * content/impact.ts and the programme catalogue. Nothing on this page is typed here: a number
 * that appears below and nowhere in content/ would be a second source.
 *
 * Order runs from the one long series (e-waste since 2017), to running totals, to single
 * years, to programmes, to places. Dated results and running totals never share a list,
 * which is the rule every other surface follows too.
 */

/* The School Tour counts are composed from the lists, so they follow the record. */
const schools2026: Stat = {
  value: String(schoolTourSchools2026.length),
  label: "Schools reached by the School Tour Initiative in 2026",
};
const schools2025: Stat = {
  value: String(schoolTourSchools2025.length),
  label: "Schools reached by the School Tour Initiative in 2025",
};

const byYear: { year: string; stats: Stat[] }[] = [
  {
    year: "2026, to date",
    stats: [laptops2026, schoolTourStudents2026, schools2026, schoolTourUnderstanding2026],
  },
  {
    year: "2025",
    stats: [reached2025, ...impactTiles2025, schoolTourStudents2025, schools2025],
  },
];

const EYEBROW =
  "text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase";

export default function StatisticsPage() {
  return (
    <>
      <PageHero
        eyebrow="Statistics"
        title="Every figure we report, in one place."
        lede="E-waste upcycled since 2017, year by year, then the running totals and yearly results behind our programmes. Annual results are kept apart from running totals, and targets are not counted here."
        actions={
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-bold text-ink-soft transition-colors duration-300 hover:text-brand-green-dark"
          >
            <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
            Our impact
          </Link>
        }
      />

      <Section tone="white" id="ewaste">
        <Reveal>
          {/*
            TODO(client): Q1, Q20. The second sentence of the lede is the client's own caveat
            on these figures, shortened. Drop it once the series is confirmed as final.
          */}
          <SectionHead
            eyebrow="Since 2017"
            title="E-waste upcycled, year by year"
            lede={`Pounds of electronic waste collected and upcycled through our US operations each year, to ${ewasteAsOf}. Annual figures are being reconciled against collection registers, partner reports, and weight records.`}
          />
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <div className="card">
            <EwasteChart caption="Pounds upcycled per year, US operations" />
          </div>
        </Reveal>
      </Section>

      <Section tone="deep" id="totals">
        <Reveal>
          <SectionHead
            title="Running totals"
            lede="Figures since US operations began, rather than for any one year."
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {usOperations.map((stat) => (
            <RevealItem as="li" key={stat.label}>
              <StatBlock value={stat.value} label={stat.label} detail={stat.detail} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="white" id="by-year">
        <Reveal>
          <SectionHead
            title="Year by year"
            lede="Results that belong to a single year, with the year they belong to."
          />
        </Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
          {byYear.map((group) => (
            <Reveal key={group.year}>
              <h3 className="text-xl font-extrabold tracking-[-0.02em] text-ink">
                {group.year}
              </h3>
              <ul className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {group.stats.map((stat) => (
                  <li key={stat.label}>
                    <StatBlock value={stat.value} label={stat.label} detail={stat.detail} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="deep" id="programmes">
        <Reveal>
          <SectionHead
            title="By programme"
            lede="What each programme has delivered, and its running totals. Targets are on each programme's own page, labelled as targets."
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2">
          {activePrograms.map((program) => (
            <RevealItem key={program.slug}>
              <article className="card h-full">
                <h3 className="text-xl font-extrabold tracking-[-0.02em] text-ink">
                  {hasDetailPage(program.slug) ? (
                    <Link
                      href={`/programs/${program.slug}`}
                      className="underline-offset-4 hover:text-brand-green-dark hover:underline"
                    >
                      {program.name}
                    </Link>
                  ) : (
                    program.name
                  )}
                </h3>
                {[
                  { heading: "Delivered", items: program.results },
                  { heading: "To date", items: program.stats },
                ].map(
                  (list) =>
                    list.items && (
                      <div key={list.heading} className="mt-6">
                        <p className={EYEBROW}>{list.heading}</p>
                        <dl className="mt-3 flex flex-col gap-4">
                          {list.items.map((item) => (
                            <div key={item.label}>
                              <dt className="text-[0.9375rem] font-extrabold text-ink">
                                {item.label}
                              </dt>
                              <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                                {item.detail}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ),
                )}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="white" id="schools">
        <Reveal>
          {/*
            TODO(client): Q4. The review's "18 secondary schools" and "18 School Tour
            sessions" are not stated here; the counts below are the named records.
          */}
          <SectionHead
            title="Schools and communities"
            lede="Where the School Tour Initiative has been, and the communities our programmes have reached."
          />
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className={EYEBROW}>2025</p>
            <ul className="mt-4 space-y-3">
              {schoolTourSchools2025.map((school) => (
                <li key={school} className="text-[1.0625rem] leading-snug font-extrabold text-ink">
                  {school}
                </li>
              ))}
            </ul>
            <p className={`${EYEBROW} mt-10`}>Communities reached</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {communitiesReached.map((community) => (
                <li key={community}>
                  <TagPill>{community}</TagPill>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <p className={`${EYEBROW} mb-4`}>2026, every visit</p>
            <VisitLog visits={schoolVisits} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}

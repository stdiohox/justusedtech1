import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHead } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { WorldMap } from "@/components/sections/world-map";
import {
  communitiesReached,
  impact2025,
  usOperations,
  type Stat,
} from "@/content/impact";
import { latestPost } from "@/content/news";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Confirmed 2025 results and lifetime US operations figures: devices redistributed, students reached, and e-waste diverted.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="The numbers we can stand behind."
        lede="Everything on this page is a confirmed figure from 2025 or from US operations since inception. Where a programme has no dated result, it is not listed here."
      />

      {/* 2025: staggered stat rows rather than an even card grid. */}
      <Section tone="white">
        <Reveal>
          <SectionHead
            title="2025 at a glance"
            lede="Across 8 schools in Lagos State, plus US-side redistribution."
          />
        </Reveal>
        <RevealGroup as="ul" className="mt-12 grid gap-4 md:grid-cols-6">
          {impact2025.map((stat, i) => (
            <RevealItem
              as="li"
              key={stat.label}
              className={i < 2 ? "md:col-span-3" : "md:col-span-2"}
            >
              <StatBlock stat={stat} big={i < 2} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10">
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
            <span className="font-extrabold text-ink">Communities reached: </span>
            {communitiesReached.join(", ")}.
          </p>
        </Reveal>
      </Section>

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
          <Reveal>
            <SectionHead
              eyebrow="Device corridor"
              title="From University City to Lagos, Accra, and Nairobi."
              lede="Collection and refurbishment happen in Missouri. Distribution happens on three routes out of it."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bezel">
              <div className="bezel-core bg-white px-3 py-6 sm:px-6 sm:py-10">
                <WorldMap />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="green">
        <Reveal>
          <SectionHead
            onGreen
            title="US operations, since inception"
            lede="St. Louis is where the pipeline starts, and a majority of what we recover stays there."
          />
        </Reveal>
        <RevealGroup as="ul" className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {usOperations.map((stat) => (
            <RevealItem as="li" key={stat.label}>
              <p className="text-4xl leading-none font-extrabold tracking-[-0.04em] sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-snug font-bold text-white/85">
                {stat.label}
              </p>
              {stat.detail && (
                <p className="mt-2 text-[0.875rem] leading-relaxed text-white/70">
                  {stat.detail}
                </p>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Skate Lagos 3.0 recap. */}
      <Section tone="deep">
        <Reveal>
          <SectionHead eyebrow="Event recap" title={latestPost.title} />
        </Reveal>
        <Reveal delay={0.08} className="mt-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              {latestPost.body.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft text-pretty first:mt-0"
                >
                  {para}
                </p>
              ))}
              <Link
                href={`/news/${latestPost.slug}`}
                className="mt-7 inline-block text-[0.9375rem] font-bold text-brand-green-dark underline-offset-4 hover:underline"
              >
                Read the full post
              </Link>
            </div>
            <dl className="space-y-5 rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-soft)] sm:p-8">
              <div>
                <dt className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                  Date
                </dt>
                <dd className="mt-1.5 font-bold text-ink">
                  <time dateTime={latestPost.iso}>{latestPost.date}</time>
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                  Venue
                </dt>
                <dd className="mt-1.5 font-bold text-ink">{latestPost.location}</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                  Donated
                </dt>
                <dd className="mt-1.5 font-bold text-ink">25 roller skates</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                  Media
                </dt>
                <dd className="mt-1.5 font-bold text-ink">
                  Interview with Lagos Television (LTV) on site
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function StatBlock({ stat, big }: { stat: Stat; big: boolean }) {
  return (
    <div className="h-full rounded-[var(--radius-card)] border border-[color:var(--hairline)] bg-white p-7 shadow-[var(--shadow-soft)] sm:p-8">
      <p
        className={
          big
            ? "text-5xl leading-none font-extrabold tracking-[-0.045em] text-brand-green-dark sm:text-6xl"
            : "text-4xl leading-none font-extrabold tracking-[-0.04em] text-brand-green-dark"
        }
      >
        {stat.value}
      </p>
      <p className="mt-4 text-[1rem] leading-snug font-bold text-ink">{stat.label}</p>
      {stat.detail && (
        <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
          {stat.detail}
        </p>
      )}
    </div>
  );
}

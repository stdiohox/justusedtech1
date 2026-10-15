import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHead } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { PillLink } from "@/components/common/pill-button";
import { Impact2025 } from "@/components/sections/impact-2025";
import { SpinFigure, SpinOnView } from "@/components/sections/impact-figures";
import Image from "next/image";
import { impactPage } from "@/content/impact";
import { coverOf, latestPost } from "@/content/news";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "How JustUsedTech measures impact: e-waste recovered, devices redistributed, and the results of our education and youth programmes.",
};

export default function ImpactPage() {
  /* Same rule the post page and the news cards use: cover, else the first photograph. */
  const recapFrame = coverOf(latestPost);

  return (
    <>
      <PageHero
        eyebrow="Impact"
        title={impactPage.title}
        lede={impactPage.lede}
        actions={
          <PillLink href="/impact/statistics" variant="outline" flow>
            See all statistics
          </PillLink>
        }
      />

      {/*
        The lead figure: 200,000+ lbs since 2017, at hero size, rolling in on the odometer
        reels the programme pages use. The kg line is for readers who do not think in pounds.
      */}
      <Section tone="green" className="py-20 md:py-28">
        <Reveal className="text-center">
          <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-white/80 uppercase">
            {impactPage.lifetime.eyebrow}
          </p>
          <SpinOnView className="mt-5">
            <p className="text-[3.5rem] leading-none font-bold tracking-[-0.045em] text-white tabular-nums sm:text-[6rem] lg:text-[9rem]">
              <SpinFigure value={impactPage.lifetime.value} />
              <span className="ml-[0.2em] text-[0.4em] tracking-[-0.02em] text-white/85">
                {impactPage.lifetime.unit}
              </span>
            </p>
          </SpinOnView>
          <p className="mx-auto mt-6 max-w-[34ch] text-[1.25rem] leading-snug font-bold text-white text-balance sm:text-[1.5rem]">
            {impactPage.lifetime.caption}
          </p>
          <p className="mt-3 text-[1rem] font-semibold text-white/80 tabular-nums">
            {impactPage.lifetime.metric}
          </p>
          <div className="mt-9 flex justify-center">
            <PillLink href="/impact/statistics#ewaste" variant="onDark" flow>
              {impactPage.lifetime.link}
            </PillLink>
          </div>
        </Reveal>
      </Section>

      {/* How the figures below are kept: the review's Monitoring, Evaluation and Learning copy. */}
      <Section tone="paper">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
            {impactPage.method.map((para, i) => (
              <p
                key={para}
                className={
                  i === 0
                    ? "text-[1.125rem] leading-[1.6] font-semibold text-ink text-pretty"
                    : "text-[1.0625rem] leading-relaxed text-ink-soft text-pretty"
                }
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/*
        The 2025 set as a dashboard: the e-waste total takes a wide cell, the reach figure a
        green feature card, and the rest run as tiles. Ranked, because the figures are not the
        same size of fact. Not in the review's Impact page, and kept with its figures updated.
      */}
      <Impact2025 />

      {/*
        Environmental impact, as the review writes it: its "Reported 2025 results" and
        "Cumulative results" lists, then its closing line.
      */}
      <Section tone="green">
        <Reveal>
          <SectionHead
            onGreen
            title={impactPage.environment.title}
            lede={impactPage.environment.lede}
          />
        </Reveal>
        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          {[impactPage.environment.results2025, impactPage.environment.cumulative].map(
            (group) => (
              <RevealItem key={group.heading} className="border-t border-white/25 pt-6">
                <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-white/80 uppercase">
                  {group.heading}
                </h3>
                <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 marker:text-white/60">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[1.125rem] leading-snug font-bold text-white text-pretty"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ),
          )}
        </RevealGroup>
        <Reveal className="mt-12">
          <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-white/85 text-pretty">
            {impactPage.environment.close}
          </p>
        </Reveal>
      </Section>

      {/*
        Event recap: whichever post `latestPost` resolves to, which is the newest one
        carrying a date. Every line in this section comes from that post, including the
        picture and the facts card, so it follows the newest event rather than naming one.
      */}
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
            <div className="space-y-6">
              {/*
                The event's own lead frame, above the facts rather than beside the prose.

                This column is the narrower of the two, roughly 500px at lg, and the picture
                is 959px wide. That is a little under 2x there and comfortably sharp; run
                full-bleed across the shell instead and the same file would be stretched past
                its own resolution. So the column is not a compromise, it is the widest slot
                the file actually supports.

                Reading the frame from the post means this cannot drift. The recap already
                takes its headline, body, date, and venue from `latestPost`; the picture now
                comes from the same place, through the same rule the post page and the news
                cards use. A post with no photographs renders no picture here, which is what
                this section did until the Skate Lagos frames arrived.
              */}
              {recapFrame && (
                <Image
                  src={recapFrame.src}
                  alt={recapFrame.alt}
                  width={recapFrame.width}
                  height={recapFrame.height}
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="w-full rounded-card object-cover"
                />
              )}
              <dl className="card space-y-5">
                {/*
                latestPost is chosen as the first DATED post, so this row is expected to
                fill. It is still guarded: a Date term with an empty definition under it is
                a worse failure than one missing row.
              */}
                {latestPost.date && (
                  <div>
                    <dt className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                      Date
                    </dt>
                    <dd className="mt-1.5 font-bold text-ink">
                      <time dateTime={latestPost.iso}>{latestPost.date}</time>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                    Venue
                  </dt>
                  <dd className="mt-1.5 font-bold text-ink">
                    {latestPost.location}
                  </dd>
                </div>
                {/*
                  Whatever else this post states about itself. The two rows that used to sit
                  here were typed in: "25 roller skates" and the LTV interview, both Skate
                  Lagos facts, in a card whose every other line already came from
                  `latestPost`. They were correct while Skate Lagos held that slot and became
                  wrong the moment the 2026 school tour took it, at which point the page was
                  crediting a school tour with a skate donation. Reading them from the post
                  is what makes that impossible rather than merely fixed.
                */}
                {latestPost.facts?.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 font-bold text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

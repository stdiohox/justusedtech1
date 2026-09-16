import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHead, StatBlock } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { Impact2025 } from "@/components/sections/impact-2025";
import { usOperations } from "@/content/impact";
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

      {/*
        The 2025 set reads as a dashboard rather than as five equal stat blocks: the
        e-waste total takes a wide cell with its two routes drawn as a proportion, the reach
        figure takes a green feature card, and the rest run as tiles. Ranked, because the
        figures are not the same size of fact.
      */}
      <Impact2025 />

      {/*
        US operations stays on stat blocks. It is four peer figures with no part-of-a-whole
        among them, so there is nothing for a dashboard to rank, and running a second
        dashboard here would take the emphasis back off the 2025 one.
      */}
      <Section tone="green">
        <Reveal>
          <SectionHead
            onGreen
            title="US operations, since inception"
            lede="St. Louis is where the pipeline starts, and a majority of what we recover stays there."
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {usOperations.map((stat) => (
            <RevealItem as="li" key={stat.label}>
              <StatBlock
                onGreen
                value={stat.value}
                label={stat.label}
                detail={stat.detail}
              />
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
            <dl className="card h-fit space-y-5">
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

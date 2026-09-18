import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { PillAnchor, PillLink } from "@/components/common/pill-button";
import { ProgramMedia } from "@/components/common/program-media";
import {
  Section,
  SectionHead,
  StatusBadge,
} from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { hasDetailPage } from "@/content/program-details";
import {
  activePrograms,
  upcomingPrograms,
  type Program,
} from "@/content/programs";
import { asks } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Six active JustUsedTech programmes plus the initiatives currently in development, with the dated results we can verify.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="What we run, and what is still a proposal."
        lede="Everything below is labelled. Programmes badged Active are delivering today. Programmes badged Upcoming are proposals or concepts at pitch stage, and are not yet operating."
      />

      <Section tone="white">
        <Reveal>
          <SectionHead
            title="Running now"
            lede="Six programmes currently delivering across the US and Nigeria."
          />
        </Reveal>
        <div className="mt-12 space-y-5">
          {activePrograms.map((program, i) => (
            <Reveal key={program.slug} delay={Math.min(i, 3) * 0.05}>
              <ProgramPanel program={program} tone={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/*
        Paper rather than paper-deep: an Upcoming card is filled with --surface-subtle,
        which on this ground sits a hair off the page and is held mostly by its hairline.
        That outline-not-fill reading is the same signal the Upcoming badge carries.
      */}
      <Section tone="paper">
        <Reveal>
          <SectionHead
            title="In development"
            lede="Concepts, proposals, and collaborations that are not yet running. Listed here so the pipeline is visible without being mistaken for delivered work."
          />
        </Reveal>
        <div className="mt-12 space-y-5">
          {upcomingPrograms.map((program, i) => (
            <Reveal key={program.slug} delay={Math.min(i, 3) * 0.05}>
              <ProgramPanel program={program} tone={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="green">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHead
            onGreen
            title="Every programme runs on donated hardware."
            lede="If your organisation is retiring devices, that is where a programme starts."
            className="max-w-xl"
          />
          <PillAnchor href={asks.donateDevice} variant="onDark" flow>
            Donate a device
          </PillAnchor>
        </div>
      </Section>
    </>
  );
}

function ProgramPanel({ program, tone }: { program: Program; tone: number }) {
  const upcoming = program.status === "upcoming";

  /*
    Whether the right-hand rail has anything to hold. Four programmes carry a target, dated
    results, or running totals; SkillSync, Circular Tech Bootcamp, and the GreenBin ecosystem
    carry none of the three, and content/programs.ts is explicit that no figures may be
    invented for them. So the rail cannot be filled with new content, only with content the
    panel already has.
  */
  const hasRail = Boolean(program.target || program.results || program.stats);
  const detailed = hasDetailPage(program.slug);

  /*
    The body prose, rendered into whichever column needs it.

    With a rail it stays under the summary on the left, which is the layout every panel has
    always had and which is left untouched. Without one it moves across, so a rail-less panel
    keeps the same two-column silhouette as its neighbours and fills the right side with real
    copy instead of half a card of air. Lede on the left, prose on the right, which is an
    ordinary editorial split rather than a special case invented for three panels.

    The two shapes this beat: centring the prose at a narrow measure, which makes those panels
    a visibly different object partway down a stacked list, and letting the prose span the
    full panel, which runs the line measure to about 1170px and well past reading width.
  */
  const body = program.body.map((para) => (
    <p
      key={para.slice(0, 24)}
      className="text-[0.9375rem] leading-relaxed text-ink-soft text-pretty"
    >
      {para}
    </p>
  ));

  return (
    <article
      id={program.slug}
      className={cn(
        "card card-flush relative scroll-mt-28",
        upcoming && "card-quiet",
        /*
          The whole panel is the click target when a detail page exists. The title below
          carries a stretched link (an ::after covering the panel), so the photograph, the
          heading, and the prose all go to the programme's page, and the panel gets the same
          lift the home bento cards have so it reads as one pressable object rather than a
          block of text with a pill at the bottom.
        */
        detailed &&
          "group/panel transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none",
      )}
    >
      {/* panel: full shell width, so the band takes its own height. See the prop. */}
      <ProgramMedia
        slug={program.slug}
        status={program.status}
        tone={tone}
        panel
      />

      <div className="grid gap-8 p-7 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div>
          <StatusBadge status={program.status} />
          <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.03em] text-balance sm:text-[1.75rem]">
            {detailed ? (
              <Link
                href={`/programs/${program.slug}`}
                className="after:absolute after:inset-0 after:rounded-[var(--radius-card)] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-green focus-visible:after:ring-inset"
              >
                {program.name}
              </Link>
            ) : (
              program.name
            )}
          </h3>
          {program.partner && (
            <p className="mt-3 text-[0.875rem] font-bold text-brand-green-dark">
              In partnership with {program.partner}
            </p>
          )}
          <p className="mt-4 text-[1.0625rem] leading-relaxed font-semibold text-ink text-pretty">
            {program.summary}
          </p>
          {hasRail && <div className="mt-4 space-y-4">{body}</div>}

          {/*
            Learn more, on every programme that has a detail page to reach. The one that does
            not is GreenBin 360 Smart Bin Ecosystem, which is a concept at pitch stage: there
            is no programme to describe at length, and a link promising more detail would be
            promising something that does not exist.
          */}
          {detailed && (
            /* Above the title's stretched ::after, so the pill stays a button of its own. */
            <div className="relative z-[1] mt-7">
              <PillLink
                href={`/programs/${program.slug}`}
                variant="outline"
                flow
              >
                Learn more
              </PillLink>
            </div>
          )}
        </div>

        <div className="lg:pt-1">
          {program.target && (
            <div className="rounded-[var(--radius-inner)] bg-mint p-6">
              <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-brand-green-dark uppercase">
                Target
              </p>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed font-semibold text-ink">
                {program.target}
              </p>
            </div>
          )}

          {program.results && (
            <div className={program.target ? "mt-6" : ""}>
              <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                Delivered in 2025
              </p>
              <dl className="mt-4 space-y-4">
                {program.results.map((result) => (
                  <div key={result.label}>
                    <dt className="text-[0.9375rem] font-extrabold text-ink">
                      {result.label}
                    </dt>
                    <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {result.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/*
            Running totals, under their own heading. They cannot go under "Delivered in
            2025" above: these are cumulative "to date" figures, and that heading would date
            them to a year none of them belong to.
          */}
          {program.stats && (
            <div className={program.target || program.results ? "mt-6" : ""}>
              <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                US operations to date
              </p>
              <dl className="mt-4 space-y-4">
                {program.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-[0.9375rem] font-extrabold text-ink">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {stat.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/*
            No rail, so the body prose takes this column. What used to sit here was a line
            announcing the absence, which told the reader something the empty column already
            said, and which the Upcoming badge above says again for a programme not running.
          */}
          {!hasRail && <div className="space-y-4">{body}</div>}
        </div>
      </div>
    </article>
  );
}

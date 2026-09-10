import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PillLink } from "@/components/common/pill-button";
import { ProgramMedia } from "@/components/common/program-media";
import { Section, SectionHead, StatusBadge } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import {
  activePrograms,
  upcomingPrograms,
  type Program,
} from "@/content/programs";
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
          <PillLink href="/get-involved#donate-devices" variant="onDark">
            Donate a device
          </PillLink>
        </div>
      </Section>
    </>
  );
}

function ProgramPanel({ program, tone }: { program: Program; tone: number }) {
  const upcoming = program.status === "upcoming";
  return (
    <article
      id={program.slug}
      className={cn("card card-flush scroll-mt-28", upcoming && "card-quiet")}
    >
      {/* capped: these panels run the full shell width. See the prop for what it caps. */}
      <ProgramMedia slug={program.slug} status={program.status} tone={tone} capped />

      <div className="grid gap-8 p-7 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div>
          <StatusBadge status={program.status} />
          <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.03em] text-balance sm:text-[1.75rem]">
            {program.name}
          </h3>
          {program.partner && (
            <p className="mt-3 text-[0.875rem] font-bold text-brand-green-dark">
              In partnership with {program.partner}
            </p>
          )}
          <p className="mt-4 text-[1.0625rem] leading-relaxed font-semibold text-ink text-pretty">
            {program.summary}
          </p>
          {program.body.map((para) => (
            <p
              key={para.slice(0, 24)}
              className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft text-pretty"
            >
              {para}
            </p>
          ))}
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

          {!program.target && !program.results && !program.stats && (
            <p className="text-[0.875rem] leading-relaxed font-semibold text-ink-faint">
              {upcoming
                ? "Not yet running. No results to report."
                : "No dated results published for this programme yet."}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

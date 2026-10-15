import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Section, SectionHead, TagPill } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import {
  communitiesReached,
  ewasteTotal2025,
  impactTiles2025,
  schoolTourSchools2025,
  schoolTourStudents2025,
} from "@/content/impact";

/**
 * The 2025 dashboard.
 *
 * Shape: one wide feature card carrying the largest figure, then a narrow column of two
 * smaller cards, then a tile row. Asymmetric on purpose: 39,880 lbs and 20 volunteers are
 * not the same size of fact.
 *
 * The wide card used to split its total into two routes (direct and Spectrum E-cycle). The
 * review's 2025 figure, 39,880 lbs, has no stated parts, so the split is gone and the card
 * points to the year-by-year chart on /impact/statistics, which is where that figure's
 * context now lives.
 *
 * Server component. The entry motion is the site's `.rise`, a CSS scroll-driven animation
 * whose resting state is fully visible. See components/common/reveal.tsx.
 */
export function Impact2025() {
  return (
    <Section tone="deep">
      <Reveal>
        <SectionHead
          eyebrow="2025"
          title="2025 at a glance"
          lede={`Across ${schoolTourSchools2025.length} schools in Lagos State, plus US-side redistribution.`}
        />
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <EwasteCard />
        </Reveal>

        <RevealGroup className="grid gap-4">
          <RevealItem>
            <ReachCard />
          </RevealItem>
          <RevealItem>
            <CommunitiesCard />
          </RevealItem>
        </RevealGroup>
      </div>

      <RevealGroup as="ul" className="mt-4 grid gap-4 sm:grid-cols-3">
        {impactTiles2025.map((stat) => (
          <RevealItem as="li" key={stat.label}>
            <StatTile value={stat.value} label={stat.label} detail={stat.detail} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function EwasteCard() {
  return (
    <article className="card flex h-full flex-col justify-between gap-10">
      <div>
        <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
          E-waste upcycled in 2025
        </p>
        <p className="mt-6 flex items-baseline gap-3 text-[3.25rem] leading-[0.88] font-bold tracking-[-0.045em] text-brand-green-dark tabular-nums sm:text-[5rem] lg:text-[6.25rem]">
          {ewasteTotal2025.value}
          <span className="text-[1.125rem] font-bold tracking-[-0.01em] text-ink-faint sm:text-[1.375rem]">
            lbs
          </span>
        </p>
        <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-soft">
          {ewasteTotal2025.label}.
        </p>
      </div>
      <Link
        href="/impact/statistics#ewaste"
        className="inline-flex items-center gap-2 self-start text-[0.9375rem] font-bold text-brand-green-dark underline-offset-4 hover:underline"
      >
        Every year since 2017
        <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
      </Link>
    </article>
  );
}

/*
  `.card-dark` is the system's dark feature block: our dark surface is green. White tints
  stay at or above 70% on that fill, which is where they clear AA. Do not lower them.
*/
function ReachCard() {
  return (
    <article className="card card-dark flex h-full flex-col justify-between gap-10">
      <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-white/75 uppercase">
        People reached
      </p>
      <div>
        <p className="text-[3rem] leading-[0.9] font-bold tracking-[-0.045em] text-white tabular-nums">
          {schoolTourStudents2025.value}
        </p>
        <p className="mt-4 max-w-[26ch] text-[0.9375rem] leading-snug font-bold text-white">
          {schoolTourStudents2025.label}
        </p>
        <p className="mt-2.5 max-w-[30ch] text-[0.8125rem] leading-relaxed text-white/80">
          Through the School Tour Initiative, in Lagos State.
        </p>
      </div>
    </article>
  );
}

function CommunitiesCard() {
  return (
    <article className="card flex h-full flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-badge bg-mint text-brand-green-dark">
          <MapPin className="size-[1.125rem]" strokeWidth={2} aria-hidden />
        </span>
        <h3 className="text-[0.9375rem] font-extrabold tracking-[-0.01em] text-ink">
          Communities reached
        </h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {communitiesReached.map((community) => (
          <li key={community}>
            <TagPill>{community}</TagPill>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* Figure, then label, then detail: the same order as StatBlock. */
function StatTile({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="card h-full transition-colors duration-200 hover:border-brand-green hover:bg-mint">
      <p className="text-[2.25rem] leading-[0.95] font-bold tracking-[-0.04em] text-brand-green-dark tabular-nums sm:text-[2.75rem]">
        {value}
      </p>
      <p className="mt-3 max-w-[26ch] text-[0.875rem] leading-snug text-ink-faint">
        {label}
      </p>
      {detail && (
        <p className="mt-2.5 max-w-[30ch] text-[0.8125rem] leading-relaxed text-ink-faint">
          {detail}
        </p>
      )}
    </div>
  );
}

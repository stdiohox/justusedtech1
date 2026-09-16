import { MapPin } from "lucide-react";
import { Section, SectionHead, TagPill } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import {
  communitiesReached,
  ewasteSplit2025,
  impactTiles2025,
  reached2025,
} from "@/content/impact";
import { cn } from "@/lib/utils";

/**
 * The 2025 dashboard.
 *
 * Shape: one wide feature card carrying the largest figure and the only thing in the 2025
 * set that has parts worth drawing, then a narrow column of two smaller cards, then a tile
 * row. It is asymmetric on purpose. Five equal stat blocks gave every figure the same
 * weight, which is wrong: 45,000 lbs and 20 volunteers are not the same size of fact.
 *
 * On the missing chart. The reference layout this came from put a twelve-point area chart
 * in the wide cell. There is no dated series behind any number on this page, only
 * point-in-time totals, so a trend line here would have to be invented. The wide cell holds
 * a proportion instead, which is a shape the data actually supports: the 45,000 lbs total
 * split into the two routes it is already stated as. If a real month-by-month series
 * arrives later, that is the moment to reconsider, not before.
 *
 * Server component. The entry motion is the site's `.rise`, a CSS scroll-driven animation
 * whose resting state is fully visible, rather than a `whileInView` variant that renders at
 * opacity 0 and needs JavaScript to undo. See components/common/reveal.tsx for why that
 * rule exists.
 */
export function Impact2025() {
  return (
    <Section tone="deep">
      <Reveal>
        <SectionHead
          eyebrow="2025"
          title="2025 at a glance"
          lede="Across 8 schools in Lagos State, plus US-side redistribution. Every figure here is confirmed. Nothing is projected."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <EwasteCard />
        </Reveal>

        {/*
          One column at every width, not two below lg. Side by side, the communities card
          stretches to the reach card's height and goes hollow: three tag pills cannot fill
          380px, and letting the bottoms go ragged instead reads as a broken grid rather than
          as a choice. Stacked full width, both cards are the height of their own content.
        */}
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

/* ------------------------------------------------------------------ *
 * Wide cell: the e-waste total, and the two routes it arrived by.
 * ------------------------------------------------------------------ */

/*
  Two fills, not a ramp of greens. The segments are two different routes, not two steps of
  one quantity, so they take the two brand colours that read as peers on white:
  --brand-green-dark for the work we do ourselves and --brand-gold for the partner's share.
  Gold against green is also the one pairing in the kit that survives the common forms of
  colour blindness, which a second green would not.
*/
const SEGMENT_FILL = ["bg-brand-green-dark", "bg-brand-gold"];

function EwasteCard() {
  const { total, unit, caption, segments } = ewasteSplit2025;

  return (
    <article className="card flex h-full flex-col justify-between gap-10">
      <div>
        <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
          E-waste upcycled in 2025
        </p>
        {/*
          The largest figure on the page, and sized like it. The wide cell is as tall as the
          two cards beside it, so a 4rem number left a hole in the middle of the card; this
          fills it with the thing the card is actually about rather than with padding.
        */}
        <p className="mt-6 flex items-baseline gap-3 text-[3.25rem] leading-[0.88] font-bold tracking-[-0.045em] text-brand-green-dark tabular-nums sm:text-[5rem] lg:text-[6.25rem]">
          {total}
          <span className="text-[1.125rem] font-bold tracking-[-0.01em] text-ink-faint sm:text-[1.375rem]">
            {unit}
          </span>
        </p>
      </div>

      <div>
        {/*
          The caption sits with the bar, not under the total, because it is the bar's label:
          "by route" describes the split, and the split is the thing directly beneath it.
        */}
        <p className="mb-5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-soft">
          {caption}
        </p>
        {/*
          Grid rather than flex, with each column sized in `fr` off the stated weight. The
          gap is subtracted from the track sizes before the fractions are resolved, so the
          two segments still hold their true 20,000 to 25,000 ratio with a visible gutter
          between them. Percentage widths plus a gap would have overflowed by the gap.

          aria-hidden, because the bar carries no information the legend below does not
          state in words. A reader who cannot see the proportion loses nothing.
        */}
        <div
          aria-hidden
          className="split-bar grid h-4 gap-1.5"
          style={{
            gridTemplateColumns: segments.map((s) => `${s.lbs}fr`).join(" "),
          }}
        >
          {segments.map((segment, i) => (
            <span
              key={segment.label}
              className={cn("h-full rounded-full", SEGMENT_FILL[i])}
            />
          ))}
        </div>

        {/*
          The route is the term and the weight is its value, so that is the DOM order and a
          screen reader hears "Collected and upcycled directly, 20,000+ lbs". `flex-col-reverse`
          flips only the paint order, putting the figure on top where the eye wants it. Spacing
          is `gap`, not a margin, because a margin would push the wrong way under the reverse.
        */}
        <dl className="mt-7 grid gap-6 sm:grid-cols-2">
          {segments.map((segment, i) => (
            <div key={segment.label} className="flex gap-3">
              <span
                aria-hidden
                className={cn(
                  "mt-1.5 size-2.5 shrink-0 rounded-full",
                  SEGMENT_FILL[i],
                )}
              />
              <div className="flex flex-col-reverse gap-2">
                <dt className="max-w-[26ch] text-[0.8125rem] leading-relaxed text-ink-faint">
                  {segment.label}
                </dt>
                <dd className="text-[1.375rem] leading-none font-bold tracking-[-0.03em] text-ink tabular-nums">
                  {segment.display}
                  <span className="ml-1.5 text-[0.8125rem] font-bold tracking-normal text-ink-faint">
                    {unit}
                  </span>
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Narrow column: the reach figure, then where it happened.
 * ------------------------------------------------------------------ */

/*
  The reference put a neutral zinc-900 block here. A black card dropped into a warm paper
  page reads as a paste artefact, so this takes `.card-dark`, which is the system's answer
  to a dark feature block: our dark surface is green. White tints stay at or above 70% on
  that fill, which is where they clear AA. Do not lower them.
*/
function ReachCard() {
  return (
    <article className="card card-dark flex h-full flex-col justify-between gap-10">
      <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-white/75 uppercase">
        People reached
      </p>
      <div>
        <p className="text-[3rem] leading-[0.9] font-bold tracking-[-0.045em] text-white tabular-nums">
          {reached2025.value}
        </p>
        <p className="mt-4 max-w-[26ch] text-[0.9375rem] leading-snug font-bold text-white">
          {reached2025.label}
        </p>
        {reached2025.detail && (
          <p className="mt-2.5 max-w-[30ch] text-[0.8125rem] leading-relaxed text-white/80">
            {reached2025.detail}
          </p>
        )}
      </div>
    </article>
  );
}

/**
 * The communities list used to sit under the stat grid as a loose sentence, which is where
 * a fact goes when no one has decided what it is. It is a card here: the answer to "460+
 * people, but where" belongs next to the number it qualifies.
 */
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

/* ------------------------------------------------------------------ *
 * Tile row.
 * ------------------------------------------------------------------ */

/*
  Figure first, then label, then detail: the same order as StatBlock, which is the stat
  idiom everywhere else on the site. A boxed tile is a different container, not a different
  way of reading a number.

  No trend chip. The reference hung a "+12.5%" beside every figure, and there is no
  period-over-period series behind any of these, so there is nothing a chip could honestly
  say. The hover is the whole interaction: the hairline warms to brand green and the fill
  steps to mint.
*/
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

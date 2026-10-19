import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CardCarousel } from "@/components/common/card-carousel";
import { PillLink } from "@/components/common/pill-button";
import { ProgramMedia } from "@/components/common/program-media";
import { SectionHead, StatusBadge } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { hasDetailPage } from "@/content/program-details";
import { activePrograms, programsIntro } from "@/content/programs";
import { cn } from "@/lib/utils";

/**
 * Asymmetric bento. The first active programme takes a wide cell with a coloured fill, the
 * rest run smaller.
 *
 * Active only. The second cell of the top row used to hold one upcoming programme, so the
 * ACTIVE and UPCOMING distinction was visible without leaving the home page. It is gone:
 * this block is the top-of-page spotlight, and a spotlight advertises work that is running.
 * The distinction still reads on /programs, where In development is its own section under
 * the active list and GreenBin 360 Smart Bin Ecosystem carries the Upcoming badge.
 *
 * Every active programme gets a cell, in catalogue order, so the count in the heading is the
 * count on screen. Twelve columns from lg: the featured cell (8) and the second (4) share
 * the first row; below lg the two stack. The rest run in a sideways carousel under them.
 * They used to take a row of 3 columns each, which set four cards in about 330px apiece and
 * squeezed the summaries and figures into narrow columns. In the carousel each card keeps a
 * readable width however many programmes there are.
 *
 * Every cell is the same Category Card: a media band flush to the card's own edges, then a
 * 28px body carrying the status badge, the title, the summary, and up to three headline
 * figures. Card height is bounded by that cap rather than by how much a programme has
 * delivered, which is what stopped one long programme stretching its whole row into empty
 * space. The full results live on each programme's page.
 */
export function ProgramsPreview() {
  const [featured, second, ...rest] = activePrograms;

  return (
    <section className="bg-paper py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <SectionHead title={programsIntro.title} lede={programsIntro.lede} />
        </Reveal>

        {/*
          The review's three intro paragraphs, one per column from lg, all in the same body
          style.

          They used to split one-against-two: the first paragraph alone on the left at lede
          weight, the other two on the right. That read as two different voices, and the left
          column ended well short of the right. The three are close in length (155 to 190
          characters), so a column each ends them within a line of one another, and no
          sentence breaks across a column the way a two-column text flow would. Below lg they
          stack at a readable measure.
        */}
        <Reveal
          delay={0.06}
          className="mt-8 grid max-w-[65ch] gap-4 lg:max-w-none lg:grid-cols-3 lg:gap-12"
        >
          {programsIntro.body.map((para) => (
            <p
              key={para}
              className="text-[1.0625rem] leading-relaxed text-ink-soft text-pretty"
            >
              {para}
            </p>
          ))}
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-12">
          <RevealItem className="lg:col-span-8">
            <ProgramCard program={featured!} tone={0} featured />
          </RevealItem>
          <RevealItem className="lg:col-span-4">
            <ProgramCard program={second!} tone={1} />
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-4">
          <CardCarousel
            label="More programmes"
            footer={
              <PillLink href="/programs" variant="outline" flow>
                All programmes
              </PillLink>
            }
          >
            {rest.map((program, i) => (
              <ProgramCard key={program.slug} program={program} tone={i + 2} />
            ))}
          </CardCarousel>
        </Reveal>
      </div>
    </section>
  );
}

/*
  There was a HOME_FIGURES_WITHHELD set here, holding one slug.

  It existed to keep Breakthrough Series' figures off the home bento, because its only
  result was a named individual's story and a card wide enough for figures is not a reason
  to promote a person onto the home page. That result has since been removed from the
  catalogue at the client's request, so the set had nothing left to withhold: with no
  results and no stats the card renders no figures either way, and the check was dead.

  Worth knowing if per-surface suppression is wanted again. The reasoning above was the bar
  for adding a slug, and it should stay the bar: a real reason a surface must not carry
  something, not a wish for a tidier card.
*/

function ProgramCard({
  program,
  tone,
  featured = false,
}: {
  program: (typeof activePrograms)[number];
  tone: number;
  featured?: boolean;
}) {
  /*
    Headline figures only: `highlights` where a programme sets them, else its running totals,
    else its results. Three on the featured card's three columns, two on a small card.
  */
  const metrics = (program.highlights ?? program.stats ?? program.results)?.slice(
    0,
    featured ? 3 : 2,
  );
  return (
    <Link
      /*
        The detail page, not the anchor on /programs. Every card in this bento comes from
        activePrograms and every active programme has a page, so there is no case here where
        this resolves to nothing. Checked with hasDetailPage rather than assumed, because the
        catalogue is what would change first.
      */
      href={
        hasDetailPage(program.slug)
          ? `/programs/${program.slug}`
          : `/programs#${program.slug}`
      }
      className={cn(
        "group/card card card-flush flex h-full flex-col",
        "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1",
        featured && "card-dark",
      )}
    >
      <ProgramMedia
        slug={program.slug}
        status={program.status}
        tone={tone}
        onDark={featured}
        wide={featured}
      />

      {/*
        Hover lift. The body panel slides up over the foot of the photograph, which is the
        tactile half of the card responding to the pointer alongside the existing card rise.

        It carries the card's own fill rather than being transparent. Without that the type
        would ride over the photograph mid-transition and be unreadable for the length of
        the animation, and the panel would not read as a solid thing being moved.

        No gap opens under it: the strip it uncovers at the card's foot is the card's own
        background, which is the colour the panel is painted in.

        [@media(hover:hover)] rather than a breakpoint. A width query would still hand this
        to a touch tablet, where the state sticks after a tap and there is no pointer to
        take it away again.

        motion-reduce holds the panel at rest with no transition. Nothing here carries
        meaning, so there is nothing to substitute when the motion is dropped.
      */}
      <div
        className={cn(
          "relative flex flex-1 flex-col p-7",
          featured ? "bg-[var(--surface-dark)]" : "bg-[var(--surface-card)]",
          "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "[@media(hover:hover)]:group-hover/card:-translate-y-3",
          /*
            Under reduced motion the panel still takes the lifted position, it just arrives
            there instantly instead of travelling. Dropping the transition is the whole fix:
            what that setting asks us to remove is the movement between two states, and an
            instant state change on hover is not movement to remove.

            Only transition-none is listed. A translate reset would need to out-specify the
            hover rule above, whose :is(:where(.group/card):hover *) carries more weight
            than a bare utility class, so adding one would read as a guard while doing
            nothing. Worth knowing if the lift should be dropped entirely here instead: that
            needs specificity, not another utility.
          */
          "motion-reduce:transition-none",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <StatusBadge
            status={program.status}
            className={featured ? "bg-white text-brand-green-dark" : undefined}
          />
          {/*
            The arrow used to sit here alone. It now carries a label, because the cards point
            at a detail page per programme rather than at an anchor further down /programs,
            and a bare glyph does not say that a whole page is behind it. Both move together
            on hover, so the affordance still reads as one object.
          */}
          <span
            className={cn(
              "flex shrink-0 items-center gap-1.5 text-[0.8125rem] font-bold",
              "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5",
              featured ? "text-white/80" : "text-ink-faint",
            )}
          >
            Learn more
            <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
          </span>
        </div>

        <h3
          className={cn(
            "mt-5 font-extrabold tracking-[-0.025em] text-balance",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {program.name}
        </h3>

        <p
          className={cn(
            "mt-3 text-[0.9375rem] leading-relaxed text-pretty",
            featured ? "max-w-[46ch] text-white/80" : "text-ink-soft",
          )}
        >
          {program.summary}
        </p>

        <div className="mt-auto pt-6">
          {program.partner && (
            <p
              className={cn(
                "text-[0.8125rem] font-bold",
                featured ? "text-white/70" : "text-ink-faint",
              )}
            >
              With {program.partner}
            </p>
          )}

          {/*
            The figures footer: the figure set large in the brand green (white on the dark
            featured card), its label under it in full. No line clamp: the cap on how many
            figures a card shows already bounds its height, and clamping cut the client's
            wording mid-phrase. Three columns on the featured card from sm, one column on a
            small card, where three would set each figure in about 10 characters of width.
          */}
          {metrics && (
            <dl
              className={cn(
                "mt-4 grid gap-x-8 gap-y-5 border-t pt-6",
                featured ? "border-white/20 sm:grid-cols-3" : "border-edge",
              )}
            >
              {metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse justify-end gap-1.5">
                  {/*
                    Label is the term, figure its value; flex-col-reverse paints the figure
                    first. justify-end is what pins it to the top: in a reversed column the
                    main axis runs bottom to top, so without it every figure sat at the foot
                    of its cell and a shorter label dropped its figure below its neighbours'.
                  */}
                  <dt
                    className={cn(
                      "text-[0.8125rem] leading-snug text-pretty",
                      featured ? "text-white/75" : "text-ink-soft",
                    )}
                  >
                    {metric.detail}
                  </dt>
                  <dd
                    className={cn(
                      "text-[1.375rem] leading-tight font-extrabold tracking-[-0.02em] tabular-nums",
                      featured ? "text-white" : "text-brand-green-dark",
                    )}
                  >
                    {metric.label}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </Link>
  );
}

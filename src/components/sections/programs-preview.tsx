import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PillLink } from "@/components/common/pill-button";
import { ProgramMedia } from "@/components/common/program-media";
import { SectionHead, StatusBadge } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { activePrograms } from "@/content/programs";
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
 * The five cells are simply the first five active programmes in catalogue order, which is
 * what removes the duplicate the old shape risked: one contiguous slice cannot repeat an
 * entry, where a hand-picked promotion could have put GreenBin 360 in the top row while it
 * was already sitting in the grid below.
 *
 * Five is the number the layout wants, not a preference. The grid is six columns, the
 * featured cell spans four, so one small cell finishes its row and three fill the next.
 *
 * Every cell is the same Category Card: a media band flush to the card's own edges, then a
 * 28px body carrying the status badge, the title, and the summary.
 */
export function ProgramsPreview() {
  const [featured, ...rest] = activePrograms.slice(0, 5);

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHead
            title="Six programmes, running on the same pipeline"
            lede="Collection in St. Louis feeds refurbishment, and refurbishment feeds every programme below."
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-6">
          <RevealItem className="md:col-span-4">
            <ProgramCard program={featured!} tone={0} featured />
          </RevealItem>
          {rest.map((program, i) => (
            <RevealItem key={program.slug} className="md:col-span-2">
              <ProgramCard program={program} tone={i + 1} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10">
          <PillLink href="/programs" variant="outline">
            All programmes
          </PillLink>
        </Reveal>
      </div>
    </section>
  );
}

function ProgramCard({
  program,
  tone,
  featured = false,
}: {
  program: (typeof activePrograms)[number];
  tone: number;
  featured?: boolean;
}) {
  /* No card-quiet branch: every cell here comes from activePrograms now. */
  return (
    <Link
      href={`/programs#${program.slug}`}
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
          <ArrowUpRight
            className={cn(
              "size-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5",
              featured ? "text-white/70" : "text-ink-faint",
            )}
            strokeWidth={1.75}
            aria-hidden
          />
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

          {/* The featured cell is tall, so it carries its verified 2025 results. */}
          {featured && program.results && (
            <dl className="mt-4 grid gap-x-8 gap-y-4 border-t border-white/20 pt-6 sm:grid-cols-3">
              {program.results.map((result) => (
                <div key={result.label}>
                  <dt className="text-[0.8125rem] font-extrabold text-white">
                    {result.label}
                  </dt>
                  <dd className="mt-1 text-[0.8125rem] leading-snug text-white/75">
                    {result.detail}
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

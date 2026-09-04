import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PillLink } from "@/components/common/pill-button";
import { SectionHead, StatusBadge } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { activePrograms, upcomingPrograms } from "@/content/programs";
import { cn } from "@/lib/utils";

/**
 * Asymmetric bento. The first active programme takes a wide cell with a coloured fill,
 * the rest run smaller. One upcoming programme is shown in the grid so the ACTIVE and
 * IN DEVELOPMENT distinction is visible on the home page, not just on /programs.
 */
export function ProgramsPreview() {
  const featured = activePrograms[0]!;
  const rest = activePrograms.slice(1, 4);
  const upcoming = upcomingPrograms[0]!;

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
            <ProgramCard program={featured} featured />
          </RevealItem>
          <RevealItem className="md:col-span-2">
            <ProgramCard program={upcoming} />
          </RevealItem>
          {rest.map((program) => (
            <RevealItem key={program.slug} className="md:col-span-2">
              <ProgramCard program={program} />
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
  featured = false,
}: {
  program: (typeof activePrograms)[number];
  featured?: boolean;
}) {
  const upcoming = program.status === "upcoming";
  return (
    <Link
      href={`/programs#${program.slug}`}
      className={cn(
        "group/card flex h-full flex-col rounded-[var(--radius-card)] p-6 transition-all duration-500 sm:p-8",
        "ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1",
        featured
          ? "bg-green-surface text-white shadow-[var(--shadow-lift)]"
          : upcoming
            ? "border border-dashed border-[color:rgba(18,33,26,0.22)] bg-transparent hover:border-solid hover:bg-white"
            : "border border-[color:var(--hairline)] bg-white shadow-[var(--shadow-soft)]",
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
          "mt-6 font-extrabold tracking-[-0.025em] text-balance",
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
    </Link>
  );
}

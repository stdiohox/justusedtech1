import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Cpu,
  Handshake,
  Layers,
  Leaf,
  Lightbulb,
  Package,
  Recycle,
  Repeat,
  ScrollText,
  Sparkles,
  Target,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PillLink } from "@/components/common/pill-button";
import { ProgramMedia } from "@/components/common/program-media";
import {
  Section,
  SectionHead,
  StatBlock,
  StatusBadge,
  TagPill,
} from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { BentoGallery } from "@/components/ui/bento-gallery";
import { ElasticGallery, type GalleryPhoto } from "@/components/ui/elastic-gallery";
import { ImageAccordion } from "@/components/ui/image-accordion";
import { MosaicGallery } from "@/components/ui/mosaic-gallery";
import type { ProgramDetail } from "@/content/program-details";
import { programDetails } from "@/content/program-details";
import { programs } from "@/content/programs";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(programDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  const detail = programDetails[slug];
  if (!program || !detail) return {};
  return { title: program.name, description: detail.tagline };
}

/*
  Objective icons, per programme, cycled across that programme's objective cells.

  Presentation rather than copy, so the map lives here rather than in src/content, the same
  split ProgramMedia already makes for its programme icons. Each set is chosen for the
  programme it belongs to: teaching marks for the school tour, hardware marks for the
  bootcamp, logistics marks for GreenBin.
*/
const OBJECTIVE_ICONS: Record<string, LucideIcon[]> = {
  "school-tour-initiative": [BookOpen, Repeat, Recycle, Users],
  "breakthrough-series": [Package, Sparkles, Handshake, ScrollText],
  "project-9-12": [Users, Package, Target, Repeat],
  "greenbin-360": [Truck, Wrench, Handshake, Layers],
  "circular-tech-bootcamp": [Cpu, Leaf, Lightbulb, Recycle],
};

export default async function ProgramDetailPage({ params }: Params) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  const detail = programDetails[slug];
  if (!program || !detail) notFound();

  const icons = OBJECTIVE_ICONS[slug] ?? [Target];
  /* Dated delivery, kept distinct from `detail.targets` everywhere it appears. */
  const delivered = program.results ?? program.stats;

  return (
    <>
      {/*
        Not PageHero. That masthead takes a fixed eyebrow, title, and lede and centres a
        media column beside them; this page needs the status badge and the partner credit
        above the title, which is the one thing it cannot express. Everything else about the
        band is copied from it, including the radial wash and the dock sentinel, so the two
        mastheads still read as the same object.
      */}
      <section className="relative overflow-hidden bg-paper pt-14 pb-16 md:pt-20 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(760px 420px at 8% 0%, rgba(0,166,82,0.09), transparent 62%)",
          }}
        />
        <div className="shell">
          <Reveal>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-[0.875rem] font-bold text-ink-soft transition-colors duration-300 hover:text-brand-green-dark"
            >
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
              All programmes
            </Link>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <StatusBadge status={program.status} />
              {program.partner && (
                <span className="text-[0.875rem] font-bold text-brand-green-dark">
                  With {program.partner}
                </span>
              )}
            </div>

            <h1 className="mt-5 max-w-[20ch] text-[2.25rem] leading-[1.04] font-extrabold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.5rem]">
              {program.name}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-soft text-pretty sm:text-lg">
              {detail.tagline}
            </p>
          </Reveal>
        </div>
        <div id="dock-sentinel" aria-hidden className="h-px w-full" />
      </section>

      {/* Lead photograph, in the same panel band /programs uses. */}
      <Section tone="white" className="!pt-0">
        <Reveal>
          <div className="overflow-hidden rounded-card border border-edge">
            <ProgramMedia slug={program.slug} status={program.status} tone={0} panel />
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <div className="max-w-[60ch] space-y-5">
            {detail.overview.map((para) => (
              <p
                key={para.slice(0, 24)}
                className="text-[1.0625rem] leading-relaxed text-ink-soft text-pretty"
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        {/*
          Stated rather than hidden. A programme with no published design skips five sections
          in a row, and without this the page reads as though half of it failed to load.

          It sits inside the overview section rather than taking one of its own. As its own
          section it stacked two lots of section padding around a single short paragraph and
          opened a screen-height gap above itself, which is the one thing a note explaining an
          absence should not do.
        */}
        {detail.pending && (
          <Reveal className="mt-10">
            <div className="max-w-[60ch] rounded-card border border-edge bg-[var(--surface-subtle)] p-7">
              <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                Programme design
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                {detail.pending}
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      {detail.context && (
        <Section tone="deep">
          <Reveal>
            <SectionHead
              title="Why this exists"
              lede="The conditions the programme was designed against."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
            {detail.context.map((item) => (
              <RevealItem key={item.title}>
                <div className="h-full rounded-card border border-edge bg-white p-7">
                  <h3 className="text-lg font-extrabold tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {detail.objectives && (
        <Section tone="white">
          <Reveal>
            <SectionHead
              title="What the programme is for"
              lede="The objectives the design document sets, in its own terms."
            />
          </Reveal>
          <Reveal className="mt-12">
            <BentoGrid>
              {detail.objectives.map((objective, i) => (
                <BentoCard
                  key={objective.label}
                  name={objective.label}
                  description={objective.detail}
                  Icon={icons[i % icons.length]}
                  /* One weighted cell per grid, and it leads. */
                  tone={i === 0 ? "mint" : "paper"}
                  className={i === 0 ? "sm:col-span-2" : undefined}
                />
              ))}
            </BentoGrid>
          </Reveal>
        </Section>
      )}


      {/*
        Targets and delivered results are deliberately two separate sections with two
        different headings, never one merged row of numbers. A target is a plan and a result
        is a record, and the whole content policy for this site rests on a reader being able
        to tell which is which without reading the small print.
      */}
      {detail.targets && (
        <Section tone="mint">
          <Reveal>
            <SectionHead
              title="Targets"
              lede="Figures the programme is working towards. These are planned, not delivered."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {detail.targets.map((target) => (
              <RevealItem key={target.figure}>
                <StatBlock value={target.figure} label={target.detail} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {delivered && (
        <Section tone="white">
          <Reveal>
            <SectionHead
              title={program.results ? "Delivered in 2025" : "US operations to date"}
              lede={
                program.results
                  ? "Dated delivery, verified. Nothing here is a projection."
                  : "Running totals for the collection operation, cumulative rather than dated."
              }
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-8 md:grid-cols-3">
            {delivered.map((item) => (
              <RevealItem key={item.label}>
                <div className="border-t border-edge pt-6">
                  <p className="text-[1.0625rem] font-extrabold tracking-[-0.02em] text-ink">
                    {item.label}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {item.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {detail.activities && (
      <Section tone="deep">
        <Reveal>
          <SectionHead title="How it runs" lede="The activities that make up the programme." />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2">
          {detail.activities.map((activity, i) => (
            <RevealItem key={activity.title}>
              <div className="flex h-full gap-5 rounded-card border border-edge bg-white p-7">
                <span
                  aria-hidden
                  className="mt-0.5 shrink-0 text-[0.875rem] font-extrabold text-brand-green-dark tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-[-0.02em] text-ink">
                    {activity.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                    {activity.detail}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
      )}

      {detail.phases && (
        <Section tone="white">
          <Reveal>
            <SectionHead title="Timeline" lede="The delivery phases as planned." />
          </Reveal>
          <RevealGroup className="mt-12 space-y-0">
            {detail.phases.map((phase) => (
              <RevealItem key={phase.label}>
                <div className="grid gap-3 border-t border-edge py-7 md:grid-cols-[12rem_1fr] md:gap-10">
                  <div>
                    <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-brand-green-dark uppercase">
                      {phase.window}
                    </p>
                    <p className="mt-2 text-[1.0625rem] font-extrabold tracking-[-0.02em] text-ink">
                      {phase.label}
                    </p>
                  </div>
                  <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                    {phase.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {detail.gallery && detail.gallery.length > 0 && (
        <Section tone="deep">
          <Reveal>
            <SectionHead
              title="From the field"
              /*
                Copy about the photographs, written per programme. It is not generated from
                the count and the gallery style any more: that line counted the frames the
                reader can see and then explained the widget, which the gallery says for
                itself underneath.
              */
              lede={detail.galleryLede}
            />
          </Reveal>
          <Reveal className="mt-12">
            <ProgramGallery photos={detail.gallery} style={detail.galleryStyle} />
          </Reveal>
        </Section>
      )}

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-ink sm:text-3xl">
              Who it is for
            </h2>
            <p className="mt-6 text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
              Primary
            </p>
            <ul className="mt-4 space-y-2.5">
              {detail.audience.primary.map((item) => (
                <li
                  key={item}
                  className="text-[0.9375rem] leading-relaxed text-ink-soft text-pretty"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
              Secondary
            </p>
            <ul className="mt-4 space-y-2.5">
              {detail.audience.secondary.map((item) => (
                <li
                  key={item}
                  className="text-[0.9375rem] leading-relaxed text-ink-soft text-pretty"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {(detail.outcomes || detail.measurement) && (
            <Reveal delay={0.05}>
              {detail.outcomes && (
                <>
                  <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-ink sm:text-3xl">
                    Expected outcomes
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {detail.outcomes.map((item) => (
                      <li
                        key={item}
                        className="text-[0.9375rem] leading-relaxed text-ink-soft text-pretty"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {detail.measurement && (
                <>
                  <p className="mt-10 text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                    How it is measured
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {detail.measurement.map((item) => (
                      <TagPill key={item}>{item}</TagPill>
                    ))}
                  </div>
                </>
              )}
            </Reveal>
          )}
        </div>
      </Section>

      {detail.sdgs && (
        <Section tone="mint">
          <Reveal>
            <SectionHead
              title="Aligned goals"
              lede="The Sustainable Development Goal targets this programme is designed against."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-8 md:grid-cols-3">
            {detail.sdgs.map((goal) => (
              <RevealItem key={goal.code}>
                <div className="border-t border-brand-green-dark/20 pt-6">
                  <p className="text-[1.0625rem] font-extrabold tracking-[-0.02em] text-brand-green-dark">
                    {goal.code}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                    {goal.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      <Section tone="green">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHead
            onGreen
            title="Every programme runs on donated hardware."
            lede="If your organisation is retiring devices, that is where a programme starts."
            className="max-w-xl"
          />
          <div className="flex flex-wrap gap-3">
            <PillLink href="/get-involved#donate-devices" variant="onDark">
              Donate a device
            </PillLink>
            <PillLink href="/programs" variant="onDark" bare>
              All programmes
            </PillLink>
          </div>
        </div>
      </Section>
    </>
  );
}

/**
 * Picks the gallery treatment for a programme.
 *
 * A single photograph short-circuits every style: there is nothing to accordion, drag, or
 * lay out against, so ElasticGallery's one-frame branch renders it plainly. That check lives
 * here rather than in four components, so no style has to carry the case.
 */
function ProgramGallery({
  photos,
  style,
}: {
  photos: GalleryPhoto[];
  style: ProgramDetail["galleryStyle"];
}) {
  if (photos.length < 2) return <ElasticGallery photos={photos} />;
  if (style === "bento") return <BentoGallery photos={photos} />;
  if (style === "accordion") return <ImageAccordion photos={photos} />;
  if (style === "mosaic") return <MosaicGallery photos={photos} />;
  return <ElasticGallery photos={photos} />;
}

/* Missing slug is a 404 rather than a silent empty page. */
export const dynamicParams = false;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { PillLink } from "@/components/common/pill-button";
import {
  PhotoPlaceholder,
  Section,
  SectionHead,
  StatBlock,
  TagPill,
} from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { MosaicGallery } from "@/components/ui/mosaic-gallery";
import { PhotoShowcase } from "@/components/ui/photo-showcase";
import { collections } from "@/content/gallery";
import {
  newsShowcase,
  posts,
  press,
  schoolVisits,
  schoolsVisited,
  type Post,
  type PressItem,
  type SchoolVisit,
} from "@/content/news";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description:
    "Programme updates, the School Tour Initiative visit log, press coverage of JustUsedTech, and photographs from the field.",
};

/*
  One page, four registers. The news section used to be two posts on a white ground, which
  read as an afterthought next to a site that has more to say. What was missing was not more
  posts (posts need events, and events come at their own pace) but the other things an
  organisation like this accumulates: a field log of where the team has been, the coverage
  it has picked up elsewhere, and the photographs. All three are real content the site
  already had or was handed, and none of them needed a body to be written.

  They are sections with anchors rather than tabs. Tabs would hide three quarters of the
  page from a search engine and from anyone arriving on a shared link, and the sections
  are different enough in shape that stacking them reads as a magazine rather than a list.
*/

const sections = [
  ["Updates", "#updates"],
  ["School tour log", "#school-tour"],
  ["In the press", "#press"],
  ["Gallery", "#gallery"],
] as const;

export default function NewsPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="News"
        title="What has been happening."
        lede="Programme updates, the school tour log, coverage elsewhere, and photographs from the field. Posted as they happen."
        /*
          The same photo showcase the about masthead carries, fed from this page's own
          content: three posts with pictures and the press coverage. It fills the right half
          of the masthead that was empty, and it means the page opens on the photographs
          rather than on a list of section names.
        */
        media={<PhotoShowcase items={newsShowcase} fitLabels />}
        align="start"
        actions={
          <ul className="flex flex-wrap gap-2.5">
            {sections.map(([label, href]) => (
              <li key={href}>
                {/*
                  A size down from the bare pill's default. Four of them in a row under a
                  short lede read as a second row of buttons at full size; at this size they
                  read as what they are, a table of contents.
                */}
                <PillLink
                  href={href}
                  variant="outline"
                  bare
                  className="px-4 py-2.5 text-[0.875rem]"
                >
                  {label}
                </PillLink>
              </li>
            ))}
          </ul>
        }
      />

      {/* Updates */}
      <Section id="updates" tone="white">
        <Reveal>
          <SectionHead
            eyebrow="Updates"
            title="Events and programme updates."
            lede="Each of these has its own page. Dates appear only where they are confirmed."
          />
        </Reveal>
        {featured && (
          <Reveal delay={0.06} className="mt-12">
            <PostCard post={featured} featured />
          </Reveal>
        )}
        {rest.length > 0 && (
          <RevealGroup as="ul" className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((post) => (
              <RevealItem as="li" key={post.slug}>
                <PostCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>

      {/* School tour log */}
      <Section id="school-tour" tone="deep">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Field log"
              title="School Tour Initiative, 2026."
              lede="Every visit the team has made this year, in the order they were made. A visit without a confirmed date is listed without one rather than given a likely one."
            />
            {/*
              The Impact page's stat treatment, not a private smaller one: the numbers are
              the same kind of fact as the ones over there, and they should look like it.
              Both counts come from the log, so they cannot drift from the rows beside them.
            */}
            <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8">
              <StatBlock
                value={String(schoolVisits.length)}
                label="Visits between 1 July and 20 August 2026"
              />
              <StatBlock
                value={String(schoolsVisited.length)}
                label="Schools across Yaba, Ebute Metta, Fadeyi, and Ikorodu"
              />
            </div>
            <div className="mt-9">
              <PillLink
                href="/programs/school-tour-initiative"
                variant="outline"
              >
                About the programme
              </PillLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <VisitLog visits={schoolVisits} />
          </Reveal>
        </div>
      </Section>

      {/* In the press */}
      <Section id="press" tone="white">
        <Reveal>
          <SectionHead
            eyebrow="In the press"
            title="Coverage elsewhere."
            lede="Articles, features, and posts about JustUsedTech and its founder. Every link opens the outlet's own page."
          />
        </Reveal>
        <RevealGroup
          as="ul"
          className="mt-12 divide-y divide-edge border-y border-edge"
        >
          {press.map((item) => (
            <RevealItem as="li" key={item.href}>
              <PressRow item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Gallery */}
      <Section id="gallery" tone="deep">
        <Reveal>
          <SectionHead
            eyebrow="Gallery"
            title="From the field."
            lede="Photographs from JustUsedTech's own programmes and events. Open any frame to see it full size."
          />
        </Reveal>
        <div className="mt-12 space-y-16 md:space-y-20">
          {collections.map((collection, i) => (
            <Reveal key={collection.id} delay={Math.min(i, 3) * 0.04}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <h3 className="text-xl leading-tight font-extrabold tracking-[-0.02em] text-ink sm:text-2xl">
                    {collection.title}
                  </h3>
                  {collection.lede && (
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
                      {collection.lede}
                    </p>
                  )}
                </div>
                <Link
                  href={collection.href}
                  className="inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-bold text-brand-green-dark underline-offset-4 hover:underline"
                >
                  {collection.hrefLabel}
                  <ArrowUpRight
                    className="size-4"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                </Link>
              </div>
              <MosaicGallery photos={collection.photos} className="mt-6" />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

/*
  A post card leads on its first photograph where it has one, and on the branded placeholder
  where it does not. The placeholder is the honest state for a post whose event was not
  photographed, and it is what keeps a card from borrowing a programme photograph that was
  taken somewhere else.

  Featured is the first post: full width, media beside the text rather than above it, so the
  newest thing on the page is also the largest.
*/
function PostCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  const lead = post.cover ?? post.gallery?.[0];
  const tone = post.slug.length % 3;

  return (
    <Link
      href={`/news/${post.slug}`}
      className={cn(
        "group/post block h-full overflow-hidden rounded-card border border-edge bg-white",
        "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1",
        featured && "lg:grid lg:grid-cols-2",
      )}
    >
      <div
        className={cn(
          "relative",
          featured
            ? "aspect-[16/10] lg:aspect-auto lg:h-full"
            : "aspect-[16/10]",
        )}
      >
        {lead ? (
          <Image
            src={lead.src}
            alt={lead.alt}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 620px, 100vw"
                : "(min-width: 768px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/post:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <PhotoPlaceholder
            tone={tone}
            caption={`${post.title}, ${post.location}`}
            className="absolute inset-0 h-full rounded-none border-0"
          />
        )}
      </div>
      <div
        className={cn(
          "p-7 sm:p-8",
          featured && "lg:flex lg:flex-col lg:justify-center lg:p-12",
        )}
      >
        {post.date && (
          <p className="text-[0.8125rem] font-bold text-ink-faint">
            <time dateTime={post.iso}>{post.date}</time>
          </p>
        )}
        <h3
          className={cn(
            "mt-3 max-w-[24ch] leading-tight font-extrabold tracking-[-0.03em] text-balance first:mt-0",
            featured ? "text-2xl sm:text-[2rem]" : "text-xl sm:text-2xl",
          )}
        >
          {post.title}
        </h3>
        <p className="mt-3 max-w-[58ch] text-[1rem] leading-relaxed text-ink-soft text-pretty">
          {post.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <TagPill>{tag}</TagPill>
              </li>
            ))}
          </ul>
          <ArrowUpRight
            className="size-5 shrink-0 text-ink-faint transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/post:translate-x-0.5 group-hover/post:-translate-y-0.5"
            strokeWidth={1.75}
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}

/*
  Visits grouped by month, in supplied order within each month. The grouping comes from the
  ISO date, so a visit with no date falls into its own group at the end, labelled as such,
  rather than being sorted somewhere plausible.
*/
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function monthLabel(iso?: string) {
  if (!iso) return "Date to be confirmed";
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

function VisitLog({ visits }: { visits: SchoolVisit[] }) {
  const groups = new Map<string, SchoolVisit[]>();
  for (const visit of visits) {
    const key = monthLabel(visit.iso);
    groups.set(key, [...(groups.get(key) ?? []), visit]);
  }

  return (
    <div className="card p-0">
      {[...groups.entries()].map(([label, items], gi) => (
        <div key={label} className={cn(gi > 0 && "border-t border-edge")}>
          <p className="px-6 pt-6 text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase sm:px-8">
            {label}
          </p>
          <ol className="divide-y divide-edge">
            {items.map((visit, i) => (
              <li
                key={`${visit.school}-${visit.iso ?? i}`}
                className="grid gap-1 px-6 py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-6 sm:px-8"
              >
                {/*
                  An undated visit leaves the date cell empty rather than saying "TBC": its
                  group heading already says the date is to be confirmed, and the empty cell
                  keeps the school aligned with the dated rows above it on wide screens.
                */}
                <p className="text-[0.875rem] font-bold text-ink-soft">
                  {visit.date && <time dateTime={visit.iso}>{visit.date}</time>}
                </p>
                <div>
                  <p className="text-[1.0625rem] leading-snug font-extrabold text-ink">
                    {visit.school}
                  </p>
                  {visit.area && (
                    <p className="mt-1 flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink-soft">
                      <MapPin
                        className="size-3.5"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {visit.area}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

/*
  One row per piece. Outlet first, because that is what a reader scans this list by; the
  headline is the outlet's own and is left in the outlet's casing. External, so the arrow is
  the up-right one the site uses for links that leave it.
*/
function PressRow({ item }: { item: PressItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group/press grid gap-3 py-6 sm:grid-cols-[11rem_1fr_auto] sm:items-start sm:gap-8"
    >
      <div>
        <p className="text-[0.9375rem] font-extrabold text-ink">
          {item.outlet}
        </p>
        <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[0.8125rem] font-bold text-ink-faint">
          <TagPill className="capitalize">{item.kind}</TagPill>
          {item.date && <time dateTime={item.iso}>{item.date}</time>}
        </p>
      </div>
      <div>
        <p className="text-[1.0625rem] leading-snug font-bold text-ink text-pretty transition-colors duration-300 group-hover/press:text-brand-green-dark">
          {item.title}
        </p>
        {item.note && (
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
            {item.note}
          </p>
        )}
      </div>
      <ArrowUpRight
        className="hidden size-5 shrink-0 text-ink-faint transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/press:translate-x-0.5 group-hover/press:-translate-y-0.5 sm:block"
        strokeWidth={1.75}
        aria-hidden
      />
    </a>
  );
}

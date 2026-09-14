import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PillLink } from "@/components/common/pill-button";
import { OrbitBackdrop } from "@/components/sections/orbit-backdrop";

/**
 * Home hero: two-column split on a flat green gradient with a dashed orbit backdrop.
 *
 * On the visual. The right column is a rounded window that crops an oversized image: see
 * `.hero-visual-media` and `.hero-visual-veil` in globals.css for the geometry and the
 * fade. The client's event photograph now fills it, replacing both the old transparent
 * cutout and the hatched placeholder that stood in for this asset.
 *
 * The alt text describes what is in the frame and stops there. It names no one, assigns no
 * one to a programme, and does not call the laptops refurbished, because none of that is
 * established by the photograph itself.
 *
 * The source is 2680x1786, a 2x export of the same frame at the same crop. It replaced a
 * 1340x893 original that had no spare pixels for a retina display: the window renders the
 * media layer around 708 CSS px wide, which wants roughly 1416px of source and now has
 * comfortably more. The width and height props below are the file's intrinsic size and are
 * the only thing a further re-export would change.
 *
 * On the floating cards. Card A originally read "Laptop #482 / Today", which asserts a
 * specific delivery that did not happen. The visual pattern is unchanged, but every string
 * comes from confirmed figures.
 *
 * It no longer names one school. The card read "Gbagada Junior High / 60+ students
 * reached", and the 60+ is not attributable to that school in anything supplied: the
 * organisation profile gives 100+ students across the three 2025 sites as a single figure.
 * The card now reports it the same way the source does.
 */
export function Hero() {
  return (
    <section
      className="hero-frame relative isolate lg:min-h-[41rem]"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Orbits sit behind the photo column and bleed off the right edge. */}
      <OrbitBackdrop className="pointer-events-none absolute top-1/2 -right-[26%] -z-10 h-[135%] w-[95%] -translate-y-1/2 lg:-right-[10%] lg:w-[62%]" />

      {/*
        No bottom padding on the section: the cutout column runs to the bottom edge so
        the subject reads as grounded. The left column carries its own bottom padding.
      */}
      <div className="shell grid gap-12 pt-14 md:pt-16 lg:min-h-[41rem] lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch lg:gap-10 lg:pt-20">
        {/*
          Left column type scale. Tracking tightens as size grows and opens for the
          small-caps label. Weight 400 for body, 600 to 700 for controls and labels,
          800 held back for the headline alone so it stays the only thing shouting.
          Spacing uses the 4px token scale rather than raw values.
        */}
        {/*
          Centred against the photo column at lg rather than pinned to the top. The trust
          row used to hold the base of this block with `lg:mt-auto`; with it gone the copy
          would otherwise sit high against a square that is itself centred in the row.
        */}
        <div className="max-w-[640px] lg:flex lg:flex-col lg:justify-center lg:pb-20">
          {/*
            Not "Tech access for Africa". Africa is where devices are redistributed, but it
            is half the model at most: collection, refurbishment, and the warehouse are in
            St. Louis, 60% of upcycled devices go back into that community, and the US
            operation has its own 800+ devices and 20+ partners. An Africa-only line reads
            as the whole organisation and writes the US work out of it.
          */}
          <p className="text-[12px] leading-none font-semibold tracking-[var(--tracking-eyebrow)] text-white/90 uppercase">
            Technology access, US and Africa
          </p>

          {/*
            Two sentences, sized so the first holds one line. The second breaks after
            "futures" rather than being shrunk to fit.
          */}
          <h1 className="mt-[var(--space-28)] text-[2.375rem] leading-[1.06] font-extrabold tracking-[var(--tracking-headline)] text-white text-balance sm:text-[2.75rem] lg:text-5xl">
            Give tech a second life.
            <span className="block">Power young futures on two continents.</span>
          </h1>

          {/*
            Capped at 52 characters. The column runs to 640px, which is wider than this
            size wants to be read at, and the cap is what stops the paragraph from becoming
            the densest thing in a section whose whole job is to breathe.
          */}
          <p className="mt-[var(--space-32)] max-w-[52ch] text-[1.0625rem] leading-relaxed font-normal tracking-[var(--tracking-body)] text-white/90 text-pretty">
            JustUsedTech collects, refurbishes, and redistributes technology to
            underserved students and youth across Nigeria, Ghana, Kenya, and the US,
            turning e-waste into opportunity.
          </p>

          {/*
            Filled primary plus ghost-outlined secondary: the standard two-button pair,
            expressed white-on-green rather than ink-on-white.
          */}
          <div className="mt-[var(--space-48)] flex flex-wrap items-center gap-[var(--space-16)]">
            <PillLink href="/get-involved#donate-devices" variant="onDark">
              Donate a device
            </PillLink>
            <Link
              href="/impact"
              className="group/link inline-flex items-center gap-[var(--space-8)] rounded-full border border-[rgba(255,255,255,0.7)] px-[var(--space-24)] py-[var(--space-12)] text-[0.9375rem] leading-none font-semibold tracking-[var(--tracking-body)] text-white transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10"
            >
              See our impact
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/link:translate-x-1"
                strokeWidth={2.25}
                aria-hidden
              />
            </Link>
          </div>

        </div>

        {/* Right column: the image window, with floating cards from lg up. */}
        <div className="pb-14 lg:relative lg:pb-0">
          {/*
            Two nested boxes, deliberately. The outer wrapper carries the position and the
            card offsets; the inner window carries the radius and the overflow clip. They
            cannot be one element: Card B sits at -left-[7%], outside the window, and a
            single box with overflow:hidden would swallow it.

            At lg the wrapper is a square, centred in the row rather than pinned to it.
            inset-y-0 with my-auto is absolute centring: with both vertical insets at 0 and
            auto block margins, the leftover height is split evenly, so the gap above always
            equals the gap below. That equality is a property of centring, not of two inset
            values that happen to match, and it survives the square changing size. The gap
            itself is not fixed and is not meant to be: it measures 142px where the headline
            wraps to five lines and the row is tall, and 29px from 1280 up where it is not.

            Every size constraint here is a MAXIMUM, which is what lets the ratio hold. An
            explicit height wins over aspect-ratio, so `h-[90%]` produced a 431x643 box at
            1024: the width clamped to the column, the height stayed at 90%, and the square
            was lost. As max-h-[90%] it is a ceiling instead, the clamp transfers back
            through the ratio, and the box stays square at every width. Measured square to
            three decimals from 1024 to 1920.

            max-w-full is still doing real work. Rechecked by removing it: at 1024 the box
            grows to 643 wide against a 431px column, overflowing 212px and lying 172px
            across the headline. It is the only reason the narrow end stays clear.
          */}
          <div className="relative mx-auto w-[92%] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:my-auto lg:aspect-square lg:max-h-[90%] lg:w-auto lg:max-w-full">
            {/*
              Crop values are tuned to this photograph, not to the layout: see
              .hero-visual-media in globals.css for what each knob does.
              The window is square and the photograph is 3:2, so `cover` fits it to the
              height and the crop falls entirely on the horizontal axis. The left-top pin is
              load-bearing, not a default nobody revisited: it keeps the mentor, both
              students, and the JUSTUSED marks on the shirt and the laptop lids, and it puts
              the unrelated figure at the right of the frame outside the window. Every step
              rightward trades one of those away for that figure.

              The green fill behind the image is a backstop for the moment before it decodes,
              so the window never flashes white against the gradient.
            */}
            <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-green-surface lg:aspect-auto lg:h-full">
              <Image
                src="/hero/hero-visual.jpg"
                alt="Students working on laptops at a JustUsedTech session, with a mentor helping."
                width={2680}
                height={1786}
                priority
                quality={90}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="hero-visual-media"
              />
              {/*
                Decorative, and after the image so it paints over it. The floating cards are
                siblings of this window rather than children, so they stay above the veil
                without needing a z-index of their own.
              */}
              <div aria-hidden className="hero-visual-veil" />
            </div>

            {/*
              Floating cards are absolute from lg up only, offset in percentages against
              the wrapper so they track the window across breakpoints. Below lg they are
              static badges under it, because absolute cards over a narrow image cover the
              middle of the frame, which is where a portrait's subject sits.

              Their offsets are deliberately NOT compensated for the wrapper's insets. The
              cards are children of the wrapper, not of the window, and the window fills the
              wrapper exactly at lg, so the wrapper's box IS the photo's box: a percentage
              offset against it lands in the same place on the picture whatever the insets
              do to the wrapper's size or position. That holds for Card A's top-relative
              offset as much as Card B's bottom-relative one. Adding a hand-tuned nudge here
              would double-count the insets and walk both cards off the frame.
            */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:block">
              <FloatingCard
                // Narrow and flush right, so it overlaps only the window's top-right
                // corner. That corner is cropped away by the oversize, so it is the safest
                // part of the frame to cover.
                className="lg:absolute lg:top-[3%] lg:right-0 lg:z-10 lg:w-[15rem]"
                delay="0s"
              >
                <p className="flex items-center gap-2 text-[0.9375rem] font-extrabold text-ink">
                  <span
                    aria-hidden
                    className="size-2 shrink-0 rounded-full bg-brand-green"
                  />
                  School tour sessions
                </p>
                <p className="mt-2 text-[0.875rem] leading-snug font-semibold text-ink-soft">
                  Three schools across Lagos State
                </p>
                {/* ink-soft, not ink-faint: the lighter token loses AA on the glass fill. */}
                <p className="mt-1.5 text-[0.75rem] font-bold text-ink-soft">
                  100+ students reached in 2025
                </p>
              </FloatingCard>

              <FloatingCard
                className="lg:absolute lg:bottom-[9%] lg:-left-[7%] lg:z-10 lg:w-[14.5rem]"
                delay="1.6s"
              >
                <p className="text-3xl leading-none font-extrabold tracking-[-0.035em] text-brand-green-dark">
                  45,000+ lbs
                </p>
                <p className="mt-2 text-[0.875rem] font-semibold text-ink-soft">
                  E-waste diverted
                </p>
              </FloatingCard>
            </div>
          </div>
        </div>
      </div>

      {/* Sentinel for the Quick Actions dock: it rises once the hero is scrolled past. */}
      <div id="dock-sentinel" aria-hidden className="h-px w-full" />
    </section>
  );
}

function FloatingCard({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: string;
}) {
  return (
    <div
      className={`jut-float glass-card rounded-[var(--radius-inner)] p-5 ${className ?? ""}`}
      style={{ ["--float-delay" as string]: delay }}
    >
      {children}
    </div>
  );
}

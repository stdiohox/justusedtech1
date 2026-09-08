import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PillLink } from "@/components/common/pill-button";
import { OrbitBackdrop } from "@/components/sections/orbit-backdrop";
import { heroTrustPartners } from "@/content/site";

/**
 * Home hero: two-column split on a flat green gradient with a dashed orbit backdrop.
 *
 * On the visual. The right column is a rounded window that crops an oversized image: see
 * `.hero-visual-media` in globals.css for the geometry. The previous transparent cutout is
 * gone, along with its asset, because the final image has not been supplied yet.
 *
 * SWAPPING IN THE REAL ASSET. Drop a square or portrait file at
 * public/hero/hero-visual.png, then replace <HeroVisualPlaceholder /> below with:
 *
 *   <Image
 *     src="/hero/hero-visual.png"
 *     alt=""            // decorative: describe it only if it carries information
 *     width={2000}
 *     height={2000}     // match the real file
 *     priority
 *     sizes="(min-width: 1024px) 46vw, 92vw"
 *     className="hero-visual-media"
 *   />
 *
 * and re-add `import Image from "next/image"` at the top. Nothing else changes: the crop,
 * the radius, the bottom anchor, and the card offsets all live on the container.
 *
 * On the floating cards. Card A originally read "Laptop #482 / Today", which asserts a
 * specific delivery that did not happen. The visual pattern is unchanged, but every
 * string now comes from the confirmed 2025 figures: Gbagada Junior High is a real School
 * Tour Initiative site with 60+ students reached.
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
        <div className="max-w-[640px] lg:flex lg:flex-col lg:pb-20">
          <p className="text-[12px] leading-none font-semibold tracking-[var(--tracking-eyebrow)] text-white/90 uppercase">
            Tech access for Africa
          </p>

          {/*
            Two sentences, sized so the first holds one line. The second runs to 34
            characters and cannot fit a single line at hero scale inside a split layout,
            so it breaks after "futures" rather than being shrunk to fit.
          */}
          <h1 className="mt-[var(--space-24)] text-[2.375rem] leading-[1.06] font-extrabold tracking-[var(--tracking-headline)] text-white text-balance sm:text-[2.75rem] lg:text-5xl">
            Give tech a second life.
            <span className="block">Power young futures across Africa.</span>
          </h1>

          <p className="mt-[var(--space-24)] text-[1.0625rem] leading-relaxed font-normal tracking-[var(--tracking-body)] text-white/90 text-pretty">
            JustUsedTech collects, refurbishes, and redistributes technology to
            underserved students and youth across Nigeria, Ghana, Kenya, and the US,
            turning e-waste into opportunity.
          </p>

          {/*
            Filled primary plus ghost-outlined secondary: the standard two-button pair,
            expressed white-on-green rather than ink-on-white.
          */}
          <div className="mt-[var(--space-40)] flex flex-wrap items-center gap-[var(--space-16)]">
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

          {/* Trust row. Wordmarks are text: no partner logo files exist yet. */}
          {/* Pushed to the base of the block at lg, so it sits on the hero's floor. */}
          <div className="mt-[var(--space-48)] border-t border-white/20 pt-[var(--space-28)] lg:mt-auto">
            <p className="text-[0.8125rem] font-semibold tracking-[var(--tracking-body)] text-white/90">
              Backed by 20+ partners across two continents
            </p>
            {/* TODO: swap for supplied partner logo SVGs when the client delivers them. */}
            <ul className="mt-[var(--space-16)] flex flex-wrap items-center gap-x-[var(--space-28)] gap-y-[var(--space-12)]">
              {heroTrustPartners.map((name) => (
                <li
                  key={name}
                  className="text-[0.9375rem] font-bold tracking-[var(--tracking-body)] text-white/90"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: the image window, with floating cards from lg up. */}
        <div className="pb-14 lg:relative lg:pb-0">
          {/*
            Two nested boxes, deliberately. The outer wrapper carries the position and the
            card offsets; the inner window carries the radius and the overflow clip. They
            cannot be one element: Card B sits at -left-[7%], outside the window, and a
            single box with overflow:hidden would swallow it.

            At lg the wrapper is absolutely positioned and sized by HEIGHT (90% of the
            hero's inner height), with the square ratio resolving the width from it. Sizing
            by width leaves the visual far too small: the column is narrower than the block
            is tall, so width-driven scaling caps it at roughly two thirds of the available
            height. Bottom-anchored, as the cutout was, so the window meets the hero's floor.
          */}
          <div className="relative mx-auto w-[92%] lg:absolute lg:right-0 lg:bottom-0 lg:mx-0 lg:aspect-square lg:h-[90%] lg:w-auto">
            <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-card)] lg:aspect-auto lg:h-full">
              <HeroVisualPlaceholder />
            </div>

            {/*
              Floating cards are absolute from lg up only, offset in percentages against
              the wrapper so they track the window across breakpoints. Below lg they are
              static badges under it, because absolute cards over a narrow image cover the
              middle of the frame, which is where a portrait's subject sits.
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
                  Devices delivered
                </p>
                <p className="mt-2 text-[0.875rem] leading-snug font-semibold text-ink-soft">
                  Gbagada Junior High, Lagos
                </p>
                {/* ink-soft, not ink-faint: the lighter token loses AA on the glass fill. */}
                <p className="mt-1.5 text-[0.75rem] font-bold text-ink-soft">
                  60+ students reached
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

/**
 * Stand-in for the hero image until the client supplies it.
 *
 * The hatched layer wears `.hero-visual-media`, the same class the real <Image> will wear,
 * so the 120% oversize and the top-left anchor are live right now and the crop can be
 * checked before the asset lands. The label sits in its own layer pinned to the window, so
 * it stays centred on what is actually visible rather than on the oversized media box.
 *
 * Deleting this function is the last step of the swap described at the top of the file.
 */
function HeroVisualPlaceholder() {
  return (
    <>
      <div aria-hidden className="hero-visual-media hero-visual-stripes" />

      {/*
        The dashed edge is drawn as an inset overlay rather than a border on the window,
        because a border would sit outside the overflow clip and survive the swap as a
        stray outline around the real photograph.
      */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-[color:rgba(18,33,26,0.3)] p-6 text-center">
        <p className="max-w-[26ch] text-[0.9375rem] leading-snug font-bold text-ink-soft text-balance">
          Hero image placeholder. Square or portrait, 2000px+ recommended.
        </p>
        <p className="rounded-badge border border-edge bg-white/70 px-2 py-1 text-[0.8125rem] font-semibold text-ink-soft">
          /public/hero/hero-visual.png
        </p>
      </div>
    </>
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

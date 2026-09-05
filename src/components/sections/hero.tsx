import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PillLink } from "@/components/common/pill-button";
import { OrbitBackdrop } from "@/components/sections/orbit-backdrop";
import { heroTrustPartners } from "@/content/site";

/**
 * Home hero: two-column split on a flat green gradient with a dashed orbit backdrop.
 *
 * On the photo. A transparent cutout, so there is no card or frame around it: it stands
 * directly on the gradient. `object-contain` rather than `cover`, because cropping a
 * silhouette would cut into her hair or the laptop edge. The subject is bottom-anchored
 * so the cut edge of the torso meets the hero's bottom edge and reads as grounded rather
 * than floating in space, and a drop-shadow lifts her off the flat gradient.
 *
 * This is brand photography, not a record of a specific handover, so it carries no
 * caption and no claim about who the subject is. Programme and field photography still
 * does not exist, which is why the rest of the site keeps its placeholder treatment.
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
        {/* Left column */}
        <div className="max-w-[640px] lg:flex lg:flex-col lg:pb-20">
          <p className="text-[0.6875rem] font-extrabold tracking-[0.2em] text-white/90 uppercase">
            Tech access for Africa
          </p>

          {/*
            Two sentences, sized so the first holds one line. The second runs to 34
            characters and cannot fit a single line at hero scale inside a split layout,
            so it breaks after "futures" rather than being shrunk to fit.
          */}
          <h1 className="mt-6 text-[2.375rem] leading-[1.06] font-extrabold tracking-[-0.04em] text-white text-balance sm:text-[2.75rem] lg:text-5xl">
            Give tech a second life.
            <span className="block">Power young futures across Africa.</span>
          </h1>

          <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/90 text-pretty">
            JustUsedTech collects, refurbishes, and redistributes technology to
            underserved students and youth across Nigeria, Ghana, Kenya, and the US,
            turning e-waste into opportunity.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <PillLink href="/get-involved#donate-devices" variant="onDark">
              Donate a device
            </PillLink>
            <Link
              href="/impact"
              className="group/link inline-flex items-center gap-2 text-[0.9375rem] font-bold text-white"
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
          <div className="mt-12 border-t border-white/20 pt-7 lg:mt-auto">
            <p className="text-[0.8125rem] font-bold text-white/90">
              Backed by 20+ partners across two continents
            </p>
            {/* TODO: swap for supplied partner logo SVGs when the client delivers them. */}
            <ul className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
              {heroTrustPartners.map((name) => (
                <li
                  key={name}
                  className="text-[0.9375rem] font-extrabold tracking-[-0.01em] text-white/90"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: the cutout, with floating cards from lg up. */}
        <div className="pb-14 lg:relative lg:pb-0">
          {/*
            The wrapper is exactly the width of the image, so the cards' percentage offsets
            are measured against the subject rather than against the column.

            At lg the wrapper is absolutely positioned and sized by HEIGHT (90% of the
            hero's inner height) with width following the 1631:1536 ratio. Sizing by width
            left her far too small: the column is narrower than the block is tall, so
            width-driven scaling capped her at roughly two thirds of the available height.
            She now runs from just under the top padding to the block's bottom edge.

            Alt text describes the frame and stops there. It does not name her as a
            JustUsedTech recipient, because this is brand photography rather than a record
            of a specific handover.
          */}
          <div className="relative mx-auto w-[92%] lg:absolute lg:right-0 lg:bottom-0 lg:mx-0 lg:h-[90%] lg:w-auto">
            <Image
              src="/hero/hero-student-cutout.png"
              alt="Student using a laptop."
              width={1631}
              height={1536}
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="h-auto w-full [filter:drop-shadow(0_26px_34px_rgba(0,26,12,0.42))] lg:h-full lg:w-auto lg:max-w-none"
            />

            {/*
              Floating cards are absolute from lg up only, offset in percentages so they
              track the subject across breakpoints. Below lg they are static badges under
              the image, because absolute cards over a narrow cutout cover her face.
            */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:block">
              <FloatingCard
                // Narrowed and pulled flush right: at the larger photo scale the previous
                // offset sat squarely on her hair. This clears it and only kisses the edge.
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

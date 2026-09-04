import { Laptop, Recycle, Users } from "lucide-react";
import { PillLink } from "@/components/common/pill-button";
import { PhotoPlaceholder } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { heroStats } from "@/content/impact";

const STAT_ICONS = [Laptop, Users, Recycle];

/**
 * Editorial split hero. Copy left, image collage right.
 * Four text elements maximum: eyebrow, headline, subtext, CTAs. The stat pills sit
 * beneath the fold line as a separate band, not stacked inside the hero block.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28">
      {/* Soft brand wash behind the hero. Fixed, non-scrolling, decorative only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 520px at 12% 0%, rgba(0,166,82,0.10), transparent 62%), radial-gradient(700px 460px at 92% 18%, rgba(0,173,239,0.10), transparent 60%)",
        }}
      />

      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <p className="inline-flex rounded-full bg-mint px-4 py-1.5 text-[0.6875rem] font-extrabold tracking-[0.18em] text-brand-green-dark uppercase">
              501(c)(3) nonprofit
            </p>

            <h1 className="mt-6 text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.038em] text-balance sm:text-6xl lg:text-[4.25rem]">
              Used tech,{" "}
              <span className="text-brand-green-dark">put back to work.</span>
            </h1>

            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
              We recover devices in St. Louis, refurbish them, and place them with
              students and young creatives across Nigeria, Ghana, and Kenya.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PillLink href="/get-involved">Get involved</PillLink>
              <PillLink href="/impact" variant="outline">
                See the impact
              </PillLink>
            </div>
          </Reveal>

          {/*
            Three placeholder slots. Real programme photography has not been delivered,
            so these are branded blocks. Dropping in <Image> later needs no layout change.
          */}
          <Reveal delay={0.12} className="relative">
            {/*
              Mobile: a plain two-column stack, every cell full width of its column.
              lg and up: the asymmetric 5x6 grid, where the tall slot and the stat card
              share the left column and two smaller slots stack on the right.
            */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:h-[30rem] lg:grid-cols-5 lg:grid-rows-6">
              <PhotoPlaceholder
                tone={0}
                caption="School Tour, Gbagada"
                className="col-span-2 min-h-[11rem] lg:col-span-3 lg:row-span-4 lg:min-h-0"
              />
              <PhotoPlaceholder
                tone={1}
                caption="Refurbishment bench, University City"
                className="min-h-[9.5rem] lg:col-span-2 lg:row-span-3 lg:min-h-0"
              />
              <PhotoPlaceholder
                tone={2}
                caption="Project 9-12, Makoko"
                className="min-h-[9.5rem] lg:col-span-2 lg:row-span-3 lg:min-h-0"
              />
              <div className="col-span-2 flex flex-col justify-center rounded-[var(--radius-inner)] bg-green-surface p-5 text-white lg:col-span-3 lg:row-span-2">
                <p className="text-3xl leading-none font-extrabold tracking-[-0.03em] sm:text-4xl">
                  8 schools
                </p>
                <p className="mt-2 text-[0.875rem] leading-snug font-semibold text-white/75">
                  reached across Lagos State in 2025
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Sentinel for the Quick Actions dock. It appears once the hero has scrolled past. */}
      <div id="dock-sentinel" aria-hidden className="h-px w-full" />

      <div className="shell mt-16 md:mt-20">
        <ul className="flex flex-wrap gap-3">
          {heroStats.map((stat, i) => {
            const Icon = STAT_ICONS[i]!;
            return (
              <li
                key={stat.label}
                className="flex items-center gap-3.5 rounded-full border border-[color:var(--hairline)] bg-white py-3 pr-6 pl-3 shadow-[var(--shadow-soft)]"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-mint text-brand-green-dark">
                  <Icon className="size-[1.125rem]" strokeWidth={1.75} aria-hidden />
                </span>
                <span>
                  <span className="block text-lg leading-none font-extrabold tracking-[-0.02em] text-ink">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] font-semibold text-ink-soft">
                    {stat.label}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

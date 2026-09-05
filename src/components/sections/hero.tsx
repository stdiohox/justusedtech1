import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PillLink } from "@/components/common/pill-button";
import { OrbitBackdrop } from "@/components/sections/orbit-backdrop";
import { heroTrustPartners } from "@/content/site";

/**
 * Home hero: two-column split on a flat green gradient with a dashed orbit backdrop.
 *
 * On the photo. This is brand photography, not a record of a specific handover, so it
 * carries no caption and no claim about who the subject is. Programme and field
 * photography still does not exist, which is why the rest of the site keeps its branded
 * placeholder treatment.
 *
 * On the floating cards. Card A originally read "Laptop #482 / Today", which asserts a
 * specific delivery that did not happen. The visual pattern is unchanged, but every
 * string now comes from the confirmed 2025 figures: Gbagada Junior High is a real School
 * Tour Initiative site with 60+ students reached.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
      {/* Orbits sit behind the photo column and bleed off the right edge. */}
      <OrbitBackdrop className="pointer-events-none absolute top-1/2 -right-[26%] -z-10 h-[135%] w-[95%] -translate-y-1/2 lg:-right-[10%] lg:w-[62%]" />

      <div className="shell grid items-center gap-12 py-14 md:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-20">
        {/* Left column */}
        <div className="max-w-[640px]">
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
          <div className="mt-12 border-t border-white/20 pt-7">
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

        {/* Right column: photo slot with floating cards on desktop. */}
        <div className="relative">
          {/*
            Source is 16:9 and the slot is close to 4:3, so it is centre-cropped. The
            subject sits mid-frame and survives the crop at every breakpoint.

            Alt text describes what is in the picture and stops there. It does not name
            her as a JustUsedTech recipient, because the image is brand photography rather
            than a record of a specific handover.
          */}
          <div className="relative aspect-[4/3.2] overflow-hidden rounded-[var(--radius-card)] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)] sm:aspect-[4/3]">
            <Image
              src="/hero/hero-student.jpeg"
              alt="A young woman smiling as she works on a laptop."
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-center"
            />
          </div>

          {/*
            Floating cards are absolute from lg up only. Below that they render as static
            badges under the photo, because absolute positioning over a narrow photo
            collides with the caption and pushes cards off-screen.
          */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:block">
            <FloatingCard
              className="lg:absolute lg:-top-6 lg:-right-4 lg:w-[17.5rem]"
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
              <p className="mt-1.5 text-[0.75rem] font-bold text-ink-faint">
                60+ students reached
              </p>
            </FloatingCard>

            <FloatingCard
              className="lg:absolute lg:-bottom-7 lg:-left-6 lg:w-[15rem]"
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
      className={`jut-float rounded-[var(--radius-inner)] bg-white p-5 shadow-[0_18px_44px_-20px_rgba(18,33,26,0.45)] ${className ?? ""}`}
      style={{ ["--float-delay" as string]: delay }}
    >
      {children}
    </div>
  );
}

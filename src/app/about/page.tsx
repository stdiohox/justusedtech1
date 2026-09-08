import type { Metadata } from "next";
import { ArrowRight, Building2, Globe2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { PillLink } from "@/components/common/pill-button";
import { Section, SectionHead, TagPill } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { coreValues, focusAreas, model } from "@/content/programs";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "JustUsedTech was founded in Lagos in 2017 and incorporated as a US 501(c)(3) nonprofit in February 2024. Here is how the organisation works.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="Founded in Lagos. Incorporated in Missouri. Working across both."
        lede={`${site.legalName} started in Lagos, Nigeria in 2017 and was formalized as a US 501(c)(3) nonprofit in February 2024. Device recovery and warehouse operations are based at our headquarters in University City, MO, and refurbished devices are redistributed to underserved communities across Nigeria, Ghana, and Kenya.`}
      />

      {/* Vision and mission: two statements, given room rather than boxed into cards. */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
              Vision
            </p>
            <p className="mt-5 text-2xl leading-[1.28] font-extrabold tracking-[-0.025em] text-ink text-pretty sm:text-[1.75rem]">
              {site.vision}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
              Mission
            </p>
            <p className="mt-5 text-2xl leading-[1.28] font-extrabold tracking-[-0.025em] text-ink text-pretty sm:text-[1.75rem]">
              {site.mission}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Core values: numbered rows, no card grid. */}
      <Section tone="paper">
        <Reveal>
          <SectionHead
            title="Core values"
            lede="Five commitments that decide what we take on and how we run it."
          />
        </Reveal>
        {/*
          One panel split by hairlines rather than five separate cards: same elevation
          language as the rest of the system, and the gap-px trick keeps the rules
          pixel-exact at every breakpoint.
        */}
        <RevealGroup
          as="ul"
          className="rounded-card mt-12 grid gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-3"
        >
          {coreValues.map((value) => (
            <RevealItem
              as="li"
              key={value.name}
              className="bg-white p-7 sm:p-8"
            >
              <h3 className="text-xl font-extrabold tracking-[-0.025em] text-brand-green-dark">
                {value.name}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {value.detail}
              </p>
            </RevealItem>
          ))}
          <li className="hidden bg-mint p-8 lg:block">
            <p className="text-[0.9375rem] leading-relaxed font-bold text-brand-green-dark">
              Every device that passes through our warehouse is assessed against these
              before it goes anywhere.
            </p>
          </li>
        </RevealGroup>
      </Section>

      <Section tone="mint" className="py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHead
              title="Core focus areas"
              lede="Five areas where the work concentrates."
            />
          </Reveal>
          {/*
            Tag pills at the large size. These are the section's content rather than
            metadata hanging off something else, so 13px would read as a footnote.
          */}
          <RevealGroup as="ul" className="flex flex-wrap gap-2.5">
            {focusAreas.map((area) => (
              <RevealItem as="li" key={area}>
                <TagPill size="lg" className="bg-white text-brand-green-dark">
                  {area}
                </TagPill>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/*
        Our model as a dark feature card rather than a full-bleed green band. The block is
        the rhythm break against the light canvas either side of it, and containing it keeps
        the section head reading on paper where the rest of the page's heads do.
      */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Our model"
              title="Collect, refurbish, distribute."
              lede="Three steps, one pipeline. Nothing reaches a recipient without passing through all three."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="card card-dark space-y-4">
              {model.map((stage) => (
                <li key={stage.step} className="flex gap-4">
                  <ArrowRight
                    className="mt-1 size-5 shrink-0 text-white/60"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.02em] text-white">
                      {stage.step}
                    </h3>
                    <p className="mt-1.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-white/75">
                      {stage.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* How we work: the hybrid US and Nigeria structure. */}
      <Section tone="paper">
        <Reveal>
          <SectionHead
            title="How we work"
            lede="Two bases, one organisation. Supply and refurbishment sit in the US, programme delivery sits in Nigeria."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-mint text-brand-green-dark">
                <Building2 className="size-6" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.028em]">
                United States
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                Headquartered in University City, MO. This is where corporate and
                institutional e-waste collection happens, where devices are assessed and
                repaired, and where a share of refurbished machines goes straight back
                into the St. Louis community.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="card h-full">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[color:rgba(0,173,239,0.14)] text-[color:#0673a0]">
                <Globe2 className="size-6" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.028em]">
                Nigeria
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                Field operations run out of Lagos State, where the organisation began in
                2017. School sessions, device distribution, mentorship, and partnerships
                with government and community bodies are all delivered by the Nigeria
                team, supported by volunteers.
              </p>
            </article>
          </Reveal>
        </div>
        <Reveal className="mt-10">
          <PillLink href="/team" variant="outline">
            Meet the team
          </PillLink>
        </Reveal>
      </Section>
    </>
  );
}

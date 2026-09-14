import type { Metadata } from "next";
import { Inbox, Send, Wrench } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { AnimatedList } from "@/components/ui/animated-list";
import { Flag } from "@/components/common/flag";
import { PillLink } from "@/components/common/pill-button";
import { Section, SectionHead, TagPill } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { PhotoShowcase } from "@/components/ui/photo-showcase";
import { StatementSwitcher } from "@/components/ui/statement-switcher";
import { coreValues, focusAreas, model } from "@/content/programs";
import { site } from "@/content/site";
import { whoWeAreFrames } from "@/content/who-we-are";

export const metadata: Metadata = {
  title: "About",
  description:
    "JustUsedTech was founded in Lagos in 2017 and incorporated as a US 501(c)(3) nonprofit in February 2024. Here is how the organisation works.",
};

/*
  Icon and colour per stage of the model. Presentation rather than copy, so it lives beside
  the markup that uses it and not in src/content, the same way the programme card picks its
  icon.

  One brand accent per stage, in the order the ramp runs, so the three read as a set rather
  than as three unrelated colours. Foregrounds are the contrast-checked pairs the initials
  avatars already use: white on --brand-green is 3.2:1 and fails, ink on it is 5.2:1.
*/
const MODEL_TONES = [
  { icon: Inbox, bg: "var(--brand-green)", fg: "var(--ink)" },
  { icon: Wrench, bg: "var(--brand-blue)", fg: "#06283a" },
  { icon: Send, bg: "var(--brand-gold)", fg: "#3d2f05" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="Founded in Lagos. Incorporated in Missouri. Working across both."
        lede={`${site.legalName} started in Lagos, Nigeria in 2017 and was formalized as a US 501(c)(3) nonprofit in February 2024. Device recovery and warehouse operations are based at our headquarters in University City, MO, and refurbished devices are redistributed to underserved communities across Nigeria, Ghana, and Kenya.`}
        /*
          Inside the masthead rather than under it, filling the right half that every page
          hero on this site leaves empty. Every other page opens on words alone because it has
          to; this is the one page where the organisation itself is the subject, and there are
          now real photographs of it. Below lg the column collapses and the mosaic lands
          directly under the lede, which is where it was to begin with.
        */
        media={<PhotoShowcase items={whoWeAreFrames} />}
      />

      {/*
        Vision and mission: one statement at a time, on a rail.

        They used to sit as two columns of equal weight, which is the safe arrangement and
        also the reason neither of them was ever read: two 30-word statements in the same
        type at the same size cancel each other out. On the rail each one gets the full width
        of the card and nothing to compete with, and the one you are not reading is a click
        away rather than gone.

        tone="deep" rather than white: the card is white, and a white card on a white section
        is a card you cannot see. It also keeps the page off three paper sections in a row
        now that the masthead carries the photo mosaic.
      */}
      {/* ids here are link targets for the header About menu. Do not rename without updating content/nav.ts. */}
      <Section id="vision" tone="deep">
        <Reveal>
          <StatementSwitcher
            statements={[
              { id: "vision", label: "Vision", body: site.vision },
              { id: "mission", label: "Mission", body: site.mission },
            ]}
          />
        </Reveal>
      </Section>

      {/* Core values: numbered rows, no card grid. */}
      <Section id="values" tone="paper">
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
        Our model as three cards standing on the section, not as a green feature block with
        the stages inside it.

        The block used to be the page's rhythm break. It is not needed for that any more: the
        masthead now carries a photo mosaic, the vision card sits on the recessed tone, and
        the focus areas are a mint band directly above this, so the page has plenty of change
        in it without a slab of green here. What the slab was costing was the stages
        themselves, which read as contents of a green object rather than as three steps.

        The section stays white, the brightest tone on the page, which is what it has to
        offer now that the fill is gone.
      */}
      <Section id="model" tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Our model"
              title="Collect, refurbish, distribute."
              lede="Three steps, one pipeline. Nothing reaches a recipient without passing through all three."
            />
          </Reveal>
          {/*
            No Reveal around this one. The list brings its own entrance, and two entrance
            animations on the same object, one driven by scroll position and one by a timer,
            fight each other.
          */}
          {/*
            step=1000 is the reference's own cadence. It is far longer than the 30ms to 80ms
            a decorative stagger wants, and that is the point: this is not three items
            appearing together with a bit of offset, it is three steps of a pipeline in
            sequence, and the sequence is the content. Each card still lands in 380ms, so the
            arrivals stay snappy and it is the space between them that reads as deliberate.
          */}
          <AnimatedList as="ol" className="flex flex-col gap-4" step={1000}>
            {model.map((stage, index) => {
              const tone = MODEL_TONES[index]!;
              const Icon = tone.icon;
              return (
                /*
                  Standing on the section now rather than inside a green block, which changes
                  three things and is why they are all here together.

                  The cards take the hairline back. Without the green behind them there is no
                  contrast doing the separating, and the hairline is the site's locked answer
                  to that: a set of panels cut from one sheet, no drop shadow.

                  They take --radius-card too. The radius scale is by nesting depth, and these
                  stopped being panels inside a card the moment the card went.

                  And the colour now comes from the three step marks rather than from a slab
                  behind them, which is the whole of what removing it bought.
                */
                <article
                  key={stage.step}
                  className="flex items-start gap-4 rounded-card border border-edge bg-white p-6 sm:gap-5 sm:p-7"
                >
                  {/*
                    Aligned to the title, not centred in the card. Centred is fine while every
                    detail line wraps the same number of times and comes apart on a phone,
                    where three lines drop the icon to the middle of the card and it stops
                    reading as the step's mark.
                  */}
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{ background: tone.bg, color: tone.fg }}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="flex flex-wrap items-baseline gap-x-2 text-xl font-extrabold tracking-[-0.025em] text-ink">
                      {stage.step}
                      <span className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                        Step {String(index + 1).padStart(2, "0")}
                      </span>
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {stage.detail}
                    </p>
                  </div>
                </article>
              );
            })}
          </AnimatedList>
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
              {/*
                The flag replaces the tinted icon tile rather than sitting inside one. A
                building and a globe were standing in for two countries; the flags say it
                outright, and a flag in a mint square fights the square.
              */}
              <Flag country="US" />
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
              <Flag country="NG" />
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

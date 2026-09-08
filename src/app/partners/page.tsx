import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PillLink } from "@/components/common/pill-button";
import { Section, SectionHead, TagPill } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { nigeriaPartners, usPartners } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The US-based and Nigeria-based organisations working with JustUsedTech on collection, refurbishment, and programme delivery.",
};

/* TODO: swap wordmarks for supplied partner logo SVGs when the client delivers them. */

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Twenty organisations, two continents, one pipeline."
        lede="Collection partners supply the hardware. Delivery partners get it to the people who need it. Both lists below are current."
      />

      <Section tone="white">
        <Reveal>
          <TagPill className="mb-5">US-based</TagPill>
          <SectionHead
            title="United States"
            lede="Corporate, academic, and community partners supporting collection, refurbishment, and local redistribution around St. Louis."
          />
        </Reveal>
        <PartnerList names={usPartners} />
      </Section>

      <Section tone="paper">
        <Reveal>
          <TagPill className="mb-5">Nigeria-based</TagPill>
          <SectionHead
            title="Nigeria"
            lede="Government, education, and community partners delivering programmes across Lagos State and beyond."
          />
        </Reveal>
        <PartnerList names={nigeriaPartners} />
      </Section>

      <Section tone="green">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHead
            onGreen
            title="Add your organisation to this list."
            lede="Whether you are retiring hardware, funding a programme, or running community sessions, there is a way in."
            className="max-w-xl"
          />
          <PillLink href="/get-involved#partner" variant="onDark">
            Partner with us
          </PillLink>
        </div>
      </Section>
    </>
  );
}

/**
 * Logo strip, not a card grid. Wordmarks sit directly on the page at 65% opacity in the
 * muted ink, and resolve to full brand green on hover. Understated social proof: the names
 * are there to be scanned, and only the one you point at asserts itself.
 *
 * The 65% is taken off --ink rather than --ink-faint. These are real content, not chrome,
 * and --ink-faint at 65% lands near 2.6:1 on paper. --ink at 65% resolves to about the same
 * grey the reference uses and still clears 4.5:1. Hover resolves to --brand-green-dark for
 * the same reason the CTA does: the bright green is 3.0:1 at this text size.
 *
 * TODO: swap wordmarks for supplied partner logo SVGs when the client delivers them. The
 * same opacity and hover treatment applies to a real mark, so this needs no layout change.
 */
function PartnerList({ names }: { names: readonly string[] }) {
  return (
    <RevealGroup
      as="ul"
      className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-7 sm:gap-x-14 sm:gap-y-9"
    >
      {names.map((name) => (
        <RevealItem
          as="li"
          key={name}
          className="max-w-[36ch] text-[1.0625rem] leading-snug font-extrabold tracking-[-0.02em] text-ink/65 text-balance transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand-green-dark sm:text-lg"
        >
          {name}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

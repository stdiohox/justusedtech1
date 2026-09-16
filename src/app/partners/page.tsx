import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PillAnchor } from "@/components/common/pill-button";
import { asks } from "@/content/site";
import { Section, SectionHead, TagPill } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { PartnerMark } from "@/components/common/partner-mark";
import { PartnerSphere } from "@/components/sections/partner-sphere";
import { nigeriaPartners, usPartners, type Partner } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The US-based and Nigeria-based organisations working with JustUsedTech on collection, refurbishment, and programme delivery.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Eighteen organisations, two continents, one pipeline."
        lede="Collection partners supply the hardware. Delivery partners get it to the people who need it. Both lists below are current."
        media={<PartnerSphere />}
      />

      <Section tone="white">
        <Reveal>
          <TagPill className="mb-5">US-based</TagPill>
          <SectionHead
            title="United States"
            lede="Corporate, academic, and community partners supporting collection, refurbishment, and local redistribution around St. Louis."
          />
        </Reveal>
        <PartnerList partners={usPartners} />
      </Section>

      <Section tone="paper">
        <Reveal>
          <TagPill className="mb-5">Nigeria-based</TagPill>
          <SectionHead
            title="Nigeria"
            lede="Government, education, and community partners delivering programmes across Lagos State and beyond."
          />
        </Reveal>
        <PartnerList partners={nigeriaPartners} />
      </Section>

      <Section tone="green">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHead
            onGreen
            title="Add your organisation to this list."
            lede="Whether you are retiring hardware, funding a programme, or running community sessions, there is a way in."
            className="max-w-xl"
          />
          <PillAnchor href={asks.partner} variant="onDark">
            Partner with us
          </PillAnchor>
        </div>
      </Section>
    </>
  );
}

/**
 * Logo strip, not a card grid. The marks sit directly on the page in full colour, with no
 * hover state: there is nothing left to reveal now that every partner is an image. See
 * PartnerMark for why the greyscale-until-hovered treatment came off.
 *
 * The horizontal gap is deliberately smaller than the vertical one. Marks are normalised by
 * height and so vary in width, which means a generous gap-x reads as a scattering of marks
 * rather than a row; pulling it in lets the eye group them. gap-y stays larger because the
 * rows themselves still need to separate.
 */
function PartnerList({ partners }: { partners: readonly Partner[] }) {
  return (
    <RevealGroup
      as="ul"
      className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-7 sm:gap-x-11 sm:gap-y-9"
    >
      {partners.map((partner) => (
        <RevealItem as="li" key={partner.name} className="flex items-center">
          <PartnerMark partner={partner} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

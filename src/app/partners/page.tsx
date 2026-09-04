import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PillLink } from "@/components/common/pill-button";
import { Section, SectionHead } from "@/components/common/primitives";
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
          <SectionHead
            title="United States"
            lede="Corporate, academic, and community partners supporting collection, refurbishment, and local redistribution around St. Louis."
          />
        </Reveal>
        <PartnerList names={usPartners} accent="green" />
      </Section>

      <Section tone="paper">
        <Reveal>
          <SectionHead
            title="Nigeria"
            lede="Government, education, and community partners delivering programmes across Lagos State and beyond."
          />
        </Reveal>
        <PartnerList names={nigeriaPartners} accent="blue" />
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

function PartnerList({
  names,
  accent,
}: {
  names: readonly string[];
  accent: "green" | "blue";
}) {
  const bar = accent === "green" ? "bg-brand-green" : "bg-brand-blue";
  return (
    <RevealGroup
      as="ul"
      className="mt-11 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-[color:var(--hairline)] sm:grid-cols-2 lg:grid-cols-3"
    >
      {names.map((name) => (
        <RevealItem
          as="li"
          key={name}
          className="flex items-center gap-4 bg-white px-6 py-7"
        >
          <span aria-hidden className={`h-9 w-1 shrink-0 rounded-full ${bar}`} />
          <span className="text-[1.0625rem] leading-snug font-extrabold tracking-[-0.02em] text-ink text-balance">
            {name}
          </span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

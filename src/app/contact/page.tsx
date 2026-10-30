import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Bezel, Section, SectionHead } from "@/components/common/primitives";
import { PillLink } from "@/components/common/pill-button";
import { Reveal } from "@/components/common/reveal";
import { ContactSplit } from "@/components/sections/contact-split";
import { contact, deviceRequest } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach JustUsedTech at ${contact.hqAddress}, ${contact.hqCity}, or by phone and email.`,
};

/*
  Address correctness note. The previous live site embedded a map of the London Eye and
  carried a "457 Morningview Lane, NY" placeholder in the contact form, neither of which
  matched the real footer address. Both are gone. Every address on this site now comes
  from `contact` in src/content/site.ts, and the map embed points at the Saint Louis
  warehouse. The description and the map title below compose theirs from `contact` too,
  rather than repeating the address as a literal that can drift out of step with it.
*/

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        lede="Device donations, device requests, partnerships, volunteering, or press. Whichever it is, this reaches the right person."
      />

      {/*
        The split: form on the left, details on the green shader panel on the right. Both
        panels are bezelled, so the section sits on the paper canvas rather than a white one,
        which is what lets the bezels read as frames at all.
      */}
      {/*
        Device requests go to the form, not the inbox. This sits above the message form so
        someone who needs a laptop meets it before they start typing an email.
      */}
      <Section tone="paper" className="pt-0 pb-0 md:pt-0 md:pb-0">
        <Reveal>
          <Bezel coreClassName="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl leading-tight font-extrabold tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                {deviceRequest.title}
              </h2>
              <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
                {deviceRequest.emailNote}
              </p>
            </div>
            <PillLink href={deviceRequest.href} className="shrink-0" travel>
              Request a device
            </PillLink>
          </Bezel>
        </Reveal>
      </Section>

      <Section tone="paper">
        <ContactSplit />
      </Section>

      <Section tone="deep">
        <Reveal>
          <SectionHead
            title="Find the warehouse"
            lede="Device drop-offs happen here. Please email ahead so we can log the donation."
          />
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <div className="bezel">
            <div className="bezel-core overflow-hidden bg-white p-0">
              <iframe
                title={`Map showing ${contact.hqAddress}, ${contact.hqCity}`}
                src={contact.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[22rem] w-full border-0 sm:h-[28rem]"
              />
            </div>
          </div>
        </Reveal>
        <Reveal className="mt-6">
          <a
            href={contact.mapLink}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[0.9375rem] font-bold text-brand-green-dark underline-offset-4 hover:underline"
          >
            Open in Google Maps
          </a>
        </Reveal>
      </Section>
    </>
  );
}

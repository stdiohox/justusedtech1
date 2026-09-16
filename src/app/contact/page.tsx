import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { ContactSplit } from "@/components/sections/contact-split";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach JustUsedTech at 725 Kingsland Ave, Suite 100, University City, MO 63130, or by phone and email.",
};

/*
  Address correctness note. The previous live site embedded a map of the London Eye and
  carried a "457 Morningview Lane, NY" placeholder in the contact form, neither of which
  matched the real footer address. Both are gone. Every address on this site now comes
  from `contact` in src/content/site.ts, and the map embed points at University City, MO.
*/

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        lede="Device donations, partnerships, volunteering, or press. Whichever it is, this reaches the right person."
      />

      {/*
        The split: form on the left, details on the green shader panel on the right. Both
        panels are bezelled, so the section sits on the paper canvas rather than a white one,
        which is what lets the bezels read as frames at all.
      */}
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
                title="Map showing 725 Kingsland Ave, Suite 100, University City, MO 63130"
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

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { contact, socials } from "@/content/site";

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

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionHead title="Send a message" />
            <div className="mt-9">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-8">
              <div className="rounded-[var(--radius-card)] bg-paper-deep p-7 sm:p-8">
                <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                  {contact.hqLabel}
                </h3>
                <address className="mt-4 text-[1.0625rem] leading-relaxed font-bold text-ink not-italic">
                  {contact.hqAddress}
                  <br />
                  {contact.hqCity}
                  <br />
                  {contact.hqCountry}
                </address>
                <a
                  href={contact.phoneHref}
                  className="mt-5 inline-block font-bold text-brand-green-dark underline-offset-4 hover:underline"
                >
                  {contact.phone}
                </a>
                <div className="mt-5 space-y-1.5">
                  {contact.emails.map((email) => (
                    <p key={email.address} className="text-[0.9375rem]">
                      <span className="font-semibold text-ink-soft">{email.label}: </span>
                      <a
                        href={`mailto:${email.address}`}
                        className="font-bold text-brand-green-dark underline-offset-4 hover:underline"
                      >
                        {email.address}
                      </a>
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] bg-mint p-7 sm:p-8">
                <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-brand-green-dark uppercase">
                  {contact.fieldLabel}
                </h3>
                <p className="mt-4 text-[1.0625rem] font-bold text-ink">
                  {contact.fieldAddress}
                </p>
              </div>

              <div>
                <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                  Follow along
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-button inline-flex border border-edge bg-white px-4 py-2 text-[0.875rem] font-bold text-ink-soft transition-colors duration-300 hover:border-[color:rgba(0,122,55,0.3)] hover:text-brand-green-dark"
                      >
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper">
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

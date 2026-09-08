import type { Metadata } from "next";
import { HandHeart, Handshake, Laptop, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { PillAnchor, PillLink } from "@/components/common/pill-button";
import { Section, SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Donate a device, fund a programme, partner with us, or volunteer. Four ways to support JustUsedTech.",
};

/*
  Two donation routes are kept deliberately separate and never merged into one button:
  giving money funds programme delivery, giving a device feeds the refurbishment pipeline.
  Collapsing them would lose the distinction that matters most to donors.
*/

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Four ways in."
        lede="Hardware, funding, partnership, or time. Each one moves a different part of the pipeline."
      />

      {/* Donate a device */}
      <Section id="donate-devices" tone="white" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-mint text-brand-green-dark">
              <Laptop className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
            <SectionHead
              className="mt-6"
              title="Donate a device"
              lede="Laptops, desktops, tablets, phones, and peripherals. Working or not, we assess everything that comes in. Corporate and institutional lots are collected through GreenBin 360."
            />
            <ul className="mt-8 space-y-3.5">
              {[
                "Individuals can arrange a drop-off at our University City warehouse.",
                "Organisations retiring hardware in bulk get a scheduled collection.",
                "Devices beyond repair are routed to responsible recycling, not landfill.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-soft"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-green"
                  />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <PillAnchor href={`mailto:${contact.emails[0].address}?subject=Device donation`}>
                Donate a device
              </PillAnchor>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="h-full rounded-[var(--radius-card)] bg-paper-deep p-7 sm:p-9">
              <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                Drop-off address
              </h3>
              <address className="mt-4 text-[1.0625rem] leading-relaxed font-bold text-ink not-italic">
                {contact.hqAddress}
                <br />
                {contact.hqCity}
              </address>
              <a
                href={contact.phoneHref}
                className="mt-4 inline-block font-bold text-brand-green-dark underline-offset-4 hover:underline"
              >
                {contact.phone}
              </a>
              <p className="mt-6 text-[0.875rem] leading-relaxed text-ink-soft">
                Please email ahead so we can log the donation and give you a collection
                window.
              </p>
            </aside>
          </Reveal>
        </div>
      </Section>

      {/* Fund a programme */}
      <Section id="fund" tone="green" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-brand-green-dark">
              <HandHeart className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
            <SectionHead
              onGreen
              className="mt-6"
              title="Fund a programme"
              lede="A financial gift covers what donated hardware cannot: replacement parts, shipping to Lagos, session materials, and the staff time that gets a device into a student's hands."
            />
            <div className="mt-9">
              <PillAnchor
                href={`mailto:${contact.emails[0].address}?subject=Funding a programme`}
                variant="gold"
              >
                Fund a programme
              </PillAnchor>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="h-full rounded-[var(--radius-card)] border border-white/20 p-7 sm:p-9">
              <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-white/70 uppercase">
                Where funding goes
              </h3>
              <ul className="mt-5 space-y-4">
                {[
                  ["Refurbishment", "Parts, tooling, and technician time."],
                  ["Delivery", "Shipping and logistics into Nigeria, Ghana, and Kenya."],
                  ["Programmes", "School sessions, mentorship, and training materials."],
                ].map(([label, detail]) => (
                  <li key={label}>
                    <p className="font-extrabold text-white">{label}</p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/70">
                      {detail}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-[0.8125rem] leading-relaxed text-white/70">
                JustUsedTech is a registered 501(c)(3) nonprofit organisation.
              </p>
            </aside>
          </Reveal>
        </div>
      </Section>

      {/* Partner with us */}
      <Section id="partner" tone="paper" className="scroll-mt-24">
        <Reveal>
          <span className="flex size-12 items-center justify-center rounded-2xl bg-[color:rgba(0,173,239,0.14)] text-[color:#0673a0]">
            <Handshake className="size-6" strokeWidth={1.75} aria-hidden />
          </span>
          <SectionHead
            className="mt-6"
            title="Partner with us"
            lede="We work with companies retiring hardware, schools hosting sessions, government bodies, and community organisations running delivery on the ground."
          />
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {[
            [
              "Corporate",
              "Scheduled e-waste collection through GreenBin 360, with reporting on weight diverted and devices redistributed.",
            ],
            [
              "Education",
              "Host a School Tour session, or receive refurbished devices for students.",
            ],
            [
              "Community",
              "Co-deliver programmes with us in Lagos State and across our partner network.",
            ],
          ].map(([title, detail], i) => (
            <Reveal key={title} delay={i * 0.06}>
              <article className="card h-full">
                <h3 className="text-xl font-extrabold tracking-[-0.025em]">{title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-9">
          <PillAnchor href={`mailto:${contact.emails[1].address}?subject=Partnership enquiry`}>
            Partner with us
          </PillAnchor>
        </Reveal>
      </Section>

      {/* Volunteer */}
      <Section id="volunteer" tone="white" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-[color:rgba(255,217,102,0.35)] text-ink">
              <Users className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
            <SectionHead
              className="mt-6"
              title="Volunteer"
              lede="More than 20 volunteers already support content, training, outreach, and operations. If you have hardware repair skills, teaching experience, or time for outreach, there is work for you."
            />
            <div className="mt-9">
              <PillAnchor href={`mailto:${contact.emails[0].address}?subject=Volunteering`}>
                Volunteer with us
              </PillAnchor>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="h-full rounded-[var(--radius-card)] bg-mint p-7 sm:p-9">
              <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-brand-green-dark uppercase">
                Where volunteers work
              </h3>
              <ul className="mt-5 space-y-3">
                {["Content", "Training", "Outreach", "Operations"].map((area) => (
                  <li
                    key={area}
                    className="text-[1.0625rem] font-extrabold text-brand-green-dark"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section tone="deep">
        <Reveal>
          <SectionHead
            align="center"
            title="Not sure which one fits?"
            lede="Send us a note and we will point you to the right route."
          />
          <div className="mt-8 flex justify-center">
            <PillLink href="/contact" variant="outline">
              Talk to the team
            </PillLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

"use client";

import { FlutedGlass } from "@paper-design/shaders-react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { contact, newsletter, socials } from "@/content/site";

/**
 * Contact split.
 *
 * Adapted from an auth-section template: form panel on the left, a dark panel with a fluted
 * glass shader on the right. What carried over is the geometry. What did not: the template
 * was a sign-up form with demo names, social sign-in buttons, a password field, a testimonial
 * from a person we do not have, and a dashboard mockup. None of that belongs on a nonprofit's
 * contact page, so the left panel holds the real ContactForm, and the right panel holds the
 * organisation's real details, where the template had a quote and a screenshot.
 *
 * Both panels sit in the house bezel rather than the template's flat 1px black/10 border, and
 * the right panel is the brand's green surface rather than a black-to-white gradient. The
 * shader is decoration only: aria-hidden, pointer-events off, and if WebGL is unavailable the
 * green fill underneath carries the panel on its own.
 *
 * The tilted card at the foot of the green panel is the template's rotated mockup, repurposed
 * as a business card with both addresses. It sits in flow rather than absolutely positioned,
 * so it never overlaps the rows above it at any viewport, and the rotation only applies from
 * lg up, where there is room for it to lean.
 */
export function ContactSplit() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
      {/* Left: the form. */}
      <Reveal className="bezel">
        <div className="bezel-core bg-white px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
          <SectionHead
            title="Send a message"
            lede="Tell us what you need and it lands with the right person. Most replies go out within two working days."
          />
          <div className="mt-9">
            <ContactForm />
          </div>
        </div>
      </Reveal>

      {/* Right: the details, over the shader. */}
      <Reveal delay={0.1} className="bezel">
        <div className="bezel-core relative isolate flex min-h-[40rem] flex-col overflow-hidden bg-green-surface px-6 py-8 text-white sm:px-9 sm:py-10 lg:min-h-0 lg:px-12 lg:py-12">
          {/*
            Fluted glass over a vertical fade to a deeper green. The light and dark flutes are
            pure white and pure black at low opacity, so they read as ridges in the surface
            rather than as a second colour. The shader is static (speed 0), so it needs no
            reduced-motion gate.

            A photograph was tried behind the glass (the US operations frame, tinted green)
            and taken out again at the client's request. The plain fill is the deliberate
            state, not a placeholder.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(var(--green-surface-rgb)),#00461f)]"
          >
            <FlutedGlass
              size={0.89}
              shape="lines"
              angle={0}
              distortionShape="prism"
              distortion={0.5}
              shift={0}
              blur={0}
              edges={0.25}
              stretch={0}
              scale={1.11}
              fit="cover"
              highlights={0.1}
              shadows={0.2}
              grainMixer={0.1}
              grainOverlay={0.1}
              colorBack="#00000000"
              colorHighlight="#FFFFFF"
              colorShadow="#000000"
              className="size-full bg-transparent"
            />
          </div>

          <SectionHead
            onGreen
            eyebrow="Reach us directly"
            title="Prefer to skip the form?"
            lede="Every line below opens the right app. Partnerships have their own inbox so they reach the people who answer them."
          />

          <ul className="mt-10 grid gap-3">
            <ContactRow
              icon={
                <Phone
                  className="size-[1.125rem]"
                  strokeWidth={2}
                  aria-hidden
                />
              }
              label="Phone"
              value={contact.phone}
              href={contact.phoneHref}
            />
            {contact.emails.map((email) => (
              <ContactRow
                key={email.address}
                icon={
                  <Mail
                    className="size-[1.125rem]"
                    strokeWidth={2}
                    aria-hidden
                  />
                }
                label={email.label}
                value={email.address}
                href={`mailto:${email.address}`}
              />
            ))}
          </ul>

          <div className="mt-10">
            <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-white/60 uppercase">
              Follow along
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {/* The newsletter leads and takes the filled chip: the one subscription here. */}
              <li>
                <Chip href={newsletter.href} filled>
                  {newsletter.name} on {newsletter.platform}
                </Chip>
              </li>
              {socials.map((social) => (
                <li key={social.name}>
                  <Chip href={social.href}>{social.name}</Chip>
                </li>
              ))}
            </ul>
          </div>

          {/*
            The business card. mt-auto pins it to the panel's floor from lg up, where the
            column flexes to the form's height; the padding above it is the floor for that
            gap, because mt-auto goes to zero once the column is full and the leaning card
            would otherwise ride up into the chips. The lean is 2 degrees, not the template's
            3: the card is text, not a screenshot, and any more tilt makes the address harder
            to read than it needs to be.
          */}
          <div className="mt-12 lg:mt-auto lg:pt-14">
            <address className="rounded-[var(--radius-inner)] bg-white p-6 text-ink not-italic shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] sm:p-7 lg:origin-bottom-left lg:-rotate-2">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-2 text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                    <MapPin
                      className="size-3.5"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    {contact.hqLabel}
                  </p>
                  <p className="mt-3 text-[1rem] leading-relaxed font-bold">
                    {contact.hqAddress}
                    <br />
                    {contact.hqCity}
                    <br />
                    {contact.hqCountry}
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-[0.6875rem] font-extrabold tracking-[0.16em] text-brand-green-dark uppercase">
                    <MapPin
                      className="size-3.5"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    {contact.fieldLabel}
                  </p>
                  <p className="mt-3 text-[1rem] leading-relaxed font-bold">
                    {contact.fieldAddress}
                  </p>
                </div>
              </div>
              <a
                href={contact.mapLink}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-bold text-brand-green-dark underline-offset-4 hover:underline"
              >
                Open in Google Maps
                <ArrowUpRight
                  className="size-4"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </a>
            </address>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/*
  One tappable line per channel. The icon sits in its own disc, the same button-in-button
  idea as the pill CTAs, so the rows read as part of the same family. Hover brightens the
  disc rather than underlining, since underlines on white/85 over green are faint.
*/
function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="group/row flex items-center gap-4 rounded-[var(--radius-button)] border border-white/15 bg-white/[0.07] px-4 py-3.5 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.12] motion-reduce:transition-none"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/row:-translate-y-px group-hover/row:scale-105 motion-reduce:transition-none">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-[0.75rem] font-bold text-white/60">
            {label}
          </span>
          <span className="block truncate text-[1rem] font-extrabold text-white">
            {value}
          </span>
        </span>
      </a>
    </li>
  );
}

function Chip({
  href,
  filled = false,
  children,
}: {
  href: string;
  filled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={
        filled
          ? "inline-flex rounded-[var(--radius-button)] bg-white px-4 py-2 text-[0.875rem] font-bold text-brand-green-dark transition-colors duration-300 hover:bg-white/90"
          : "inline-flex rounded-[var(--radius-button)] border border-white/20 px-4 py-2 text-[0.875rem] font-bold text-white/85 transition-colors duration-300 hover:border-white/40 hover:text-white"
      }
    >
      {children}
    </a>
  );
}

import type { Metadata } from "next";
import { ArrowUpRight, Info } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { deviceRequest, forms } from "@/content/site";

export const metadata: Metadata = {
  title: "Request a device",
  description:
    "Need a laptop or computer? Fill in the JustUsedTech device needs survey so our team can track your request.",
};

/*
  The Google Form, embedded rather than linked. Device requests used to come in by email and
  could not be tracked; on this page the reader fills the form in without leaving the site,
  and every response lands in the form's sheet.

  A cross-origin iframe cannot report its own height, and the form's three pages differ a
  lot in length, so any fixed height leaves either a blank gap or a cut-off page. The frame
  is the height of the viewport instead and the form scrolls inside it. The new-tab link is
  the fallback for anyone whose browser blocks the embed or would rather fill it in full
  screen. It sits above the frame so a keyboard user reaches it before tabbing into the form.
*/
export default function RequestDevicePage() {
  return (
    <>
      <PageHero
        eyebrow={deviceRequest.eyebrow}
        title={deviceRequest.title}
        lede={deviceRequest.lede}
      />

      <Section tone="paper" className="pt-0 md:pt-0">
        <Reveal>
          <p className="flex max-w-3xl items-start gap-3 rounded-[var(--radius-inner)] bg-mint px-5 py-4 text-[0.9375rem] leading-relaxed font-semibold text-ink">
            <Info
              className="mt-0.5 size-5 shrink-0 text-brand-green-dark"
              strokeWidth={2}
              aria-hidden
            />
            {deviceRequest.note}
          </p>
        </Reveal>

        <Reveal className="mt-5">
          <a
            href={forms.deviceRequest}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-[0.9375rem] font-bold text-brand-green-dark underline-offset-4 hover:underline"
          >
            {deviceRequest.openInTab}
            <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
          </a>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          <div className="bezel">
            <div className="bezel-core overflow-hidden bg-white p-0">
              <iframe
                title="JustUsedTech device needs survey"
                src={deviceRequest.embed}
                loading="lazy"
                className="block h-[85svh] min-h-[36rem] w-full border-0"
              >
                <a href={forms.deviceRequest}>{deviceRequest.openInTab}</a>
              </iframe>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

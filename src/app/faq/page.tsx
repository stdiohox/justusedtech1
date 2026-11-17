import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import {
  faqForms,
  faqGroups,
  faqPage,
  type FaqLink,
} from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about requesting a device, donating, volunteering, and the Circular Tech Bootcamp, with links to the forms that reach our team.",
};

/*
  The FAQ. Added while the email addresses are off the contact page (Nov 2026): the forms
  come first, because most visitors who used to write in needed one of them, and the
  questions follow.

  The accordions are native <details>/<summary>. They open and close without any client
  JavaScript, are keyboard and screen-reader accessible as they stand, and the browser's
  find-in-page reaches text inside closed answers. Each item carries an id so a single
  answer can be linked to.
*/
export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow={faqPage.eyebrow}
        title={faqPage.title}
        lede={faqPage.lede}
      />

      <Section tone="paper" className="pt-0 md:pt-0">
        <Reveal>
          <SectionHead title={faqPage.formsTitle} lede={faqPage.formsLede} />
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {faqForms.map((form, i) => (
            <Reveal key={form.href} as="li" delay={i * 0.06} className="h-full">
              <FormCard {...form} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <Reveal>
          <SectionHead title={faqPage.questionsTitle} />
        </Reveal>
        <div className="mt-10 space-y-12">
          {faqGroups.map((group) => (
            <Reveal key={group.title}>
              <h3 className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-brand-green-dark uppercase">
                {group.title}
              </h3>
              <div className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.id}
                    id={item.id}
                    className="group scroll-mt-24 rounded-[var(--radius-inner)] border border-ink/10 bg-paper open:bg-white open:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[1.0625rem] font-extrabold text-ink sm:px-6 [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mint text-brand-green-dark transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none">
                        <Plus className="size-4" strokeWidth={2.5} aria-hidden />
                      </span>
                    </summary>
                    <div className="max-w-[68ch] space-y-3 px-5 pb-5 text-[1rem] leading-relaxed text-ink-soft sm:px-6">
                      {item.answer.map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                      {item.link && <AnswerLink {...item.link} />}
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

function FormCard({
  label,
  description,
  href,
  external,
}: FaqLink & { description: string }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const className =
    "group/card flex h-full flex-col justify-between gap-6 rounded-[var(--radius-inner)] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)] ring-1 ring-ink/10 transition-shadow duration-300 hover:ring-brand-green/50";
  const body = (
    <>
      <span>
        <span className="block text-[1.125rem] font-extrabold text-ink">
          {label}
        </span>
        <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink-soft">
          {description}
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5 text-[0.875rem] font-bold text-brand-green-dark">
        {external ? "Open the form" : "Go to the form"}
        <Icon
          className="size-4 transition-transform duration-300 group-hover/card:translate-x-0.5 motion-reduce:transition-none"
          strokeWidth={2.25}
          aria-hidden
        />
      </span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
      {body}
    </a>
  ) : (
    <Link href={href} className={className}>
      {body}
    </Link>
  );
}

function AnswerLink({ label, href, external }: FaqLink) {
  const className =
    "inline-flex items-center gap-1.5 font-bold text-brand-green-dark underline-offset-4 hover:underline";
  return external ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
      {label}
      <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
    </a>
  ) : (
    <Link href={href} className={className}>
      {label}
      <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden />
    </Link>
  );
}

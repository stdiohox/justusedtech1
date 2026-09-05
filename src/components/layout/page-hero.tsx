import type { ReactNode } from "react";
import { Reveal } from "@/components/common/reveal";

/** Shared masthead for every page below the home page. */
export function PageHero({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  aside?: ReactNode;
}) {
  return (
    // Full width and unframed: the rounded frame is the home hero gradient block only.
    <section className="relative overflow-hidden bg-paper pt-14 pb-16 md:pt-20 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(760px 420px at 8% 0%, rgba(0,166,82,0.09), transparent 62%)",
        }}
      />
      <div className="shell">
        <Reveal>
          <p className="inline-flex rounded-full bg-mint px-4 py-1.5 text-[0.6875rem] font-extrabold tracking-[0.18em] text-brand-green-dark uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-[18ch] text-[2.25rem] leading-[1.04] font-extrabold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.75rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-soft text-pretty sm:text-lg">
            {lede}
          </p>
        </Reveal>
        {aside && <Reveal delay={0.1}>{aside}</Reveal>}
      </div>
      <div id="dock-sentinel" aria-hidden className="h-px w-full" />
    </section>
  );
}

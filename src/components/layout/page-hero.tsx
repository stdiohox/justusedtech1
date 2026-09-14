import type { ReactNode } from "react";
import { Reveal } from "@/components/common/reveal";

/** Shared masthead for every page below the home page. */
export function PageHero({
  eyebrow,
  title,
  lede,
  media,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  /**
   * Optional block set beside the words rather than under them, from lg up.
   *
   * Replaces the `aside` prop, which stacked its content below the lede and was never
   * called by any page. About is the first masthead with something to put here: the hero
   * text runs to roughly half the shell's width and the right half was empty on every page,
   * so a media column costs nothing that was being used.
   *
   * The column is sized `auto`, so the block keeps whatever width it asks for and the text
   * takes the rest. That is the right way round here: the photo mosaic has fixed tile widths
   * per breakpoint and a headline reflows, so the one that can give is the one that does.
   */
  media?: ReactNode;
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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 xl:gap-16">
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
          {media && <Reveal delay={0.1}>{media}</Reveal>}
        </div>
      </div>
      <div id="dock-sentinel" aria-hidden className="h-px w-full" />
    </section>
  );
}

import type { ReactNode } from "react";
import { Reveal } from "@/components/common/reveal";
import { cn } from "@/lib/utils";

/** Shared masthead for every page below the home page. */
export function PageHero({
  eyebrow,
  title,
  lede,
  size = "default",
  actions,
  media,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  /**
   * Type scale for the headline and the lede.
   *
   * "display" is for a masthead whose title is three or four words. Most pages here open on
   * a sentence: About runs to nine words and Programmes to seven, and at the display size
   * those break across four lines and start hyphenating. Get involved opens on "Four ways
   * in.", which at the default size reads as small beside a media column, so it takes the
   * larger scale and nothing else changes.
   */
  size?: "default" | "display";
  /**
   * Optional row under the lede, for links into the page's own sections. Sits inside the
   * same Reveal as the words so the masthead still arrives as one block.
   */
  actions?: ReactNode;
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
  /**
   * How the words sit against the media column from lg up.
   *
   * Centred is right when the two are close in height, which is the case on About, where
   * the mosaic's labels run two columns and the block is squat. When the media block is much
   * taller than the words, centring drops the headline to the middle of the page with empty
   * paper above it, and the eye has to find it. Start puts the eyebrow level with the top of
   * the pictures, where a masthead's first line belongs.
   */
  align?: "center" | "start";
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
        <div
          className={cn(
            "grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 xl:gap-16",
            align === "center" ? "lg:items-center" : "lg:items-start",
          )}
        >
          <Reveal>
            {/* The words cascade line by line rather than rising as one slab. See .text-flow. */}
            <div className="text-flow">
              <p className="inline-flex rounded-full bg-mint px-4 py-1.5 text-[0.6875rem] font-extrabold tracking-[0.18em] text-brand-green-dark uppercase">
                {eyebrow}
              </p>
              <h1
                className={cn(
                  "mt-6 max-w-[18ch] leading-[1.04] font-extrabold tracking-[-0.035em] text-balance",
                  size === "display"
                    ? "text-[2.75rem] sm:text-[3.75rem] lg:text-[4.75rem] xl:text-[5.25rem]"
                    : "text-[2.25rem] sm:text-5xl lg:text-[3.75rem]",
                )}
              >
                {title}
              </h1>
              <p
                className={cn(
                  "mt-6 max-w-[58ch] leading-relaxed text-ink-soft text-pretty",
                  size === "display"
                    ? "text-[1.125rem] sm:text-xl"
                    : "text-[1.0625rem] sm:text-lg",
                )}
              >
                {lede}
              </p>
              {actions && <div className="mt-9">{actions}</div>}
            </div>
          </Reveal>
          {media && <Reveal delay={0.1}>{media}</Reveal>}
        </div>
      </div>
      <div id="dock-sentinel" aria-hidden className="h-px w-full" />
    </section>
  );
}

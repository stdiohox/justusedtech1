import { Quote } from "lucide-react";
import { InitialsAvatar, SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { voices } from "@/content/voices";

/**
 * Community Voices.
 *
 * Deliberately not styled as social posts. There are no handles, no verification marks,
 * no like or repost counts. Only one verbatim quote exists, and it is already public.
 * The second card is a narrative case study written in our own voice, and it is labelled
 * as such so nobody reads it as words spoken by Faith Ojo.
 */
export function CommunityVoices() {
  return (
    <section className="bg-paper-deep py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHead
            title="Community voices"
            lede="What partners and recipients tell us about the work."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {voices.map((voice, i) =>
            voice.kind === "quote" ? (
              <Reveal key={voice.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-[color:var(--hairline)] bg-white p-7 shadow-[var(--shadow-soft)] sm:p-9">
                  <Quote
                    className="size-7 text-brand-green"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <blockquote className="mt-6 text-xl leading-[1.45] font-bold tracking-[-0.02em] text-ink text-pretty sm:text-[1.375rem]">
                    {voice.body}
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-4 pt-8">
                    <InitialsAvatar name={voice.name} index={i} />
                    <span>
                      <span className="block font-extrabold text-ink">{voice.name}</span>
                      <span className="block text-[0.875rem] font-semibold text-ink-soft">
                        {voice.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ) : (
              <Reveal key={voice.name} delay={i * 0.08}>
                <article className="flex h-full flex-col rounded-[var(--radius-card)] bg-green-surface p-7 text-white shadow-[var(--shadow-lift)] sm:p-9">
                  <p className="inline-flex w-fit rounded-full bg-white/15 px-3.5 py-1.5 text-[0.6875rem] font-extrabold tracking-[0.16em] uppercase">
                    Case study
                  </p>
                  <h3 className="mt-6 text-xl font-extrabold tracking-[-0.025em] text-balance sm:text-[1.375rem]">
                    {voice.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/80 text-pretty">
                    {voice.body}
                  </p>
                  <div className="mt-auto flex items-center gap-4 pt-8">
                    <InitialsAvatar name={voice.name} index={i + 2} />
                    <span>
                      <span className="block font-extrabold">{voice.name}</span>
                      <span className="block text-[0.875rem] font-semibold text-white/70">
                        {voice.role}, via {voice.program}
                      </span>
                    </span>
                  </div>
                </article>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

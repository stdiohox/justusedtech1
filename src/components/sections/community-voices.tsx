import { SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { VoiceCard } from "@/components/sections/voice-card";
import { voices } from "@/content/voices";

/**
 * Community Voices.
 *
 * Two cards, both real. Damilare Akintunde's is a verbatim testimonial already public on
 * the live site, so it is set as a quotation. Faith Ojo's is a narrative case study in our
 * own voice: no quotation marks, and an explicit "Case study" label, because we do not
 * have her words and a name beside an unlabelled block of text reads as testimony.
 *
 * The section carries a soft brand wash so the cards' backdrop blur has something to act
 * on. Over a flat fill, blur costs GPU work and shows nothing.
 */
export function CommunityVoices() {
  return (
    <section className="relative isolate overflow-hidden bg-paper-deep py-14 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(680px 420px at 15% 12%, rgba(0,166,82,0.12), transparent 64%), radial-gradient(620px 400px at 88% 82%, rgba(0,173,239,0.10), transparent 62%)",
        }}
      />

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
              <VoiceCard
                key={voice.name}
                name={voice.name}
                meta={voice.role}
                index={i}
              >
                <blockquote className="text-xl leading-[1.45] font-bold tracking-[-0.015em] text-ink text-pretty sm:text-[1.375rem]">
                  &ldquo;{voice.body}&rdquo;
                </blockquote>
              </VoiceCard>
            ) : (
              <VoiceCard
                key={voice.name}
                name={voice.name}
                meta={`${voice.role}, via ${voice.program}`}
                index={i}
                label="Case study"
              >
                <h3 className="text-xl font-bold tracking-[-0.015em] text-ink text-balance sm:text-[1.375rem]">
                  {voice.title}
                </h3>
                <p className="mt-4 text-[1rem] leading-relaxed font-normal text-ink-soft text-pretty">
                  {voice.body}
                </p>
              </VoiceCard>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

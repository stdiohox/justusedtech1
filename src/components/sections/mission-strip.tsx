import { TagPill } from "@/components/common/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { focusAreas } from "@/content/programs";
import { site } from "@/content/site";

/**
 * Mission statement band.
 *
 * Rendered light rather than green: the hero above it is now a full green gradient, and
 * a second green block immediately below it read as one undifferentiated slab. Green is
 * kept for the page's bookends, the hero and the closing CTA plus footer.
 */
export function MissionStrip() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal>
          <p className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
            Our mission
          </p>
          <p className="mt-6 max-w-[16ch] text-4xl leading-[1.08] font-extrabold tracking-[-0.035em] text-ink text-balance sm:text-5xl md:text-[3.5rem]">
            A device that still works should still be working.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:pt-14">
          <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-soft">
            {site.mission}
          </p>

          <RevealGroup as="ul" className="mt-10 flex flex-wrap gap-2.5">
            {focusAreas.map((area) => (
              <RevealItem as="li" key={area}>
                <TagPill>{area}</TagPill>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}

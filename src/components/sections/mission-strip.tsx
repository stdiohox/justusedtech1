import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { focusAreas } from "@/content/programs";
import { site } from "@/content/site";

/** Full-bleed statement band. One idea, said once, at size. */
export function MissionStrip() {
  return (
    <section className="bg-green-surface py-20 text-white md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal>
          <p className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-white/70 uppercase">
            Our mission
          </p>
          <p className="mt-6 max-w-[16ch] text-4xl leading-[1.08] font-extrabold tracking-[-0.035em] text-balance sm:text-5xl md:text-[3.5rem]">
            A device that still works should still be working.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:pt-14">
          <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-white/80">
            {site.mission}
          </p>

          <RevealGroup as="ul" className="mt-10 flex flex-wrap gap-2.5">
            {focusAreas.map((area) => (
              <RevealItem
                as="li"
                key={area}
                className="rounded-full border border-white/20 px-4 py-2 text-[0.875rem] font-bold text-white/90"
              >
                {area}
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}

import { SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { WorldMap } from "@/components/sections/world-map";
import { communitiesReached } from "@/content/impact";

export function CorridorSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <Reveal>
            <SectionHead
              eyebrow="Where devices go"
              title="One warehouse in Missouri. Three countries on the other end."
              lede="Recovery and refurbishment happen in University City, MO. From there, working machines travel to communities in Nigeria, Ghana, and Kenya."
            />
            <dl className="mt-9 space-y-4">
              <div>
                <dt className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                  Operations base
                </dt>
                <dd className="mt-1.5 text-[1.0625rem] font-bold text-ink">
                  University City, Missouri
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                  Communities reached in 2025
                </dt>
                <dd className="mt-1.5 text-[1.0625rem] font-bold text-ink">
                  {communitiesReached.join(", ")}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bezel">
              <div className="bezel-core bg-paper px-3 py-6 sm:px-6 sm:py-10">
                <WorldMap />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { CorridorGlobe } from "@/components/sections/corridor-globe";
import { communitiesReached } from "@/content/impact";

export function CorridorSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="shell">
        {/*
          Even columns. The globe carried a 0.85fr column while it still sat in a filled
          card, where the card's own padding ate the difference. Bare on the page it can
          use the whole half: at the 1240px shell that is a 556px column against a 544px
          cap, so the sphere sets its own size and the column is not what limits it.
        */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
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
            {/*
              No bezel here, unlike most visuals on the site. The globe is a lit sphere with
              its own soft edge, and boxing it in a filled card put a hard rectangle around
              something already round. This div is sizing only, no surface of its own.
            */}
            <div className="mx-auto w-full max-w-[34rem] lg:max-w-none">
              <CorridorGlobe />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

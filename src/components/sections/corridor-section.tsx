import { SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { CorridorGlobe } from "@/components/sections/corridor-globe";
import { communitiesReached } from "@/content/impact";

export function CorridorSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="shell">
        {/*
          The visual column used to be the wider one, because the flat map was a 2:1
          rectangle that needed the room. The globe is square, so the weight flips: the
          text column takes the extra width and the globe is capped rather than stretched,
          which keeps it from turning into a giant ball beside a short paragraph.
        */}
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
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
            <div className="mx-auto w-full max-w-[30rem] lg:max-w-none">
              <CorridorGlobe />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

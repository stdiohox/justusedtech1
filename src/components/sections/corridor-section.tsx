import { SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { CorridorGlobe } from "@/components/sections/corridor-globe";
import { CorridorLegend } from "@/components/sections/corridor-legend";
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
            {/*
              gap, not space-y-4. The @theme block defines --space-4: 4px, and Tailwind
              v4.3.3 resolves space-y-N against that --space-* namespace, so space-y-4
              compiled to a literal 4px instead of 16px. That put less air between the
              blocks than inside them, which is why the values read as flush against the
              next label. gap resolves through --spacing and is not affected.
            */}
            <dl className="mt-9 flex flex-col gap-6">
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
              {/*
                The globe's key, as a third labelled pair rather than a caption under the
                visual. The column is already a run of label-then-value rows, so an
                unlabelled pin row would have read as the one loose element in it. Value
                type matches the two rows above; only the pins mark it as the globe's key.
              */}
              <div>
                <dt className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                  Corridor cities
                </dt>
                <dd className="mt-1.5">
                  <CorridorLegend />
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

import { SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { CorridorLegend } from "@/components/sections/corridor-legend";
import { WorldMap } from "@/components/sections/world-map";
import { communitiesReached } from "@/content/impact";

export function CorridorSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="shell">
        {/*
          Even columns, carried over from the globe that used to sit here. The map is a
          wide rectangle rather than a square, so it no longer needs the halved column a
          sphere did, and it would take more width if the split went back to the
          0.85fr/1.15fr this section ran before the globe.
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
              No bezel, kept from the globe treatment. The map is a loose dot field that
              fades out at its own edges, so a filled card would draw a hard rectangle
              around something with no edge of its own. This div is sizing only.
            */}
            <div className="mx-auto w-full max-w-[34rem] lg:max-w-none">
              <WorldMap />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

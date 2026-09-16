import { SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { CorridorLegend } from "@/components/sections/corridor-legend";
import { WorldMap } from "@/components/sections/world-map";
import { communitiesReached, corridors } from "@/content/impact";

export function CorridorSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="shell">
        {/*
          Even columns, carried over from the globe that used to sit here. The map is a
          wide rectangle rather than a square, so it no longer needs the halved column a
          sphere did.

          The 0.85fr/1.15fr split this section ran before the globe was tried again and
          reverted. It buys the map 83px, from 556 to 639, and costs the text column 63,
          from 556 to 493. At 493 the headline breaks to four lines and the lede to three,
          which is a worse trade than the map is wide. The reference renders at roughly
          1280px and nothing short of giving it the whole shell gets close to that, so
          there is no width here worth chasing at the text's expense.
        */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <SectionHead
              eyebrow="Where devices go"
              title="One warehouse in Missouri. Three countries on the other end."
              lede="Recovery and refurbishment happen in St. Louis, Missouri. From there, working laptops travel to communities in Nigeria, Ghana, and Kenya."
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
                {/*
                  Reads from the corridor data, so this value and the map's hub pin cannot
                  name different cities. This used to say University City, the mailing
                  address, while the legend beneath it said St. Louis.
                */}
                <dd className="mt-1.5 text-[1.0625rem] font-bold text-ink">
                  {corridors[0]!.from.label}
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

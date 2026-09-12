import {
  H,
  MARKER_R,
  STROKE_WIDTH,
  W,
  destinations,
  markers,
  origin,
  routes,
} from "@/lib/corridor-map";

/**
 * The device corridor: St. Louis out to Lagos, Accra, and Nairobi.
 *
 * No inline city labels. CorridorSection names all four in its "Corridor cities" legend,
 * so printing them over the map as well would say each one twice in the same section. The
 * markers stay; the SVG's aria-label carries the route description.
 *
 * Rendered entirely on the server. The dot field is a static file, the arcs are plain
 * SVG, and the draw-on animation is CSS stroke-dashoffset, so this ships zero client
 * JavaScript. Motion is motivated: the strokes trace the direction of travel, which is
 * the whole point of the section.
 */
export function WorldMap() {
  return (
    <div className="relative w-full">
      {/*
        Plain img, not next/image. The source is an SVG, which next/image cannot resize or
        re-encode, so the optimiser would pass it through and charge a component for it.

        width and height carry the intrinsic 198x100, so the box has its aspect ratio
        before the file arrives and the overlay does not land on a collapsed parent.

        map-fade carries the reference's vertical mask, so the field dissolves at the top
        and bottom instead of ending on a straight cut. It lives in globals.css beside
        marquee-fade, which needs the -webkit- prefix alongside it, rather than as an
        arbitrary Tailwind value that would emit the unprefixed property alone.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/world-dots.svg"
        alt=""
        width={W}
        height={H}
        aria-hidden
        draggable={false}
        className="map-fade pointer-events-none block h-auto w-full select-none"
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        role="img"
        aria-label={`Device routes from ${origin?.label ?? "St. Louis, MO"} to ${destinations
          .map((d) => d.label)
          .join(", ")}.`}
      >
        <defs>
          {/*
            Symmetric fade. The line is --brand-blue along its whole length and falls to
            transparent in the outer 5% at each end, so neither endpoint terminates in a
            hard cap. Runs in objectBoundingBox units, so 0% and 100% land on each path's
            own horizontal extremes, which for these arcs are the two cities.
          */}
          <linearGradient id="jut-route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0" />
            <stop offset="5%" stopColor="var(--brand-blue)" />
            <stop offset="95%" stopColor="var(--brand-blue)" />
            <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {routes.map((r, i) => (
          <path
            key={r.b.label}
            d={r.d}
            fill="none"
            stroke="url(#jut-route)"
            /*
              The reference animates motion's pathLength 0 to 1, which is normalised.
              Our CSS draw uses a fixed dasharray of 120, so without this the three routes
              would each finish at a different point in the draw phase. pathLength
              re-declares every path as 120 units for dash purposes, which is the same
              normalisation the reference gets for free.
            */
            pathLength={120}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            className="jut-route"
            style={{ animationDelay: `${0.35 + i * 0.45}s` }}
          />
        ))}

        {/*
          Every marker gets the reference's pair: a solid dot, and a ghost behind it that
          expands and fades on a loop. The reference grows r from 2 to 8, so the ghost
          reaches four times its own dot; jut-ping does that as a transform scale, which
          is visually identical and does not depend on r being animatable as a CSS
          property. Colour follows the split the section already uses: green marks the
          collection hub, blue marks the three it distributes to.
        */}
        {markers.map((marker) => (
          <g key={marker.label}>
            <circle
              cx={marker.x}
              cy={marker.y}
              r={MARKER_R}
              fill={marker.ping}
              className="jut-ping"
            />
            <circle cx={marker.x} cy={marker.y} r={MARKER_R} fill={marker.fill} />
          </g>
        ))}
      </svg>
    </div>
  );
}

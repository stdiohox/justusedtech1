import DottedMap from "dotted-map";
import { corridors } from "@/content/impact";

/**
 * The device corridor: St. Louis out to Lagos, Accra, and Nairobi.
 *
 * No inline city labels. CorridorSection names all four in its "Corridor cities" legend,
 * so printing them over the map as well would say each one twice in the same section. The
 * markers stay; the SVG's aria-label carries the route description.
 *
 * Rendered entirely on the server. The dot field comes from dotted-map, the arcs are
 * plain SVG, and the draw-on animation is CSS stroke-dashoffset, so this ships zero
 * client JavaScript. Motion is motivated: the strokes trace the direction of travel,
 * which is the whole point of the section.
 */

const map = new DottedMap({ height: 62, grid: "diagonal" });

const DOT_SVG = map.getSVG({
  radius: 0.24,
  color: "#c3d2ca",
  shape: "circle",
  backgroundColor: "transparent",
});

const { width: W, height: H } = map.image;

type Node = { label: string; x: number; y: number };

function project(lat: number, lng: number, label: string): Node | null {
  const pin = map.getPin({ lat, lng });
  return pin ? { label, x: pin.x, y: pin.y } : null;
}

const routes = corridors
  .map(({ from, to }) => {
    const a = project(from.lat, from.lng, from.label);
    const b = project(to.lat, to.lng, to.label);
    if (!a || !b) return null;
    /*
      The reference's control point: midpoint on x, and on y the higher of the two
      endpoints lifted by a fixed amount. Its 50 is against an 800x400 viewBox, so it is
      12.5% of the height; ours is 123x62, which makes the same lift 7.75 units. Every arc
      out of St. Louis therefore peaks at one shared height rather than bowing in
      proportion to its own length, which is what makes the three read as a fan.
    */
    const mx = (a.x + b.x) / 2;
    const my = Math.min(a.y, b.y) - H * 0.125;
    return { a, b, d: `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}` };
  })
  .filter((r): r is NonNullable<typeof r> => r !== null);

const origin = routes[0]?.a;
const destinations = routes.map((r) => r.b);

const dots = [
  ...(origin
    ? [{ ...origin, r: 0.75, fill: "var(--brand-green-dark)", ping: "var(--brand-green)" }]
    : []),
  ...destinations.map((d) => ({
    ...d,
    r: 0.7,
    fill: "var(--brand-blue)",
    ping: "var(--brand-blue)",
  })),
];

export function WorldMap() {
  return (
    <div className="relative w-full">
      {/*
        map-fade carries the reference's vertical mask, so the dot field dissolves at the
        top and bottom instead of ending on a straight cut. It lives in globals.css beside
        marquee-fade, which needs the -webkit- prefix alongside it, rather than as an
        arbitrary Tailwind value that would emit the unprefixed property alone.
      */}
      <div
        className="map-fade w-full [&_svg]:h-auto [&_svg]:w-full"
        aria-hidden
        dangerouslySetInnerHTML={{ __html: DOT_SVG }}
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

            This replaced a --brand-green to --brand-blue traverse. Green has not left the
            map, it just belongs to the origin marker now rather than to the routes.
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
              (39.1, 40.0 and 52.3 units long) would each finish at a different point in
              the draw phase. pathLength re-declares every path as 120 units for
              dash purposes, which is the same normalisation the reference gets for free.
            */
            pathLength={120}
            strokeWidth={0.42}
            strokeLinecap="round"
            className="jut-route"
            style={{ animationDelay: `${0.35 + i * 0.45}s` }}
          />
        ))}

        {/*
          Every dot gets the reference's pair: a solid mark, and a ghost behind it that
          expands and fades on a loop. The reference grows r from 2 to 8 against an
          800x400 viewBox; ours keeps the dot sizes already tuned for a 123x62 one and
          takes the ratio, so the ghost scales to 4x whatever its own dot measures.
          Colour follows the split the section already uses: green marks the collection
          hub, blue marks the three it distributes to.
        */}
        {dots.map((dot) => (
          <g key={dot.label}>
            <circle cx={dot.x} cy={dot.y} r={dot.r} fill={dot.ping} className="jut-ping" />
            <circle cx={dot.x} cy={dot.y} r={dot.r} fill={dot.fill} />
          </g>
        ))}
      </svg>

    </div>
  );
}

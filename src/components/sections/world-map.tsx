import DottedMap from "dotted-map";
import { corridors } from "@/content/impact";
import { cn } from "@/lib/utils";

/** Per-city label placement, so the West African pair does not collide. */
const PLACEMENT: Record<string, string> = {
  "St. Louis, MO": "-translate-x-1/2 -translate-y-[calc(100%+0.4rem)]",
  "Lagos, Nigeria": "translate-x-3 -translate-y-[calc(100%+0.15rem)]",
  "Accra, Ghana": "-translate-x-[calc(100%+0.5rem)] translate-y-1",
  "Nairobi, Kenya": "translate-x-3 translate-y-1",
};

/**
 * The device corridor: St. Louis out to Lagos, Accra, and Nairobi.
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
    // Lift the control point perpendicular to the chord so arcs fan out instead of overlap.
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const lift = Math.hypot(b.x - a.x, b.y - a.y) * 0.22;
    return { a, b, d: `M ${a.x} ${a.y} Q ${mx} ${my - lift} ${b.x} ${b.y}` };
  })
  .filter((r): r is NonNullable<typeof r> => r !== null);

const origin = routes[0]?.a;
const destinations = routes.map((r) => r.b);

export function WorldMap() {
  return (
    <div className="relative w-full">
      <div
        className="w-full [&_svg]:h-auto [&_svg]:w-full"
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
          <linearGradient id="jut-route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--brand-green)" stopOpacity="0.15" />
            <stop offset="35%" stopColor="var(--brand-green)" />
            <stop offset="100%" stopColor="var(--brand-blue)" />
          </linearGradient>
        </defs>

        {routes.map((r, i) => (
          <path
            key={r.b.label}
            d={r.d}
            fill="none"
            stroke="url(#jut-route)"
            strokeWidth={0.42}
            strokeLinecap="round"
            className="jut-route"
            style={{ animationDelay: `${0.35 + i * 0.45}s` }}
          />
        ))}

        {origin && (
          <>
            <circle
              cx={origin.x}
              cy={origin.y}
              r={1.5}
              fill="var(--brand-green)"
              opacity={0.18}
              className="jut-ping"
            />
            <circle cx={origin.x} cy={origin.y} r={0.75} fill="var(--brand-green-dark)" />
          </>
        )}

        {destinations.map((d) => (
          <circle key={d.label} cx={d.x} cy={d.y} r={0.7} fill="var(--brand-blue)" />
        ))}
      </svg>

      {/*
        Labels sit in HTML rather than SVG so the type stays crisp and selectable.
        Lagos and Accra are 1.5 map units apart, so placement is set per city to stop
        the two labels overlapping.
      */}
      {[origin, ...destinations].filter(Boolean).map((node) => (
        <span
          key={node!.label}
          className={cn(
            "absolute rounded-full bg-white/92 px-2 py-0.5 text-[0.5625rem] font-extrabold tracking-[0.03em] whitespace-nowrap text-ink-soft shadow-[0_2px_10px_-4px_rgba(18,33,26,0.35)] sm:px-2.5 sm:py-1 sm:text-[0.6875rem]",
            PLACEMENT[node!.label] ?? "-translate-x-1/2 translate-y-2",
          )}
          style={{ left: `${(node!.x / W) * 100}%`, top: `${(node!.y / H) * 100}%` }}
        >
          {node!.label}
        </span>
      ))}
    </div>
  );
}

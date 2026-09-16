/**
 * Crossing dashed orbits behind the hero photo.
 *
 * This reprises the crossing-orbit motif from the brand's own globe graphic, so it reads
 * as continuity rather than generic decoration. Built as SVG line art on a flat gradient:
 * no mesh, no noise, no raster.
 *
 * Each ellipse has its own tilt and its own 60s to 95s rotation, so they drift out of
 * phase instead of turning as one rigid object. Rotation is suppressed under
 * prefers-reduced-motion, where the line art simply sits still.
 */

const ORBITS = [
  {
    rx: 330,
    ry: 132,
    tilt: "-24deg",
    duration: "78s",
    opacity: 0.2,
    dash: "5 11",
  },
  {
    rx: 268,
    ry: 268,
    tilt: "16deg",
    duration: "94s",
    opacity: 0.15,
    dash: "4 12",
  },
  {
    rx: 352,
    ry: 208,
    tilt: "62deg",
    duration: "64s",
    opacity: 0.17,
    dash: "6 14",
  },
];

export function OrbitBackdrop({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 760 760"
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {ORBITS.map((orbit) => (
        <ellipse
          key={orbit.tilt}
          cx={380}
          cy={380}
          rx={orbit.rx}
          ry={orbit.ry}
          stroke="#ffffff"
          strokeOpacity={orbit.opacity}
          strokeWidth={2}
          strokeDasharray={orbit.dash}
          strokeLinecap="round"
          className="jut-orbit"
          style={
            {
              "--orbit-tilt": orbit.tilt,
              "--orbit-duration": orbit.duration,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}

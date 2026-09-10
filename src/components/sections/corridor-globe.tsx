"use client";

import createGlobe, { type Arc, type Marker } from "cobe";
import { useEffect, useRef } from "react";
import { corridorLegend, corridors } from "@/content/impact";

/**
 * The device corridor as an interactive globe: St. Louis out to Lagos, Accra, and Nairobi.
 *
 * Successor to the flat dotted-map version. The arcs are the point of the section, so they
 * are real cobe arcs rather than decoration, and every coordinate is read from `corridors`
 * so the globe and the rest of the site cannot drift apart.
 *
 * Motion follows the same restraint already applied to the hero orbit lines: the idle spin
 * takes 75s per revolution, slow enough to read as a living object rather than a spinner.
 * Dragging is 1:1 with the pointer, and on release the spin keeps the pointer's velocity and
 * decays back to idle instead of hard-cutting, so there is no seam between drag and idle.
 */

/*
  Brand tokens converted to cobe's 0-1 RGB floats. Source hex noted on each line.

  Worth knowing before touching these, because cobe's naming is misleading. Its sphere
  shader resolves to:

    color = baseColor * (mix((1 - q) * i^0.4, q, dark) + 0.1) + (1 - i)^4 * glowColor
    q     = landDot * i^diffuse * mapBrightness

  so at dark: 0 the baseColor is the *sphere*, and the land dots are the dark part
  (baseColor * 0.1 once q reaches 1). At dark: 1 that inverts: dark sphere, glowing
  baseColor land. We run light, because this globe sits in a white bezel core on a paper
  section and a near-black sphere would outweigh the headline it is illustrating.
  Flipping DARK to 1 and raising mapBrightness is the whole change if that is ever wanted.
*/
const DARK = 0;
/** Sphere fill: --brand-green-dark #007A37 lightened and desaturated, since at dark: 0 this is the whole ball. */
const BASE_COLOR: [number, number, number] = [0.6, 0.78, 0.68];
const MARKER_COLOR: [number, number, number] = [0, 0.651, 0.322]; // --brand-green #00A652
const GLOW_COLOR: [number, number, number] = [0.898, 0.957, 0.925]; // --brand-green #00A652 held at low saturation, not the demo's neutral gray
const ARC_COLOR: [number, number, number] = [0, 0.678, 0.937]; // --brand-blue #00ADEF, the accent the logo swoosh and hero orbit lines already use
/*
  Held below 1 deliberately. At 1 and above q saturates and every land dot crushes to
  baseColor * 0.1, which is almost black. 0.7 lands the continents on a deep green that
  still reads as part of the same palette.
*/
const MAP_BRIGHTNESS = 0.7;

/** One revolution per 75s, inside the 64s to 94s band the hero orbits already use. */
const IDLE_RATE = (2 * Math.PI) / 75;
/** Radians of longitude per pixel dragged. */
const DRAG_SENSITIVITY = 0.005;
/** Time constant for easing the release velocity back down to IDLE_RATE, in seconds. */
const SETTLE_TAU = 0.7;

const HUB = corridors[0].from;
const SPOKES = corridors.map((corridor) => corridor.to);

const MARKERS: Marker[] = [
  { location: [HUB.lat, HUB.lng], size: 0.07 },
  ...SPOKES.map((city) => ({ location: [city.lat, city.lng] as [number, number], size: 0.05 })),
];

const ARCS: Arc[] = corridors.map((corridor) => ({
  from: [corridor.from.lat, corridor.from.lng],
  to: [corridor.to.lat, corridor.to.lng],
}));

export function CorridorGlobe() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /*
      The canvas is created here rather than in JSX on purpose. cobe v2 inserts its own
      wrapper div between the canvas and its parent for anchor positioning, which would
      leave React removing a node that is no longer its child on unmount. Keeping the
      canvas outside React's tree entirely sidesteps that.
    */
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "pan-y";
    canvas.setAttribute("aria-hidden", "true");
    host.append(canvas);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    /*
      cobe multiplies this by devicePixelRatio internally, so passing the CSS width gives
      exactly one canvas pixel per device pixel. The upstream demo passes width * 2 on top
      of a devicePixelRatio of 2, which shades four times the fragments for no visible gain.
    */
    const size = () => Math.max(host.clientWidth, 1);

    /*
      Solved against cobe's own projection rather than eyeballed: at 5.14 all four cities
      sit on the front hemisphere, with St. Louis and Nairobi balanced at equal depth on
      either edge and the Atlantic crossing centered. That is the whole story of the
      section in the opening frame.
    */
    let phi = 5.14;
    let spin = reduceMotion.matches ? 0 : IDLE_RATE;
    let dragPointer: number | null = null;
    let lastX = 0;
    let lastMove = 0;
    let lastFrame = performance.now();
    let frame = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: size(),
      height: size(),
      phi,
      theta: 0.24, // a slight northward tilt, so the corridor sits across the upper half
      dark: DARK,
      diffuse: 1.1,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: MAP_BRIGHTNESS,
      // 0 keeps the ocean clean: only land cells get a dot.
      mapBaseBrightness: 0,
      baseColor: BASE_COLOR,
      markerColor: MARKER_COLOR,
      glowColor: GLOW_COLOR,
      markers: MARKERS,
      arcs: ARCS,
      arcColor: ARC_COLOR,
      arcWidth: 1.1,
      arcHeight: 0.4,
      markerElevation: 0.02,
    });

    const TWO_PI = Math.PI * 2;
    /*
      Wrapped every turn. phi is handed to the shader as a float32 uniform, and left to
      accumulate it would pass 300 radians an hour, where the mantissa starts costing
      visible angular precision on a page someone may leave open all day.
    */
    const turn = (delta: number) => {
      phi = (phi + delta) % TWO_PI;
      if (phi < 0) phi += TWO_PI;
      globe.update({ phi });
    };

    const render = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.1);
      lastFrame = now;

      if (dragPointer === null) {
        // Blend whatever velocity the release left behind back down to the idle rate.
        const target = reduceMotion.matches ? 0 : IDLE_RATE;
        spin += (target - spin) * (1 - Math.exp(-dt / SETTLE_TAU));
        turn(spin * dt);
      }

      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    const onPointerDown = (event: PointerEvent) => {
      dragPointer = event.pointerId;
      lastX = event.clientX;
      lastMove = event.timeStamp;
      spin = 0;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== dragPointer) return;
      const dx = event.clientX - lastX;
      const dt = (event.timeStamp - lastMove) / 1000;
      lastX = event.clientX;
      lastMove = event.timeStamp;
      turn(dx * DRAG_SENSITIVITY);
      // Keep the pointer's own speed in rad/s so the release continues at exactly that rate.
      if (dt > 0) spin = (dx * DRAG_SENSITIVITY) / dt;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== dragPointer) return;
      dragPointer = null;
      canvas.releasePointerCapture(event.pointerId);
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const observer = new ResizeObserver(() => {
      globe.update({ width: size(), height: size() });
    });
    observer.observe(host);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      globe.destroy();
      // cobe leaves its wrapper behind, so clear the host rather than the canvas alone.
      host.replaceChildren();
    };
  }, []);

  const cities = [
    { label: HUB.label, role: corridorLegend.hub, hub: true },
    ...SPOKES.map((city) => ({ label: city.label, role: corridorLegend.spoke, hub: false })),
  ];

  return (
    <figure className="m-0">
      <div
        ref={hostRef}
        className="relative mx-auto aspect-square w-full max-w-[26rem]"
        role="img"
        aria-label={`Globe showing device routes from ${HUB.label} to ${SPOKES.map((c) => c.label).join(", ")}.`}
      />

      {/*
        cobe renders no text on the sphere, and in-3D floating labels fight the library's
        actual API, so the city names live here where they stay readable and selectable.
      */}
      <figcaption className="mt-7">
        <ul className="grid grid-cols-2 gap-x-5 gap-y-3.5 sm:grid-cols-4">
          {cities.map((city) => (
            <li key={city.label} className="flex items-start gap-2">
              <span
                aria-hidden
                className={
                  city.hub
                    ? "mt-1.5 size-2.5 shrink-0 rounded-full bg-brand-green ring-3 ring-brand-green/20"
                    : "mt-1.5 size-2 shrink-0 rounded-full bg-brand-green"
                }
              />
              <span>
                <span className="block text-[0.8125rem] leading-snug font-extrabold text-ink">
                  {city.label}
                </span>
                <span className="mt-0.5 block text-[0.6875rem] leading-snug font-bold tracking-[0.02em] text-ink-faint">
                  {city.role}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.02em] text-ink-faint">
          <span aria-hidden className="h-0.5 w-6 shrink-0 rounded-full bg-brand-blue" />
          {corridorLegend.route}
        </p>
      </figcaption>
    </figure>
  );
}

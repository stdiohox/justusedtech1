"use client";

import createGlobe from "cobe";
import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { corridorCities, corridors } from "@/content/impact";

/**
 * The device corridor as an interactive globe: St. Louis out to Lagos, Accra, and Nairobi.
 *
 * Successor to the flat dotted-map version. Every coordinate is read from `corridors`, so
 * the globe and the rest of the site cannot drift apart.
 *
 * The cities are marked with real pin icons tracked against the sphere as it turns, rather
 * than cobe's own dot markers. Positions are projected in plain JS from the same math the
 * shaders use, so this needs no CSS Anchor Positioning and works in every browser.
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
  baseColor land. We run light, because this globe sits on the section's own white
  background and a near-black sphere would outweigh the headline it is illustrating.
  Flipping DARK to 1 and raising mapBrightness is the whole change if that is ever wanted.
*/
const DARK = 0;
/** Sphere fill: --brand-green-dark #007A37 lightened and desaturated, since at dark: 0 this is the whole ball. */
const BASE_COLOR: [number, number, number] = [0.6, 0.78, 0.68];
const GLOW_COLOR: [number, number, number] = [0.898, 0.957, 0.925]; // --brand-green #00A652 held at low saturation, not the demo's neutral gray
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
/** Northward tilt, so the corridor sits across the upper half of the sphere. */
const THETA = 0.24;
/**
 * cobe draws the sphere at radius 0.8 within a clip space of 1, so a surface point
 * projects to 0.8 of the half-width. Pin tips ride exactly on that surface.
 */
const SPHERE_RADIUS = 0.8;
/** Depth over which a pin fades as it rounds the limb, in the same units. Avoids popping. */
const FADE_BAND = 0.18;
/**
 * Length of the .jut-ping cycle in globals.css, in seconds. Only used to spread the four
 * pulses evenly across it, so keep the two in step if that keyframe is ever retimed.
 */
const PULSE_CYCLE = 2.8;

const HUB = corridors[0].from;
const SPOKES = corridors.map((corridor) => corridor.to);

/*
  The names themselves are rendered by CorridorLegend over in the text column, since cobe
  draws no text on the sphere. This component only needs their positions.
*/
const CITIES = corridorCities;

/** Lat/lng to a unit vector, matching cobe's own conversion exactly. */
function toVector(lat: number, lng: number): [number, number, number] {
  const a = (lat * Math.PI) / 180;
  const b = (lng * Math.PI) / 180 - Math.PI;
  const c = Math.cos(a);
  return [-c * Math.cos(b), Math.sin(a), c * Math.sin(b)];
}

/*
  Decorative only. These six points carry no geographic or programmatic meaning, are not
  places JustUsedTech operates, and exist purely to give the sphere more visual density.
  They are kept out of the legend, out of the aria-label, and marked aria-hidden, so
  nothing announces them and no copy anywhere refers to them.

  Flagged on the way in, and left to the owner's explicit call: a pin glyph is the
  universal "a location is here" symbol, so to a sighted visitor these still read as
  places on a page whose whole subject is where devices actually go. That is the same
  failure CLAUDE.md content rule 5 was written about, after the old live site showed a
  London map for an organisation with no London presence. aria-hidden solves the screen
  reader half of the problem and none of the visual half. Drop DECOR_POINTS to an empty
  array to remove them, nothing else needs to change.
*/
const DECOR_POINTS: [number, number][] = [
  [12.0, 8.0],
  [-15.0, -47.0],
  [51.0, 10.0],
  [35.0, 105.0],
  [-25.0, 135.0],
  [40.0, -100.0],
];

type Pin = {
  key: string;
  vector: [number, number, number];
  hub: boolean;
  decorative: boolean;
};

/*
  One flat list, so the projection loop and the rendered nodes stay index-aligned. The four
  real cities come first and keep their existing size, pulse, and legend entry untouched.
*/
const PINS: Pin[] = [
  ...CITIES.map((city) => ({
    key: city.city,
    vector: toVector(city.lat, city.lng),
    hub: city.hub,
    decorative: false,
  })),
  ...DECOR_POINTS.map(([lat, lng], index) => ({
    key: `decor-${index}`,
    vector: toVector(lat, lng),
    hub: false,
    decorative: true,
  })),
];

export function CorridorGlobe() {
  const hostRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /*
      The canvas is created here rather than in JSX on purpose. cobe v2 inserts its own
      wrapper div between the canvas and its parent for anchor positioning, which would
      leave React removing a node that is no longer its child on unmount. Keeping the
      canvas outside React's tree entirely sidesteps that, which is also why the pins live
      in a sibling layer React does own rather than inside this host.
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
    const measure = () => Math.max(host.clientWidth, 1);
    let px = measure();

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
      width: px,
      height: px,
      phi,
      theta: THETA,
      dark: DARK,
      diffuse: 1.1,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: MAP_BRIGHTNESS,
      // 0 keeps the ocean clean: only land cells get a dot.
      mapBaseBrightness: 0,
      baseColor: BASE_COLOR,
      // Unused, since the cities are drawn as HTML pins, but cobe requires the field.
      markerColor: BASE_COLOR,
      glowColor: GLOW_COLOR,
      markers: [],
    });

    /*
      Project each city to the pin layer, reproducing cobe's marker vertex shader in JS.
      The rotation below is that shader's matrix written out, and because the canvas is
      square, clip space maps straight to the layer with no aspect correction.
    */
    const placePins = () => {
      const ct = Math.cos(THETA);
      const st = Math.sin(THETA);
      const cp = Math.cos(phi);
      const sp = Math.sin(phi);

      for (let i = 0; i < PINS.length; i += 1) {
        const pin = pinRefs.current[i];
        if (!pin) continue;

        const [ux, uy, uz] = PINS[i].vector;
        const ax = ux * SPHERE_RADIUS;
        const ay = uy * SPHERE_RADIUS;
        const az = uz * SPHERE_RADIUS;

        const x = cp * ax + sp * az;
        const y = sp * st * ax + ct * ay - cp * st * az;
        const z = -sp * ct * ax + st * ay + cp * ct * az;

        if (z <= 0) {
          // Behind the sphere. Hidden outright so it cannot sit invisibly over the globe.
          pin.style.visibility = "hidden";
          continue;
        }

        pin.style.visibility = "visible";
        pin.style.opacity = String(Math.min(z / FADE_BAND, 1));
        // Transform only, so moving a pin never costs a layout pass.
        pin.style.transform = `translate(${(0.5 + x / 2) * px}px, ${(0.5 - y / 2) * px}px) translate(-50%, -100%)`;
      }
    };
    placePins();

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
      placePins();
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
      px = measure();
      globe.update({ width: px, height: px });
      placePins();
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

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[34rem]"
      role="img"
      aria-label={`Globe showing the device corridor from ${HUB.label} to ${SPOKES.map((c) => c.label).join(", ")}.`}
    >
      {/* cobe owns this node outright, so React never renders children into it. */}
      <div ref={hostRef} className="absolute inset-0" />

      {/*
        The pin layer. Sibling to the canvas rather than inside it, so the imperative
        cleanup above cannot take React's nodes with it. Positions are written straight
        to style from the render loop. The names are CorridorLegend's job, in the text
        column, since nothing here is readable text.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {PINS.map((pin, index) => (
          <span
            key={pin.key}
            ref={(node) => {
              pinRefs.current[index] = node;
            }}
            aria-hidden
            className="absolute top-0 left-0 will-change-transform"
            style={{ visibility: "hidden" }}
          >
            {/*
                Pulse, anchored to the pin tip rather than the glyph's middle, which is
                why it hangs off the bottom edge: the wrapper's bottom center is the
                city. Three nested spans because each owns a transform that must not
                fight the others. The outer wrapper carries the projected position, this
                one the centering offset, and .jut-ping the scale.

                Real cities only. Pulsing the decorative points would give them the same
                emphasis as the four the section is actually about, and would put six
                more infinite animations on screen for nothing.
              */}
            {!pin.decorative && (
              <span
                className={
                  pin.hub
                    ? "absolute bottom-0 left-1/2 size-4 -translate-x-1/2 translate-y-1/2"
                    : "absolute bottom-0 left-1/2 size-3.5 -translate-x-1/2 translate-y-1/2"
                }
              >
                <span
                  className={
                    pin.hub
                      ? "jut-ping block size-full rounded-full bg-brand-green-dark/40"
                      : "jut-ping block size-full rounded-full bg-brand-green/45"
                  }
                  /* Out of phase, so four points breathe rather than blink in unison. */
                  style={{
                    animationDelay: `${index * (PULSE_CYCLE / CITIES.length)}s`,
                  }}
                />
              </span>
            )}

            <MapPin
              strokeWidth={1.5}
              className={
                pin.decorative
                  ? // Same glyph, markedly smaller and quieter, so the real four still lead.
                    "relative size-3 fill-brand-green/55 stroke-white/80"
                  : pin.hub
                    ? "relative size-6 fill-brand-green-dark stroke-white drop-shadow-[0_1px_2px_rgba(18,33,26,0.45)]"
                    : "relative size-5 fill-brand-green stroke-white drop-shadow-[0_1px_2px_rgba(18,33,26,0.4)]"
              }
            />
          </span>
        ))}
      </div>
    </div>
  );
}

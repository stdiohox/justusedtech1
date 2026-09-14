"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Partner marks arranged on a draggable 3D sphere.
 *
 * Adapted from the `SphereImageGrid` reference rather than dropped in as supplied, because
 * four things in that component are wrong for this content and this codebase:
 *
 * 1. It crops every image into a circle with `object-cover`. That is right for photographs
 *    and fatal for logos: our marks run from a 0.77 portrait lockup to a 3.10 wordmark, and
 *    cover-cropping a wordmark to a circle eats the word. Here each mark is CONTAINED inside
 *    a white disc, so the disc is the uniform shape and the artwork inside it is untouched.
 * 2. It seeds positions with `Math.random()`, which produces different output on the server
 *    and the client. The reference papers over that with an `isMounted` gate that throws the
 *    first paint away. Plain Fibonacci is deterministic AND more evenly spaced, which also
 *    deletes the reference's O(n^2) per-frame collision pass, since evenly spaced points do
 *    not collide.
 * 3. It calls `setState` on every animation frame, re-rendering all nodes 60 times a second.
 *    Rotation here is written straight to the DOM from the frame loop; React renders the
 *    tiles once. The loop also parks itself when there is nothing to animate (see `wake`).
 * 4. It hides the whole back hemisphere (`z > -30`), which reads as a dome. Depth here is a
 *    real perspective divide, so back marks stay visible, smaller and faded, and the shape
 *    reads as a sphere.
 *
 * Positioning is expressed entirely in percentages of the container, so the component needs
 * no measurement pass and no size prop: it fills whatever square box it is given and is
 * correct on the server. A `translate` percentage resolves against the element's own border
 * box, and every tile is a fixed fraction of the container, so a container-space offset
 * converts to a tile-space percentage by a single constant (`TILE`).
 */

export type SphereLogo = {
  id: string;
  label: string;
  src: string;
  /** Intrinsic pixel size of the file, so next/image reserves the true ratio. */
  width: number;
  height: number;
  /** Legibility multiplier from content/partners.ts. Damped and capped here, see LOGO_CAP. */
  scale?: number;
};

/* Sphere radius, as a fraction of the container's width. Sized against the widest point the
   projection can reach (1.06r at cos t = 1/3, not r) plus half a tile, so the nearest mark
   still clears the container edge. */
const RADIUS = 0.35;
/**
 * Disc diameter, as a fraction of the container's width.
 *
 * What matters visually is TILE/RADIUS, the disc's size relative to the sphere it sits on,
 * because that is what sets how crowded the surface looks. The reference sits near 0.45,
 * but it is carrying 60 images; at eighteen the same ratio leaves the sphere looking like a
 * scattering of dots rather than a surface. This is the ratio that reads as the reference's
 * proportions at our count.
 */
const TILE = 0.17;
/** Camera distance in radius units. Lower exaggerates depth; 3 gives a 0.75-1.5x size range. */
const PERSPECTIVE = 3;

/* The sphere tips but never rolls: a mark that goes past vertical is upside down, and an
   upside-down logo is a broken logo. Drag past the limit meets rubber-band resistance rather
   than a hard stop, and the limit is eased back to on release. */
const MAX_PITCH = (30 * Math.PI) / 180;

/** Idle drift, radians per second. One turn takes about a minute: present, not busy. */
const AUTO_YAW = (6 * Math.PI) / 180;
/** Radians of rotation per pixel of drag. */
const SENSITIVITY = 0.0075;
/** Momentum half-life. Velocity keeps about 6% of its value one second after release. */
const DECAY = 2.8;
/** Radians/second under which momentum is treated as stopped. */
const REST = 0.02;
/** Pixels of movement that turn a tap into a drag. */
const DRAG_SLOP = 6;

/*
  How much of a disc its mark is allowed to fill, as a fraction of the diameter.

  The `scale` multipliers in content/partners.ts were tuned for the /partners strip, where
  marks are normalised by HEIGHT and a wide wordmark therefore out-measures a square badge.
  A disc fits each mark by both dimensions, so most of that correction is already handled and
  passing the raw multiplier through would oversize the tall lockups. What survives the
  damping is the part that is about ink rather than ratio: faint or finely set marks still
  need a little more room.

  FIT_MAX is 0.707, the side of the square inscribed in the circle. Below it no corner of any
  artwork can reach the disc's edge, whatever its ratio, so nothing is ever clipped.
*/
const LOGO_FIT = 0.66;
const LOGO_FIT_MAX = 0.707;
const logoFit = (scale = 1) => Math.min(LOGO_FIT * (1 + (scale - 1) * 0.6), LOGO_FIT_MAX);

/**
 * Evenly spaced points on a unit sphere.
 *
 * The golden-angle spiral, which is the same idea as the reference's Fibonacci distribution
 * minus its randomisation and its pole-pushing fudge factors. Those existed to stop clumps
 * that the randomisation itself introduced.
 */
function spherePoints(count: number) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (2 * i + 1) / count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    return { x: Math.cos(theta) * ring, y, z: Math.sin(theta) * ring };
  });
}

export function LogoSphere({
  items,
  className,
}: {
  items: readonly SphereLogo[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLElement | null)[]>([]);
  /** Named mark under the sphere. The only piece of per-frame-adjacent state React owns. */
  const [active, setActive] = useState<string | null>(null);

  /*
    Everything the frame loop touches lives in one ref. Rotation state in React would mean a
    re-render per frame, which is the cost this component was rewritten to avoid, and the
    loop would capture stale values through its closure.
  */
  const sphere = useRef({
    yaw: 0.5,
    pitch: -0.16,
    yawVel: 0,
    pitchVel: 0,
    dragging: false,
    /** Idle drift stops while a pointer is over the sphere or the sphere is off screen. */
    hovering: false,
    visible: true,
    reduced: false,
    pointerId: -1,
    lastX: 0,
    lastY: 0,
    lastAt: 0,
    travelled: 0,
    running: false,
    /** Restarts the parked frame loop. Assigned by the effect below. */
    wake: undefined as (() => void) | undefined,
  });

  useEffect(() => {
    sphere.current.reduced = reduced === true;
  }, [reduced]);

  useEffect(() => {
    const points = spherePoints(items.length);
    const state = sphere.current;
    let frame = 0;
    let last = 0;

    const paint = () => {
      const cosYaw = Math.cos(state.yaw);
      const sinYaw = Math.sin(state.yaw);
      const cosPitch = Math.cos(state.pitch);
      const sinPitch = Math.sin(state.pitch);

      for (let i = 0; i < points.length; i++) {
        const node = tileRefs.current[i];
        if (!node) continue;
        const p = points[i];

        /* Yaw about the vertical axis, then pitch about the horizontal one. */
        const x = p.x * cosYaw + p.z * sinYaw;
        const zYaw = p.z * cosYaw - p.x * sinYaw;
        const y = p.y * cosPitch - zYaw * sinPitch;
        const z = p.y * sinPitch + zYaw * cosPitch;

        /* Perspective divide: one number scales both the offset and the tile, which is what
           makes a near mark larger AND further from centre by the same amount. */
        const k = PERSPECTIVE / (PERSPECTIVE - z);
        /* Screen Y runs downward, sphere Y runs upward, hence the negation. */
        const tx = ((x * RADIUS * k) / TILE) * 100;
        const ty = ((-y * RADIUS * k) / TILE) * 100;

        node.style.transform = `translate(-50%, -50%) translate(${tx.toFixed(2)}%, ${ty.toFixed(2)}%) scale(${k.toFixed(3)})`;
        /* Depth fade. The far side stays faintly present rather than being culled, so the
           silhouette reads as a sphere and not a dome. */
        node.style.opacity = (0.1 + 0.9 * ((z + 1) / 2) ** 1.5).toFixed(3);
        node.style.zIndex = String(Math.round(z * 100) + 200);
      }
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!state.dragging) {
        if (!state.reduced) {
          state.yaw += state.yawVel * dt;
          state.pitch += state.pitchVel * dt;
          const decay = Math.exp(-DECAY * dt);
          state.yawVel = Math.abs(state.yawVel) < REST ? 0 : state.yawVel * decay;
          state.pitchVel = Math.abs(state.pitchVel) < REST ? 0 : state.pitchVel * decay;
          if (!state.hovering && state.visible) state.yaw += AUTO_YAW * dt;
        } else {
          state.yawVel = 0;
          state.pitchVel = 0;
        }

        /* Ease any rubber-banded overshoot back inside the pitch limit. */
        const inside = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, state.pitch));
        if (inside !== state.pitch) {
          state.pitch += (inside - state.pitch) * Math.min(1, dt * 12);
          if (Math.abs(inside - state.pitch) < 0.0005) state.pitch = inside;
        }
      }

      paint();

      /* Park the loop rather than burning a frame a second forever on a static hero. */
      const drifting = !state.reduced && !state.hovering && state.visible;
      const settling = Math.abs(state.pitch) > MAX_PITCH + 0.0005;
      if (state.dragging || state.yawVel || state.pitchVel || drifting || settling) {
        frame = requestAnimationFrame(step);
      } else {
        state.running = false;
      }
    };

    const wake = () => {
      if (state.running) return;
      state.running = true;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };
    /* Published on the ref so the pointer and hover handlers, which live outside this
       effect, can restart a loop that has parked itself. */
    state.wake = wake;

    paint();
    wake();

    /* Off-screen sphere does no work. rAF already stops on a hidden tab; this covers the far
       commoner case of the reader having scrolled past the hero. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        state.visible = entry.isIntersecting;
        if (entry.isIntersecting) wake();
      },
      { rootMargin: "120px" },
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(frame);
      state.running = false;
      observer.disconnect();
    };
  }, [items.length]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = sphere.current;
    if (state.dragging) return;
    /* Capture so a drag that leaves the sphere keeps tracking, per direct manipulation. */
    event.currentTarget.setPointerCapture(event.pointerId);
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.yawVel = 0;
    state.pitchVel = 0;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    state.lastAt = event.timeStamp;
    state.travelled = 0;
    state.wake?.();
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = sphere.current;
    if (!state.dragging || event.pointerId !== state.pointerId) return;

    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    const dt = Math.max((event.timeStamp - state.lastAt) / 1000, 1 / 240);
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    state.lastAt = event.timeStamp;
    state.travelled += Math.abs(dx) + Math.abs(dy);

    state.yaw += dx * SENSITIVITY;

    let pitch = state.pitch + dy * SENSITIVITY;
    /* Rubber-band past the limit: the sphere keeps answering the finger, it just answers
       less and less, which says "there is nothing more this way" without feeling frozen. */
    const over = Math.abs(pitch) - MAX_PITCH;
    if (over > 0) pitch = Math.sign(pitch) * (MAX_PITCH + over / (1 + over * 8));
    state.pitch = pitch;

    /* Velocity is smoothed rather than taken raw from the last event, so one jittery sample
       before release cannot throw the sphere. */
    state.yawVel = state.yawVel * 0.25 + ((dx * SENSITIVITY) / dt) * 0.75;
    state.pitchVel = state.pitchVel * 0.25 + ((dy * SENSITIVITY) / dt) * 0.75;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = sphere.current;
    if (event.pointerId !== state.pointerId) return;
    state.dragging = false;
    state.pointerId = -1;
    /* A release more than a moment after the last move is a hold, not a throw. */
    if (event.timeStamp - state.lastAt > 90) {
      state.yawVel = 0;
      state.pitchVel = 0;
    }
    state.wake?.();
  };

  if (!items.length) return null;

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className={cn(
          "relative aspect-square w-[19rem] select-none sm:w-[25rem] md:w-[28.5rem] lg:w-[23.5rem] xl:w-[27.5rem]",
          /* pan-y, not none: a vertical swipe over the sphere still scrolls the page, which
             on a phone matters more than being able to tip the sphere by hand. */
          "cursor-grab touch-pan-y active:cursor-grabbing",
        )}
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={() => {
          sphere.current.hovering = true;
        }}
        onPointerLeave={() => {
          sphere.current.hovering = false;
          sphere.current.wake?.();
          setActive(null);
        }}
        role="img"
        aria-label={`Marks of the ${items.length} partner organisations, listed in full below.`}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            aria-hidden
            ref={(node) => {
              tileRefs.current[index] = node;
            }}
            className="group absolute top-1/2 left-1/2 will-change-transform"
            style={{ width: `${TILE * 100}%`, height: `${TILE * 100}%` }}
            onPointerEnter={() => setActive(item.label)}
            onClick={() => {
              /* Touch has no hover, so a tap names the mark. A tap that moved is a drag. */
              if (sphere.current.travelled < DRAG_SLOP) setActive(item.label);
            }}
          >
            {/*
              Hover lift lives on this inner disc, not on the tile. The tile's transform is
              rewritten every frame by the loop, so a CSS transition there would be fighting
              the animation; nested, the two compose instead.
            */}
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(9,38,24,0.07),0_10px_26px_-10px_rgba(9,38,24,0.34),inset_0_0_0_1px_rgba(9,38,24,0.09)] transition-transform duration-200 ease-out group-hover:scale-110">
              {/* TODO: swap for final vector/SVG logo when client delivers it */}
              <Image
                src={item.src}
                alt=""
                width={item.width}
                height={item.height}
                sizes="80px"
                className="object-contain"
                draggable={false}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: `${logoFit(item.scale) * 100}%`,
                  maxHeight: `${logoFit(item.scale) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/*
        The name of whichever mark is being pointed at. Height is reserved whether or not
        anything is named, so nothing below the sphere moves as the reader sweeps across it.
        The sphere itself is a single labelled image to a screen reader: every one of these
        names is already on the page as real text, and eighteen repeated alt strings in the
        masthead would only make the reader hear the list twice.
      */}
      <p
        aria-hidden
        className={cn(
          "h-5 text-center text-[0.8125rem] leading-5 font-semibold text-ink-soft transition-opacity duration-200",
          active ? "opacity-100" : "opacity-0",
        )}
      >
        {active ?? " "}
      </p>
    </div>
  );
}

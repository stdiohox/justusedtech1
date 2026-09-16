"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { PillAnchor, PillLink } from "@/components/common/pill-button";
import { asks } from "@/content/site";

/**
 * Partner With Us.
 *
 * A pointer-following spotlight plus a short spring trail. Motivated: the section is the
 * page's single conversion moment, and the light following the cursor keeps attention on
 * the one CTA rather than on decoration elsewhere.
 *
 * Pointer position lives in motion values, never in React state, so moving the mouse does
 * not re-render the tree. The effect is suppressed entirely under prefers-reduced-motion
 * and on coarse pointers, where there is no cursor to follow.
 */

const TRAIL = [
  { size: 14, stiffness: 260, damping: 26, color: "var(--brand-gold)" },
  { size: 10, stiffness: 170, damping: 24, color: "var(--brand-blue)" },
  { size: 7, stiffness: 110, damping: 22, color: "rgba(255,255,255,0.75)" },
];

export function PartnerCta() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  /*
    Whether the mouse is inside the section. The spotlight and the trail dots fade out on
    leave and back in on enter. Without this they simply stopped wherever the cursor
    exited: the dots parked there as a small gold, blue, and white ring in the middle of
    the section, and the glow stayed put too. Position is left alone on leave, so the fade
    happens in place rather than the dots flying off to a corner.
  */
  const [inside, setInside] = useState(false);

  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(255,217,102,0.20), transparent 70%)`;

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    if (!inside) setInside(true);
  }

  function onPointerLeave(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    setInside(false);
  }

  return (
    <section
      ref={ref}
      onPointerMove={reduced ? undefined : onPointerMove}
      onPointerLeave={reduced ? undefined : onPointerLeave}
      className="relative isolate overflow-hidden bg-green-surface py-24 text-white md:py-32"
    >
      {!reduced && (
        <>
          {/*
            The glow is masked to nothing at the section's top and bottom edges. The section
            clips at its box, and the footer under it carries no glow, so with the cursor
            low in the section the 420px circle was cut off dead at the footer's top edge:
            a hard horizontal line between two surfaces of the same green. The mask fades
            the glow out over the last 18% of the height on each side, so it can never reach
            an edge with any brightness left to clip.
          */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] [@media(pointer:fine)]:block"
            style={{ backgroundImage: spotlight }}
            initial={false}
            animate={{ opacity: inside ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          />
          {TRAIL.map((dot, i) => (
            <TrailDot key={i} x={x} y={y} visible={inside} {...dot} />
          ))}
        </>
      )}

      <div className="shell relative text-center">
        <h2 className="mx-auto max-w-[14ch] text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.04em] text-balance sm:text-6xl md:text-[4.5rem]">
          Partner With Us
        </h2>
        <p className="mx-auto mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-white/80">
          Companies retire hardware every quarter. Schools and community
          programmes need it. We handle the collection, the refurbishment, and
          the reporting in between.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PillAnchor href={asks.partner} variant="gold">
            Partner with us
          </PillAnchor>
          <PillLink href="/contact" variant="onDark">
            Talk to the team
          </PillLink>
        </div>
      </div>
    </section>
  );
}

function TrailDot({
  x,
  y,
  visible,
  size,
  stiffness,
  damping,
  color,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  visible: boolean;
  size: number;
  stiffness: number;
  damping: number;
  color: string;
}) {
  const sx = useSpring(x, { stiffness, damping, mass: 0.4 });
  const sy = useSpring(y, { stiffness, damping, mass: 0.4 });

  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 -z-10 hidden rounded-full [@media(pointer:fine)]:block"
      initial={false}
      animate={{ opacity: visible ? 0.7 : 0 }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        background: color,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

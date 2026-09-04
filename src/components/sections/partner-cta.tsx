"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { PillLink } from "@/components/common/pill-button";

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

  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(255,217,102,0.20), transparent 70%)`;

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <section
      ref={ref}
      onPointerMove={reduced ? undefined : onPointerMove}
      className="relative isolate overflow-hidden bg-green-surface py-24 text-white md:py-32"
    >
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 hidden [@media(pointer:fine)]:block"
            style={{ backgroundImage: spotlight }}
          />
          {TRAIL.map((dot, i) => (
            <TrailDot key={i} x={x} y={y} {...dot} />
          ))}
        </>
      )}

      <div className="shell relative text-center">
        <h2 className="mx-auto max-w-[14ch] text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.04em] text-balance sm:text-6xl md:text-[4.5rem]">
          Partner With Us
        </h2>
        <p className="mx-auto mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-white/80">
          Companies retire hardware every quarter. Schools and community programmes need
          it. We handle the collection, the refurbishment, and the reporting in between.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PillLink href="/get-involved#partner" variant="gold">
            Partner with us
          </PillLink>
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
  size,
  stiffness,
  damping,
  color,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
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
      className="pointer-events-none absolute top-0 left-0 -z-10 hidden rounded-full opacity-70 [@media(pointer:fine)]:block"
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

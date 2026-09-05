"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { InitialsAvatar } from "@/components/common/primitives";
import { cn } from "@/lib/utils";

/**
 * Community Voices card.
 *
 * Card mechanics only, borrowed from the tweet-card pattern: a cursor-following spotlight
 * on hover, a circular avatar that gains a ring, a rounded blurred card with a border and
 * shadow, and a spring entrance.
 *
 * Everything that made it read as a real tweet is gone: no reply, repost, like or share
 * bar, no counts, no verified checkmark, no view count, no @handle. We have no such
 * numbers, and styling invented ones to look verifiable would be fabrication. What remains
 * is avatar, name, body text, and a single meta line carrying role and organisation where
 * a timestamp used to sit.
 *
 * Pointer position lives in motion values, never in React state, so moving the cursor does
 * not re-render the tree.
 *
 * On the entrance. The card renders plain and fully visible on the server, and only swaps
 * to the animated version after mount. Motion's `whileInView` writes opacity:0 into the
 * server HTML, which would leave the section blank if a chunk failed to load. This section
 * sits well below the fold, so hydration is long finished before it is reached.
 */

const SPRING = { type: "spring", stiffness: 120, damping: 18, mass: 0.9 } as const;

type VoiceCardProps = {
  name: string;
  meta: string;
  index: number;
  children: ReactNode;
  /** Small label above the body, used to mark the narrative card as a case study. */
  label?: string;
  className?: string;
};

export function VoiceCard({
  name,
  meta,
  index,
  children,
  label,
  className,
}: VoiceCardProps) {
  const [enhanced, setEnhanced] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, rgba(0,166,82,0.16), transparent 72%)`;

  useEffect(() => setEnhanced(true), []);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function onPointerLeave() {
    mouseX.set(-9999);
    mouseY.set(-9999);
  }

  const body = (
    <div
      ref={ref}
      onPointerMove={reduced ? undefined : onPointerMove}
      onPointerLeave={reduced ? undefined : onPointerLeave}
      className={cn(
        "group/voice relative isolate flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-[color:var(--hairline)] bg-white/70 p-7 backdrop-blur-xl sm:p-9",
        "shadow-[0_2px_6px_rgba(18,33,26,0.04),0_28px_60px_-32px_rgba(18,33,26,0.35)]",
        "transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        className,
      )}
    >
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/voice:opacity-100"
          style={{ background: spotlight }}
        />
      )}

      {label && (
        <p className="mb-5 inline-flex w-fit rounded-full bg-mint px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[var(--tracking-eyebrow)] text-brand-green-dark uppercase">
          {label}
        </p>
      )}

      {children}

      <div className="mt-auto flex items-center gap-4 pt-8">
        <InitialsAvatar
          name={name}
          index={index}
          circle
          className={cn(
            "ring-0 ring-brand-green/0 transition-all duration-500",
            "ease-[cubic-bezier(0.32,0.72,0,1)]",
            "group-hover/voice:ring-4 group-hover/voice:ring-brand-green/25",
          )}
        />
        <span>
          <span className="block font-bold tracking-[var(--tracking-body)] text-ink">
            {name}
          </span>
          <span className="block text-[0.875rem] font-normal text-ink-soft">{meta}</span>
        </span>
      </div>
    </div>
  );

  if (!enhanced || reduced) return body;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...SPRING, delay: index * 0.08 }}
    >
      {body}
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

/*
  The "nothing to photograph yet" band, for a programme that has no photograph because it is
  not running.

  Adapted from a ghost 404 component rather than copied from it. What carries over is the
  composition: two oversized marks flanking a floating character, then a heading and one line
  underneath. Three things did not carry over, each for a reason worth keeping written down.

  The literal 404. "Four zero four" means a page that could not be found, and this is a card
  whose photograph does not exist yet, on a page that loaded correctly. Borrowing the numerals
  would have put a false error on a working panel. The flanking marks are photo crop brackets
  instead: the same rhythm, and they say "empty frame" without saying "broken".

  The CTA. The reference ends in a button, and ProgramMedia renders inside a Link on the home
  bento, so a link here would nest an anchor inside an anchor. Upcoming programmes do not
  reach that surface today, which makes it a latent bug rather than a live one, and a latent
  bug in a decorative band is not worth the risk. The panel's own copy sits directly below.

  The palette and the type. Brand tokens throughout, Nunito by inheritance, and the recessed
  --surface-subtle that every Upcoming treatment on the site already uses, so this reads as
  the same "not running" signal the badge and the quiet card fill carry.
*/

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.05, staggerChildren: 0.08 } },
};

/* Each bracket enters from its own side, so the frame closes around the ghost. */
const bracketIn: Variants = {
  hidden: (side: number) => ({ opacity: 0, x: side * 26 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

/*
  Critically damped, no overshoot. The ghost is not arriving off a flick or a drag, and
  bounce on something that simply appeared reads as decoration rather than physics.
*/
const ghostIn: Variants = {
  hidden: { opacity: 0, scale: 0.86, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", bounce: 0, duration: 0.55 },
  },
};

const lineIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** One rounded crop bracket. Mirrored by the caller for the right-hand side. */
function Bracket({ side }: { side: -1 | 1 }) {
  return (
    <motion.svg
      viewBox="0 0 40 104"
      variants={bracketIn}
      custom={side}
      className={cn(
        "h-20 w-8 shrink-0 select-none text-brand-green-dark/20 sm:h-32 sm:w-12",
        side === 1 && "-scale-x-100",
      )}
      fill="none"
      aria-hidden
    >
      <path
        d="M34 5H17A12 12 0 0 0 5 17v70a12 12 0 0 0 12 12h17"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

/** The ghost. Rounded crown and a scalloped hem, to match the brand's shape language. */
function Ghost() {
  return (
    <svg viewBox="0 0 64 72" className="size-20 select-none sm:size-28" aria-hidden>
      <path
        d="M32 3C17 3 6.5 14.2 6.5 29v34.7c0 2.7 3.1 4.1 5.1 2.4l5.3-4.4a4.2 4.2 0 0 1 5.4 0l4.5 3.8a4.2 4.2 0 0 0 5.4 0l4.5-3.8a4.2 4.2 0 0 1 5.4 0l5.3 4.4c2 1.7 5.1.3 5.1-2.4V29C57.5 14.2 47 3 32 3Z"
        className="fill-brand-green/25"
      />
      <ellipse cx="23.5" cy="31" rx="3.6" ry="4.8" className="fill-brand-green-dark/45" />
      <ellipse cx="40.5" cy="31" rx="3.6" ry="4.8" className="fill-brand-green-dark/45" />
    </svg>
  );
}

/**
 * Fills a programme's media band where a photograph would go.
 *
 * Takes its height from the caller so the band keeps the exact dimensions the icon wash and
 * the photographs use. A programme swapping to this treatment must not shift the card beside
 * it in the grid.
 */
export function PhotoPending({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={container}
      /*
        initial={false} paints the settled state on the first frame, which is the reduced
        motion path: no travel, no fade up, nothing vestibular, and the same final layout.
      */
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-6 px-7",
        "bg-[var(--surface-subtle)] text-center",
        className,
      )}
    >
      <div className="flex items-center gap-5 sm:gap-9">
        <Bracket side={-1} />
        <motion.div
          variants={ghostIn}
          /*
            A 3.2s round trip, kept clear of the roughly 0.2Hz band that reads as a slow
            pulse, and small enough in amplitude to be peripheral. Transform only.
          */
          animate={reduced ? undefined : { y: [-4, 4] }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Ghost />
        </motion.div>
        <Bracket side={1} />
      </div>

      <motion.p
        variants={lineIn}
        className="text-lg font-extrabold tracking-[-0.02em] text-ink-soft sm:text-xl"
      >
        No photographs yet
      </motion.p>
      <motion.p
        variants={lineIn}
        className="max-w-[38ch] text-[0.875rem] leading-relaxed text-ink-faint text-pretty"
      >
        This one is a concept at pitch stage, so there is nothing to photograph.
      </motion.p>
    </motion.div>
  );
}

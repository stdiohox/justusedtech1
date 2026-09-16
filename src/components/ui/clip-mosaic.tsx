"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A photograph revealed through a bento of rounded tiles that bloom open, breathe, close,
 * and hand over to the next frame.
 *
 * Adapted from a GSAP clip-path demo. Two things changed on the way in.
 *
 * The motion runs on `motion`, which this site already ships, rather than on GSAP. The
 * effect is six elements scaling between 0 and 1 on a stagger, which is a handful of
 * keyframes either way, and a second animation runtime is a large thing to add to a page
 * for one hero. Nothing here needs GSAP's timeline: the sequence is driven by the `open`
 * flag below, and the photograph swaps while every tile is shut, so the cut is never seen.
 *
 * The tiles are the site's own shape language rather than the demo's sharp 3x3 grid. Corner
 * radii are 5.6% of the width, which lands close to --radius-card at the sizes this renders
 * at, and no tile has a square corner anywhere.
 *
 * The clip is applied to an HTML element through `clip-path: url(#id)` rather than by
 * wrapping an SVG <image>, so the photographs stay next/image: optimised, sized per
 * breakpoint, and served at a fraction of the source files, which run to 1.6MB. Where the
 * reference fails the photograph simply shows as a square, which is a fair fallback.
 */

export type ClipMosaicFrame = {
  src: string;
  alt: string;
  /** object-position class, for a frame whose centre crop cuts through something. */
  position?: string;
};

/*
  The tile table, in fractions of the box, which is what clipPathUnits="objectBoundingBox"
  wants and what keeps the layout identical at every rendered size. Gaps are a flat 0.032,
  about 16px at the size this renders at.

  `inStep` and `outStep` are the stagger positions, held as data rather than derived from
  index order: the demo took its order at random, and a random order cannot be used here
  because the server and the client would each pick a different one and React would complain
  about the mismatch. These two are scattered by hand and never agree with each other, so the
  bento does not open and close in the same pattern.
*/
const TILES = [
  { x: 0, y: 0, w: 0.6, h: 0.46, inStep: 2, outStep: 1 },
  { x: 0.632, y: 0, w: 0.368, h: 0.46, inStep: 0, outStep: 4 },
  { x: 0, y: 0.492, w: 0.368, h: 0.508, inStep: 4, outStep: 0 },
  { x: 0.4, y: 0.492, w: 0.6, h: 0.24, inStep: 1, outStep: 5 },
  { x: 0.4, y: 0.764, w: 0.284, h: 0.236, inStep: 5, outStep: 2 },
  { x: 0.716, y: 0.764, w: 0.284, h: 0.236, inStep: 3, outStep: 3 },
];

const RADIUS = 0.056;

/* One cycle, in seconds. The frame changes in the gap between OUT finishing and IN starting. */
const IN = 0.7;
const IN_STAGGER = 0.09;
const HOLD = 2.6;
const OUT = 0.52;
const OUT_STAGGER = 0.07;

const LAST = TILES.length - 1;
const OPEN_MS = (IN + IN_STAGGER * LAST + HOLD) * 1000;
const CLOSE_MS = (OUT + OUT_STAGGER * LAST) * 1000;

/* Expo out and expo in, the two curves the reference used, as cubic-beziers. */
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const EXPO_IN = [0.7, 0, 0.84, 0] as const;

export function ClipMosaic({
  frames,
  className,
  sizes = "(min-width: 1280px) 416px, (min-width: 1024px) 384px, (min-width: 640px) 416px, 92vw",
}: {
  frames: ClipMosaicFrame[];
  className?: string;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  /*
    useId returns a string with colons in it, which is legal in an id attribute and not legal
    inside url(#...), so the punctuation comes out before it is used as a reference.
  */
  const clipId = `clip-mosaic-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    /*
      A reader who has asked for less motion gets the bento standing still with the first
      photograph in it. Cycling the frames would be the same animation with a longer period,
      not a quieter one, so it stops rather than slows.
    */
    if (reduced) return;

    let timer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setOpen(true);
      timer = setTimeout(() => {
        setOpen(false);
        timer = setTimeout(() => {
          setIndex((i) => (i + 1) % frames.length);
          cycle();
        }, CLOSE_MS);
      }, OPEN_MS);
    };

    cycle();
    return () => clearTimeout(timer);
  }, [reduced, frames.length]);

  const shown = frames[index] ?? frames[0];

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      {/*
        The tiles again, filled mint and standing still, behind the photograph. Without them
        the whole composition leaves the page for half a second between frames, which reads as
        a flash of nothing rather than as a transition. With them the bento is always on the
        page and the photograph is what comes and goes, growing out of the centre of each
        tile and shrinking back into it.
      */}
      <svg
        aria-hidden
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        {TILES.map((tile) => (
          <rect
            key={`ghost-${tile.x}-${tile.y}`}
            x={tile.x}
            y={tile.y}
            width={tile.w}
            height={tile.h}
            rx={RADIUS}
            ry={RADIUS}
            fill="var(--mint)"
          />
        ))}
      </svg>

      {/* The clip itself. No box of its own, so it takes no space in the layout. */}
      <svg aria-hidden className="pointer-events-none absolute size-0">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {TILES.map((tile) => (
              <motion.rect
                key={`${tile.x}-${tile.y}`}
                x={tile.x}
                y={tile.y}
                width={tile.w}
                height={tile.h}
                rx={RADIUS}
                ry={RADIUS}
                /*
                  fill-box puts the origin at each tile's own centre, so a tile grows in place
                  instead of sliding in from the corner of the box.
                */
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
                initial={{ scale: reduced ? 1 : 0 }}
                animate={{
                  /*
                    Open is three moves in one run of keyframes: out to full on an expo curve,
                    a slow breath past it, and back. Closed is the single move in, on the
                    mirror of that curve.
                  */
                  scale: reduced ? 1 : open ? [0, 1, 1.03, 1] : 0,
                }}
                transition={
                  open
                    ? {
                        duration: IN + HOLD,
                        times: [0, IN / (IN + HOLD), (IN + HOLD * 0.55) / (IN + HOLD), 1],
                        ease: [EXPO_OUT, "easeInOut", "easeInOut"],
                        delay: tile.inStep * IN_STAGGER,
                      }
                    : {
                        duration: OUT,
                        ease: EXPO_IN,
                        delay: tile.outStep * OUT_STAGGER,
                      }
                }
              />
            ))}
          </clipPath>
        </defs>
      </svg>

      {/*
        Every frame is mounted and only the current one is opaque. They are all behind the
        same clip, the swap happens while the tiles are shut, and keeping them mounted means
        the second and third photographs are not being fetched at the moment they are needed.
      */}
      <div className="absolute inset-0" style={{ clipPath: `url(#${clipId})` }}>
        {frames.map((frame, i) => (
          <Image
            key={frame.src}
            src={frame.src}
            alt=""
            fill
            sizes={sizes}
            quality={90}
            priority={i === 0}
            className={cn(
              "object-cover",
              frame.position,
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      {/*
        The photographs carry no alt text of their own: three of them are one picture as far
        as a reader is concerned, and a decorative clip cycling between them should not read
        out three descriptions in turn. The block describes itself once, here, with the
        description of whichever frame is up.
      */}
      <span className="sr-only">{shown.alt}</span>
    </div>
  );
}

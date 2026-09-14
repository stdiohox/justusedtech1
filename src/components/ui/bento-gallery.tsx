"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/ui/lightbox";
import type { GalleryPhoto } from "@/components/ui/elastic-gallery";

/*
  Draggable bento gallery, adapted from the reference.

  The mechanic is the reference's: a grid flowing in columns inside a motion div you drag
  horizontally, constrained to the overflow width, with a staggered spring entry and a
  lightbox on click. Its span classes per item are kept too, which is what gives the row its
  bento rhythm rather than a uniform filmstrip.

  This is the style for a programme with a lot of photographs. Project 9-12 has ten, and ten
  panels in an accordion collapse to slivers; a draggable run of mixed-size cells shows them
  all without any one of them disappearing.

  Changes from the reference, in order of how much they matter.

  It is usable without a mouse. The reference drags and nothing else, so a keyboard user
  cannot reach any photograph. Each cell is a button here, and the strip is a horizontally
  scrollable region, so focus moves through it and scrolls it into view natively. Drag is
  layered on top for pointer users rather than being the only way in.

  Native scroll underneath. The reference measures the overflow in an effect and feeds it to
  dragConstraints; that number goes stale on any layout change it does not observe, and on
  touch it fights the browser. Here the track is a real overflow-x container, so touch
  scrolling, trackpads, and scroll-into-view all work for free, and drag is an enhancement
  for mouse users.

  Reduced motion drops the drag, the stagger, and the hover scale, leaving a plain scrollable
  strip that still shows every photograph.

  The overlay says nothing it cannot know. The reference prints a title and a description per
  item; these are documentary photographs, so the cell shows its index and the description
  lives in alt text and in the lightbox caption, where it is a description rather than a claim.
*/

export function BentoGallery({
  photos,
  className,
}: {
  photos: GalleryPhoto[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragRange, setDragRange] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setDragRange(Math.max(0, el.scrollWidth - el.clientWidth));
    measure();
    /* Observed rather than bound to resize alone, so a font or image load re-measures too. */
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [photos]);

  if (photos.length === 0) return null;

  /*
    Span pattern, cycled. Two tall cells then two short ones, so the run reads as a bento
    rather than a row of equal tiles. Every cell keeps a minimum width so nothing collapses.
  */
  const spans = [
    "row-span-2 w-[17rem] sm:w-[24rem]",
    "row-span-1 w-[15rem] sm:w-[19rem]",
    "row-span-1 w-[15rem] sm:w-[19rem]",
    "row-span-2 w-[14rem] sm:w-[18rem]",
    "row-span-1 w-[15rem] sm:w-[21rem]",
  ];

  return (
    <div className={className}>
      <div
        ref={trackRef}
        className="w-full overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:thin]"
      >
        <motion.div
          drag={reduced || dragRange === 0 ? false : "x"}
          dragConstraints={{ left: -dragRange, right: 0 }}
          dragElastic={0.04}
          dragMomentum={false}
          /*
            The two track heights are stated explicitly. `grid-rows-2` plus `auto-rows` does
            not work here: grid-rows-2 declares two EXPLICIT rows, which size to auto, and
            auto-rows only ever sizes implicit ones. Every cell holds nothing but a `fill`
            image, so auto resolves to zero and the whole strip collapses to hairlines.
          */
          className="grid w-max grid-flow-col grid-rows-[9rem_9rem] gap-3 sm:grid-rows-[11rem_11rem] sm:gap-4"
        >
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              aria-label={`Open photograph ${i + 1} of ${photos.length}`}
              onClick={() => setOpen(i)}
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.5,
                delay: reduced ? 0 : Math.min(i, 6) * 0.05,
              }}
              className={cn(
                "group relative overflow-hidden rounded-inner border border-edge bg-mint",
                "focus-visible:ring-2 focus-visible:ring-brand-green-dark focus-visible:ring-offset-2",
                "focus-visible:outline-none",
                spans[i % spans.length],
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                quality={90}
                sizes="(min-width: 640px) 420px, 280px"
                className={cn(
                  "object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  "group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                )}
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
              />
              <span
                aria-hidden
                className="absolute bottom-3 left-4 text-[0.8125rem] font-extrabold tracking-[0.14em] text-white tabular-nums opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <p className="mt-2 text-[0.8125rem] text-ink-faint">
        Drag or scroll for more. Select a frame to open it.
      </p>

      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </div>
  );
}

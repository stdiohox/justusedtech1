"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/ui/lightbox";
import type { GalleryPhoto } from "@/components/ui/elastic-gallery";

/*
  Interactive image accordion, adapted from the reference.

  Distinct from the elastic gallery on purpose, even though both are accordions. Elastic
  opens one panel to four parts against its siblings' one and fills the row; this one opens a
  fixed 400px panel against 60px rails, so the closed panels stay narrow slivers with their
  labels turned on their side. Elastic reads as a spread, this reads as a stack of spines.
  Different programmes get different ones so the pages do not all move alike.

  The reference is untyped JavaScript, and would not compile in this project: `item`,
  `isActive` and `onMouseEnter` are implicit any, and its error handler reaches for
  `e.target.src`. It is typed here, and the broken-image fallback is dropped rather than
  ported, because every photograph is a local file committed alongside the page. A fallback
  that can only fire if the build is broken is a fallback that hides a broken build.

  Same accessibility correction as the other galleries: panels are buttons, focus opens them,
  and selecting one opens the full frame rather than only enlarging a sliver.
*/

export function ImageAccordion({
  photos,
  className,
}: {
  photos: GalleryPhoto[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <div className={className}>
      {/*
        Scrolls rather than wraps below its natural width. The panels have fixed widths, which
        is what makes the effect read, so on a narrow tablet the row moves instead of
        collapsing into stacked full-width blocks that would not be an accordion at all.
        Phones never see it: the programme page swaps in the mosaic below md.
      */}
      <div className="w-full overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:thin]">
        <div className="flex w-max gap-2 sm:gap-3">
          {photos.map((photo, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={photo.src}
                type="button"
                aria-label={`Open photograph ${i + 1} of ${photos.length}`}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onClick={() => setOpen(i)}
                className={cn(
                  "group relative h-[22rem] shrink-0 overflow-hidden rounded-inner border border-edge",
                  "bg-mint transition-[width] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  "focus-visible:ring-2 focus-visible:ring-brand-green-dark focus-visible:ring-offset-2",
                  "focus-visible:outline-none motion-reduce:transition-none sm:h-[28rem]",
                  active ? "w-[19rem] sm:w-[25rem]" : "w-[3.75rem]",
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  quality={90}
                  sizes="(min-width: 640px) 400px, 300px"
                  className="object-cover"
                />

                {/*
                  A scrim on every panel, not only the open one. The closed panels carry
                  rotated labels over whatever happens to be in that sliver of photograph,
                  and without a wash underneath the label lands on noise.
                */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 transition-colors duration-500 motion-reduce:transition-none",
                    active ? "bg-ink/20" : "bg-ink/45",
                  )}
                />

                <span
                  aria-hidden
                  className={cn(
                    "absolute font-extrabold text-white transition-all duration-500",
                    "motion-reduce:transition-none",
                    active
                      ? "bottom-5 left-1/2 -translate-x-1/2 text-[0.8125rem] tracking-[0.14em] tabular-nums"
                      : "bottom-16 left-1/2 -translate-x-1/2 rotate-90 text-[0.8125rem] tracking-[0.2em] tabular-nums",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-2 text-[0.8125rem] text-ink-faint">
        Hover or focus a panel to open it. Select it to see the full frame.
      </p>

      <Lightbox
        photos={photos}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </div>
  );
}

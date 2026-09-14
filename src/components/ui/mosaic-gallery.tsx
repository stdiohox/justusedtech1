"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/ui/lightbox";
import type { GalleryPhoto } from "@/components/ui/elastic-gallery";

/*
  Mosaic gallery: every photograph visible at rest, and none of them cropped.

  This started as a fixed-height span grid, which was wrong for the set it holds. GreenBin's
  photographs are mostly portrait at a ratio of 0.75, and the grid's cells ran from 2.26 to
  4.61 wide, so object-cover was showing about a third of a tall frame and, in the wide cells,
  about a sixth. The boxes it framed were tidy; what they framed was the middle band of
  somebody's arms.

  It is a masonry column flow now. Each photograph sets its own height from its real width and
  height, so a portrait stays portrait, a landscape stays landscape, and nothing is cut. That
  also removes the tiling arithmetic the span version needed, because columns simply fill.

  The trade is that the bottom edge of the columns is ragged rather than flush. That is the
  correct trade here: a straight edge is worth having, and it is not worth a third of a
  photograph. The other three galleries still crop, deliberately, because they are built to
  open one frame at a time rather than show a whole set at rest.
*/

export function MosaicGallery({
  photos,
  className,
}: {
  photos: GalleryPhoto[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <div className={className}>
      {/*
        CSS multi-column rather than grid. Grid cannot do masonry without fixed row heights,
        which is the thing that was cropping. `break-inside-avoid` keeps a photograph from
        being split across a column boundary.
      */}
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Open photograph ${i + 1} of ${photos.length}`}
            onClick={() => setOpen(i)}
            className={cn(
              "group relative mb-3 block w-full break-inside-avoid overflow-hidden",
              "rounded-inner border border-edge bg-mint sm:mb-4",
              "focus-visible:ring-2 focus-visible:ring-brand-green-dark focus-visible:ring-offset-2",
              "focus-visible:outline-none",
            )}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              /*
                Intrinsic sizing. The fallback is 4:3 rather than a square, so a photograph
                that somehow arrives without dimensions still lands on a plausible shape
                instead of a box that distorts it.
              */
              width={photo.width ?? 1200}
              height={photo.height ?? 900}
              quality={90}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className={cn(
                "h-auto w-full transition-transform duration-700",
                "ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]",
                "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
              )}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-3 left-4 text-[0.8125rem] font-extrabold tracking-[0.14em] text-white tabular-nums opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-1 text-[0.8125rem] text-ink-faint">Select any frame to open it.</p>

      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </div>
  );
}

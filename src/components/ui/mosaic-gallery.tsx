"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/ui/lightbox";
import type { GalleryPhoto } from "@/components/ui/elastic-gallery";

/*
  Mosaic gallery: a static asymmetric grid, every photograph visible at once.

  This is the fourth style, and it exists because the other three all hide something until
  you interact. Elastic and the accordion collapse the frames you are not on, and the bento
  runs off the side of the screen. For a programme whose photographs are a set rather than a
  sequence, showing all of them at rest is the right answer, and it is the one layout here
  that needs no hover to be complete.

  The span pattern is the bento-grid reference's idea applied to photographs rather than
  cards: a lead cell spanning two columns and two rows, then singles around it, cycling.

  Same rules as the rest of the family: cells are buttons, they open the shared lightbox,
  hover scale drops under reduced motion, and the index is the only thing printed on the
  photograph, with the description in alt text.
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

  /*
    A five-cell pattern that tiles a three-column grid exactly: a 2x2 lead, three singles,
    then a 2x1 to close. Areas are 4 + 1 + 1 + 1 + 2 = 9, which is three full rows.

    The arithmetic is the point. The first pattern here mixed spans that summed to 10 in a
    four-column grid, which cannot divide evenly, and it left a hole under the lead cell that
    read as a missing photograph rather than as negative space. Dense flow does not rescue
    that: there is nothing left to backfill with. It is still set, so a programme whose count
    is not a multiple of five packs as tightly as it can rather than stair-stepping.
  */
  const spans = [
    "sm:col-span-2 sm:row-span-2",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-2 sm:row-span-1",
  ];

  return (
    <div className={className}>
      <div className="grid auto-rows-[11rem] grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Open photograph ${i + 1} of ${photos.length}`}
            onClick={() => setOpen(i)}
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
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 33vw, 100vw"
              className={cn(
                "object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                "group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
              )}
            />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            />
            <span
              aria-hidden
              className="absolute bottom-3 left-4 text-[0.8125rem] font-extrabold tracking-[0.14em] text-white tabular-nums opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-[0.8125rem] text-ink-faint">
        Select any frame to open it.
      </p>

      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </div>
  );
}

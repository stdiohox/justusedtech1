"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/*
  Elastic accordion gallery, adapted from the reference.

  The mechanic is the reference's and is kept exactly: panels sit in a flex row, the active
  one takes flex-[4] against its siblings' flex-[1], inactive panels dim and scale their
  photograph up slightly, and the whole thing eases on the same long curve. Hover sets the
  active panel on a pointer device, tap sets it on a touch one.

  Three things are different, and the first two are corrections rather than taste.

  Accessibility. The reference drives the whole gallery from onMouseEnter and onClick on a
  plain div, which is unreachable by keyboard and invisible to a screen reader. Each panel is
  a real button here, so it takes focus, responds to Enter and Space for free, and announces
  which photograph it opens. Focus moves the active panel too, so tabbing through the gallery
  actually opens each one.

  Reduced motion. Flex and filter transitions are dropped under motion-reduce. The panel still
  opens, it just arrives rather than travels.

  The palette. The reference is a dark editorial gallery with black uppercase display type.
  This is a light site, so the panels sit on the card surface with the brand hairline, the
  labels use the site's type scale, and the gradient scrim is only as heavy as it needs to be
  to hold white text over a photograph.

  One note on captions. The reference labels every panel with a title and a category. These
  photographs are documentary rather than portfolio pieces, and naming each one invites the
  kind of caption that asserts who a person in the frame is. So the visible label is the
  index, the real description lives in the alt text where it belongs, and nothing here claims
  anything about the people photographed.
*/

export type GalleryPhoto = {
  src: string;
  alt: string;
  /** The file's real pixel dimensions. Used by galleries that lay out at natural aspect. */
  width?: number;
  height?: number;
};

export function ElasticGallery({
  photos,
  className,
}: {
  photos: GalleryPhoto[];
  className?: string;
}) {
  /* Opens on the first frame rather than a middle one: this is a sequence, not a carousel. */
  const [activeIndex, setActiveIndex] = useState(0);

  if (photos.length === 0) return null;

  /*
    A single photograph has nothing to accordion against, so it renders as one plain frame.
    Every programme gallery is real photography and two of them only have one frame, so this
    is a live branch rather than a defensive one.
  */
  if (photos.length === 1) {
    return (
      <div
        className={cn(
          "relative h-[22rem] overflow-hidden rounded-card border border-edge sm:h-[30rem]",
          className,
        )}
      >
        <Image
          src={photos[0]!.src}
          alt={photos[0]!.alt}
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          quality={90}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-[26rem] w-full flex-col gap-2 sm:h-[32rem] sm:flex-row sm:gap-3",
        className,
      )}
    >
      {photos.map((photo, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={photo.src}
            type="button"
            aria-label={`Show photograph ${i + 1} of ${photos.length}`}
            aria-pressed={active}
            onMouseEnter={() => setActiveIndex(i)}
            onFocus={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-inner border border-edge bg-mint",
              "transition-[flex,filter] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "focus-visible:ring-2 focus-visible:ring-brand-green-dark focus-visible:ring-offset-2",
              "focus-visible:outline-none motion-reduce:transition-none",
              active ? "flex-[4]" : "flex-[1]",
              active ? "brightness-100" : "brightness-[0.62] hover:brightness-[0.8]",
            )}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1280px) 800px, (min-width: 640px) 60vw, 100vw"
              quality={90}
              className={cn(
                "object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]",
                "motion-reduce:transition-none",
                active ? "scale-100" : "scale-[1.08]",
              )}
            />

            {/* Scrim, only under the active panel where the index sits on the photograph. */}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent",
                "transition-opacity duration-500 motion-reduce:transition-none",
                active ? "opacity-100" : "opacity-0",
              )}
            />

            <span
              aria-hidden
              className={cn(
                "absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.8125rem] font-extrabold",
                "tracking-[0.14em] text-white tabular-nums",
                "transition-opacity duration-500 motion-reduce:transition-none",
                active ? "opacity-90" : "opacity-70",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { GalleryPhoto } from "@/components/ui/elastic-gallery";

/*
  Shared full-frame viewer, used by every gallery style that opens a photograph.

  The reference galleries each shipped their own modal: a fixed overlay, a click-out to
  close, and an <img> inside. Three copies of that in one codebase is three places to fix
  a focus trap, so it lives here once and the galleries pass photos and an index.

  What the references left out and this adds, because a modal without them is broken rather
  than merely plain:

  Escape closes it, and the arrow keys move between photographs. A viewer you can only leave
  with the mouse is a trap for anyone not using one.

  Background scroll is locked while it is open, so dismissing does not land the reader
  somewhere else on the page.

  The close button takes focus on open, so the keyboard lands somewhere useful and tabbing
  does not walk off into the page underneath.

  It uses next/image at full quality rather than a raw <img>. This is the one surface where
  the whole frame is shown at size, so it is the one that most needs the pixels.
*/

export function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: GalleryPhoto[];
  /** null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const reduced = useReducedMotion();
  const open = index !== null;

  /*
    Portalled to <body>, and this is not optional.

    Every gallery sits inside a Reveal, and Reveal's `.rise` runs a transform via a
    scroll-driven animation. A transformed ancestor becomes the containing block for its
    fixed descendants, so `position: fixed` stopped meaning "the viewport" and started
    meaning "this section": the overlay opened as a box partway down the page with the site
    header and the quick-actions dock painted over it.

    A transform also opens a stacking context, so no z-index on the overlay could have lifted
    it above chrome outside that context. Escaping the subtree is the fix; z-50 then only has
    to beat the header and dock, which are both z-40.
  */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, onIndexChange, photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose, step]);

  const photo = index === null ? null : photos[index];
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Photograph ${(index ?? 0) + 1} of ${photos.length}`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            initial={reduced ? false : { scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={reduced ? undefined : { scale: 0.96, y: 12 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-4"
          >
            <div className="relative w-full overflow-hidden rounded-card bg-ink/40">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={2400}
                height={1600}
                quality={90}
                sizes="(min-width: 1280px) 1100px, 100vw"
                className="h-auto max-h-[78vh] w-full object-contain"
              />
            </div>
            <p className="max-w-[70ch] text-center text-[0.875rem] leading-relaxed text-white/70 text-pretty">
              {photo.alt}
            </p>
          </motion.div>

          {photos.length > 1 && (
            <>
              <ViewerButton label="Previous photograph" onClick={() => step(-1)} className="left-3 sm:left-6">
                <ChevronLeft className="size-5" strokeWidth={2} aria-hidden />
              </ViewerButton>
              <ViewerButton label="Next photograph" onClick={() => step(1)} className="right-3 sm:right-6">
                <ChevronRight className="size-5" strokeWidth={2} aria-hidden />
              </ViewerButton>
            </>
          )}

          <ViewerButton label="Close" onClick={onClose} className="top-3 right-3 sm:top-6 sm:right-6" autoFocus>
            <X className="size-5" strokeWidth={2} aria-hidden />
          </ViewerButton>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function ViewerButton({
  label,
  onClick,
  className,
  children,
  autoFocus,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  autoFocus?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      autoFocus={autoFocus}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute ${className ?? ""} flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-300 hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${className?.includes("top") ? "" : "top-1/2 -translate-y-1/2"}`}
    >
      {children}
    </button>
  );
}

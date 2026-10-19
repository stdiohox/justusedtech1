"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A row of cards that scrolls sideways instead of squeezing into the container.
 *
 * Native scroll-snap does the work: swipe, trackpad and shift-wheel all move it with no
 * script, and the cards stay readable before hydration. The script only drives the two
 * buttons and greys out whichever end has been reached.
 *
 * Each card takes a fixed share of the track rather than an equal split of it, so adding a
 * programme adds a card to scroll to, never a narrower card. The share leaves part of the
 * next card showing at every width, which is what tells a reader there is more.
 *
 * The track pads its block axis and pulls it back with a negative margin. An overflow
 * container clips on both axes, and without that room the card shadows and the hover lift
 * were cut off along the top and bottom edges.
 *
 * Children must not use Reveal/RevealItem: their animation-timeline: view() binds to the
 * nearest scroller, which here is this track, so cards off to the side would sit hidden.
 * Wrap the whole carousel in a Reveal instead.
 */
export function CardCarousel({
  children,
  label,
  footer,
}: {
  children: ReactNode;
  /** Accessible name for the region, e.g. "More programmes". */
  label: string;
  /** Rendered on the left of the controls row, e.g. a "see all" link. */
  footer?: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const resize = new ResizeObserver(sync);
    resize.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      resize.disconnect();
    };
  }, [sync]);

  /* One card per press: the first card's width plus the gap, which snap then settles. */
  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        className={cn(
          "-mx-2 -my-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-2 px-2 py-4",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {Children.map(children, (child) => (
          <div className="flex shrink-0 basis-[85%] snap-start sm:basis-[60%] lg:basis-[40%]">
            {child}
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        <div>{footer}</div>
        <div className="flex gap-2">
          <StepButton label={`Previous, ${label}`} disabled={atStart} onClick={() => step(-1)}>
            <ArrowLeft className="size-5" strokeWidth={2} aria-hidden />
          </StepButton>
          <StepButton label={`Next, ${label}`} disabled={atEnd} onClick={() => step(1)}>
            <ArrowRight className="size-5" strokeWidth={2} aria-hidden />
          </StepButton>
        </div>
      </div>
    </div>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      /*
        aria-disabled, not disabled: a disabled button drops focus to <body> the moment the
        last press reaches the end, and a keyboard user loses their place in the page.
      */
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      className={cn(
        "grid size-12 place-items-center rounded-full border border-[color:var(--hairline)] bg-white text-ink shadow-[var(--shadow-soft)]",
        "transition-[transform,opacity,border-color] duration-150 ease-out",
        "hover:border-[color:rgba(0,122,55,0.35)] active:scale-[0.97]",
        "aria-disabled:cursor-default aria-disabled:opacity-40",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-dark",
      )}
    >
      {children}
    </button>
  );
}

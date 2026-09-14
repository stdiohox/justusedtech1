"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A list whose items arrive one after another the first time the list is seen.
 *
 * Adapted from the animated-list pattern. Four things changed on the way in, each because
 * the source is animating a notification feed and this is animating the section's content.
 *
 * 1. It does not loop. The source cycles forever, and because its index wraps with a
 *    modulo, the list collapses back to one item and rebuilds. That is fine for ambient
 *    notifications and wrong here: these three stages are what the section is for, and a
 *    reader part-way through step three should not watch it disappear.
 *
 * 2. It does not reverse. The source puts the newest item on top, which is right for a feed
 *    and backwards for a process. Collect comes before Refurbish comes before Distribute,
 *    so they arrive in that order, downward.
 *
 * 3. Every item is rendered from the first byte of HTML. The source mounts `slice(0, index)`,
 *    so with JavaScript disabled or a chunk that fails to load, the page shows one item and
 *    nothing else. Here the resting state of an item is simply visible, and the arrival is
 *    layered on top where it can run, which is the same bargain `Reveal` strikes.
 *
 * 4. It is CSS, not framer-motion, which is not installed here. The source needs the library
 *    for `layout`, because items are inserted at the top and have to push the ones below
 *    them. Arriving downward, nothing pushes anything: each item fades and drops into space
 *    that is already reserved for it. That is a keyframe and an animation-delay, and it runs
 *    off the main thread.
 *
 * Layout is the caller's, not this component's. This contributes the arrival and nothing
 * else, so pass the flex or grid classes you want on `className`.
 */

export function AnimatedList({
  children,
  className,
  as: Tag = "div",
  /** Gap between one item arriving and the next, in ms. */
  step = 240,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ol" | "ul";
  step?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [arriving, setArriving] = useState(false);

  /*
    Armed on first sight rather than on mount, so the sequence plays for the reader who has
    just scrolled to it instead of finishing somewhere above the fold. threshold 0: it fires
    on the first pixel, while the list is still at the bottom edge of the screen, which is
    early enough that the items are already hidden by the time they are worth looking at.

    The one case that shows its working is a cold load straight onto /about#model, where the
    HTML paints the list before hydration arms it. Coming from the header menu, which is a
    client navigation into an already-hydrated page, it does not arise.
  */
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setArriving(true);
        observer.disconnect();
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const ItemTag = Tag === "div" ? "div" : "li";

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("animated-list", arriving && "is-arriving", className)}
      style={{ "--arrive-step": `${step}ms` } as React.CSSProperties}
    >
      {Children.map(children, (child, index) => (
        <ItemTag
          className="animated-list-item"
          style={{ "--arrive-index": index } as React.CSSProperties}
        >
          {child}
        </ItemTag>
      ))}
    </Tag>
  );
}

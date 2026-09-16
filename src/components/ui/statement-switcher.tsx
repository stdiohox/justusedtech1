"use client";

import { useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One statement at a time, with a position rail and a stepper beside it.
 *
 * Adapted from the revision-timeline pattern: a bordered card whose content pane is driven
 * by a track running along one edge, plus an arrow HUD that walks the same track. Turned
 * ninety degrees, so the pane and the track sit side by side rather than stacked.
 *
 * What did not come across, and why.
 *
 * The source's dial is dense because each dash is a calendar day, and days with no revision
 * render as inert padding: it is reading real data, and the padding is real too. This has
 * two statements. Fabricating eighty dashes either side of them so the dial looked busy
 * would be drawing a chart of nothing, which is not a thing this site does. So the rail is
 * a two-segment track with a thumb that slides between them, which is the same instrument
 * at the size the content actually is.
 *
 * The source also ships an inline markdown parser, an image renderer and a date-padding
 * engine. None of that has anything to hold here: the statements are two sentences from
 * content/site.ts with no markup, no dates and no authors.
 *
 * Built on CSS transitions rather than framer-motion, which is not installed and is not
 * needed. The house animation library is `motion/react` and it earns its place where state
 * has to survive interruption mid-flight; a cross-fade and a sliding thumb do not. CSS
 * transitions retarget from wherever they are when you click again, run off the main
 * thread, and leave the statements readable with no JavaScript at all.
 *
 * Accessibility: this is a tab set, so it is built as one. The rail labels are the tabs,
 * the panes are the panels, arrow keys and Home/End walk the list, and only the active tab
 * takes a tab stop. Every pane stays mounted so the switch can cross-fade; the inactive
 * ones are `inert`, which takes them out of the tab order and the accessibility tree.
 */

export type Statement = {
  id: string;
  /** Short name on the rail. Rendered uppercase; store it in sentence case. */
  label: string;
  body: string;
};

export function StatementSwitcher({
  statements,
  className,
}: {
  statements: Statement[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  /* Pointer and the arrow HUD: select without moving focus, or the arrow loses it mid-click. */
  const select = (index: number) => setActiveIndex(index);

  /* Keyboard inside the rail: selection follows focus, which is the standard for a tab set. */
  const move = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const onRailKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = statements.length - 1;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        move(activeIndex === last ? 0 : activeIndex + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        move(activeIndex === 0 ? last : activeIndex - 1);
        break;
      case "Home":
        move(0);
        break;
      case "End":
        move(last);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  return (
    <div className={cn("bezel", className)}>
      <div className="bezel-core grid gap-8 bg-white p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:p-10">
        {/*
          The rail is first in the DOM, which is both the correct order for a tab set and the
          order it needs on a phone. Stacked, the tabs have to sit above the statement: the
          pane reserves the height of the longest statement whatever is showing, so with the
          tabs underneath, the shorter one leaves a visible hole between itself and the
          control that changed it. Above, that same slack lands at the foot of the card and
          reads as padding. At lg explicit placement puts it back in the right-hand column.

          The track runs the full height of the statement there rather than just the height of
          its own two labels. A 70px tick beside a 300px card reads as a stray mark; at full
          height it reads as an instrument, the thumb has somewhere to travel, and the
          distance it moves is proportional to what changed.

          It stays vertical at every width rather than flipping to horizontal when it moves
          on top. A track that changes axis needs two of every value, and two rows of labels
          cost almost nothing stacked.
        */}
        <div className="lg:col-start-2 lg:row-start-1 lg:flex lg:w-52 lg:flex-col lg:self-stretch">
          <div className="flex gap-5 lg:flex-1">
            <div
              aria-hidden
              className="relative w-1.5 shrink-0 overflow-hidden rounded-full bg-ink/10"
            >
              {/*
                The thumb is one slot tall and moves in whole slots. translateY is a
                percentage of the thumb's own height, so the arithmetic holds at any count
                and the track needs no measuring.
              */}
              <span
                className="statement-thumb absolute inset-x-0 top-0 rounded-full bg-brand-green"
                style={{
                  height: `${100 / statements.length}%`,
                  transform: `translateY(${activeIndex * 100}%)`,
                }}
              />
            </div>

            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Vision and mission"
              onKeyDown={onRailKeyDown}
              className="flex flex-1 flex-col gap-5 lg:gap-0"
            >
              {statements.map((statement, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={statement.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={tabId(index)}
                    aria-selected={isActive}
                    aria-controls={panelId(index)}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => select(index)}
                    className={cn(
                      /* One tab per track slot at lg, each centred on the slot it marks. */
                      "statement-tab rounded-button text-left text-[0.8125rem] font-extrabold tracking-[0.16em] uppercase lg:flex lg:flex-1 lg:items-center",
                      isActive ? "text-brand-green-dark" : "text-ink-faint",
                    )}
                  >
                    {statement.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/*
            Up and down, not back and next: the control sits against a vertical track and
            should say which way along it the reader is about to go. Indented to clear the
            track, so the pair lines up with the labels rather than with the rail's edge.

            lg and up only. Stacked, the rail sits directly above the statement and the two
            tabs are already within a thumb's reach, so the arrows are a second control for
            the same job costing 80px at the top of the card, in the layout with the least
            room to spare.
          */}
          <div className="hidden items-center gap-2 pl-[1.625rem] lg:mt-8 lg:flex">
            <StepButton
              direction="up"
              disabled={activeIndex === 0}
              onClick={() => select(activeIndex - 1)}
            />
            <StepButton
              direction="down"
              disabled={activeIndex === statements.length - 1}
              onClick={() => select(activeIndex + 1)}
            />
          </div>
        </div>

        {/*
          Every pane in one grid cell, so the card is as tall as the longest statement and
          stays that height through a switch. Two sentences of different lengths swapped in
          a self-sizing box would resize the card under the reader's cursor.
        */}
        <div className="grid lg:col-start-1 lg:row-start-1">
          {statements.map((statement, index) => (
            <div
              key={statement.id}
              id={panelId(index)}
              role="tabpanel"
              aria-labelledby={tabId(index)}
              inert={index !== activeIndex}
              className={cn(
                "statement-pane [grid-area:1/1]",
                index === activeIndex && "is-active",
              )}
            >
              {/*
                No eyebrow over the statement. The rail already names it, and the panel is
                labelled by that tab for anyone who cannot see it. Printed twice, the word
                was the first thing the eye caught in the card.
              */}
              <p className="text-2xl leading-[1.28] font-extrabold tracking-[-0.025em] text-ink text-pretty sm:text-[1.75rem] lg:text-[2rem]">
                {statement.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "up" | "down";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "up" ? ArrowUp : ArrowDown;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "up" ? "Previous statement" : "Next statement"}
      className="statement-step flex size-10 items-center justify-center rounded-full border border-edge text-ink-soft disabled:opacity-30 hover:not-disabled:border-brand-green hover:not-disabled:bg-mint hover:not-disabled:text-brand-green-dark"
    >
      <Icon className="size-4" strokeWidth={2.25} aria-hidden />
    </button>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Staggered photo mosaic paired with a label list, where pointing at either half lights the
 * other. Adapted from the team-showcase pattern: offset columns of rounded tiles, a
 * monochrome resting state, colour and a growing marker on the hovered pair.
 *
 * Two deliberate departures from that source, both forced by this site's content rules.
 *
 * The source binds one tile to one person and hangs social links off the name. We have no
 * headshots and no personal social accounts for anyone on the roster, and inventing either
 * is out of the question, so an item here is a *scene*, not a person: a place the work
 * happens, labelled with a fact that already exists in src/content. /team keeps its initials
 * avatars and gains nothing from this component.
 *
 * The source also treats hover as the only way in. Half the traffic here arrives on a phone,
 * where hover does not exist, so the greyscale is scoped to `@media (hover: hover)` in
 * globals.css: pointer devices get the editorial monochrome and the reveal, touch devices
 * get the photographs in full colour from the start. Nothing is behind an interaction that
 * a touch reader cannot perform.
 *
 * The rows are not buttons and take no tab stop. Highlighting a photograph is decoration
 * over content that is already fully readable standing still, and four fake buttons that do
 * nothing when activated would cost a keyboard reader four stops to say so.
 */

export type ShowcaseItem = {
  id: string;
  title: string;
  kicker: string;
  src: string;
  alt: string;
};

/*
  Tile widths per column, and the drop that staggers the second one.

  These run considerably larger than the source's 155px thumbnails, and they have to. That
  component crops single faces, where a small tile still reads. Every frame here is a group
  in a room, so below roughly 240px the people become texture and the picture stops saying
  anything. The second column is both wider and lower, which is what keeps a two-column pair
  from reading as a plain grid.

  The tiles peak at md and come back down at lg, which is not a mistake. Below lg the mosaic
  has the whole content width to itself and should take it. At lg the masthead turns into two
  columns and the mosaic is paying for the headline beside it: 440px here leaves 472px for a
  60px headline, which is the least that title can have before it starts breaking words.
*/
const COLUMN_TILE = [
  "w-[150px] sm:w-[264px] md:w-[320px] lg:w-[200px] xl:w-[240px]",
  "w-[168px] sm:w-[296px] md:w-[356px] lg:w-[224px] xl:w-[264px]",
];
const COLUMN_OFFSET = ["", "mt-8 sm:mt-12 md:mt-16"];

export function PhotoShowcase({
  items,
  className,
  fitLabels = false,
}: {
  items: ShowcaseItem[];
  className?: string;
  /**
   * Hold the label list to the mosaic's width from lg up, in two columns that wrap.
   *
   * The list is what sets the block's width inside a masthead. Left to its own size, two
   * columns of labels make the block wider than the pictures, and since the masthead's
   * media column is sized to its content, that extra width is taken from the words beside
   * it and lands the mosaic hard against them. Capped at the mosaic, the block cannot grow
   * past the pictures, sits at the far edge, and the gap between text and pictures falls
   * out of the grid rather than being forced.
   *
   * Two columns rather than one because a stack of four rows is taller than the mosaic and
   * drags the masthead out; and because dealt alternately, the first label lands under the
   * first tile column and the second under the second, so the list reads as a key to the
   * pictures above it. Kickers have to be short for this to hold; long ones wrap to three
   * lines at lg and the point is lost. About keeps the default, since its block owns more of
   * its masthead and its labels are short enough not to need the cap.
   */
  fitLabels?: boolean;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  /* Two columns, dealt alternately, so list order and reading order down the mosaic agree. */
  const columns = [
    items.filter((_, i) => i % 2 === 0),
    items.filter((_, i) => i % 2 === 1),
  ];

  return (
    <div className={cn("flex flex-col gap-8 md:gap-10", className)}>
      <div className="flex shrink-0 gap-3 md:gap-4">
        {columns.map((column, index) => (
          <div
            key={index}
            className={cn("flex flex-col gap-3 md:gap-4", COLUMN_OFFSET[index])}
          >
            {column.map((item) => (
              <Tile
                key={item.id}
                item={item}
                widthClass={COLUMN_TILE[index]!}
                activeId={activeId}
                onPoint={setActiveId}
              />
            ))}
          </div>
        ))}
      </div>

      {/*
        The labels sit under the mosaic, not beside it. Beside was the source's arrangement
        and was tried first: it works when the whole showcase owns the page width, and stops
        working the moment the mosaic is itself the right-hand column of a masthead, which is
        where this now lives. Under it, the two halves stay one object at every width.

        Two columns wherever the block is wide enough for the longest label, one where it is
        not. lg is the narrow case, because that is where the masthead splits and the mosaic
        column drops to roughly 440px.
      */}
      <ul
        className={cn(
          "grid gap-6 sm:grid-cols-2 sm:gap-7",
          fitLabels
            ? /* Cap is the two tile widths plus the 16px gap between them, per breakpoint. */
              "lg:max-w-[440px] lg:gap-x-4 lg:gap-y-6 xl:max-w-[520px] xl:gap-x-5"
            : "lg:grid-cols-1 lg:gap-6 xl:grid-cols-2 xl:gap-7",
        )}
      >
        {items.map((item) => (
          <LabelRow
            key={item.id}
            item={item}
            activeId={activeId}
            onPoint={setActiveId}
          />
        ))}
      </ul>
    </div>
  );
}

function Tile({
  item,
  widthClass,
  activeId,
  onPoint,
}: {
  item: ShowcaseItem;
  widthClass: string;
  activeId: string | null;
  onPoint: (id: string | null) => void;
}) {
  const isActive = activeId === item.id;

  return (
    <div
      className={cn(
        "showcase-photo relative aspect-[4/3] overflow-hidden rounded-[var(--radius-inner)] bg-mint",
        widthClass,
        isActive && "is-active",
        activeId !== null && !isActive && "is-dimmed",
      )}
      onMouseEnter={() => onPoint(item.id)}
      onMouseLeave={() => onPoint(null)}
    >
      {/* bg-mint above is a load state only; the photograph covers it the moment it paints. */}
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width: 1280px) 264px, (min-width: 1024px) 224px, (min-width: 768px) 356px, (min-width: 640px) 296px, 45vw"
        className="object-cover"
      />
    </div>
  );
}

function LabelRow({
  item,
  activeId,
  onPoint,
}: {
  item: ShowcaseItem;
  activeId: string | null;
  onPoint: (id: string | null) => void;
}) {
  const isActive = activeId === item.id;
  const isDimmed = activeId !== null && !isActive;

  return (
    <li
      className={cn(
        "transition-opacity duration-300 ease-out",
        isDimmed ? "opacity-45" : "opacity-100",
      )}
      onMouseEnter={() => onPoint(item.id)}
      onMouseLeave={() => onPoint(null)}
    >
      <div className="flex items-center gap-3">
        {/*
          The marker the source grows on hover, in the brand's shape language: a rounded
          block rather than a hairline dash, and brand green rather than ink, so the lit row
          and the colour arriving in its photograph read as one event.
        */}
        <span
          aria-hidden
          className={cn(
            "h-2.5 shrink-0 rounded-[6px] transition-all duration-300 ease-out",
            isActive ? "w-6 bg-brand-green" : "w-4 bg-ink/15",
          )}
        />
        <p
          className={cn(
            "text-lg leading-none font-extrabold tracking-[-0.025em] transition-colors duration-300 sm:text-xl",
            isActive ? "text-brand-green-dark" : "text-ink",
          )}
        >
          {item.title}
        </p>
      </div>
      {/* Indent clears the marker at its widest, 24px, plus the 12px gap. */}
      <p className="mt-2.5 pl-9 text-[0.6875rem] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
        {item.kicker}
      </p>
    </li>
  );
}

"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

/*
  The dependency avatar-group.tsx imports and the paste did not include.

  It is written here rather than fetched. The version of avatar-group.tsx supplied wants
  `TooltipProvider` with `openDelay`/`closeDelay`, a `Tooltip` that itself takes `side` and
  `sideOffset`, and a `TooltipContent`. animate-ui's current registry tooltip has none of
  those: no `TooltipContent` export at all, `delay` rather than `openDelay`, and it pulls in
  `@base-ui-components/react` plus two internal helpers this project does not have. Installing
  it would have meant rewriting avatar-group.tsx around a different API, and avatar-group.tsx
  is the file that was actually handed over.

  So this is a shim over @base-ui/react, which is already a dependency here and already backs
  components/ui/button.tsx. It exposes exactly the four components and two types that
  avatar-group.tsx imports, and nothing else, so that file stays byte-for-byte as pasted.

  On the split: Base UI puts `side`/`sideOffset` on Positioner, which lives inside
  TooltipContent, but avatar-group.tsx passes them to Tooltip. A context carries them across
  that gap, which is the whole reason this file holds any state.
*/

type Side = "top" | "right" | "bottom" | "left";

const PlacementContext = React.createContext<{ side: Side; sideOffset: number }>({
  side: "top",
  sideOffset: 8,
});

export type TooltipProviderProps = {
  children: React.ReactNode;
  /** Base UI calls this `delay`. Renamed to match the API avatar-group.tsx expects. */
  openDelay?: number;
  closeDelay?: number;
};

function TooltipProvider({
  children,
  openDelay = 0,
  closeDelay = 0,
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider delay={openDelay} closeDelay={closeDelay}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> & {
  side?: Side;
  sideOffset?: number;
};

function Tooltip({ side = "top", sideOffset = 8, children, ...props }: TooltipProps) {
  /* Memoised so the provider does not hand every popup a new object on each render. */
  const placement = React.useMemo(() => ({ side, sideOffset }), [side, sideOffset]);
  return (
    <PlacementContext.Provider value={placement}>
      <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
    </PlacementContext.Provider>
  );
}

const TooltipTrigger = TooltipPrimitive.Trigger;

export type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Popup>;

/*
  Surface follows the locked card system: --surface-dark is this brand's answer to a neutral
  black chip, and white on it clears AA. Radius is --radius-badge, which is what every other
  small pill on the site uses, so a tooltip cannot be the one square corner on the page.
*/
function TooltipContent({ className, children, ...props }: TooltipContentProps) {
  const { side, sideOffset } = React.useContext(PlacementContext);

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner side={side} sideOffset={sideOffset}>
        <TooltipPrimitive.Popup
          /*
            Sized like the reference's chip rather than a card: 12px type, tight padding, and
            `max-w` so a long role wraps to two lines instead of running a 400px bar across the
            page. Roles here reach "Strategic Partnerships & Resource Mobilisation Officer".
          */
          className={cn(
            "max-w-[min(18rem,calc(100vw-2rem))] rounded-badge bg-surface-dark",
            "px-2.5 py-1.5 text-[0.75rem] leading-snug font-bold text-white shadow-none",
            className,
          )}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

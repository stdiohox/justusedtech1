"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  Compass,
  FileText,
  GraduationCap,
  HandCoins,
  Handshake,
  HeartHandshake,
  Laptop,
  Palette,
  Recycle,
  RefreshCw,
  Sparkles,
  Trophy,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { LogoLink } from "@/components/brand/logo";
import { PillAnchor } from "@/components/common/pill-button";
import { StatusBadge } from "@/components/common/primitives";
import {
  nav,
  type NavEntry,
  type NavIcon,
  type NavMenuItem,
} from "@/content/nav";
import { asks } from "@/content/site";
import { cn } from "@/lib/utils";

const EASE = [0.32, 0.72, 0, 1] as const;

/* Stronger than the built-in ease-out, which is too weak to read as deliberate. */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/*
  A nav dropdown is opened tens of times a day by a regular visitor, which puts it in the
  band where motion should be reduced rather than elaborated. So the panel only fades, at
  180ms in and 130ms out, and the sense of movement comes from the shared-layout pill and
  the panel morphing between triggers rather than from a slide or a scale on every open.
  Exit is faster than enter: the user has already decided to leave.
*/
const PANEL_IN = 0.18;
const PANEL_OUT = 0.13;

/* Icon names live in content/nav.ts; the components they resolve to live here. */
const NAV_ICONS: Record<NavIcon, LucideIcon> = {
  Compass,
  RefreshCw,
  HeartHandshake,
  Handshake,
  GraduationCap,
  Sparkles,
  Trophy,
  Recycle,
  Palette,
  Wrench,
  FileText,
  Laptop,
  HandCoins,
  Users,
};

/**
 * Sticky white nav: logo left, five centred links, Contact plus the primary CTA right.
 * One line, 72px tall.
 *
 * About, Programs and Get Involved open dropdown menus. Impact and Team are plain links.
 *
 * On the interaction. The panel opens on hover AND on focus, and the trigger is a real
 * button carrying aria-expanded, so it works from the keyboard rather than only under a
 * mouse. Each panel is a sibling of its own trigger rather than a single shared panel
 * hoisted to the nav, which costs some animation simplicity but is the only arrangement
 * where Tab moves from a trigger into its own menu instead of skipping to the next
 * top-level link.
 *
 * Below lg there is no hover to fall back on, so the same three entries become accordions
 * inside the existing drawer and expand in place on tap.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  /*
    The bar's fill and blur sit on an inner wrapper, NOT on <header> itself.

    backdrop-filter makes an element the containing block for its position:fixed
    descendants, exactly as transform does. With the blur on <header>, the drawer's
    `fixed inset-0` resolved against the 73px-tall bar instead of the viewport and came out
    430x152: its background covered only the header strip and the links spilled out below it
    over the page. That predates the dropdown work and was survivable only because the
    overflow was visible; the moment the drawer scrolls its own content it clips the menu to
    a sliver. Keeping <header> unfiltered fixes it at the source, and the bar is unchanged.
  */
  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-[color:var(--hairline)] bg-white/92 backdrop-blur-xl">
        <div className="shell flex h-18 items-center justify-between gap-4">
          <LogoLink priority className="shrink-0" />

          <DesktopNav isActive={isActive} reduced={reduced} />

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className="hidden text-[0.9375rem] font-bold text-ink-soft transition-colors duration-300 hover:text-ink sm:block"
            >
              Contact
            </Link>

            <PillAnchor
              href={asks.donateDevice}
              travel
              className="hidden sm:inline-flex"
            >
              Donate a device
            </PillAnchor>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex size-12 items-center justify-center rounded-full bg-paper-deep lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-[2px] w-5 rounded-full bg-ink transition-all duration-500",
                  "ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "translate-y-0 rotate-45" : "-translate-y-[5px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-[2px] w-5 rounded-full bg-ink transition-all duration-500",
                  "ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "translate-y-0 -rotate-45" : "translate-y-[5px]",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
            className="fixed inset-0 top-0 z-30 overflow-y-auto bg-paper/96 px-5 pt-28 pb-10 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-col">
              {[...nav, { label: "Contact", href: "/contact" } as NavEntry].map(
                (item, i) => (
                  <motion.div
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.5,
                      ease: EASE,
                      delay: reduced ? 0 : 0.05 + i * 0.045,
                    }}
                  >
                    {item.columns ? (
                      <MobileAccordion item={item} reduced={reduced} />
                    ) : (
                      <Link
                        href={item.href}
                        className="block border-b border-[color:var(--hairline)] py-4 text-2xl font-extrabold tracking-[-0.02em] text-ink"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ),
              )}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.5,
                  ease: EASE,
                  delay: reduced ? 0 : 0.05 + (nav.length + 1) * 0.045,
                }}
                className="pt-7"
              >
                <PillAnchor href={asks.donateDevice} travel>
                  Donate a device
                </PillAnchor>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ *
 * Desktop
 * ------------------------------------------------------------------ */

function DesktopNav({
  isActive,
  reduced,
}: {
  isActive: (href: string) => boolean;
  reduced: boolean | null;
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  /*
    The pill follows the pointer while the pointer is in the nav, falls back to the open
    menu, and rests on the current page otherwise. One element with a shared layoutId, so
    it slides between labels instead of blinking out and in.
  */
  const current = nav.find((item) => isActive(item.href))?.label ?? null;
  const pillKey = hoverKey ?? openKey ?? current;

  return (
    <nav
      aria-label="Main"
      className="hidden items-center lg:flex"
      onMouseLeave={() => {
        setHoverKey(null);
        setOpenKey(null);
      }}
    >
      {nav.map((item, i) =>
        item.columns ? (
          <NavMenu
            key={item.href}
            item={item}
            /*
              The two entries nearest the right edge hang their panel from the right, so a
              wide menu grows inward instead of off the side of the viewport at 1024px.
            */
            align={i >= nav.length - 2 ? "right" : "left"}
            isOpen={openKey === item.label}
            hasPill={pillKey === item.label}
            isCurrent={isActive(item.href)}
            reduced={reduced}
            onOpen={() => {
              setHoverKey(item.label);
              setOpenKey(item.label);
            }}
            onClose={() => setOpenKey(null)}
          />
        ) : (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            onMouseEnter={() => {
              setHoverKey(item.label);
              setOpenKey(null);
            }}
            onFocus={() => {
              setHoverKey(item.label);
              setOpenKey(null);
            }}
            className={cn(
              "relative rounded-full px-3.5 py-2 text-[0.9375rem] font-bold transition-colors duration-300",
              isActive(item.href)
                ? "text-brand-green-dark"
                : "text-ink-soft hover:text-ink",
            )}
          >
            {pillKey === item.label && <NavPill reduced={reduced} />}
            <span className="relative">{item.label}</span>
          </Link>
        ),
      )}
    </nav>
  );
}

/** The shared hover pill. One instance across the whole nav, moved by layout animation. */
function NavPill({ reduced }: { reduced: boolean | null }) {
  return (
    <motion.span
      aria-hidden
      layoutId="nav-pill"
      className="absolute inset-0 rounded-full bg-brand-green/10"
      transition={
        reduced ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }
      }
    />
  );
}

function NavMenu({
  item,
  align,
  isOpen,
  hasPill,
  isCurrent,
  reduced,
  onOpen,
  onClose,
}: {
  item: NavEntry;
  align: "left" | "right";
  isOpen: boolean;
  hasPill: boolean;
  isCurrent: boolean;
  reduced: boolean | null;
  onOpen: () => void;
  onClose: () => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const uid = useId();
  const panelId = `nav-panel-${uid}`;
  const triggerId = `nav-trigger-${uid}`;
  const wide = (item.columns?.length ?? 0) > 1;

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onFocusCapture={onOpen}
      /* Closes only when focus leaves the trigger AND the panel, not on every inner move. */
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          onClose();
      }}
      onKeyDown={(e) => {
        if (e.key !== "Escape" || !isOpen) return;
        e.stopPropagation();
        onClose();
        triggerRef.current?.focus();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={panelId}
        aria-current={isCurrent ? "page" : undefined}
        onClick={() => (isOpen ? onClose() : onOpen())}
        className={cn(
          "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9375rem] font-bold",
          "transition-colors duration-300",
          isCurrent ? "text-brand-green-dark" : "text-ink-soft hover:text-ink",
        )}
      >
        {hasPill && <NavPill reduced={reduced} />}
        <span className="relative">{item.label}</span>
        <ChevronDown
          aria-hidden
          strokeWidth={2.25}
          className={cn(
            "relative size-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          /*
            Two elements again. The outer animates opacity ONLY, which means motion never
            writes a transform to it and the inner card's layout projection is not measured
            through a moving ancestor. pt-3 rather than mt-3 keeps the gap inside the
            hoverable box, so the pointer can travel from trigger to panel without the menu
            closing underneath it.
          */
          <motion.div
            key="panel"
            id={panelId}
            aria-labelledby={triggerId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduced ? 0 : isOpen ? PANEL_IN : PANEL_OUT,
              ease: EASE_OUT,
            }}
            className={cn(
              "absolute top-full z-50 pt-3",
              align === "right" ? "right-0" : "left-0",
            )}
          >
            <motion.div
              layoutId="nav-dropdown"
              transition={
                reduced ? { duration: 0 } : { duration: 0.24, ease: EASE_OUT }
              }
              /*
                Shadowed, unlike every content card on the site. The no-shadow elevation
                rule is about panels sitting IN the page; this one floats over it and needs
                to read as detached, the same exception the hero's glass cards take.
              */
              className={cn(
                "card w-max max-w-[min(44rem,calc(100vw-2.5rem))] p-3 shadow-[var(--shadow-soft)]",
                wide && "sm:p-4",
              )}
            >
              <div
                className={cn(
                  "grid gap-x-5 gap-y-4",
                  wide
                    ? "grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]"
                    : "grid-cols-1",
                )}
              >
                {item.columns?.map((column) => (
                  <div key={column.title ?? "main"}>
                    {column.title && (
                      <p className="px-2.5 pb-1.5 text-[0.6875rem] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                        {column.title}
                      </p>
                    )}
                    <ul>
                      {column.items.map((menuItem) => (
                        <li key={menuItem.href}>
                          <MenuLink item={menuItem} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {item.overview && (
                <div className="mt-2 border-t border-edge pt-2">
                  <Link
                    href={item.href}
                    className="group/all flex items-center gap-1.5 rounded-[var(--radius-button)] px-2.5 py-2 text-[0.8125rem] font-bold text-brand-green-dark transition-colors duration-200 hover:bg-surface-subtle"
                  >
                    {item.overview}
                    <ArrowRight
                      aria-hidden
                      strokeWidth={2.25}
                      className="size-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/all:translate-x-0.5"
                    />
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * One row in a dropdown.
 *
 * Upcoming rows carry the outline badge and a hairline icon tile instead of the mint one,
 * so the Active/Upcoming split reads inside the menu the same way it does on the cards.
 * StatusBadge itself is reused rather than reimplemented, scaled down to menu size, and
 * only rendered for Upcoming: a filled green badge on all six active rows would be exactly
 * the scattering that empties the filled variant of its meaning.
 */
function MenuLink({ item }: { item: NavMenuItem }) {
  const Icon = NAV_ICONS[item.icon];
  const upcoming = item.status === "upcoming";

  return (
    <Link
      href={item.href}
      className="flex gap-3 rounded-[var(--radius-button)] p-2.5 transition-colors duration-200 hover:bg-surface-subtle focus-visible:bg-surface-subtle"
    >
      <span
        className={cn(
          "rounded-badge mt-px flex size-8 shrink-0 items-center justify-center",
          upcoming
            ? "border border-edge text-ink-faint"
            : "bg-mint text-brand-green-dark",
        )}
      >
        <Icon className="size-4" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={cn(
              "text-[0.875rem] leading-snug font-bold",
              upcoming ? "text-ink-soft" : "text-ink",
            )}
          >
            {item.label}
          </span>
          {upcoming && (
            <StatusBadge
              status="upcoming"
              className="px-1.5 py-0 text-[0.625rem] tracking-[0.1em]"
            />
          )}
        </span>
        <span className="mt-0.5 block max-w-[30ch] text-[0.8125rem] leading-snug text-ink-faint">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Mobile
 * ------------------------------------------------------------------ */

/**
 * Tap to expand in place. A hover flyout has nothing to open it on a touch screen, and a
 * tap-to-open flyout would cover the list it came from, so the drawer expands instead.
 * The trigger stays a button with aria-expanded, matching the desktop pattern.
 */
function MobileAccordion({
  item,
  reduced,
}: {
  item: NavEntry;
  reduced: boolean | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const uid = useId();
  const panelId = `mobile-panel-${uid}`;

  return (
    <div className="border-b border-[color:var(--hairline)]">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-2xl font-extrabold tracking-[-0.02em] text-ink"
      >
        {item.label}
        <ChevronDown
          aria-hidden
          strokeWidth={2.25}
          className={cn(
            "size-5 shrink-0 text-ink-faint transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
            expanded && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="panel"
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.24, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="pb-3">
              {item.columns?.map((column) => (
                <div key={column.title ?? "main"} className="pt-1">
                  {column.title && (
                    <p className="px-2.5 pb-1 text-[0.6875rem] font-extrabold tracking-[0.14em] text-ink-faint uppercase">
                      {column.title}
                    </p>
                  )}
                  <ul>
                    {column.items.map((menuItem) => (
                      <li key={menuItem.href}>
                        <MenuLink item={menuItem} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {item.overview && (
                <Link
                  href={item.href}
                  className="mt-1 flex items-center gap-1.5 rounded-[var(--radius-button)] px-2.5 py-2.5 text-[0.875rem] font-bold text-brand-green-dark"
                >
                  {item.overview}
                  <ArrowRight
                    aria-hidden
                    strokeWidth={2.25}
                    className="size-4"
                  />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

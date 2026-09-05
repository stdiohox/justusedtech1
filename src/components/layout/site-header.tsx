"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LogoLink } from "@/components/brand/logo";
import { PillLink } from "@/components/common/pill-button";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Sticky white nav: logo left, four links centred, Contact plus the primary CTA right.
 * One line, 72px tall.
 *
 * The mobile menu is a full overlay whose links stagger in, so the eye is led down the
 * list rather than hit with everything at once.
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

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--hairline)] bg-white/92 backdrop-blur-xl">
      <div className="shell flex h-18 items-center justify-between gap-6">
        <LogoLink priority className="shrink-0" />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-[0.9375rem] font-bold transition-colors duration-300",
                isActive(item.href)
                  ? "bg-mint text-brand-green-dark"
                  : "text-ink-soft hover:bg-paper-deep hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
            className="hidden text-[0.9375rem] font-bold text-ink-soft transition-colors duration-300 hover:text-ink sm:block"
          >
            Contact
          </Link>

          <PillLink
            href="/get-involved#donate-devices"
            className="hidden sm:inline-flex"
          >
            Donate a device
          </PillLink>

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

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
            className="fixed inset-0 top-0 z-30 bg-paper/96 px-5 pt-28 pb-10 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-col gap-1">
              {[...nav, { label: "Contact", href: "/contact" }].map((item, i) => (
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
                  <Link
                    href={item.href}
                    className="block border-b border-[color:var(--hairline)] py-4 text-2xl font-extrabold tracking-[-0.02em] text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
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
                <PillLink href="/get-involved#donate-devices">Donate a device</PillLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

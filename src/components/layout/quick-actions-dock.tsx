"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HandHeart, Handshake, Laptop, Mail } from "lucide-react";
import { asks } from "@/content/site";

/**
 * Quick Actions dock. Fixed bottom-centre on desktop only. Hidden below lg so it never
 * competes with the mobile menu or sits over thumb-reach content.
 *
 * Motion is motivated: the dock stays out of the way until the reader is past the hero,
 * then rises into place, so the primary actions are reachable from any scroll position.
 */

/* The three asks open mail, like every other ask button on the site. See `asks`. */
const actions = [
  { label: "Donate", href: asks.fundProgramme, Icon: HandHeart },
  { label: "Give a device", href: asks.donateDevice, Icon: Laptop },
  { label: "Partner", href: asks.partner, Icon: Handshake },
  { label: "Contact", href: "/contact", Icon: Mail },
];

export function QuickActionsDock() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    // IntersectionObserver on a sentinel, so there is no scroll listener on the page.
    const sentinel = document.getElementById("dock-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry!.isIntersecting),
      { rootMargin: "0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduced ? 0.15 : 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-x-0 bottom-7 z-40 hidden justify-center lg:flex"
        >
          <nav
            aria-label="Quick actions"
            className="flex items-center gap-1 rounded-full border border-[color:var(--hairline)] bg-white/90 p-1.5 shadow-[0_2px_6px_rgba(18,33,26,0.06),0_24px_50px_-24px_rgba(18,33,26,0.3)] backdrop-blur-xl"
          >
            {actions.map(({ label, href, Icon }) => (
              <Link
                key={href}
                href={href}
                className="group/dock flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[0.875rem] font-bold text-ink-soft transition-colors duration-300 hover:bg-mint hover:text-brand-green-dark"
              >
                <Icon
                  className="size-[1.125rem] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/dock:-translate-y-px group-hover/dock:scale-110"
                  strokeWidth={1.75}
                  aria-hidden
                />
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

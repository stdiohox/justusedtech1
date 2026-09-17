"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { PillButton } from "@/components/common/pill-button";
import { newsletter } from "@/content/site";

/**
 * Newsletter prompt.
 *
 * The newsletter lives in the footer and on the contact page, which is to say nowhere a
 * reader looks unless they are already leaving. This puts it in front of them on a fixed
 * cadence instead.
 *
 * Cadence, at the client's request. Thirty seconds after the page loads, and thirty seconds
 * after each dismiss, for as long as the page is open. Nothing is remembered across a
 * reload or between pages, so every load starts the clock again. The one exception is a
 * subscribe click: that stops the prompt for the rest of the session, because asking again
 * thirty seconds after someone has just said yes is the one repeat nobody wants. The
 * conversion literature would set this far looser (once per session, a week's rest after a
 * dismiss); if sign-ups look low, DWELL_MS and that memory are the first things to revisit.
 *
 * Shape. A centred modal on desktop, a bottom sheet on mobile so it never covers the whole
 * viewport, which is also the shape a thumb expects to swipe away.
 *
 * Motion is the house curve, ease-out, under 300ms. The scrim fades; the panel scales from
 * 0.96 (never from nothing) or rises its own height. Reduced motion gets opacity only.
 */

const DWELL_MS = 30_000;
const SUBSCRIBED_KEY = "ju:newsletter:subscribed";
const EASE = [0.32, 0.72, 0, 1] as const;

function subscribedThisSession(): boolean {
  try {
    return sessionStorage.getItem(SUBSCRIBED_KEY) === "1";
  } catch {
    return false;
  }
}

function markSubscribed() {
  try {
    sessionStorage.setItem(SUBSCRIBED_KEY, "1");
  } catch {}
}

export function NewsletterPrompt() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const reduced = useReducedMotion();
  const titleId = useId();
  const bodyId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  // Whenever the prompt is closed, the clock is running. Opening it stops the clock;
  // closing it starts a fresh one. A reload remounts the component and starts over.
  useEffect(() => {
    if (open || subscribedThisSession()) return;
    const timer = window.setTimeout(() => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }, DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  const dismiss = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  // Escape closes; the scrim owns the scroll while the dialog is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    // Focus lands in the field after the panel has entered, so the ring does not travel.
    const focus = window.setTimeout(() => inputRef.current?.focus(), 260);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      window.clearTimeout(focus);
    };
  }, [open, dismiss]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${newsletter.subscribeHref}?email=${encodeURIComponent(email.trim())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    markSubscribed();
    dismiss();
  };

  const { prompt } = newsletter;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="newsletter-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.24, ease: EASE }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
          onClick={dismiss}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={bodyId}
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, transform: "translateY(24px) scale(0.96)" }
            }
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, transform: "translateY(16px) scale(0.98)" }
            }
            transition={{ duration: reduced ? 0.15 : 0.28, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[30rem] rounded-t-[var(--radius-card)] border border-[color:var(--edge)] bg-white p-7 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:rounded-[var(--radius-card)] sm:p-9"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:bg-mint hover:text-brand-green-dark active:scale-[0.95]"
            >
              <X className="size-[1.125rem]" strokeWidth={2} aria-hidden />
            </button>

            <p className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-brand-green-dark uppercase">
              {prompt.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-3 max-w-[18ch] text-[1.625rem] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink text-balance sm:text-[1.875rem]"
            >
              {prompt.title}
            </h2>
            <p
              id={bodyId}
              className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-soft"
            >
              {prompt.body}
            </p>

            <form onSubmit={submit} className="mt-6">
              <label htmlFor={`${titleId}-email`} className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  ref={inputRef}
                  id={`${titleId}-email`}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder={prompt.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full min-w-0 rounded-full border sm:flex-1 border-[color:var(--input)] bg-white px-5 font-semibold text-ink placeholder:font-medium placeholder:text-ink-faint focus:border-brand-green-dark focus:outline-none"
                />
                <PillButton
                  type="submit"
                  bare
                  className="h-12 shrink-0 justify-center"
                >
                  {prompt.cta}
                </PillButton>
              </div>
            </form>

            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-[0.75rem] text-ink-faint">{prompt.footnote}</p>
              <button
                type="button"
                onClick={dismiss}
                className="shrink-0 text-[0.8125rem] font-bold text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                {prompt.dismiss}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

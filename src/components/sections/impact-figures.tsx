"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * A programme's headline results as interactive figure cards.
 *
 * The figure is an odometer: every digit is a reel that spins up from 0 and lands on its
 * value, the rightmost reels running longest, as on a mechanical counter. Hover lifts the
 * card. (The dot and laptop unit charts that sat under each figure came out at the
 * client's request.)
 *
 * It plays once, the first time the cards are in view, including when they are already in
 * view on load. Everything renders final on the server and rests final until then, so a
 * reader without JavaScript, a crawler, and the first paint all get the real figures; the
 * reels' snap to 0 happens at the instant they start spinning, which reads as the spin.
 * Under reduced motion nothing moves (the reel animation is off in globals.css). The reels
 * are aria-hidden; screen readers get the final value as text.
 */

type Item = { label: string; detail: string };

/*
  Reel timing, slowed at the client's request. The leftmost reel runs BASE_S, each reel to
  its right REEL_STEP_S longer, so a two-digit figure settles over about four seconds.
*/
const BASE_S = 3.2;
const REEL_STEP_S = 0.8;

const hasDigits = (value: string) => /^\d/.test(value);

/**
 * Sets `data-spin` on its wrapper the first time the wrapper is in view, which is what sets
 * every Odometer inside it rolling (see .jut-reel in globals.css). Never under reduced
 * motion. Rendered without the attribute on the server, so the reels rest on their values.
 */
export function SpinOnView({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  const ref = useRef<HTMLElement>(null);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setSpin(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-spin={spin || undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * A figure as reels, with its final value as screen-reader text. Falls back to the plain
 * value for one that does not start with a digit.
 */
export function SpinFigure({ value }: { value: string }) {
  return (
    <>
      {hasDigits(value) ? <Odometer value={value} /> : <span aria-hidden>{value}</span>}
      <span className="sr-only">{value}</span>
    </>
  );
}

/**
 * One reel per digit. A reel's strip runs 0 to 9 a number of times and then on to its digit,
 * so `--to` is how far up the strip it lands. Reels further right get one more lap and a
 * longer run, which is what makes the number settle from the left.
 */
function Odometer({ value }: { value: string }) {
  const chars = [...value];
  let seen = 0;

  return (
    <span aria-hidden className="inline-flex">
      {chars.map((char, i) => {
        if (!/\d/.test(char)) return <span key={i}>{char}</span>;
        const digit = Number(char);
        const position = seen;
        seen += 1;
        const laps = 2 + position;
        const strip = Array.from({ length: laps * 10 + digit + 1 }, (_, n) => n % 10);
        const style = {
          "--to": `calc(-1em * ${strip.length - 1})`,
          "--dur": `${BASE_S + position * REEL_STEP_S}s`,
        } as CSSProperties;
        return (
          <span key={i} className="jut-reel" style={style}>
            <span>
              {strip.map((n, k) => (
                <span key={k}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function ImpactFigures({ items }: { items: Item[] }) {
  return (
    <SpinOnView as="ul" className="grid gap-4 md:grid-cols-3">
      {items.map((item, i) => {
        const dark = i === 0;
        return (
          <li
            key={item.label}
            className={cn(
              "card h-full",
              "transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              dark ? "card-dark" : "hover:border-brand-green",
            )}
          >
            <p
              className={cn(
                "text-[3.25rem] leading-none font-bold tracking-[-0.045em] tabular-nums",
                dark ? "text-white" : "text-brand-green-dark",
              )}
            >
              <SpinFigure value={item.label} />
            </p>
            <p
              className={cn(
                "mt-4 max-w-[30ch] text-[0.9375rem] leading-snug text-pretty",
                dark ? "text-white/85" : "text-ink-soft",
              )}
            >
              {item.detail}
            </p>
          </li>
        );
      })}
    </SpinOnView>
  );
}

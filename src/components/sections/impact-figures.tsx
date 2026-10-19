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
  Reel timing, slowed at the client's request. The leftmost reel runs BASE_S and the
  rightmost BASE_S + SPREAD_S, with the reels between spaced evenly, so every figure settles
  at about four seconds whatever its length: 22 runs 3.2s and 4.0s, 1,000 runs 3.2s to 4.0s
  across four reels rather than out to 5.6s.
*/
const BASE_S = 3.2;
const SPREAD_S = 0.8;

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
  as?: "div" | "ul" | "span";
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
  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  const step = digitCount > 1 ? SPREAD_S / (digitCount - 1) : 0;
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
          "--dur": `${(BASE_S + position * step).toFixed(2)}s`,
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
  /*
    Columns follow the count, and fewer than three centre at a narrower width, so one figure
    (SkillSync's 15+) is a single centred card rather than a third of a row with two empty
    slots beside it.
  */
  const layout =
    items.length === 1
      ? "mx-auto max-w-md"
      : items.length === 2
        ? "mx-auto max-w-3xl md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <SpinOnView as="ul" className={cn("grid gap-4", layout)}>
      {items.map((item, i) => {
        const dark = i === 0;
        return (
          <li
            key={item.label}
            className={cn(
              "card h-full text-center",
              "transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              dark ? "card-dark" : "hover:border-brand-green",
            )}
          >
            <p
              className={cn(
                /*
                  Centred and enlarged at the client's request: 52px became 64 to 80px. A long
                  figure (seven characters or more, like 200,000+) steps down to 52 to 60px:
                  at 80px it measured 327px against a 323px card, and 251px at 1024.
                */
                item.label.length >= 7
                  ? "text-[3.25rem] lg:text-[3.75rem]"
                  : "text-[4rem] lg:text-[5rem]",
                /*
                  After the size, not before: tailwind-merge drops a leading-* that a later
                  font-size class follows, which set the line back to 1.5 and dropped the "+"
                  below the 1em digit reels beside it.
                */
                "leading-none font-bold tracking-[-0.045em] tabular-nums",
                dark ? "text-white" : "text-brand-green-dark",
              )}
            >
              <SpinFigure value={item.label} />
            </p>
            <p
              className={cn(
                "mx-auto mt-4 max-w-[30ch] text-[0.9375rem] leading-snug text-pretty",
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

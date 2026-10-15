"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A programme's headline results as interactive figure cards.
 *
 * The figure is an odometer: every digit is a reel that spins up from 0 and lands on its
 * value, the rightmost reels running longest, as on a mechanical counter. Under it, a unit
 * chart that shows the figure rather than decorating it:
 *   - a percentage is 20 dots, one per 5%, so 85% fills 17 and 80% fills 16
 *   - a small count (up to 40) is one icon per unit, so 22 laptops is 22 laptops
 *   - anything else shows the number alone
 * The units fill in sequence alongside the reels. Hover lifts the card.
 *
 * It plays once, the first time the cards are in view, including when they are already in
 * view on load. Everything renders final on the server and rests final until then, so a
 * reader without JavaScript, a crawler, and the first paint all get the real figures; the
 * reels' snap to 0 happens at the instant they start spinning, which reads as the spin.
 * Under reduced motion nothing moves (the reel animation is off in globals.css, and the
 * units are never reset). The reels and charts are aria-hidden; screen readers get the
 * final value as text.
 */

type Item = { label: string; detail: string };

const DOTS = 20;
const MAX_ICONS = 40;
/* Units fill over the same span the longest reel takes to settle. */
const FILL_MS = 1800;

function parse(value: string) {
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  if (!match) return null;
  return { n: Number(match[1].replace(/,/g, "")), suffix: match[2] };
}

/**
 * One reel per digit. A reel's strip runs 0 to 9 a number of times and then on to its digit,
 * so `--to` is how far up the strip it lands. Reels further right get one more lap and a
 * longer run, which is what makes the number settle from the left.
 */
function Odometer({ value }: { value: string }) {
  const chars = [...value];
  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  let seen = 0;

  return (
    <span aria-hidden className="inline-flex">
      {chars.map((char, i) => {
        if (!/\d/.test(char)) return <span key={i}>{char}</span>;
        const digit = Number(char);
        const fromRight = digitCount - 1 - seen;
        seen += 1;
        const laps = 2 + (digitCount - 1 - fromRight);
        const strip = Array.from({ length: laps * 10 + digit + 1 }, (_, n) => n % 10);
        const style = {
          "--to": `calc(-1em * ${strip.length - 1})`,
          "--dur": `${1.6 + (digitCount - 1 - fromRight) * 0.4}s`,
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
  const ref = useRef<HTMLUListElement>(null);
  const [spin, setSpin] = useState(false);
  /* Share of each unit chart that is lit: 1 at rest, run 0 to 1 while the reels spin. */
  const [fill, setFill] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setSpin(true);
        setFill(0);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / FILL_MS);
          setFill(1 - Math.pow(1 - t, 3));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    /* Leaving mid-animation cancels the pending frame, so nothing updates an unmounted card. */
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ul
      ref={ref}
      data-spin={spin || undefined}
      className="grid gap-4 md:grid-cols-3"
    >
      {items.map((item, i) => {
        const parsed = parse(item.label);
        const dark = i === 0;
        const percent = parsed?.suffix.trim() === "%";
        const units = percent
          ? { total: DOTS, filled: Math.round(parsed!.n / (100 / DOTS)), kind: "dot" as const }
          : parsed && !parsed.suffix && parsed.n <= MAX_ICONS
            ? { total: parsed.n, filled: parsed.n, kind: "icon" as const }
            : null;
        const lit = units ? Math.ceil(units.filled * fill) : 0;

        return (
          <li
            key={item.label}
            className={cn(
              "group card flex h-full flex-col justify-between gap-8",
              "transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              dark ? "card-dark" : "hover:border-brand-green",
            )}
          >
            <div>
              <p
                className={cn(
                  "text-[3.25rem] leading-none font-bold tracking-[-0.045em] tabular-nums",
                  dark ? "text-white" : "text-brand-green-dark",
                )}
              >
                {parsed ? <Odometer value={item.label} /> : <span aria-hidden>{item.label}</span>}
                <span className="sr-only">{item.label}</span>
              </p>
              <p
                className={cn(
                  "mt-4 max-w-[30ch] text-[0.9375rem] leading-snug text-pretty",
                  dark ? "text-white/85" : "text-ink-soft",
                )}
              >
                {item.detail}
              </p>
            </div>

            {/*
              A fixed block, not a wrapping row: dots run 10 to a row, so each row reads as 50%
              and 85% is one full row and seven; icons split into two even rows. A flex-wrap
              row broke wherever the card's width fell (18 and 2), which made the count hard
              to read at a glance.
            */}
            {units && (
              <div
                aria-hidden
                className="grid w-max gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${
                    units.kind === "dot" ? 10 : Math.ceil(units.total / 2)
                  }, max-content)`,
                }}
              >
                {Array.from({ length: units.total }, (_, u) => {
                  const on = u < lit;
                  return units.kind === "icon" ? (
                    <Laptop
                      key={u}
                      strokeWidth={2}
                      className={cn(
                        "size-[1.125rem] transition-[opacity,transform] duration-300",
                        "group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                        dark ? "text-white" : "text-brand-green-dark",
                        on ? "opacity-100" : "opacity-15",
                      )}
                    />
                  ) : (
                    <span
                      key={u}
                      className={cn(
                        "size-3 rounded-full transition-[background-color,transform] duration-300",
                        "group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                        on
                          ? dark
                            ? "bg-white"
                            : "bg-brand-green-dark"
                          : dark
                            ? "bg-white/20"
                            : "bg-edge",
                      )}
                    />
                  );
                })}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

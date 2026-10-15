"use client";

import { useEffect, useRef, useState } from "react";
import { Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A programme's headline results as interactive figure cards.
 *
 * Each card carries the figure, its label, and a unit chart that shows the figure rather
 * than decorating it:
 *   - a percentage is 20 dots, one per 5%, so 85% fills 17 and 80% fills 16
 *   - a small count (up to 40) is one icon per unit, so 22 laptops is 22 laptops
 *   - anything else shows the number alone
 *
 * Motion is motivated: when the cards scroll into view the number counts up and the units
 * fill in sequence, which is the figure being built in front of the reader. Hover lifts the
 * card. Under reduced motion everything is shown at rest, final.
 *
 * Rendered final on the server, so a reader without JavaScript, a crawler, and the first
 * paint all get the real figures. The animation only arms when the cards are still below
 * the fold at mount: a card already on screen stays final rather than jumping to zero and
 * back. The unit charts are aria-hidden; the number and label are the accessible content.
 */

type Item = { label: string; detail: string };

const DOTS = 20;
const MAX_ICONS = 40;
const DURATION = 1100;

function parse(value: string) {
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  if (!match) return null;
  return { n: Number(match[1].replace(/,/g, "")), suffix: match[2] };
}

export function ImpactFigures({ items }: { items: Item[] }) {
  const ref = useRef<HTMLUListElement>(null);
  /* "rest": final, no animation. "armed": zeroed, waiting. "play": animating to final. */
  const [phase, setPhase] = useState<"rest" | "armed" | "play">("rest");
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setPhase("armed");
    setProgress(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setPhase("play");
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          setProgress(1 - Math.pow(1 - t, 3));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    /* Leaving mid-count cancels the pending frame, so nothing updates an unmounted card. */
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ul ref={ref} className="grid gap-4 md:grid-cols-3">
      {items.map((item, i) => {
        const parsed = parse(item.label);
        const dark = i === 0;
        const shown = parsed
          ? `${Math.round(parsed.n * progress).toLocaleString("en-US")}${parsed.suffix}`
          : item.label;
        const percent = parsed?.suffix.trim() === "%";
        const units = percent
          ? { total: DOTS, filled: Math.round(parsed!.n / (100 / DOTS)), kind: "dot" as const }
          : parsed && !parsed.suffix && parsed.n <= MAX_ICONS
            ? { total: parsed.n, filled: parsed.n, kind: "icon" as const }
            : null;

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
              {/* Assistive tech reads the final value from the sr-only text, never the count. */}
              <p
                className={cn(
                  "text-[3.25rem] leading-[0.9] font-bold tracking-[-0.045em] tabular-nums",
                  dark ? "text-white" : "text-brand-green-dark",
                )}
              >
                <span aria-hidden>{shown}</span>
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
                  const on = u < units.filled && u < Math.ceil(units.total * progress);
                  const lit = u < units.filled;
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
                      style={{ transitionDelay: phase === "rest" ? undefined : `${u * 12}ms` }}
                    />
                  ) : (
                    <span
                      key={u}
                      className={cn(
                        "size-3 rounded-full transition-[background-color,transform] duration-300",
                        "group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                        lit && on
                          ? dark
                            ? "bg-white"
                            : "bg-brand-green-dark"
                          : dark
                            ? "bg-white/20"
                            : "bg-edge",
                      )}
                      style={{ transitionDelay: phase === "rest" ? undefined : `${u * 12}ms` }}
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

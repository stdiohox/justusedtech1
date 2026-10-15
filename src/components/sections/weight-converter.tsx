"use client";

import { useId, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Pounds to kilograms, both ways.
 *
 * The site reports weight in pounds, as the US operation records it, and most readers in
 * Nigeria, Kenya, and Ghana think in kilograms. Typing in either box fills the other; the
 * preset chips load the site's own e-waste figures, passed in from content/impact.ts so they
 * cannot disagree with the numbers on the page. A plain sentence under the boxes reads the
 * answer out (and is announced to screen readers), with tonnes once it is past a thousand
 * kilograms, which is the size most of these figures are.
 *
 * 1 lb is exactly 0.45359237 kg (the international avoirdupois pound).
 */

const KG_PER_LB = 0.45359237;

type Preset = { label: string; lbs: number };

/* Accepts what people type: "200,000", "200 000", "39880.5". Empty or junk is null. */
function parse(text: string): number | null {
  const n = Number(text.replace(/[,\s]/g, ""));
  return text.trim() === "" || !Number.isFinite(n) || n < 0 ? null : n;
}

function format(n: number, digits = 2) {
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export function WeightConverter({ presets }: { presets: Preset[] }) {
  const id = useId();
  const first = presets[0]?.lbs ?? 1;
  const [lbs, setLbs] = useState(format(first));
  const [kg, setKg] = useState(format(first * KG_PER_LB));

  const lbsValue = parse(lbs);
  const kgValue = parse(kg);

  const fromLbs = (text: string) => {
    setLbs(text);
    const n = parse(text);
    setKg(n === null ? "" : format(n * KG_PER_LB));
  };
  const fromKg = (text: string) => {
    setKg(text);
    const n = parse(text);
    setLbs(n === null ? "" : format(n / KG_PER_LB));
  };

  const sentence =
    lbsValue !== null && kgValue !== null
      ? `${format(lbsValue)} lbs is about ${format(kgValue, 0)} kg${
          kgValue >= 1000 ? ` (${format(kgValue / 1000, 1)} tonnes)` : ""
        }.`
      : "Enter a weight in either box.";

  const field = (
    which: "lbs" | "kg",
    label: string,
    value: string,
    onChange: (text: string) => void,
  ) => (
    <div className="min-w-0">
      <label
        htmlFor={`${id}-${which}`}
        className="text-[0.8125rem] font-bold text-ink"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={`${id}-${which}`}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full rounded-[var(--radius-field)] border border-edge bg-white py-3.5 pr-14 pl-4",
            "text-[1.375rem] font-bold tracking-[-0.02em] text-ink tabular-nums",
            "transition-colors duration-200 hover:border-brand-green",
            "focus-visible:border-brand-green-dark focus-visible:ring-2 focus-visible:ring-brand-green-dark/30 focus-visible:outline-none",
          )}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[0.9375rem] font-bold text-ink-faint"
        >
          {which}
        </span>
      </div>
    </div>
  );

  return (
    <div className="card mx-auto max-w-3xl">
      <div className="text-center">
        <h2 className="text-xl font-extrabold tracking-[-0.02em] text-ink sm:text-2xl">
          Pounds to kilograms
        </h2>
        <p className="mx-auto mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-soft text-pretty">
          Our weights are recorded in pounds (lbs). Convert any of them to kilograms (kg), or
          the other way round.
        </p>
      </div>

      <div className="mt-6 grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        {field("lbs", "Pounds", lbs, fromLbs)}
        <span
          aria-hidden
          className="mx-auto flex size-10 items-center justify-center rounded-full bg-mint text-brand-green-dark sm:mb-2"
        >
          <ArrowLeftRight className="size-4 rotate-90 sm:rotate-0" strokeWidth={2.25} />
        </span>
        {field("kg", "Kilograms", kg, fromKg)}
      </div>

      <p
        aria-live="polite"
        className="mt-5 text-center text-[1rem] font-semibold text-brand-green-dark"
      >
        {sentence}
      </p>

      {presets.length > 0 && (
        <div className="mt-6 border-t border-edge pt-5 text-center">
          <p className="text-[0.75rem] font-bold text-ink-faint">Try our figures</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {presets.map((preset) => (
              <li key={preset.label}>
                <button
                  type="button"
                  onClick={() => fromLbs(format(preset.lbs))}
                  className={cn(
                    "rounded-[var(--radius-pill)] border border-edge px-4 py-2 text-[0.875rem] font-bold text-ink",
                    "transition-colors duration-200 hover:border-brand-green hover:bg-mint active:scale-[0.98]",
                    "focus-visible:ring-2 focus-visible:ring-brand-green-dark focus-visible:outline-none",
                  )}
                >
                  {preset.label}: {format(preset.lbs)} lbs
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

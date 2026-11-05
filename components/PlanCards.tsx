"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useContactForm } from "@/components/ContactForm";
import type { CareSection } from "@/content/i18n";

// Which rows of the care plans are which. The text itself stays in the translations.
const SIZED_FOR = 0;
const FEATURES = [1, 2, 3, 4, 5];
const PLATFORM_ONLY = 6;
const PRICES = [7, 8, 9];
const MARKED = 1;

/** The care plans as cards, with one switch for how they are billed. */
export default function PlanCards({
  section,
  notIncluded,
  text,
}: {
  section: CareSection;
  notIncluded: string;
  text: { billing: string; periods: string[]; choose: string; vat: string };
}) {
  const { open } = useContactForm();
  const { plans, rows } = section;
  const [period, setPeriod] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const price = rows[PRICES[period]];
  const yes = rows[FEATURES[0]].values[1];

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (period + step + PRICES.length) % PRICES.length;
    setPeriod(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className="plans">
      <div className="plans-head">
        <div role="radiogroup" aria-label={text.billing} className="segments" onKeyDown={onKey}>
          {text.periods.map((label, index) => (
            <button
              key={label}
              ref={(element) => {
                buttons.current[index] = element;
              }}
              type="button"
              role="radio"
              aria-checked={index === period}
              tabIndex={index === period ? 0 : -1}
              onClick={() => setPeriod(index)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="plan-grid">
        {plans.map((plan, index) => (
          <div key={plan} className={index === MARKED ? "plan is-marked" : "plan"}>
            <div>
              <h3 className="plan-name" lang="en">
                {plan}
              </h3>
              <p className="plan-for">{rows[SIZED_FOR].values[index]}</p>
            </div>
            <div aria-live="polite">
              <p className="plan-price">{price.values[index]}</p>
              <p className="plan-period">{price.label}</p>
            </div>
            <ul className="plan-features">
              {FEATURES.map((row) => {
                const { label, values } = rows[row];
                const value = values[index];
                if (value === yes) {
                  return (
                    <li key={label} className="plan-yes">
                      {label}
                    </li>
                  );
                }
                if (value === "—") {
                  return (
                    <li key={label} className="plan-no">
                      {label}
                      <span className="sr-only"> {notIncluded}</span>
                    </li>
                  );
                }
                return (
                  <li key={label}>
                    <span className="plan-label">{label}</span>
                    {value}
                  </li>
                );
              })}
              {rows[PLATFORM_ONLY].values[index] !== "—" &&
                rows[PLATFORM_ONLY].values[index].split(" · ").map((item) => (
                  <li key={item} className="plan-yes">
                    {item}
                  </li>
                ))}
            </ul>
            <button type="button" onClick={open} className={index === MARKED ? "plan-choose is-ink" : "plan-choose"}>
              {text.choose.replace("{plan}", plan)}
            </button>
          </div>
        ))}
      </div>
      <p className="plan-note">{text.vat}</p>
    </div>
  );
}

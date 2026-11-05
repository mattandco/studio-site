"use client";

import { useState } from "react";
import type { CareSection } from "@/content/i18n";

// The care plans as a comparison table. Below 720px it becomes two plans side by
// side, each with a select, so long features never squeeze the columns.
export default function CompareTable({
  section,
  notIncluded,
}: {
  section: CareSection;
  notIncluded: string;
}) {
  const { plans, rows, label } = section;
  const price = rows.find(({ values }) => values.every((value) => value.includes("CHF"))) ?? rows[0];
  const body = rows.filter((row) => row !== price);
  const yes = rows.find(({ values }) => values[0] === "—" && values[1] === values[2])?.values[1];
  const marked = 1;
  const [left, setLeft] = useState(1);
  const [right, setRight] = useState(2);

  const value = (text: string) => {
    if (text === "—") {
      return (
        <>
          <span aria-hidden="true" className="compare-none">
            —
          </span>
          <span className="sr-only">{notIncluded}</span>
        </>
      );
    }
    if (text === yes) {
      return (
        <>
          <span aria-hidden="true" className="compare-tick">
            ✓
          </span>
          <span className="sr-only">{text}</span>
        </>
      );
    }
    if (text.includes(" · ")) {
      return (
        <ul className="compare-list">
          {text.split(" · ").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    return text;
  };

  return (
    <>
      <table className="compare">
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr>
            <td />
            {plans.map((plan, index) => (
              <th key={plan} scope="col" className={index === marked ? "is-marked" : undefined}>
                <span className="compare-plan" lang="en">
                  {plan}
                </span>
                <span className="compare-price">{price.values[index]}</span>
                <span className="compare-period">{price.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.values.map((text, index) => (
                <td key={plans[index]} className={index === marked ? "is-marked" : undefined}>
                  {value(text)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="compare-phone">
        <div className="compare-heads">
          {[
            [left, setLeft],
            [right, setRight],
          ].map(([chosen, choose], side) => (
            <div key={side}>
              <div className="select-box">
                <select
                  aria-label={`${label} ${side + 1}`}
                  value={chosen as number}
                  onChange={(event) => (choose as (next: number) => void)(Number(event.target.value))}
                >
                  {plans.map((plan, index) => (
                    <option key={plan} value={index}>
                      {plan}
                    </option>
                  ))}
                </select>
                <span aria-hidden="true" className="field-arrow">
                  ▼
                </span>
              </div>
              <span className="compare-price">{price.values[chosen as number]}</span>
              <span className="compare-period">{price.label}</span>
            </div>
          ))}
        </div>
        {body.map((row) => (
          <div key={row.label} className="compare-row">
            <span className="compare-feature">{row.label}</span>
            <div className="compare-values">
              <div>{value(row.values[left])}</div>
              <div>{value(row.values[right])}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { INSIGHTS, readingMinutes } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "A few substantial pieces a year on building accessible, multilingual websites for international organisations.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <section aria-labelledby="insights-title" className="wrap page-top">
      <h1 id="insights-title" className="insights-title">
        Insights
      </h1>
      <p className="insights-intro type-md">
        A few substantial pieces a year on building accessible, multilingual websites for
        international organisations.
      </p>
      <ol className="insights-list">
        {INSIGHTS.map((insight, index) => (
          <li key={insight.slug}>
            <Link href={`/insights/${insight.slug}`}>
              <span aria-hidden="true" className="insights-number">
                {`0${index + 1}`}
              </span>
              <span className="insights-name">{insight.title}</span>
              <span className="insights-meta">
                <span>{insight.tag}</span>
                <span>
                  {insight.date} · {readingMinutes(insight)} min read
                </span>
                <span>Read →</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

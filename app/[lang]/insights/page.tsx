import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/PageParts";
import { getContent, readingMinutes } from "@/content/i18n";
import { localePath, type Lang } from "@/lib/languages";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const { title, intro } = getContent(lang).insightsPage;
  return { title, description: intro, alternates: alternates(lang, "/insights") };
}

export default async function InsightsPage({ params }: Props) {
  const lang = (await params).lang as Lang;
  const t = getContent(lang);
  return (
    <>
    <section aria-labelledby="insights-title" className="wrap page-top">
      <h1 id="insights-title" className="insights-title">
        {t.insightsPage.title}
      </h1>
      <p className="insights-intro type-md">{t.insightsPage.intro}</p>
      <ol className="insights-list">
        {t.insights.map((insight, index) => (
          <li key={insight.slug}>
            <Link href={localePath(lang, `/insights/${insight.slug}`)}>
              <span aria-hidden="true" className="insights-number">
                {`0${index + 1}`}
              </span>
              <span className="insights-name">{insight.title}</span>
              <span className="insights-meta">
                <span>{insight.tag}</span>
                <span>
                  {insight.date} · {t.insightsPage.minRead.replace("{n}", String(readingMinutes(insight.slug)))}
                </span>
                <span>{t.insightsPage.read}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="note-line">{t.insightsPage.note}</p>
    </section>
    <ClosingCta lang={lang} />
    </>
  );
}

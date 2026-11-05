import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyLink from "@/components/CopyLink";
import DiscussLink from "@/components/DiscussLink";
import ReadingBar from "@/components/ReadingBar";
import { getContent, getInsight, readingMinutes, type Block } from "@/content/i18n";
import { SITE } from "@/content/site";
import { localePath, type Lang } from "@/lib/languages";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("en").insights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang: code } = await params;
  const lang = code as Lang;
  const insight = getInsight(lang, slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.summary,
    alternates: alternates(lang, `/insights/${slug}`),
    openGraph: { title: insight.title, description: insight.summary, type: "article" },
  };
}

function BodyBlock({ block }: { block: Block }) {
  if (block.kind === "h") return <h2 className="body-heading">{block.text}</h2>;
  if (block.kind === "quote") return <blockquote>“{block.text}”</blockquote>;
  if (block.kind === "list") {
    return (
      <ol className="numbered">
        {block.items.map((item, index) => (
          <li key={item}>
            <span aria-hidden="true">{`0${index + 1}`}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  return <p>{block.text}</p>;
}

export default async function InsightPage({ params }: Props) {
  const { slug, lang: code } = await params;
  const lang = code as Lang;
  const t = getContent(lang);
  const insight = getInsight(lang, slug);
  if (!insight) notFound();

  const address = `${SITE.url}${localePath(lang, `/insights/${slug}`)}`;
  const share = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(address)}`;
  const others = t.insights.filter((other) => other.slug !== slug);

  return (
    <article id="article" aria-labelledby="post-title">
      <ReadingBar targetId="article" />
      <div className="wrap page-top">
        <nav aria-label={t.common.breadcrumb} className="breadcrumb">
          <Link href={localePath(lang, "/insights")}>{t.insightsPage.title}</Link>
          <span aria-hidden="true">/</span>
          <span>{insight.tag}</span>
        </nav>
        <h1 id="post-title" className="post-title">
          {insight.title}
        </h1>
        <div className="post-meta">
          <span>
            {SITE.founder} · {insight.date} ·{" "}
            {t.insightsPage.minRead.replace("{n}", String(readingMinutes(slug)))}
          </span>
          <span className="post-share">
            <CopyLink copy={t.post.copyLink} copied={t.post.linkCopied} />
            <a href={share} target="_blank" rel="noopener noreferrer">
              <span>{t.post.shareLinkedIn}</span>
            </a>
          </span>
        </div>
      </div>

      <div className="wrap post-wrap">
        <aside aria-labelledby="in-short" className="post-short">
          <h2 id="in-short">{t.post.inShort}</h2>
          <ul>
            {insight.inShort.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </aside>
        <div className="post-body">
          <p className="post-lead">{insight.lead}</p>
          {insight.body.map((block, index) => (
            <BodyBlock key={index} block={block} />
          ))}
          <section aria-labelledby="post-sources" className="post-sources">
            <h2 id="post-sources">{t.post.sources}</h2>
            <ol>
              {insight.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">
                    {source.title} ↗
                  </a>
                </li>
              ))}
            </ol>
          </section>
          <p className="post-author">{t.authorNote}</p>
        </div>
      </div>

      <section aria-labelledby="more-insights" className="wrap section">
        <h2 id="more-insights" className="rule-label">
          {t.post.moreInsights}
        </h2>
        <ul className="more-list">
          {others.map((other) => (
            <li key={other.slug}>
              <Link href={localePath(lang, `/insights/${other.slug}`)}>
                <span className="more-name">{other.title}</span>
                <span className="mute">
                  {other.tag} · {t.insightsPage.read}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="post-cta" className="wrap contact">
        <h2 id="post-cta" className="type-cta">
          {t.common.tellUs}
        </h2>
        <DiscussLink className="post-cta-link">{t.common.discuss}</DiscussLink>
      </section>
    </article>
  );
}

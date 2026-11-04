import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyLink from "@/components/CopyLink";
import DiscussLink from "@/components/DiscussLink";
import ReadingBar from "@/components/ReadingBar";
import { AUTHOR_NOTE, getInsight, INSIGHTS, readingMinutes, type Block } from "@/content/insights";
import { SITE } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return INSIGHTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.summary,
    alternates: { canonical: `/insights/${slug}` },
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
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const share = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE.url}/insights/${slug}`)}`;
  const others = INSIGHTS.filter((other) => other.slug !== slug);

  return (
    <article id="article" aria-labelledby="post-title">
      <ReadingBar targetId="article" />
      <div className="wrap page-top">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/insights">Insights</Link>
          <span aria-hidden="true">/</span>
          <span>{insight.tag}</span>
        </nav>
        <h1 id="post-title" className="post-title">
          {insight.title}
        </h1>
        <div className="post-meta">
          <span>
            {SITE.founder} · {insight.date} · {readingMinutes(insight)} min read
          </span>
          <span className="post-share">
            <CopyLink />
            <a href={share} target="_blank" rel="noopener noreferrer">
              <span>Share on LinkedIn ↗</span>
            </a>
          </span>
        </div>
      </div>

      <div className="wrap post-wrap">
        <aside aria-labelledby="in-short" className="post-short">
          <h2 id="in-short">In short</h2>
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
            <h2 id="post-sources">Sources</h2>
            <ol>
              {insight.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">
                    {source.title} ↗
                  </a>
                </li>
              ))}
            </ol>
          </section>
          <p className="post-author">{AUTHOR_NOTE}</p>
        </div>
      </div>

      <section aria-labelledby="more-insights" className="wrap section">
        <h2 id="more-insights" className="rule-label">
          More insights
        </h2>
        <ul className="more-list">
          {others.map((other) => (
            <li key={other.slug}>
              <Link href={`/insights/${other.slug}`}>
                <span className="more-name">{other.title}</span>
                <span className="mute">{other.tag} · Read →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="post-cta" className="wrap contact">
        <h2 id="post-cta" className="type-cta">
          Tell us what you’re building.
        </h2>
        <DiscussLink className="post-cta-link">Discuss a project</DiscussLink>
      </section>
    </article>
  );
}

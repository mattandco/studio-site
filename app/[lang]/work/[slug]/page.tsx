import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeforeAfter from "@/components/BeforeAfter";
import { ClosingCta, NumberedRows } from "@/components/PageParts";
import { CASE_SOURCES } from "@/content/case-sources";
import { getContent, getProject, nextProject, type Reasoned } from "@/content/i18n";
import { SITE } from "@/content/site";
import { localePath, type Lang } from "@/lib/languages";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

// Each frame matches its screenshot exactly, so nothing is cut off and no strip shows.
const FRAMES: Record<string, { image: string; slider: string }> = {
  "collective-service": { image: "1800 / 934", slider: "2 / 1" },
  "global-girls-foundation": { image: "1800 / 1012", slider: "1800 / 1012" },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("en").projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang: code } = await params;
  const lang = code as Lang;
  const project = getProject(lang, slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: alternates(lang, `/work/${slug}`),
    openGraph: { title: project.name, description: project.summary },
  };
}

function ReasonedSection({ id, title, content }: { id: string; title: string; content: Reasoned }) {
  return (
    <section id={id} aria-labelledby={`h-${id}`}>
      <h2 id={`h-${id}`} className="body-heading">
        {title}
      </h2>
      {content.intro.map((text) => (
        <p key={text}>{text}</p>
      ))}
      {content.items.map(({ title: heading, text }) => (
        <div key={heading} className="decision">
          <h3>{heading}</h3>
          <p>{text}</p>
        </div>
      ))}
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug, lang: code } = await params;
  const lang = code as Lang;
  const project = getProject(lang, slug);
  if (!project) notFound();
  const next = nextProject(lang, slug);
  const { common, post } = getContent(lang);
  const t = getContent(lang).caseStudy;
  const sources = CASE_SOURCES[slug] ?? [];
  const sections = [
    ["origin", t.origin],
    ["research", t.research],
    ["design", t.design],
    ["wording", t.wording],
    ["brand", t.brand],
    ["build", t.build],
    ["result", t.result],
    ["learned", t.learned],
    ["standards", t.standards],
    ["sources", post.sources],
    ["team", t.team],
  ];

  // On the Collective Service study the before and after is the first image, on Matthew's instruction.
  const sliderFirst = slug === "collective-service";
  const slider = (
        <section aria-labelledby="h-slider" className="wrap section">
          <h2 id="h-slider" className="rule-label slider-label">
            <span>{t.beforeAfter}</span>
            <span>{common.drag}</span>
          </h2>
          <BeforeAfter
            before={`/work/${slug}-before.jpg`}
            after={`/work/${slug}-after.jpg`}
            beforeLabel={t.before}
            afterLabel={t.after}
            label={t.beforeAfter}
            beforeAlt={`${project.name} · ${t.before}`}
            afterAlt={`${project.name} · ${t.after}`}
            frame={FRAMES[slug].slider}
          />
        </section>
  );

  return (
    <article aria-labelledby="case-title">
      <div className="wrap page-top">
        <nav aria-label={common.breadcrumb} className="breadcrumb">
          <Link href={localePath(lang, "/#work")}>{t.work}</Link>
          <span aria-hidden="true">/</span>
          <span>{t.caseStudy}</span>
        </nav>
        <h1 id="case-title" className="case-title">
          {project.name}
        </h1>
        <p className="case-summary type-md">{project.summary}</p>
        <dl className="case-facts">
          <div>
            <dt>{t.type}</dt>
            <dd>{project.type}</dd>
          </div>
          <div>
            <dt>{t.year}</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>{t.scope}</dt>
            <dd>{project.scope}</dd>
          </div>
          <div>
            <dt>{t.languages}</dt>
            <dd>{project.languages}</dd>
          </div>
          <div>
            <dt>{project.status.label}</dt>
            <dd>
              {project.status.href ? (
                <a href={project.status.href} target="_blank" rel="noopener noreferrer" dir="ltr" className="link">
                  {project.status.text} ↗
                </a>
              ) : (
                project.status.text
              )}
            </dd>
          </div>
        </dl>
      </div>

      {sliderFirst && slider}

      <figure className="wrap case-image">
        <span className="work-image" style={{ "--frame": FRAMES[slug].image } as CSSProperties}>
          <Image src={project.detailImage.src} alt={project.detailImage.alt} fill sizes="(max-width: 1512px) 100vw, 1384px" />
        </span>
        <figcaption>{project.detailImage.caption}</figcaption>
      </figure>

      <section aria-label={t.headlineFigures} className="wrap figures">
        <dl>
          {project.figures.map((figure) => (
            <div key={figure.label}>
              <dt>{figure.label}</dt>
              <dd>{figure.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {!sliderFirst && slider}

      <div className="wrap case-body-wrap">
        <nav aria-label={t.onThisPage} className="on-this-page">
          <span>{t.onThisPage}</span>
          <i aria-hidden="true" className="toc-dot" />
          {sections.filter(([id]) => id !== "brand" || project.brand).map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="case-body">
          <section id="origin" aria-labelledby="h-origin">
            <h2 id="h-origin" className="body-heading">
              {t.origin}
            </h2>
            {project.origin.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
          <ReasonedSection id="research" title={t.research} content={project.research} />
          <ReasonedSection id="design" title={t.design} content={project.design} />
          <ReasonedSection id="wording" title={t.wording} content={project.wording} />
          {project.brand && (
            <section id="brand" aria-labelledby="h-brand">
              <h2 id="h-brand" className="body-heading">
                {t.brand}
              </h2>
              {project.brand.intro.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {project.brand.reasons.map(({ title, text }) => (
                <div key={title} className="decision">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
              <div className="decision">
                <h3>{t.brandGuidelines}</h3>
                {project.brand.guidelines.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </section>
          )}
          <section id="build" aria-labelledby="h-build">
            <h2 id="h-build" className="body-heading">
              {t.build}
            </h2>
            {project.decisions.map(({ title, text, link }) => (
              <div key={title} className="decision">
                <h3>{title}</h3>
                <p>
                  {text}
                  {link && (
                    <>
                      {" "}
                      <Link href={localePath(lang, link.href)} className="link">
                        {link.text}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </section>
          <section id="result" aria-labelledby="h-result">
            <h2 id="h-result" className="body-heading">
              {t.result}
            </h2>
            {project.results.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
          <section id="learned" aria-labelledby="h-learned">
            <h2 id="h-learned" className="body-heading">
              {t.learned}
            </h2>
            <ol className="numbered">
              {project.lessons.map((text, index) => (
                <li key={text}>
                  <span aria-hidden="true">{`0${index + 1}`}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </section>
          <section id="standards" aria-labelledby="h-standards">
            <h2 id="h-standards" className="body-heading">
              {t.standards}
            </h2>
            <dl className="standards">
              {project.standards.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
          {sources.length > 0 && (
            <section id="sources" aria-labelledby="h-sources">
              <h2 id="h-sources" className="body-heading">
                {post.sources}
              </h2>
              <ul className="case-sources">
                {sources.map(({ title, href }) => (
                  <li key={title} lang="en">
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="link">
                        {title}
                      </a>
                    ) : (
                      title
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <section id="team" aria-labelledby="h-team" className="wrap section">
        <h2 id="h-team" className="rule-label">
          {t.team}
        </h2>
        <dl className="team-list">
          <div>
            <dt>{t.projectLead}</dt>
            <dd>{SITE.founder}</dd>
          </div>
          <div>
            <dt>{t.clientTeam}</dt>
            <dd>{project.clientTeam}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="h-next" className="wrap section">
        <h2 id="h-next" className="rule-label">
          {t.carryNext}
        </h2>
        <p className="next-capability type-lg">{project.next}</p>
      </section>

      <section aria-labelledby="h-proves" className="wrap section">
        <h2 id="h-proves" className="rule-label">
          {t.proves}
        </h2>
        <NumberedRows rows={project.proves} />
      </section>

      <nav aria-label={t.nextCase} className="wrap next-case">
        <Link href={localePath(lang, `/work/${next.slug}`)}>
          <span className="next-case-label">{t.nextCase}</span>
          <span className="next-case-name">{next.name} →</span>
        </Link>
      </nav>

      <ClosingCta lang={lang} />
    </article>
  );
}

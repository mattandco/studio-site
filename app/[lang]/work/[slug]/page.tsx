import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeforeAfter from "@/components/BeforeAfter";
import { ClosingCta, NumberedRows } from "@/components/PageParts";
import { getContent, getProject, nextProject } from "@/content/i18n";
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

export default async function CaseStudyPage({ params }: Props) {
  const { slug, lang: code } = await params;
  const lang = code as Lang;
  const project = getProject(lang, slug);
  if (!project) notFound();
  const next = nextProject(lang, slug);
  const { common } = getContent(lang);
  const t = getContent(lang).caseStudy;
  const sections = [
    ["challenge", t.challenge],
    ["goals", t.goals],
    ["decisions", t.decisions],
    ["brand", t.brand],
    ["before-after", t.beforeAfter],
    ["result", t.result],
    ["learned", t.learned],
    ["standards", t.standards],
    ["team", t.team],
  ];

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
          <section id="challenge" aria-labelledby="h-challenge">
            <h2 id="h-challenge" className="body-heading">
              {t.challenge}
            </h2>
            {project.challenge.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
          <section id="goals" aria-labelledby="h-goals">
            <h2 id="h-goals" className="body-heading">
              {t.goals}
            </h2>
            <ol className="numbered">
              {project.goals.map((text, index) => (
                <li key={text}>
                  <span aria-hidden="true">{`0${index + 1}`}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </section>
          <section id="decisions" aria-labelledby="h-decisions">
            <h2 id="h-decisions" className="body-heading">
              {t.decisions}
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
          <section id="before-after" aria-labelledby="h-before-after">
            <h2 id="h-before-after" className="body-heading">
              {t.beforeAfter}
            </h2>
            <ul className="before-after">
              {project.beforeAfter.map(({ label, before, after }) => (
                <li key={label}>
                  <h3>{label}</h3>
                  <dl>
                    <div>
                      <dt>{t.before}</dt>
                      <dd>{before}</dd>
                    </div>
                    <div>
                      <dt>{t.after}</dt>
                      <dd>{after}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
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

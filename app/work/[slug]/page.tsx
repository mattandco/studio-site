import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, nextProject, PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title: project.name, description: project.summary },
  };
}

const SECTIONS = [
  ["context", "Context"],
  ["objectives", "Objectives"],
  ["approach", "Approach"],
  ["standards", "Standards met"],
  ["results", "Results"],
  ["team", "Team"],
];

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = nextProject(slug);

  return (
    <article aria-labelledby="case-title">
      <div className="wrap page-top">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/#work">Work</Link>
          <span aria-hidden="true">/</span>
          <span>Case study</span>
        </nav>
        <h1 id="case-title" className="case-title">
          {project.name}
        </h1>
        <p className="case-summary type-md">{project.summary}</p>
        <dl className="case-facts">
          <div>
            <dt>Type</dt>
            <dd>{project.type}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>{project.scope}</dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>{project.languages}</dd>
          </div>
          <div>
            <dt>{project.status.label}</dt>
            <dd>
              {project.status.href ? (
                <a href={project.status.href} target="_blank" rel="noopener noreferrer" className="link">
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
        <span className="work-image">
          <Image src={project.detailImage.src} alt={project.detailImage.alt} fill sizes="(max-width: 1512px) 100vw, 1384px" />
        </span>
        <figcaption>{project.detailImage.caption}</figcaption>
      </figure>

      <section aria-label="Headline figures" className="wrap figures">
        <dl>
          {project.figures.map((figure) => (
            <div key={figure.label}>
              <dt>{figure.label}</dt>
              <dd>{figure.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="wrap case-body-wrap">
        <nav aria-label="On this page" className="on-this-page">
          <span>On this page</span>
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="case-body">
          <section id="context" aria-labelledby="h-context">
            <h2 id="h-context" className="body-heading">
              Context
            </h2>
            {project.context.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
          <section id="objectives" aria-labelledby="h-objectives">
            <h2 id="h-objectives" className="body-heading">
              Objectives
            </h2>
            <ol className="numbered">
              {project.objectives.map((text, index) => (
                <li key={text}>
                  <span aria-hidden="true">{`0${index + 1}`}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </section>
          <section id="approach" aria-labelledby="h-approach">
            <h2 id="h-approach" className="body-heading">
              Approach
            </h2>
            {project.approach.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
          <section id="standards" aria-labelledby="h-standards">
            <h2 id="h-standards" className="body-heading">
              Standards met
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
          <section id="results" aria-labelledby="h-results">
            <h2 id="h-results" className="body-heading">
              Results
            </h2>
            {project.results.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
        </div>
      </div>

      <section id="team" aria-labelledby="h-team" className="wrap section">
        <h2 id="h-team" className="rule-label">
          Team
        </h2>
        <dl className="team-list">
          <div>
            <dt>Project lead</dt>
            <dd>{SITE.founder}</dd>
          </div>
          <div>
            <dt>Client team</dt>
            <dd>{project.clientTeam}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="h-next" className="wrap section">
        <h2 id="h-next" className="rule-label">
          What this platform could carry next
        </h2>
        <p className="next-capability type-lg">{project.next}</p>
      </section>

      <nav aria-label="Next case study" className="wrap next-case">
        <Link href={`/work/${next.slug}`}>
          <span className="next-case-label">Next case study</span>
          <span className="next-case-name">{next.name} →</span>
        </Link>
      </nav>
    </article>
  );
}

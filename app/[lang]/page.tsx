import type { Metadata } from "next";
import Link from "next/link";
import DeviceMock from "@/components/DeviceMock";
import Hero from "@/components/Hero";
import HeroFixedLine from "@/components/HeroFixedLine";
import { ClosingCta, FactRow, NumberedRows, Questions } from "@/components/PageParts";
import { getContent, type Project } from "@/content/i18n";
import { CARDS } from "@/content/mockups";
import { localePath, type Lang } from "@/lib/languages";
import { alternates } from "@/lib/seo";
import { PERSONAL } from "@/lib/website";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return { alternates: alternates(lang, "/") };
}

export default async function Home({ params }: Props) {
  const lang = (await params).lang as Lang;
  const t = getContent(lang);
  const h = t.home;
  // Nestvested leads with the first project in the content file. Matthew's own site leads with
  // the Global Girls Foundation, the live site (Matthew, 10 November 2026); the rest follow in order.
  const lead = (PERSONAL && t.projects.find(({ slug }) => slug === "global-girls-foundation")) || t.projects[0];
  const others = t.projects.filter((project) => project !== lead);
  const pair = others.slice(0, 2);
  const more = others.slice(2);
  const caseHref = (slug: string) => localePath(lang, `/work/${slug}`);

  return (
    <>
      {PERSONAL ? (
        <HeroFixedLine lang={lang} text={{ ...t.hero, discuss: t.common.discuss }} />
      ) : (
        <Hero lang={lang} text={{ ...t.hero, discuss: t.common.discuss }} />
      )}

      <section id="work" aria-labelledby="work-title" className="wrap section">
        <h2 id="work-title" className="rule-label">
          {h.selectedWork}
        </h2>
        <p className="statement type-lg">{h.workStatement}</p>
        <article aria-labelledby="work-lead" className="work-lead">
          <WorkMock slug={lead.slug} href={caseHref(lead.slug)} sizes="(max-width: 1512px) 82vw, 1140px" />
          <div className="work-lead-text">
            <h3 id="work-lead" className="work-title">
              {lead.name}
            </h3>
            <p className="mute">{lead.line}</p>
            <Link href={caseHref(lead.slug)} className="link">
              {h.readCaseStudy}
            </Link>
          </div>
        </article>
        <div className="work-pair">
          {pair.map((project) => (
            <WorkCard key={project.slug} project={project} href={caseHref(project.slug)} action={h.readCaseStudy} />
          ))}
        </div>
        {more.map((project) => (
          <div key={project.slug} className="work-single">
            <WorkCard project={project} href={caseHref(project.slug)} action={h.readCaseStudy} />
          </div>
        ))}
        <p className="note-line">{h.workNote}</p>
      </section>

      <section id="services" aria-labelledby="services-title" className="wrap section">
        <h2 id="services-title" className="rule-label">
          {h.whatWeDo}
        </h2>
        <p className="statement type-lg">{h.servicesStatement}</p>
        <NumberedRows
          size="type-xl"
          rows={h.services.map(({ name, text, slug }) => ({
            title: name,
            text,
            link: { text: h.scopeAndFees, href: localePath(lang, `/services/${slug}`) },
          }))}
        />
      </section>

      <section id="about" aria-labelledby="about-title" className="wrap section">
        <h2 id="about-title" className="rule-label">
          {h.about}
        </h2>
        <div className="about">
          <p className="about-line type-xl">
            {h.aboutLine.split(" ").map((word, index) => (
              <span key={index}>{word} </span>
            ))}
          </p>
          <div className="about-text">
            {h.aboutText.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
        <FactRow items={h.aboutFacts} />
        <dl className="people">
          {h.people.map(({ name, text }) => (
            <div key={name}>
              <dt dir="ltr">{name}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="procurement" aria-labelledby="procurement-title" className="wrap section">
        <h2 id="procurement-title" className="rule-label">
          {h.workingWithUs}
        </h2>
        <p className="procurement-line type-lg">{h.workingLine}</p>
        <dl className="procurement-list">
          {h.working.map(({ term, text }) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
        {!PERSONAL && (
          <p className="pack-link">
            <a href="/nestvested-procurement-pack.pdf" className="link">
              {h.packLink}
            </a>
          </p>
        )}

        <div id="fees" className="sub-section">
          <h3 className="rule-label">{h.fees.label}</h3>
          <p className="statement type-lg">{h.fees.statement}</p>
          <NumberedRows rows={h.fees.rows} />
          <p className="note-line">{h.fees.note}</p>
        </div>

        <div className="sub-section">
          <h3 className="rule-label">{h.carePlans.label}</h3>
          <p className="statement type-lg">{h.carePlans.statement}</p>
          <FactRow items={h.carePlans.facts} />
          <p className="note-line">
            <Link href={localePath(lang, h.carePlans.link.href)} className="link">
              {h.carePlans.link.text}
            </Link>
          </p>
        </div>

        <div className="sub-section">
          <h3 className="rule-label">{h.process.label}</h3>
          <p className="statement type-lg">{h.process.statement}</p>
          <NumberedRows rows={h.process.rows} />
          <FactRow items={h.process.facts} />
        </div>

        <div className="sub-section">
          <Questions lang={lang} items={h.questions} />
        </div>
      </section>

      <ClosingCta lang={lang} id="contact" />
    </>
  );
}

function WorkMock({ slug, href, sizes }: { slug: string; href: string; sizes: string }) {
  const card = CARDS[slug];
  return (
    <Link href={href} className="work-mock" tabIndex={-1} aria-hidden="true">
      <DeviceMock
        desktop={card.desktopSrc}
        phone={card.phoneSrc}
        desktopPlace={card.desktop}
        phonePlace={card.phone}
        sizes={sizes}
      />
    </Link>
  );
}

function WorkCard({ project, href, action }: { project: Project; href: string; action: string }) {
  return (
    <article aria-labelledby={`work-${project.slug}`}>
      <WorkMock slug={project.slug} href={href} sizes="(max-width: 760px) 100vw, 50vw" />
      <div className="work-card-text">
        <h3 id={`work-${project.slug}`} className="work-title">
          {project.name}
        </h3>
        <p className="mute">{project.line}</p>
        <Link href={href} className="link">
          {action}
        </Link>
      </div>
    </article>
  );
}

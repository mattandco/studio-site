import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import { ClosingCta, FactRow, NumberedRows, Questions } from "@/components/PageParts";
import { getContent } from "@/content/i18n";
import { localePath, type Lang } from "@/lib/languages";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return { alternates: alternates(lang, "/") };
}

export default async function Home({ params }: Props) {
  const lang = (await params).lang as Lang;
  const t = getContent(lang);
  const h = t.home;
  const [lead, second] = t.projects;
  const caseHref = (slug: string) => localePath(lang, `/work/${slug}`);

  return (
    <>
      <Hero lang={lang} text={{ ...t.hero, discuss: t.common.discuss }} />

      <section id="work" aria-labelledby="work-title" className="wrap section">
        <h2 id="work-title" className="rule-label">
          {h.selectedWork}
        </h2>
        <p className="statement type-lg">{h.workStatement}</p>
        <article aria-labelledby="work-lead" className="work-lead">
          <Link href={caseHref(lead.slug)} className="work-image" tabIndex={-1} aria-hidden="true">
            <span className="px">
              <Image src={lead.cardImage.src} alt="" fill sizes="(max-width: 1512px) 100vw, 1384px" />
            </span>
          </Link>
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
        <article aria-labelledby="work-second" className="work-second">
          <Link href={caseHref(second.slug)} className="work-image" tabIndex={-1} aria-hidden="true">
            <span className="px">
              <Image src={second.cardImage.src} alt="" fill sizes="(max-width: 760px) 100vw, 66vw" />
            </span>
          </Link>
          <div className="work-second-text">
            <h3 id="work-second" className="work-title">
              {second.name}
            </h3>
            <p className="mute">{second.line}</p>
            <Link href={caseHref(second.slug)} className="link">
              {h.readCaseStudy}
            </Link>
          </div>
        </article>
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

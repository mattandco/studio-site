import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DiscussLink from "@/components/DiscussLink";
import Hero from "@/components/Hero";
import { getContent } from "@/content/i18n";
import { SITE } from "@/content/site";
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
  const [lead, second] = t.projects;
  const call = `mailto:${SITE.email}?subject=${encodeURIComponent("Booking a 30-minute call")}`;
  const caseHref = (slug: string) => localePath(lang, `/work/${slug}`);

  return (
    <>
      <Hero lang={lang} text={{ ...t.hero, discuss: t.common.discuss }} />

      <section id="work" aria-labelledby="work-title" className="wrap section">
        <h2 id="work-title" className="rule-label">
          {t.home.selectedWork}
        </h2>
        <article aria-labelledby="work-lead" className="work-lead">
          <Link href={caseHref(lead.slug)} className="work-image" tabIndex={-1} aria-hidden="true">
            <Image src={lead.cardImage.src} alt="" fill sizes="(max-width: 1512px) 100vw, 1384px" />
          </Link>
          <div className="work-lead-text">
            <h3 id="work-lead" className="work-title">
              {lead.name}
            </h3>
            <p className="mute">{lead.line}</p>
            <Link href={caseHref(lead.slug)} className="link">
              {t.home.readCaseStudy}
            </Link>
          </div>
        </article>
        <article aria-labelledby="work-second" className="work-second">
          <Link href={caseHref(second.slug)} className="work-image" tabIndex={-1} aria-hidden="true">
            <Image src={second.cardImage.src} alt="" fill sizes="(max-width: 760px) 100vw, 66vw" />
          </Link>
          <div className="work-second-text">
            <h3 id="work-second" className="work-title">
              {second.name}
            </h3>
            <p className="mute">{second.line}</p>
            <Link href={caseHref(second.slug)} className="link">
              {t.home.readCaseStudy}
            </Link>
          </div>
        </article>
      </section>

      <section id="services" aria-labelledby="services-title" className="wrap section">
        <h2 id="services-title" className="rule-label">
          {t.home.whatWeDo}
        </h2>
        <ol className="services">
          {t.home.services.map(({ name, text }, index) => (
            <li key={name}>
              <h3 className="type-xl">
                <span aria-hidden="true">{`0${index + 1}`}</span>
                <span>{name}</span>
              </h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="about" aria-labelledby="about-title" className="wrap section">
        <h2 id="about-title" className="rule-label">
          {t.home.about}
        </h2>
        <div className="about">
          <p className="about-line type-xl">{t.home.aboutLine}</p>
          <div className="about-text">
            <p>{t.home.aboutLead}</p>
            {t.home.aboutText.map((text) => (
              <p key={text} className="mute">
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="procurement" aria-labelledby="procurement-title" className="wrap section">
        <h2 id="procurement-title" className="rule-label">
          {t.home.workingWithUs}
        </h2>
        <p className="procurement-line type-lg">{t.home.workingLine}</p>
        <dl className="procurement-list">
          {t.home.working.map(({ term, text }) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="wrap contact">
        <h2 id="contact-title" className="type-cta">
          {t.common.tellUs}
        </h2>
        <div className="contact-row">
          <a href={`mailto:${SITE.email}`} dir="ltr" className="contact-email">
            {SITE.email}
          </a>
          <div className="contact-side">
            <span>{t.home.replyLine}</span>
            <a href={SITE.phoneHref} dir="ltr">
              {SITE.phone}
            </a>
            <a href={call}>{t.home.bookCall}</a>
            <DiscussLink>{t.common.discuss}</DiscussLink>
          </div>
        </div>
      </section>
    </>
  );
}

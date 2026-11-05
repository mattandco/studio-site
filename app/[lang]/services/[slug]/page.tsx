import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarePlans, ClosingCta, FactRow, NumberedRows, Questions } from "@/components/PageParts";
import { getContent, getProject, getServicePage, type ServiceSection } from "@/content/i18n";
import { localePath, type Lang } from "@/lib/languages";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("en").servicePages.pages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang: code } = await params;
  const lang = code as Lang;
  const page = getServicePage(lang, slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: alternates(lang, `/services/${slug}`),
    openGraph: { title: page.title, description: page.description },
  };
}

function Section({ lang, section }: { lang: Lang; section: ServiceSection }) {
  const to = (href: string) => localePath(lang, href);
  const t = getContent(lang);
  if (section.kind === "rows") {
    return (
      <>
        <NumberedRows rows={section.rows} />
        {section.note && <p className="note-line">{section.note}</p>}
      </>
    );
  }
  if (section.kind === "note") {
    return (
      <div className="service-note">
        <p>
          {section.text}
          {section.link && (
            <>
              {" "}
              <Link href={to(section.link.href)} className="link">
                {section.link.text}
              </Link>
            </>
          )}
        </p>
      </div>
    );
  }
  if (section.kind === "facts") return <FactRow items={section.items} />;
  if (section.kind === "questions") return <Questions lang={lang} items={section.items} />;
  if (section.kind === "care") {
    return (
      <>
        <p className="statement type-lg">{section.statement}</p>
        <p className="service-note">{section.includes}</p>
        <CarePlans section={section} />
        {section.notes.map((note) => (
          <p key={note} className="note-line">
            {note}
          </p>
        ))}
      </>
    );
  }
  const project = getProject(lang, section.project);
  if (!project) return null;
  const href = to(`/work/${project.slug}`);
  return (
    <article aria-label={project.name} className="work-second">
      <Link href={href} className="work-image" tabIndex={-1} aria-hidden="true">
        <Image src={project.cardImage.src} alt="" fill sizes="(max-width: 760px) 100vw, 66vw" />
      </Link>
      <div className="work-second-text">
        <h3 className="work-title">{project.name}</h3>
        <p className="mute">{section.line}</p>
        <Link href={href} className="link">
          {t.home.readCaseStudy}
        </Link>
      </div>
    </article>
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug, lang: code } = await params;
  const lang = code as Lang;
  const page = getServicePage(lang, slug);
  if (!page) notFound();
  const t = getContent(lang);

  return (
    <article aria-labelledby="service-title">
      <div className="wrap page-top">
        <nav aria-label={t.common.breadcrumb} className="breadcrumb">
          <Link href={localePath(lang, "/#services")}>{t.servicePages.label}</Link>
          <span aria-hidden="true">/</span>
          <span>{page.h1}</span>
        </nav>
        <h1 id="service-title" className="case-title">
          {page.h1}
        </h1>
        <p className="case-summary type-md">{page.statement}</p>
        <div className="service-intro">
          {page.intro.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
      {page.sections.map((section) => (
        <section key={section.label} id={section.kind === "care" ? section.id : undefined} className="wrap section">
          <h2 className="rule-label">{section.label}</h2>
          <Section lang={lang} section={section} />
        </section>
      ))}
      <ClosingCta lang={lang} />
    </article>
  );
}

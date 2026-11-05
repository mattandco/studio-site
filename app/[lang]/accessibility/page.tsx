import type { Metadata } from "next";
import { getContent } from "@/content/i18n";
import { SITE } from "@/content/site";
import type { Lang } from "@/lib/languages";
import { alternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const { title, description } = getContent(lang).accessibility;
  return { title, description, alternates: alternates(lang, "/accessibility") };
}

export default async function AccessibilityPage({ params }: Props) {
  const lang = (await params).lang as Lang;
  const t = getContent(lang).accessibility;
  const [before, after = ""] = t.reportText.split("{email}");
  return (
    <section aria-labelledby="statement-title" className="wrap page-top">
      <h1 id="statement-title" className="post-title">
        {t.title}
      </h1>
      <div className="plain-page">
        <p>{t.intro}</p>

        <h2 className="body-heading">{t.howTested}</h2>
        <ul>
          {t.tested.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>

        <h2 className="body-heading">{t.notDone}</h2>
        <ul>
          {t.gaps.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>

        <h2 className="body-heading">{t.report}</h2>
        <p>
          {before}
          <a href={`mailto:${SITE.email}`} dir="ltr" className="link">
            {SITE.email}
          </a>
          {after}
        </p>

        <h2 className="body-heading">{t.security}</h2>
        <p>{t.securityText}</p>
      </div>
    </section>
  );
}

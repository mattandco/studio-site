import Link from "next/link";
import DiscussLink from "@/components/DiscussLink";
import { getContent, type CareSection, type Question } from "@/content/i18n";
import { SITE } from "@/content/site";
import { localePath, type Lang } from "@/lib/languages";

/** Numbered rows: number and title beside one line of text, with a hairline under each. */
export function NumberedRows({
  rows,
  size = "type-lg",
}: {
  rows: { title: string; fee?: string; text: string; link?: { text: string; href: string } }[];
  size?: "type-lg" | "type-xl";
}) {
  return (
    <ol className="services">
      {rows.map(({ title, fee, text, link }, index) => (
        <li key={title}>
          <h3 className={size}>
            <span aria-hidden="true">{`0${index + 1}`}</span>
            <span>{title}</span>
          </h3>
          <div className="service-text">
            {fee && <p className="service-fee">{fee}</p>}
            <p>{text}</p>
            {link && (
              <Link href={link.href} className="link">
                {link.text}
              </Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Short facts on one hairline; they wrap when a column would drop below 180px. */
export function FactRow({ items }: { items: string[] }) {
  return (
    <ul className="fact-row">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Questions and answers, closed by default. The whole row opens the answer. */
export function Questions({ lang, items }: { lang: Lang; items: Question[] }) {
  return (
    <div className="questions">
      {items.map(({ q, a, link }) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>
            {a}
            {link && (
              <>
                {" "}
                <Link href={localePath(lang, link.href)} className="link">
                  {link.text}
                </Link>
              </>
            )}
          </p>
        </details>
      ))}
    </div>
  );
}

/** The care plans: a table on wide screens, one plan under another on narrow ones. */
export function CarePlans({ section }: { section: CareSection }) {
  const { plans, rows } = section;
  return (
    <>
      <table className="care-table">
        <thead>
          <tr>
            <td />
            {plans.map((plan) => (
              <th key={plan} scope="col" lang="en" dir="ltr">
                {plan}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, values }) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {values.map((value, index) => (
                <td key={plans[index]}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="care-cards">
        {plans.map((plan, index) => (
          <section key={plan} aria-label={plan}>
            <h3 className="type-lg" lang="en" dir="ltr">
              {plan}
            </h3>
            <dl className="standards">
              {rows
                .filter(({ values }) => values[index] !== "—")
                .map(({ label, values }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{values[index]}</dd>
                  </div>
                ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}

/** The closing statement at the foot of every page. */
export function ClosingCta({ lang, id }: { lang: Lang; id?: string }) {
  const t = getContent(lang);
  const call = `mailto:${SITE.email}?subject=${encodeURIComponent("Booking a 30-minute call")}`;
  const heading = `${id ?? "closing"}-title`;
  return (
    <section id={id} aria-labelledby={heading} className="wrap contact">
      <p className="rule-label">{t.common.ctaLabel}</p>
      <h2 id={heading} className="type-cta closing-title">
        {t.common.tellUs}
      </h2>
      <p className="closing-text type-md">{t.common.ctaText}</p>
      <div className="contact-row">
        <a href={`mailto:${SITE.email}`} dir="ltr" className="contact-email">
          {SITE.email}
        </a>
        <div className="contact-side">
          <a href={SITE.phoneHref} dir="ltr">
            {SITE.phone}
          </a>
          <a href={call}>{t.home.bookCall}</a>
          <DiscussLink>{t.common.discuss}</DiscussLink>
        </div>
      </div>
    </section>
  );
}

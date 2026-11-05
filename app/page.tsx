import Image from "next/image";
import Link from "next/link";
import DiscussLink from "@/components/DiscussLink";
import Hero from "@/components/Hero";
import { PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";

const SERVICES = [
  ["Web design", "Research, prototypes your team can comment on, and design systems that hold up in every language."],
  ["Web development", "Fast, accessible sites your own team can update, built for slow and unstable connections."],
  ["Branding", "Identities for organisations, programmes and campaigns, with guidelines partners actually follow."],
  ["Evidence intelligence", "Systems that read your documents, data and feedback and turn them into answers people can act on — every one traced to its source, running where your data is allowed to be."],
  ["Web maintenance", "We look after sites after launch: updates, security, backups and fixes, on a monthly retainer."],
];

const WORKING_WITH_US = [
  ["A registered company", `Contracts and invoices from ${SITE.legalName}, with references and company documents ready to send.`],
  ["Fixed fees", "Agreed before work starts and invoiced in Swiss francs. Fees are fixed to scope, not to hours."],
  ["Retainers", "For ongoing maintenance and support, we also work on a monthly retainer."],
  ["Evidence, published", "An accessibility statement with its test method, and a security note for every site we run."],
  ["Senior people only", "The people in the first meeting do the work. Any partner is named in the proposal."],
];

export default function Home() {
  const [lead, second] = PROJECTS;
  const call = `mailto:${SITE.email}?subject=${encodeURIComponent("Booking a 30-minute call")}`;

  return (
    <>
      <Hero />

      <section id="work" aria-labelledby="work-title" className="wrap section">
        <h2 id="work-title" className="rule-label">
          Selected work
        </h2>
        <article aria-labelledby="work-lead" className="work-lead">
          <Link href={`/work/${lead.slug}`} className="work-image" tabIndex={-1} aria-hidden="true">
            <Image src={lead.cardImage.src} alt="" fill sizes="(max-width: 1512px) 100vw, 1384px" />
          </Link>
          <div className="work-lead-text">
            <h3 id="work-lead" className="work-title">
              {lead.name}
            </h3>
            <p className="mute">{lead.line}</p>
            <Link href={`/work/${lead.slug}`} className="link">
              Read the case study →
            </Link>
          </div>
        </article>
        <article aria-labelledby="work-second" className="work-second">
          <Link href={`/work/${second.slug}`} className="work-image" tabIndex={-1} aria-hidden="true">
            <Image src={second.cardImage.src} alt="" fill sizes="(max-width: 760px) 100vw, 66vw" />
          </Link>
          <div className="work-second-text">
            <h3 id="work-second" className="work-title">
              {second.name}
            </h3>
            <p className="mute">{second.line}</p>
            <Link href={`/work/${second.slug}`} className="link">
              Read the case study →
            </Link>
          </div>
        </article>
      </section>

      <section id="services" aria-labelledby="services-title" className="wrap section">
        <h2 id="services-title" className="rule-label">
          What we do
        </h2>
        <ol className="services">
          {SERVICES.map(([name, text], index) => (
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
          About
        </h2>
        <div className="about">
          <p className="about-line type-xl">The people you meet do the work.</p>
          <div className="about-text">
            <p>Nestvested is a web design, development and AI studio, formed in 2018.</p>
            <p className="mute">
              Its founder has worked with NGOs such as the IFRC since 2010, with teams in Geneva and
              on global operations.
            </p>
            <p className="mute">
              Every project is run by the whole team rather than handed down a chain: design,
              engineering, content and delivery working on the same problem.
            </p>
          </div>
        </div>
      </section>

      <section id="procurement" aria-labelledby="procurement-title" className="wrap section">
        <h2 id="procurement-title" className="rule-label">
          Working with us
        </h2>
        <p className="procurement-line type-lg">Ready for your procurement team.</p>
        <dl className="procurement-list">
          {WORKING_WITH_US.map(([term, text]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="wrap contact">
        <h2 id="contact-title" className="type-cta">
          Tell us what you’re building.
        </h2>
        <div className="contact-row">
          <a href={`mailto:${SITE.email}`} className="contact-email">
            {SITE.email}
          </a>
          <div className="contact-side">
            <span>A named person replies the same business day.</span>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={call}>Book a 30-minute call</a>
            <DiscussLink>Discuss a project</DiscussLink>
          </div>
        </div>
      </section>
    </>
  );
}

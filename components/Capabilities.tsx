const CARDS = [
  {
    title: "Information management",
    body: "Structuring complex humanitarian data and strengthening the flow between field operations and headquarters, so coordination decisions rest on the same picture.",
  },
  {
    title: "Data platforms & visualisation",
    body: "Interactive tools that turn global survey and operational research data into situational awareness, built for programme teams, not analysts alone.",
  },
  {
    title: "Digital platforms",
    body: "Knowledge-sharing and coordination websites: feature development, multi-language support, server maintenance, and keeping resources current for global partners.",
  },
  {
    title: "Product & delivery leadership",
    body: "Product ownership and Agile delivery across engineering, data, design, and QA teams, from concept and scope through MVP, budget, and security.",
  },
];

export default function Capabilities() {
  return (
    <section className="sec alt" id="capabilities">
      <div className="gnum" aria-hidden="true">
        02
      </div>
      <header className="shead rv">
        <span className="cn">02</span>
        <div>
          <h2>Capabilities</h2>
          <span className="tag">
            four kinds of engagement, usually overlapping
          </span>
        </div>
      </header>
      <div className="sbody">
        <p className="lead rv">
          Most engagements begin as an information problem and end as an
          operational one.
        </p>
        <div className="rest rv">
          <ul>
            {CARDS.map((c) => (
              <li key={c.title}>
                <b>{c.title}.</b> {c.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

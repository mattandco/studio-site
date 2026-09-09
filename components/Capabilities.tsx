const CARDS = [
  {
    title: "Web & app design",
    body: "Design concepts for sites and apps, built as real, working screens rather than flat pictures, so a decision is made on how it actually behaves, not how it looks in a slide.",
  },
  {
    title: "Web & app development",
    body: "Front-end and back-end build for web and mobile, on a stack chosen for the job. Fast on a poor connection, accessible, and built to be maintained.",
  },
  {
    title: "Maintenance & support",
    body: "Updates, small changes, and monitoring after launch, on the sites and apps we build and on ones we did not, so they stay fast and current long after handover.",
  },
  {
    title: "AI integration & automation",
    body: "Practical AI inside a working product: drafting, scoring, and agentic workflows wired into the systems your team already uses, not a demo bolted on the side.",
  },
  {
    title: "Data & content platforms",
    body: "Dashboards and content systems that turn field and survey data into something a programme team actually uses, in the languages the operation needs.",
  },
  {
    title: "Product & delivery leadership",
    body: "Product ownership and delivery across design, engineering, and QA, from concept and scope through launch, budget, and handover.",
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
            design, development, and the platform work behind them
          </span>
        </div>
      </header>
      <div className="sbody">
        <p className="lead rv">
          Most engagements start with a brief for a website or an app, and
          end with a platform your own team can run for years after we
          leave.
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

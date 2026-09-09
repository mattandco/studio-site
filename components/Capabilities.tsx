const CARDS = [
  {
    title: "Information management",
    body: "Structuring complex humanitarian data and strengthening the flow between field operations and headquarters, so coordination decisions rest on the same picture.",
    ruleColor: "var(--ink)",
    ruleDelay: 0,
    titleDelay: 180,
    bodyDelay: 520,
  },
  {
    title: "Data platforms & visualisation",
    body: "Interactive tools that turn global survey and operational research data into situational awareness — built for programme teams, not analysts alone.",
    ruleColor: "var(--ink)",
    ruleDelay: 160,
    titleDelay: 340,
    bodyDelay: 700,
  },
  {
    title: "Digital platforms",
    body: "Knowledge-sharing and coordination websites: feature development, multi-language support, server maintenance, and keeping resources current for global partners.",
    ruleColor: "var(--rule)",
    ruleDelay: 320,
    titleDelay: 500,
    bodyDelay: 880,
  },
  {
    title: "Product & delivery leadership",
    body: "Product ownership and Agile delivery across engineering, data, design, and QA teams — from concept and scope through MVP, budget, and security.",
    ruleColor: "var(--rule)",
    ruleDelay: 480,
    titleDelay: 660,
    bodyDelay: 1040,
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      style={{
        scrollMarginTop: "58px",
        padding: "clamp(56px,8vw,120px) 0 clamp(40px,5vw,80px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(20px,4vw,56px)",
          alignItems: "baseline",
          marginBottom: "clamp(34px,4.5vw,64px)",
        }}
      >
        <h2
          data-type=""
          data-type-speed="16"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(30px,4.4vw,60px)",
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
            margin: 0,
            flex: "1 1 340px",
            minWidth: 0,
            maxWidth: "16ch",
          }}
        >
          What we are brought in to do
        </h2>
        <p
          data-sweep=""
          data-sweep-delay="420"
          style={{
            flex: "1 1 300px",
            minWidth: 0,
            fontSize: "16px",
            lineHeight: 1.7,
            color: "var(--ink-muted)",
            margin: 0,
            maxWidth: "42ch",
          }}
        >
          Four kinds of engagement, usually overlapping. Most begin as an
          information problem and end as an operational one.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
          gap: "0 clamp(28px,4vw,64px)",
        }}
      >
        {CARDS.map((c) => (
          <div key={c.title} style={{ paddingBottom: "clamp(26px,3vw,40px)" }}>
            <div
              data-rule=""
              data-reveal-delay={c.ruleDelay}
              style={{
                height: "1px",
                background: c.ruleColor,
                marginBottom: "22px",
              }}
            />
            <h3
              data-type=""
              data-type-speed="17"
              data-type-delay={c.titleDelay}
              className="mb-capability-title"
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(21px,2vw,27px)",
                lineHeight: 1.2,
                margin: "0 0 14px",
                maxWidth: "18ch",
              }}
            >
              {c.title}
            </h3>
            <p
              data-sweep=""
              data-sweep-delay={c.bodyDelay}
              style={{
                fontSize: "15.5px",
                lineHeight: 1.7,
                color: "var(--ink-muted)",
                margin: 0,
              }}
            >
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

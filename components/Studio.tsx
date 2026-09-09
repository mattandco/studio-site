const SHOW_FOUNDER_NOTE = true;

const PRINCIPLES = [
  {
    heading: "One team, whole engagement",
    body: "No account layer, no handover to a junior bench. The people you meet are the people who build.",
    headingDelay: 0,
    bodyDelay: 380,
  },
  {
    heading: "Sector fluency",
    body: "CEA, DREF, PMER, Shelter, RCCE. We know the vocabulary, the reporting cycles, and the constraints before the first workshop.",
    headingDelay: 200,
    bodyDelay: 560,
  },
  {
    heading: "Built to be handed over",
    body: "Platforms your own team can maintain, documented and multilingual where the operation needs it.",
    headingDelay: 400,
    bodyDelay: 740,
  },
];

export default function Studio() {
  return (
    <section
      id="studio"
      style={{
        scrollMarginTop: "58px",
        background: "var(--dark-bg)",
        color: "var(--paper)",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "clamp(60px,9vw,140px) clamp(20px,5vw,72px)",
        }}
      >
        <div
          data-type=""
          data-type-speed="14"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: "var(--accent-light)",
            marginBottom: "clamp(26px,3.5vw,44px)",
          }}
        >
          The studio
        </div>
        <p
          data-type=""
          data-type-speed="15"
          data-type-caret="var(--accent-light)"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(26px,4vw,54px)",
            lineHeight: 1.18,
            letterSpacing: "-0.015em",
            margin: "0 0 clamp(38px,5vw,72px)",
            maxWidth: "30ch",
          }}
        >
          In an emergency the constraint is rarely data. It is the distance
          between the field and the people deciding.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
            gap: "clamp(26px,4vw,64px)",
          }}
        >
          <p
            data-sweep=""
            style={{
              fontSize: "clamp(15px,1.2vw,17.5px)",
              lineHeight: 1.78,
              color: "var(--dark-body)",
              margin: 0,
              maxWidth: "56ch",
            }}
          >
            We are a small studio, and deliberately so. Every engagement is
            run by the whole team rather than handed down a chain —
            information management, data, engineering, and design working on
            the same problem, which is the only way we have found to be sure
            the thing is done correctly.
          </p>
          <p
            data-sweep=""
            data-sweep-delay="220"
            style={{
              fontSize: "clamp(15px,1.2vw,17.5px)",
              lineHeight: 1.78,
              color: "var(--dark-body)",
              margin: 0,
              maxWidth: "56ch",
            }}
          >
            Fifteen years inside humanitarian operations taught us where the
            distance opens up: in data that was never structured for the
            question being asked, in reporting lines that break under load,
            in dashboards nobody trusts enough to act on. That is the gap we
            work in.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
            gap: "clamp(24px,3vw,48px)",
            marginTop: "clamp(48px,6vw,96px)",
            paddingTop: "clamp(30px,4vw,52px)",
            borderTop: "1px solid var(--dark-rule)",
          }}
        >
          {PRINCIPLES.map((p) => (
            <div key={p.heading}>
              <div
                data-type=""
                data-type-speed="13"
                data-type-delay={p.headingDelay}
                data-type-caret="var(--accent-light)"
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent-light)",
                  marginBottom: "12px",
                }}
              >
                {p.heading}
              </div>
              <p
                data-sweep=""
                data-sweep-delay={p.bodyDelay}
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "var(--dark-muted)",
                  margin: 0,
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
        {SHOW_FOUNDER_NOTE && (
          <div
            style={{
              marginTop: "clamp(40px,5vw,76px)",
              paddingTop: "clamp(26px,3vw,40px)",
              borderTop: "1px solid var(--dark-rule)",
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(18px,3vw,48px)",
            }}
          >
            <div
              data-type=""
              data-type-speed="14"
              data-type-caret="var(--dark-faint)"
              style={{
                flex: "0 0 auto",
                width: "170px",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--dark-faint)",
              }}
            >
              Founder
            </div>
            <p
              data-sweep=""
              data-sweep-delay="260"
              style={{
                flex: "1 1 420px",
                minWidth: 0,
                fontSize: "15.5px",
                lineHeight: 1.76,
                color: "var(--dark-muted)",
                margin: 0,
                maxWidth: "62ch",
              }}
            >
              The studio is led by Matthew Bowman, a humanitarian information
              management specialist who has consulted with the International
              Federation of Red Cross and Red Crescent Societies since 2010,
              across assignments with teams in Geneva and in global
              operations.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

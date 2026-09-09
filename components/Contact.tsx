export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        scrollMarginTop: "58px",
        padding: "clamp(60px,9vw,140px) 0 clamp(44px,6vw,88px)",
      }}
    >
      <div
        data-rule=""
        style={{
          height: "1px",
          background: "var(--ink)",
          marginBottom: "clamp(46px,6vw,96px)",
        }}
      />
      <div
        data-type=""
        data-type-speed="13"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "12px",
          letterSpacing: "0.08em",
          color: "var(--meta)",
          marginBottom: "clamp(22px,3vw,36px)",
        }}
      >
        Taking on engagements
      </div>
      <h2
        data-type=""
        data-type-speed="18"
        data-type-delay="300"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontWeight: 400,
          fontSize: "clamp(32px,6vw,82px)",
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          margin: 0,
          maxWidth: "20ch",
        }}
      >
        Tell us about the operation you need to see clearly.
      </h2>
      <div
        data-sweep=""
        data-sweep-delay="1300"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(20px,4vw,56px)",
          marginTop: "clamp(32px,4.5vw,60px)",
          alignItems: "baseline",
        }}
      >
        <a
          href="mailto:matthew.bowman.consult@gmail.com"
          className="mb-contact-email"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(19px,2.2vw,32px)",
            borderBottom: "1px solid var(--accent)",
            paddingBottom: "6px",
          }}
        >
          matthew.bowman.consult@gmail.com
        </a>
        <a
          href="tel:+18768818780"
          className="mb-phone-link"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "13px",
            color: "var(--ink-muted)",
            borderBottom: "1px solid var(--rule)",
            paddingBottom: "5px",
          }}
        >
          +1 876 881 8780
        </a>
      </div>
    </section>
  );
}

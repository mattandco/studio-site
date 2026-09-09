const CLIENTS: { name: string; delay: number }[] = [
  { name: "IFRC", delay: 420 },
  { name: "UNICEF", delay: 560 },
  { name: "WHO", delay: 760 },
  { name: "The Gates Foundation", delay: 900 },
  { name: "Global Girls Foundation", delay: 1260 },
  { name: "RCCE Collective Service", delay: 1660 },
];

export default function ClientStrip() {
  return (
    <div style={{ borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--rule)" }}>
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "22px clamp(20px,5vw,72px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(18px,4vw,56px)",
          alignItems: "baseline",
        }}
      >
        <div
          data-type=""
          data-type-speed="10"
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--meta)",
            flex: "0 0 auto",
          }}
        >
          Work delivered within programmes of
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(16px,3vw,40px)",
            fontSize: "clamp(15px,1.4vw,19px)",
            fontFamily: "var(--font-serif), Georgia, serif",
          }}
        >
          {CLIENTS.map((c) => (
            <span key={c.name} data-type="" data-type-speed="18" data-type-delay={c.delay}>
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

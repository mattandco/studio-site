export default function Footer() {
  return (
    <footer
      data-sweep=""
      style={{
        borderTop: "1px solid var(--rule)",
        padding: "26px 0 48px",
        display: "flex",
        flexWrap: "wrap",
        gap: "14px 32px",
        justifyContent: "space-between",
        alignItems: "baseline",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "11.5px",
        color: "var(--meta)",
      }}
    >
      <div>Matthew Bowman — a studio for humanitarian information</div>
      <div>Digital systems · Data platforms · Operational information</div>
    </footer>
  );
}

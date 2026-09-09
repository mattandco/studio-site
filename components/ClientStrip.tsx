const CLIENTS = [
  "IFRC",
  "UNICEF",
  "WHO",
  "The Gates Foundation",
  "Global Girls Foundation",
  "RCCE Collective Service",
];

// Text only, never logos — third-party marks are not licensed for this use.
export default function ClientStrip() {
  return (
    <div className="clients rv">
      <span className="lbl">Work delivered within programmes of</span>
      <ul>
        {CLIENTS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

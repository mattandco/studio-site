import { PERSONAL } from "@/lib/website";

// Website Carbon's published result for the home page, put in by hand on Matthew's
// instruction on 5 November 2026. Reason: their live badge showed "No Result" on most
// pages. It does not update itself: retest at the address below, then change
// footer.carbon and footer.carbonNote in all five translation files. Matthew's own site
// shows nestvested.co's measurement of the same page and links to the calculator, since
// Website Carbon has no result page for its address yet.
const RESULT = PERSONAL ? "https://www.websitecarbon.com/" : "https://www.websitecarbon.com/website/nestvested-co/";

export default function CarbonBadge({ result, note }: { result: string; note: string }) {
  return (
    <div className="carbon-badge">
      <div className="carbon-pill">
        <span className="carbon-result">{result}</span>
        <a className="carbon-link" href={RESULT} target="_blank" rel="noopener">
          Website Carbon
        </a>
      </div>
      <p className="carbon-note">{note}</p>
    </div>
  );
}

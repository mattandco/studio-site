// The engagement in the studio right now, held up at the top of the page as the current project
// (Matthew, 16 Sep 2026: "a section at the top that says the project we're currently working on
// … highlight it as the current project. Tell them what we're doing. It's a redesign").
// Text only, like the rest of the site — no logos, no thumbnails.
export default function CurrentProject() {
  return (
    <section className="now rv" id="now" aria-labelledby="now-title">
      <div className="now-head">
        <span className="ct">Currently in the studio</span>
        <span className="now-badge">In progress</span>
      </div>
      <h2 id="now-title" className="now-title">
        Global Girls Foundation
      </h2>
      <p className="now-tag">A redesign of the Foundation&rsquo;s website</p>
      <p className="now-copy">
        We are redesigning the website of the Global Girls Foundation, the
        Swiss foundation created by Plan International to fund its programmes
        for girls. A new design standard for the site, rebuilt on WordPress so
        the Foundation&rsquo;s own team can edit every page without breaking
        the design, and an online donation platform that takes a one-time or
        monthly gift in four currencies. The whole studio team is on it.
      </p>
      <div className="now-meta">
        <div>
          <div className="k">Client</div>
          <div className="v">Global Girls Foundation</div>
        </div>
        <div>
          <div className="k">Scope</div>
          <div className="v">Design standard · WordPress build · Online donation platform</div>
        </div>
        <div>
          <div className="k">Status</div>
          <div className="v">In progress · launching 2026</div>
        </div>
        <div>
          <div className="k">Today</div>
          <div className="v">
            <a
              href="https://globalgirlsfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              globalgirlsfoundation.org ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

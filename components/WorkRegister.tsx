import { WORK } from "@/content/work";

// A register, not a gallery — text only, no thumbnails, no imagery.
export default function WorkRegister() {
  return (
    <section className="sec alt" id="work">
      <div className="gnum" aria-hidden="true">
        04
      </div>
      <header className="shead rv">
        <span className="cn">04</span>
        <div>
          <h2>Work</h2>
          <span className="tag">a register of engagements, not a gallery</span>
        </div>
      </header>
      <div className="sbody">
        <p className="lead rv">
          What we have built, and for whom, across fifteen years in the
          sector.
        </p>
        <div className="rest rv">
          <div className="callout">
            <span className="ct">
              Currently in the studio · Global Girls Foundation
            </span>
            <span className="ctitle">
              A digital home for the Global Girls Foundation
            </span>
            <p>
              In progress with the whole studio team: a public platform for
              the Foundation&rsquo;s programmes, built to be maintained by
              their own people afterwards.
            </p>
          </div>
          <ul>
            {WORK.map((item) => (
              <li key={item.num}>
                <b>{item.name}</b>
                <span className="regclient">{item.client}</span>
                <p>
                  {item.title}. {item.note}
                </p>
                <div className="regmeta">
                  <span>{item.scope}</span>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.linkLabel} ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

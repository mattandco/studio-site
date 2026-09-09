const STAGES = [
  {
    title: "Discovery",
    body: "We start by learning the operation: who the site has to serve, what already exists, and where the current one is failing them.",
  },
  {
    title: "Design",
    body: "Design concepts are built as real, working pages, not flat pictures. You review them the way your visitors will meet them: on a real screen, with real content.",
  },
  {
    title: "Build",
    body: "Front end and back end, on a stack chosen for the job. Content, data, and languages migrate in as the build goes, not bolted on at the end.",
  },
  {
    title: "Testing and launch",
    body: "An independent tester tries to break it before your own team does. Every finding gets fixed, or gets a written reason for waiting.",
  },
  {
    title: "Handover",
    body: "Training notes your team can follow without calling us, and every credential and licence already in your name.",
  },
];

// How a project runs, so a prospective client can see the shape of the
// engagement before the first conversation, not just the finished work.
export default function Process() {
  return (
    <section className="sec" id="how-we-work">
      <div className="gnum" aria-hidden="true">
        03
      </div>
      <header className="shead rv">
        <span className="cn">03</span>
        <div>
          <h2>How we work</h2>
          <span className="tag">
            five stages, from first conversation to handover
          </span>
        </div>
      </header>
      <div className="sbody">
        <p className="lead rv">
          A humanitarian organisation cannot afford surprises partway
          through a build, so here is exactly how a project runs.
        </p>
        <div className="rest rv">
          <ol className="stages">
            {STAGES.map((s) => (
              <li key={s.title}>
                <b>{s.title}</b>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

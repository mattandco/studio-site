// The only red on the page: the closing call to start a conversation.
export default function Contact() {
  return (
    <section className="dec-band" id="contact" aria-label="Start a conversation">
      <div className="wrap">
        <p className="dk rv">Taking on engagements</p>
        <h2 className="dh rv">
          Start a
          <br />
          conversation.
        </h2>
        <div className="actions">
          <div className="action rv">
            <span className="al">Email</span>
            <a href="mailto:matthew.bowman.consult@gmail.com">
              matthew.bowman.consult@gmail.com
            </a>
          </div>
          <div className="action rv">
            <span className="al">Call</span>
            <a href="tel:+18768818780">+1 876 881 8780</a>
          </div>
        </div>
      </div>
    </section>
  );
}

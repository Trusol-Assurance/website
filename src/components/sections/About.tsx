import { principles } from "@/data/principles";

export function About() {
  return (
    <section className="section section--alt about" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div>
            <span className="eyebrow reveal in">About the firm</span>
            <h2 className="reveal in" data-d="1">
              One standard of rigor, <em>two ways to apply it.</em>
            </h2>
            <p className="lead reveal in" data-d="2">
              Trusol Assurance pairs accomplished CPAs with cybersecurity specialists. Our assurance
              practice turns unverified controls into independently attested trust; our accounting
              practice — founded as Agarwal Associates — delivers comprehensive, value-added tax and
              financial solutions with boutique, year-round attention.
            </p>
            <p className="lead reveal in" data-d="3">
              Every client is unique, so we build a custom system around you — whether that&apos;s an
              audit calendar your customers can rely on, or an accounting workflow that ends tax-time
              surprises for good.
            </p>
          </div>

          <div className="about-side reveal in" data-d="2">
            <div className="about-card">
              <span className="qmark">&rdquo;</span>
              <h4>Ethically bound to excellence</h4>
              <p>
                Our team works cohesively and is ethically bound to provide unparalleled service — in
                the audit room and at the ledger alike.
              </p>
            </div>

            <p className="principles-label">Both practices run on the same four principles</p>

            <div className="principles" aria-label="Our guiding principles">
              {principles.map((principle) => (
                <div className="principle" key={principle.n}>
                  <span className="pn">{principle.n}</span>
                  <div>
                    <h5>{principle.title}</h5>
                    <p>{principle.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

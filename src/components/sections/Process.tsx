import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section className="section section--alt" id="process">
      <div className="wrap">
        <div className="sec-head reveal in">
          <span className="eyebrow mint">How we work</span>
          <h2>
            Four checkpoints, <em>no surprises.</em>
          </h2>
          <p className="lead">
            The same journey whether we&apos;re attesting your controls or closing your books.
          </p>
        </div>

        <div className="proc">
          {processSteps.map((step, i) => (
            <div className="step reveal in" data-d={i === 0 ? undefined : String(i)} key={step.n}>
              <span className="dot" />
              <span className="n">{step.n}</span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

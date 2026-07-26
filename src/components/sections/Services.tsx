"use client";

import { practices, type Practice, type Service } from "@/data/services";
import { useTabs } from "@/hooks/useTabs";
import { ServiceIcon } from "@/components/ui/icons";

/* ---------- innermost: one service panel ---------- */

function ServicePanel({ service, active }: { service: Service; active: boolean }) {
  return (
    <div
      className={active ? "svc-panel active" : "svc-panel"}
      id={`panel-${service.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${service.id}`}
    >
      <div className="svc-panel-head">
        <ServiceIcon name={service.icon} />
        <div>
          <span className="tag">{service.tag}</span>
          <h3>{service.title}</h3>
        </div>
      </div>
      <p className="intro">{service.intro}</p>
      <div className="svc-panel-groups">
        {service.groups.map((group) => (
          <div
            className={group.wide ? "svc-group svc-group--wide" : "svc-group"}
            key={group.heading}
          >
            <h4>{group.heading}</h4>
            {group.items ? (
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {group.body ? <p>{group.body}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- middle: the service tab group inside one practice ---------- */

function ServiceTabs({ practice }: { practice: Practice }) {
  const { isActive, setActive } = useTabs(practice.services[0].id);

  return (
    <div className="svc-tabs reveal in" data-tabgroup={practice.tabGroup}>
      <div className="svc-tabbar" role="tablist" aria-label={practice.tablistLabel}>
        {practice.services.map((service) => (
          <button
            key={service.id}
            className={isActive(service.id) ? "svc-tab active" : "svc-tab"}
            role="tab"
            aria-selected={isActive(service.id)}
            aria-controls={`panel-${service.id}`}
            id={`tab-${service.id}`}
            onClick={() => setActive(service.id)}
          >
            <ServiceIcon name={service.icon} />
            <span className="tt">
              <span className="tag">{service.tag}</span>
              <span className="nm">{service.name}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="svc-panels">
        {practice.services.map((service) => (
          <ServicePanel key={service.id} service={service} active={isActive(service.id)} />
        ))}
      </div>
    </div>
  );
}

/* ---------- outer: practice-level tabs ---------- */

export function Services() {
  const { isActive, setActive } = useTabs(practices[0].id);

  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="sec-head reveal in">
          <span className="eyebrow">What we do</span>
          <h2>
            Two practices, <em>one standard of rigor.</em>
          </h2>
          <p className="lead">
            Independent security &amp; compliance audits — and comprehensive accounting, tax, and
            advisory. Everything below is delivered by the same firm, under the same four principles.
          </p>
        </div>

        <div className="practice-tabs reveal in" role="tablist" aria-label="Practice">
          {practices.map((practice) => (
            <button
              key={practice.id}
              className={isActive(practice.id) ? "practice-tab active" : "practice-tab"}
              role="tab"
              aria-selected={isActive(practice.id)}
              aria-controls={`practice-${practice.id}`}
              id={`ptab-${practice.id}`}
              onClick={() => setActive(practice.id)}
            >
              {practice.tabLabel}
            </button>
          ))}
        </div>

        {practices.map((practice) => (
          <div
            key={practice.id}
            className={isActive(practice.id) ? "practice-panel active" : "practice-panel"}
            id={`practice-${practice.id}`}
            role="tabpanel"
            aria-labelledby={`ptab-${practice.id}`}
          >
            <div className="sec-head reveal in" style={{ marginBottom: "28px" }}>
              <span className={practice.eyebrowMint ? "eyebrow mint" : "eyebrow"}>
                {practice.eyebrow}
              </span>
              <h3 style={{ fontSize: "clamp(1.3rem,2.2vw,1.7rem)", marginTop: "12px" }}>
                {practice.heading}
              </h3>
            </div>

            <ServiceTabs practice={practice} />
          </div>
        ))}
      </div>
    </section>
  );
}

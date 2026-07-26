import { site } from "@/data/site";
import { ArrowRight, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";

export function Contact() {
  return (
    <section className="section cta" id="contact">
      <div className="wrap">
        <div className="cta-box reveal in">
          <div className="glow g1" />
          <div className="cta-grid">
            <div>
              <span className="eyebrow">Let&apos;s talk</span>
              <h2 style={{ marginTop: "16px" }}>
                Attested controls. <em>Handled numbers.</em>
              </h2>
              <p>
                Book a no-pressure consult. Tell us whether it&apos;s an audit, a tax season, or both
                — we&apos;ll map the path and quote it.
              </p>
              <div className="hero-actions" style={{ marginBottom: 0 }}>
                <a href={site.phone.href} className="btn btn--gold">
                  Call {site.phone.display}
                  <ArrowRight />
                </a>
                <a href={`mailto:${site.email}`} className="btn btn--ghost">
                  Email us
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="row">
                <span className="ic">
                  <PinIcon />
                </span>
                <div>
                  <div className="k">Office</div>
                  <div className="val">{site.address.full}</div>
                </div>
              </div>
              <div className="row">
                <span className="ic">
                  <PhoneIcon />
                </span>
                <div>
                  <div className="k">Phone</div>
                  <a className="val" href={site.phone.href}>
                    {site.phone.display}
                  </a>
                </div>
              </div>
              <div className="row">
                <span className="ic">
                  <MailIcon />
                </span>
                <div>
                  <div className="k">Email</div>
                  <a className="val" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

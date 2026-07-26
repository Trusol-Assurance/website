"use client";

import { testimonials } from "@/data/testimonials";
import { avatarBackground } from "@/lib/placeholders";
import { useTheme } from "@/lib/theme";

export function Testimonials() {
  const { theme } = useTheme();

  return (
    <section className="section section--alt">
      <div className="wrap">
        <div className="sec-head center reveal in">
          <span className="eyebrow">Kind words</span>
          <h2>
            What it feels like to <em>finally relax.</em>
          </h2>
        </div>

        <div className="tst-grid">
          {testimonials.map((t, i) => (
            <div className="tst reveal in" data-d={i === 0 ? undefined : String(i)} key={t.quote}>
              <div className="stars">★★★★★</div>
              <p className="quote">{t.quote}</p>
              <div className="who">
                {/* Avatar palettes continue from the hero stack, hence the +2 offset. */}
                <span
                  className="av"
                  data-av={`t${i + 1}`}
                  style={{ background: avatarBackground(i + 2, theme) }}
                />
                <div>
                  <div className="nm">{t.name}</div>
                  <div className="rl">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

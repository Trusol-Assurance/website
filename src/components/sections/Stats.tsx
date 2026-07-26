"use client";

import { stats } from "@/data/stats";
import { useCountUp } from "@/hooks/useCountUp";

function CountUp({ to, suffix }: { to: number; suffix?: string }) {
  const { ref, value } = useCountUp(to);
  return (
    <>
      <span className="count" data-to={to} ref={ref}>
        {value}
      </span>
      {suffix ? <span className="u">{suffix}</span> : null}
    </>
  );
}

export function Stats() {
  return (
    <section className="section section--tight">
      <div className="wrap">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div className="stat reveal in" data-d={i === 0 ? undefined : String(i)} key={stat.label}>
              <div className="num">
                {stat.animate ? <CountUp to={stat.value} suffix={stat.suffix} /> : stat.value}
              </div>
              <div className="lab">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

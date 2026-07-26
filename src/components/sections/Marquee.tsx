import { marqueeItems } from "@/data/site";

/** The strip is duplicated once so the CSS scroll animation loops seamlessly. */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span className="item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

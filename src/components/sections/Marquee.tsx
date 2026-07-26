"use client";

import { useEffect, useRef } from "react";
import { marqueeItems } from "@/data/site";

/**
 * The strip is duplicated once so the CSS scroll animation loops seamlessly.
 *
 * The animation is `infinite`, and browsers do not stop compositor animations
 * for off-screen elements — so without the observer below this keeps the GPU
 * awake for the entire visit and competes with scrolling on mobile. Pausing it
 * when out of view costs one IntersectionObserver.
 */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        track.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { rootMargin: "120px 0px" }
    );

    io.observe(track);
    return () => io.disconnect();
  }, []);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="track" ref={trackRef}>
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span className="item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
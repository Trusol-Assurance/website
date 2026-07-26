"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1400;

/**
 * Cubic ease-out count-up that fires once, when the element is 60% visible.
 * Matches the original `animateCount` + `countIO` pair exactly.
 *
 * SSR renders the final value (as the static HTML did), so the number is
 * correct with JS disabled and never flashes a zero.
 */
export function useCountUp(to: number, prefix = "", suffix = "") {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(() => `${prefix}${to}${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(`${prefix}${Math.round(to * eased)}${suffix}`);
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, prefix, suffix]);

  return { ref, value };
}

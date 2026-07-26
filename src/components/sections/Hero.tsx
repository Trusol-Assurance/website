"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { avatarBackground } from "@/lib/placeholders";
import { useTheme } from "@/lib/theme";

const STACK_SIZE = 4;

export function Hero() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  // Pointer parallax on the background grid plane; skipped when the visitor
  // has asked for reduced motion.
  useEffect(() => {
    const plane = gridRef.current;
    if (!plane) return;
    // Pointer-driven, so it is skipped on touch devices entirely.
    const fineMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fineMouse) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      plane.style.transform = `translate(${x * -22}px, ${y * -22}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <header className="hero" id="top">
      <div className="hero-bg">
        <div className="grid-plane" id="gridPlane" ref={gridRef} />
        <div className="glow g1" />
        <div className="glow g2" />
      </div>

      <div className="wrap">
        <div className="hero-grid">
          <span className="eyebrow reveal in">One firm · Two disciplines · Princeton Junction, NJ</span>
          <h1 className="reveal in" data-d="1">
            Proof for your controls. <span className="hl">Precision for your numbers.</span>
          </h1>
          <p className="lead reveal in" data-d="2">
            One firm, two disciplines. Independent security &amp; compliance audits — and full-service
            accounting &amp; tax through our Agarwal Associates practice. Same rigor, whichever side of the
            ledger you need.
          </p>
          <div className="hero-actions reveal in" data-d="3">
            <a href="#services" className="btn btn--gold">
              Explore services
              <ArrowRight />
            </a>
            <a href="#contact" className="btn btn--ghost">
              Talk to us
            </a>
          </div>
          <div className="trust reveal in" data-d="4">
            <div className="stack" id="avStack">
              {Array.from({ length: STACK_SIZE }, (_, i) => (
                <span key={i} className="av" style={{ background: avatarBackground(i, theme) }} />
              ))}
            </div>
            <p>
              <b>Remote-first · Fee agreed up front · Defensible</b> — we audit what we don&apos;t consult.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

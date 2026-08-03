"use client";

import { useEffect, useRef, useState } from "react";

const STATES = ["Unseen", "Seen", "Chosen"];

/**
 * The one set piece. A signal block climbs the frame as you scroll, the day
 * count climbs with it, and the state word is shoved out and replaced. It also
 * does the work of moving the page from the night floor onto the signal floor,
 * so the colour change is something you watch happen rather than scroll into.
 *
 * Native sticky, not a scroll hijack: the page never stops responding to input.
 */
export function Ascent() {
  const trackRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [day, setDay] = useState(1);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const block = blockRef.current;
    if (!track || !block) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      block.style.height = "100%";
      setDay(95);
      setStage(STATES.length - 1);
      return;
    }

    let ticking = false;
    const measure = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      block.style.height = `${progress * 100}%`;
      setDay(Math.max(1, Math.round(progress * 95)));
      setStage(Math.min(Math.floor(progress * STATES.length), STATES.length - 1));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={trackRef} className="ascent-track" aria-label="From unseen to chosen in 95 days">
      <div className="ascent-frame">
        <div ref={blockRef} className="ascent-frame__block" aria-hidden="true" />

        <div className="ascent-frame__states" aria-hidden="true">
          {STATES.map((state, index) => (
            <span
              key={state}
              className={index === stage ? "is-current" : index < stage ? "is-past" : ""}
            >
              {state}
            </span>
          ))}
        </div>

        <div className="ascent-frame__meter" aria-hidden="true">
          <span>Day</span>
          <b>{String(day).padStart(2, "0")}</b>
        </div>

        <p className="ascent-frame__line">
          Ninety five days from overlooked to obvious.
        </p>
      </div>
    </section>
  );
}

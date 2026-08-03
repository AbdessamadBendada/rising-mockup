"use client";

import { useEffect, useState } from "react";

const STATES = ["UNSEEN", "RISING", "UNMISSABLE"];
const CLIMB_MS = 2200;
const EXIT_MS = 900;

/**
 * The rise, performed once before anything else. A signal block climbs the
 * screen, the count climbs with it, the state word gets shoved up and replaced,
 * and then the whole panel launches out of frame to reveal the hero.
 */
export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const finish = () => {
      root.classList.remove("is-climbing");
      window.dispatchEvent(new Event("rysing:ready"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      finish();
      return;
    }

    root.classList.add("is-climbing");
    let frame = 0;
    let exitTimer = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - started) / CLIMB_MS, 1);
      // Fast off the floor, decelerating into the lock. A climb, not a bar.
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      setLeaving(true);
      finish();
      exitTimer = window.setTimeout(() => setGone(true), EXIT_MS);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      root.classList.remove("is-climbing");
    };
  }, []);

  if (gone) return null;

  const count = Math.round(progress * 100);
  const stage = Math.min(Math.floor(progress * STATES.length), STATES.length - 1);

  return (
    <div
      className={`climb${leaving ? " climb--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${count} percent`}
    >
      <div className="climb__signal" style={{ height: `${progress * 100}%` }} aria-hidden="true" />

      <div className="climb__states" aria-hidden="true">
        {STATES.map((state, index) => (
          <span key={state} className={index === stage ? "is-current" : index < stage ? "is-past" : ""}>
            {state}
          </span>
        ))}
      </div>

      <div className="climb__count" aria-hidden="true">
        <b>{String(count).padStart(3, "0")}</b>
      </div>

      <div className="climb__foot" aria-hidden="true">
        <span>
          ry<i>s</i>ing.
        </span>
        <span>Vienna</span>
      </div>
    </div>
  );
}

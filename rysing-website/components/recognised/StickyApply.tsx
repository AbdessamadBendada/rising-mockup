"use client";

import { useEffect, useState } from "react";

/**
 * The masthead lives inside the hero and scrolls away with it, so the page has
 * one persistent action instead. Solid signal red on paper type reads on every
 * floor, which keeps it out of the floor-theming problem entirely.
 */
export function StickyApply() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let ticking = false;
    const measure = () => {
      ticking = false;
      const past = window.scrollY > window.innerHeight * 0.9;
      // Stand down once the real apply section is on screen, so the page never
      // shows the same call to action twice.
      const apply = document.getElementById("apply");
      const reached = apply ? apply.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
      setShown(past && !reached);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a className={`tab${shown ? " is-shown" : ""}`} href="#apply" tabIndex={shown ? 0 : -1}>
      Start your rise
    </a>
  );
}

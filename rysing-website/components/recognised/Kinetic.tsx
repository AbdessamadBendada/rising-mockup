"use client";

import { ElementType, Fragment, ReactNode, useEffect, useRef, useState } from "react";

/**
 * Ascent motion primitives.
 *
 * Rule for this route: nothing fades in. Everything arrives from below with
 * weight and overshoots slightly before it settles, so the page reads as a
 * climb rather than a slideshow.
 */

function useLaunched<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);
  const [up, setUp] = useState(false);

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setUp(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setUp(true);
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  return { ref, up };
}

export function Launch({
  children,
  as: Tag = "div",
  delay = 0,
  active = true,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  /** Hold the launch until the preloader has cleared. */
  active?: boolean;
  className?: string;
}) {
  const { ref, up } = useLaunched<HTMLDivElement>(active);
  return (
    <Tag
      ref={ref}
      className={`launch${up ? " is-up" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--launch-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Poster type. Each line is shoved up from below its own crop, hard and fast,
 * with a short overshoot so it lands with force instead of drifting in.
 */
export function Ratchet({
  lines,
  as: Tag = "h2",
  id,
  active = true,
  className = "",
}: {
  /** `accent` paints the line in the signal colour, `script` sets it in the Didone italic. */
  lines: { text: string; accent?: boolean; script?: boolean }[];
  as?: ElementType;
  id?: string;
  active?: boolean;
  className?: string;
}) {
  const { ref, up } = useLaunched<HTMLHeadingElement>(active);
  return (
    <Tag ref={ref} id={id} className={`ratchet${up ? " is-up" : ""}${className ? ` ${className}` : ""}`}>
      {lines.map((line, index) => (
        <span
          key={line.text + index}
          className={`ratchet__line${line.accent ? " ratchet__line--accent" : ""}${
            line.script ? " ratchet__line--script" : ""
          }`}
          style={{ "--line-delay": `${index * 85}ms` } as React.CSSProperties}
        >
          <span>{line.text}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Connective tissue that runs up the page instead of across it. */
export function AscentMarquee({ word = "RISE" }: { word?: string }) {
  // Word and spacer are siblings so the vertical track spaces them properly.
  const run = Array.from({ length: 8 }, (_, i) => (
    <Fragment key={i}>
      <span>{word}</span>
      <i />
    </Fragment>
  ));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {run}
        {run}
      </div>
    </div>
  );
}

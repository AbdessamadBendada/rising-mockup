"use client";

import { useEffect, useRef, useState } from "react";

export function CoreBelief() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`belief${visible ? " belief--visible" : ""}`}
      aria-labelledby="belief-title"
    >
      <div className="belief__rail" aria-hidden="true">
        <span>Core belief</span>
        <span>Rysing Studio</span>
      </div>

      <div className="belief__statement">
        <p className="belief__eyebrow"><span /> The uncomfortable truth</p>
        <h2 id="belief-title">
          <span className="belief__line"><span>You can be</span></span>
          <span className="belief__line"><span>exceptional</span></span>
          <span className="belief__line"><span>and still be</span></span>
          <span className="belief__line belief__line--accent"><span>overlooked.</span></span>
        </h2>
      </div>

      <div className="belief__proof">
        <p>The expertise is already there.</p>
        <p className="belief__answer">We make the world <em>see it.</em></p>
      </div>

      <div className="belief__orbit" aria-hidden="true">
        <span className="belief__orbit-ring" />
        <span className="belief__orbit-dot" />
      </div>
    </section>
  );
}

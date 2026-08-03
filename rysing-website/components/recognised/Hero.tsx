"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AscentMarquee, Launch, Ratchet } from "./Kinetic";
import { EmberRise } from "./EmberRise";

export function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reveal = () => setReady(true);
    window.addEventListener("rysing:ready", reveal, { once: true });
    // If the preloader is ever skipped or fails, the hero still arrives.
    const fallback = window.setTimeout(reveal, 3600);
    return () => {
      window.removeEventListener("rysing:ready", reveal);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section className={`stage${ready ? " is-live" : ""}`} id="top" aria-labelledby="stage-title">
      <EmberRise />
      <div className="stage__block" aria-hidden="true" />

      <header className="crown">
        <a className="crown__mark" href="#top" aria-label="Rysing Studio, home">
          ry<span>s</span>ing.
        </a>
        <nav className="crown__nav" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#system">System</a>
          <a href="#studio">Studio</a>
        </nav>
        <a className="shove" href="#apply">
          <span>Start your rise</span>
        </a>
      </header>

      <div className="stage__type">
        <Launch className="stage__eyebrow" active={ready}>
          <i aria-hidden="true" />
          <span>People branding studio</span>
          <span>Vienna</span>
        </Launch>

        <Ratchet
          as="h1"
          id="stage-title"
          active={ready}
          className="stage__title"
          lines={[
            { text: "MAKE THE" },
            { text: "WORLD" },
            { text: "LOOK UP.", accent: true },
          ]}
        />

        <Launch className="stage__lede" delay={520} active={ready}>
          <p>
            You are already exceptional. We build the position, the presence and the visibility that
            make you impossible to overlook.
          </p>
          <div className="stage__actions">
            <a className="shove shove--solid" href="#apply">
              <span>Start your rise</span>
            </a>
            <a className="pull" href="#work">
              See the work
            </a>
          </div>
        </Launch>
      </div>

      <Launch className="stage__figure" delay={180} active={ready}>
        <Image
          src="/anzhelika-2.webp"
          alt="Anzhelika Tauber, founder of Rysing Studio"
          width={880}
          height={1320}
          priority
          sizes="(max-width: 900px) 80vw, 45vw"
        />
      </Launch>

      <AscentMarquee word="RISE" />

      <div className="stage__floor">
        <span>Vienna / Worldwide</span>
        <span className="stage__scroll">
          Scroll <i aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}

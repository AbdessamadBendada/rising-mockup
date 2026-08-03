"use client";

import { FormEvent, useState } from "react";
import { Launch, Ratchet } from "./Kinetic";

export function Apply() {
  const [signedUp, setSignedUp] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSignedUp(true);
  };

  return (
    <>
      <section className="floor floor--paper apply" id="apply" aria-labelledby="apply-title">
        <Launch className="rail">
          <i aria-hidden="true" />
          Apply
        </Launch>

        <Ratchet
          id="apply-title"
          className="apply__title"
          lines={[
            { text: "Become the name" },
            { text: "people already" },
            { text: "know.", accent: true },
          ]}
        />

        <Launch className="apply__body" delay={260}>
          <p>
            We take on a small number of people at a time, because this only works when it is built
            around one person properly. Tell us what you do and what is not landing yet.
          </p>
          <a className="shove shove--solid shove--large" href="mailto:hello@rysing.com">
            <span>Start your rise</span>
          </a>
          <span className="apply__mail">hello@rysing.com</span>
        </Launch>
      </section>

      <footer className="floor floor--night colophon">
        <div className="colophon__letter">
          <p className="rail">
            <i aria-hidden="true" />
            Sunday Fudge
          </p>
          <h2>One useful email, every Sunday.</h2>
          <p className="colophon__blurb">
            Positioning, visibility and the parts of building a reputation nobody writes down. Five
            minutes to read, no filler.
          </p>
          {signedUp ? (
            <p className="colophon__thanks" role="status">
              You are on the list. See you Sunday.
            </p>
          ) : (
            <form onSubmit={submit}>
              <label htmlFor="letter-email">Your email address</label>
              <div>
                <input
                  id="letter-email"
                  type="email"
                  name="email"
                  placeholder="you@yourbusiness.com"
                  autoComplete="email"
                  required
                />
                <button type="submit">Subscribe</button>
              </div>
              <small>Unsubscribe whenever you like.</small>
            </form>
          )}
        </div>

        <nav className="colophon__nav" aria-label="Footer">
          <div>
            <span>Explore</span>
            <a href="#work">Work</a>
            <a href="#system">System</a>
            <a href="#95-days">95 days</a>
            <a href="#studio">Studio</a>
          </div>
          <div>
            <span>Connect</span>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Spotify</a>
          </div>
          <div>
            <span>Visit</span>
            <p>
              Vienna, Austria
              <br />
              Working worldwide
            </p>
            <a href="mailto:hello@rysing.com">hello@rysing.com</a>
          </div>
        </nav>

        <div className="colophon__base">
          <a className="colophon__mark" href="#top" aria-label="Rysing Studio, back to top">
            ry<span>s</span>ing.
          </a>
          <span>© 2026 Rysing Studio</span>
          <a className="pull" href="#top">
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}

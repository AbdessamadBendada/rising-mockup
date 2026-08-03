"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

export function FinalCTA(){
 const ref=useRef<HTMLElement>(null),buttonRef=useRef<HTMLAnchorElement>(null);const[visible,setVisible]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>entry.isIntersecting&&setVisible(true),{threshold:.12});observer.observe(node);return()=>observer.disconnect()},[]);
 const move=(event:PointerEvent<HTMLAnchorElement>)=>{const button=buttonRef.current;if(!button)return;const r=button.getBoundingClientRect();button.style.setProperty("--mx",`${(event.clientX-r.left-r.width/2)*.16}px`);button.style.setProperty("--my",`${(event.clientY-r.top-r.height/2)*.16}px`)};
 const reset=()=>{buttonRef.current?.style.setProperty("--mx","0px");buttonRef.current?.style.setProperty("--my","0px")};
 return <><section ref={ref} id="apply" className={`final-cta${visible?" final-cta--visible":""}`} aria-labelledby="final-cta-title">
  <div className="final-cta__signal" aria-hidden="true"><span/></div>
  <p className="final-cta__eyebrow"><span/>Your expertise is ready</p>
  <h2 id="final-cta-title">Become the name<br/>everyone <strong>knows.</strong></h2>
  <p className="final-cta__copy">If you are ready to be seen, remembered and chosen at the level your work deserves, it is time to rise.</p>
  <a ref={buttonRef} className="final-cta__button" href="mailto:hello@rysing.com" onPointerMove={move} onPointerLeave={reset}><span>Apply to work with Rysing</span><b aria-hidden="true">↗</b></a>
  <div className="final-cta__coordinates" aria-hidden="true"><span>48.2082° N</span><span>16.3738° E</span><span>Vienna / Worldwide</span></div>
 </section>
 <footer className="footer"><div className="footer__brand"><a href="#" aria-label="Rysing home">ry<span>s</span>ing.</a><p>We brand people<br/>and their businesses.</p></div><nav aria-label="Footer navigation"><div><span>Explore</span><a href="#work">Work</a><a href="#services">Services</a><a href="#studio">The studio</a><a href="#95-days">95 Days</a></div><div><span>Connect</span><a href="#">LinkedIn</a><a href="#">Instagram</a><a href="#">Spotify</a><a href="#">Apple Podcasts</a></div><div><span>Visit</span><p>Vienna, Austria<br/>Working worldwide</p><a href="mailto:hello@rysing.com">hello@rysing.com</a></div></nav><div className="footer__bottom"><span>© 2026 Rysing Studio</span><div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div><a href="#">Back to top ↑</a></div></footer></>;
}

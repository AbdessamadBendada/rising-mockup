"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function SelectedTransformations(){
  const ref=useRef<HTMLElement>(null);const[visible,setVisible]=useState(false);
  useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>entry.isIntersecting&&setVisible(true),{threshold:.12});observer.observe(node);return()=>observer.disconnect()},[]);
  return <section ref={ref} id="work" className={`case-spread${visible?" case-spread--visible":""}`} aria-labelledby="case-spread-title">
    <header className="case-spread__top"><div><p>Selected transformation</p></div><p>Concept case</p></header>
    <div className="case-spread__grid">
      <div className="case-spread__portrait"><Image src="/placeholder-client.jpg" alt="Placeholder portrait for the concept client Mara Kern" fill sizes="(max-width: 700px) 100vw, 38vw"/><div className="case-spread__portrait-meta"><span>Concept portrait</span><span>Pexels</span></div></div>
      <div className="case-spread__story">
        <p className="case-spread__role">Leadership strategist · Founder</p>
        <h2 id="case-spread-title">Mara<br/><em>Kern.</em></h2>
        <blockquote>“The expertise was never the problem. Recognition was.”</blockquote>
        <div className="case-spread__shift"><article><span>Before</span><h3>Respected<br/>but unseen.</h3><p>Strong reputation inside a small professional network, without a distinct public position.</p></article><i aria-hidden="true"/><article><span>After</span><h3>Visible.<br/>Trusted. Chosen.</h3><p>A clear category position, recognisable identity and authority platform built to generate demand.</p></article></div>
      </div>
    </div>
    <div className="case-spread__outcomes"><p>Placeholder outcomes</p><div><span><strong>2.8×</strong>Qualified enquiries</span><span><strong>+146%</strong>Audience growth</span><span><strong>9</strong>Speaking invitations</span></div></div>
    <footer className="case-spread__foot"><p>Fictional name and results shown for layout development only.</p><a href="#apply">View the full transformation <span>↗</span></a></footer>
  </section>
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function FounderStory(){
 const ref=useRef<HTMLElement>(null);const[visible,setVisible]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>entry.isIntersecting&&setVisible(true),{threshold:.12});observer.observe(node);return()=>observer.disconnect()},[]);
 return <section ref={ref} id="studio" className={`founder${visible?" founder--visible":""}`} aria-labelledby="founder-title">
  <header className="founder__top"><div><p>The founder story</p></div><p>Vienna / Working worldwide</p></header>
  <div className="founder__lead"><p className="founder__eyebrow"><span/>Why Rysing exists</p><h2 id="founder-title">Expertise alone<br/>doesn’t make you<br/><span>visible.</span></h2></div>
  <div className="founder__layout">
   <figure className="founder__portrait"><div className="founder__portrait-frame"><Image src="/anzelika-sitting-orange.webp" alt="Anzhelika Tauber, founder and strategic director of Rysing Studio" fill sizes="(max-width: 700px) 100vw, 42vw"/></div><figcaption><strong>Anzhelika Tauber</strong><span>Founder & strategic director</span></figcaption></figure>
   <div className="founder__story"><blockquote>“I created Rysing for brilliant people whose reputation had not yet caught up with their ability.”</blockquote><div className="founder__copy"><p>Too many exceptional experts remain overlooked—not because they lack substance, but because the market cannot yet see, understand or remember what makes them different.</p><p>Rysing brings reputation, design, content and growth into one system. Anzhelika leads the vision and strategy. The studio turns it into an identity, presence and commercial engine built to scale.</p></div><a href="#apply">Meet the studio <span>↗</span></a></div>
  </div>
  <div className="founder__principle"><span>Our principle</span><p>We do not create the expertise.<br/><strong>We make the world see it.</strong></p></div>
 </section>
}

"use client";
import { useEffect,useState } from "react";
import { StarField } from "@/components/ui/StarField";

export function Hero(){const[ready,setReady]=useState(false);useEffect(()=>{const reveal=()=>setReady(true);addEventListener("rysing:ready",reveal,{once:true});const fallback=setTimeout(reveal,4600);return()=>{removeEventListener("rysing:ready",reveal);clearTimeout(fallback)}},[]);
 return <section className={`hero${ready?" is-visible":""}`} aria-labelledby="hero-title">
  <StarField active={ready}/><div className="hero__grain"/>
  <header className="hero__nav"><a className="wordmark" href="#" aria-label="Rysing Studio home">ry<span>s</span>ing.</a><nav aria-label="Primary"><a href="#work">Work</a><a href="#services">Services</a><a href="#studio">The studio</a></nav><a className="nav-action" href="#apply">Begin your rise <b>↗</b></a></header>
  <div className="hero__copy"><p className="eyebrow"><span/>People-branding studio</p><h1 id="hero-title">Turn your<br/>expertise into<br/><em>gravity.</em></h1></div>
  <aside className="hero__note"><span className="hero__number">01</span><p>We shape ambitious founders and experts into personal brands that attract attention, earn trust and become the obvious choice.</p><a href="#work">Build your authority <span>↗</span></a></aside>
  <div className="hero__index" aria-hidden="true"><span>Vienna</span><span>48.2082° N</span><span>Worldwide</span></div>
  <div className="star-label" aria-hidden="true"><span>Your signal</span></div>
 </section>}

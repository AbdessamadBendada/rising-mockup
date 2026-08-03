"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export function SundayFudge(){
 const ref=useRef<HTMLElement>(null);const[visible,setVisible]=useState(false),[submitted,setSubmitted]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>entry.isIntersecting&&setVisible(true),{threshold:.1});observer.observe(node);return()=>observer.disconnect()},[]);
 const submit=(event:FormEvent)=>{event.preventDefault();setSubmitted(true)};
 return <section ref={ref} className={`fudge${visible?" fudge--visible":""}`} aria-labelledby="fudge-title">
  <header className="fudge__top"><div><p>Sunday Fudge</p></div><p>One useful email / Every Sunday</p></header>
  <div className="fudge__masthead"><p>Ideas worth stealing for your business</p><h2 id="fudge-title"><span>Sunday</span><span>Fudge.</span></h2><div className="fudge__stamp" aria-hidden="true"><span>FREE / SMART / USEFUL / NO FLUFF / </span><b>SF</b></div></div>
  <div className="fudge__paper">
   <article className="fudge__main"><span>This week’s issue</span><h3>How to become<br/>the obvious choice<br/>before the sales call.</h3><p>A sharp five-minute lesson on visibility, positioning and building a business around what you know.</p></article>
   <aside className="fudge__menu"><span>Also inside</span><ol><li><b>01</b>Content ideas people save</li><li><b>02</b>LinkedIn without the cringe</li><li><b>03</b>Simple client-acquisition systems</li><li><b>04</b>Building authority that sells</li></ol></aside>
   <div className="fudge__signup"><p>Good ideas.<br/>Fresh every Sunday.</p>{submitted?<div className="fudge__thanks">You’re on the list. See you Sunday.</div>:<form onSubmit={submit}><label htmlFor="fudge-email">Your email address</label><div><input id="fudge-email" type="email" placeholder="you@yourbusiness.com" required/><button type="submit">Get Sunday Fudge <span>↗</span></button></div><small>No spam. No filler. Unsubscribe whenever.</small></form>}</div>
  </div>
  <div className="fudge__crawl" aria-hidden="true"><div><span>BUSINESS</span><i/> <span>BRANDING</span><i/> <span>VISIBILITY</span><i/> <span>GROWTH</span><i/> <span>NO FLUFF</span><i/> <span>BUSINESS</span><i/> <span>BRANDING</span><i/></div></div>
 </section>
}

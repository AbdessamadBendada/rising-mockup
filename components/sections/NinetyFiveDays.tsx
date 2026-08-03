"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function NinetyFiveDays(){
 const sectionRef=useRef<HTMLElement>(null),stageRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{const section=sectionRef.current,stage=stageRef.current;if(!section||!stage)return;let target=0,current=0,frame=0;const clamp=(v:number)=>Math.min(1,Math.max(0,v));const update=()=>{const r=section.getBoundingClientRect();target=clamp(-r.top/Math.max(section.offsetHeight-innerHeight,1))};const tick=()=>{current+=(target-current)*.075;stage.style.setProperty("--reveal",String(current));stage.style.setProperty("--reveal-pct",`${current*100}%`);stage.style.setProperty("--before-opacity",String(clamp(1-current*2.8)));stage.style.setProperty("--after-opacity",String(clamp((current-.48)*3)));stage.style.setProperty("--after-offset",`${(1-current)*40}px`);stage.style.setProperty("--cta-opacity",String(clamp((current-.75)*5)));stage.dataset.moment=current<.34?"position":current<.7?"build":"recognition";frame=requestAnimationFrame(tick)};update();frame=requestAnimationFrame(tick);addEventListener("scroll",update,{passive:true});addEventListener("resize",update,{passive:true});return()=>{cancelAnimationFrame(frame);removeEventListener("scroll",update);removeEventListener("resize",update)}},[]);
 return <section ref={sectionRef} id="95-days" className="transformation95" aria-label="95 Days to a Brand Built to Sell"><div ref={stageRef} className="transformation95__stage" data-moment="position">
  <div className="transformation95__dark"><Image src="/anzelika-sitting-orange.webp" alt="" fill sizes="100vw"/><div className="transformation95__shade"/></div>
  <div className="transformation95__light"><Image src="/anzhelika-2.webp" alt="Anzhelika Tauber representing the bold Day 95 brand transformation" fill sizes="100vw"/></div>
  <div className="transformation95__curtain" aria-hidden="true"><span/></div>
  <header className="transformation95__top"><div><p>95 days to a brand built to sell</p></div><p>Scroll through the transformation</p></header>
  <div className="transformation95__before"><small>Day 01</small><h2>Exceptional.<br/>Still <span>overlooked.</span></h2><p>The expertise exists. The position, identity and growth system do not—yet.</p></div>
  <div className="transformation95__after"><small>Day 95</small><h2>Visible.<br/>Recognised.<br/><span>Chosen.</span></h2><p>A complete authority brand designed to attract attention, build trust and create demand.</p></div>
  <div className="transformation95__notes transformation95__notes--position"><span>Position</span><p>Own a clear category<br/>and memorable message.</p></div>
  <div className="transformation95__notes transformation95__notes--build"><span>Build</span><p>Launch the identity,<br/>website and content system.</p></div>
  <div className="transformation95__notes transformation95__notes--activate"><span>Activate</span><p>Connect authority to<br/>visibility and lead generation.</p></div>
  <div className="transformation95__progress" aria-hidden="true"><span/><i/></div>
  <a className="transformation95__cta" href="#apply">Explore the 95-day programme <span>↗</span></a>
 </div></section>
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const proof=[
 {value:"30+",label:"Personal brands built",note:"Across founders, experts and leaders"},
 {value:"20M",label:"Monthly views",note:"Across the accounts we help shape"},
 {value:"3K+",label:"Content pieces",note:"Ideas turned into visible authority"},
 {value:"49",label:"Five-star stories",note:"Recognition backed by experience"},
];

export function ProofRecognition(){
 const ref=useRef<HTMLElement>(null);const[visible,setVisible]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>entry.isIntersecting&&setVisible(true),{threshold:.08});observer.observe(node);return()=>observer.disconnect()},[]);
 return <section ref={ref} className={`proof${visible?" proof--visible":""}`} aria-labelledby="proof-title">
  <header className="proof__top"><div><p>Proof & recognition</p></div><p>Placeholder figures / design direction</p></header>
  <div className="proof__lead"><p><span/>Evidence, not promises</p><h2 id="proof-title">When people<br/>see you differently,<br/><strong>everything changes.</strong></h2></div>
  <div className="proof__ledger">
   {proof.map((item,index)=><article key={item.label} style={{"--proof-delay":`${index*.1}s`} as React.CSSProperties}><span>0{index+1}</span><strong>{item.value}</strong><h3>{item.label}</h3><p>{item.note}</p></article>)}
  </div>
  <figure className="proof__audience">
   <div className="proof__audience-image"><Image src="/Anzhelika-taking-selfie.webp" alt="Anzhelika Tauber taking a selfie with an enthusiastic audience" fill sizes="100vw"/></div>
   <figcaption><p>Authority is not just being seen.<br/><strong>It is moving a room.</strong></p><span>Anzhelika Tauber · Founder, speaker and community builder</span></figcaption>
  </figure>
  <div className="proof__quote"><span className="proof__quote-mark" aria-hidden="true">“</span><blockquote>Rysing did not make me louder. They made it clear why I was the person to listen to.</blockquote><div><span>Placeholder client</span><span>Founder / Leadership expert</span></div></div>
  <div className="proof__ticker" aria-hidden="true"><div><span>RECOGNISED</span><i/> <span>REMEMBERED</span><i/> <span>TRUSTED</span><i/> <span>CHOSEN</span><i/> <span>RECOGNISED</span><i/> <span>REMEMBERED</span><i/></div></div>
 </section>
}

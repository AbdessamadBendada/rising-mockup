"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function TeamSection(){
 const ref=useRef<HTMLElement>(null);const[visible,setVisible]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>entry.isIntersecting&&setVisible(true),{threshold:.08});observer.observe(node);return()=>observer.disconnect()},[]);
 return <section ref={ref} className={`team${visible?" team--visible":""}`} aria-labelledby="team-title">
  <header className="team__top"><div><p>The studio</p></div><p>Vienna / Connected globally</p></header>
  <div className="team__lead"><h2 id="team-title">One vision.<br/>A complete<br/><span>studio.</span></h2><p>You are not hiring one strategist. You are gaining a team built around the position, presence and growth of your name.</p></div>
  <div className="team__composition">
   <article className="team__person team__person--founder"><div className="team__image"><Image src="/anzelika-sitting-orange.webp" alt="Anzhelika Tauber, founder of Rysing Studio" fill sizes="(max-width: 700px) 100vw, 46vw"/></div><div className="team__caption"><span>01</span><div><h3>Anzhelika Tauber</h3><p>Founder & strategic director</p></div></div></article>
   <article className="team__person team__person--manager"><div className="team__image"><Image src="/placeholder-kristina.jpg" alt="Placeholder portrait for Kristina" fill sizes="(max-width: 700px) 50vw, 22vw"/></div><div className="team__caption"><span>02</span><div><h3>Kristina</h3><p>Personal brand manager</p></div></div></article>
   <article className="team__person team__person--sales"><div className="team__image"><Image src="/placeholder-brisi.jpg" alt="Placeholder portrait for Brisi" fill sizes="(max-width: 700px) 50vw, 22vw"/></div><div className="team__caption"><span>03</span><div><h3>Brisi</h3><p>Head of sales</p></div></div></article>
   <div className="team__statement"><span>Strategy</span><i/> <span>Design</span><i/> <span>Content</span><i/> <span>Growth</span></div>
  </div>
  <footer className="team__foot"><p>Different disciplines.<br/>One standard.</p><a href="#apply">Work with the studio <span>↗</span></a></footer>
 </section>
}

"use client";

import { useEffect, useRef, useState } from "react";

const chapters=[
 {no:"01",title:"Positioning",promise:"Become impossible to confuse.",body:"We define the category you own, the value only you can claim and the message your market remembers.",services:["Brand strategy","Positioning & repositioning","Naming","Keynote development"]},
 {no:"02",title:"Identity",promise:"Look like the authority you are.",body:"We translate your expertise into a distinctive visual and verbal world built for recognition at every touchpoint.",services:["Brand identity","Website design & development","Photography direction","Speaker media kits"]},
 {no:"03",title:"Visibility",promise:"Turn expertise into attention.",body:"We build the content and media engine that puts your thinking in front of the people who need to know you.",services:["Thought leadership","LinkedIn & Instagram","Content production","Speaker reels"]},
 {no:"04",title:"Monetisation",promise:"Turn attention into demand.",body:"We connect your authority to a commercial system that creates qualified conversations, opportunities and sales.",services:["Lead generation","Funnels & email","Campaigns","Launches & workshops"]},
];

export function AuthoritySystem(){
 const[active,setActive]=useState(0),[visible,setVisible]=useState(false);const ref=useRef<HTMLElement>(null);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>entry.isIntersecting&&setVisible(true),{threshold:.08});observer.observe(node);return()=>observer.disconnect()},[]);
 return <section ref={ref} id="services" className={`authority${visible?" authority--visible":""}`} aria-labelledby="authority-title">
  <header className="authority__header"><div><p>The Rysing authority system</p></div><h2 id="authority-title">Four moves.<br/><em>One rise.</em></h2><p>Not disconnected services. One integrated system designed to move you from expertise to recognition—and recognition to demand.</p></header>
  <div className="authority__chapters">
   {chapters.map((chapter,index)=>{const open=active===index;return <article className={`authority__chapter${open?" is-open":""}`} key={chapter.no}>
    <button onClick={()=>setActive(index)} aria-expanded={open} aria-controls={`authority-panel-${chapter.no}`}><span>{chapter.no}</span><h3>{chapter.title}</h3><p>{chapter.promise}</p><i aria-hidden="true">{open?"−":"+"}</i></button>
    <div className="authority__panel" id={`authority-panel-${chapter.no}`} aria-hidden={!open}><div><p>{chapter.body}</p><ul>{chapter.services.map(service=><li key={service}>{service}</li>)}</ul><a href="#apply">Explore {chapter.title.toLowerCase()} <span>↗</span></a></div></div>
   </article>})}
  </div>
  <footer className="authority__footer"><p>Strategy before aesthetics.<br/>Authority before attention.<br/>Demand after trust.</p><span aria-hidden="true">R</span></footer>
 </section>
}

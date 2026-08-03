"use client";

import { useEffect, useRef } from "react";

type SkyStar={x:number;y:number;r:number;a:number;phase:number;speed:number;warm:boolean};

export function OneAmongMillions(){
  const journeyRef=useRef<HTMLElement>(null),stageRef=useRef<HTMLDivElement>(null),canvasRef=useRef<HTMLCanvasElement>(null),heroRef=useRef<HTMLSpanElement>(null),ringRef=useRef<HTMLSpanElement>(null),flareRef=useRef<HTMLSpanElement>(null),messageRef=useRef<HTMLDivElement>(null),messageInnerRef=useRef<HTMLDivElement>(null),fillRef=useRef<HTMLSpanElement>(null),chapterRef=useRef<HTMLSpanElement>(null);
  useEffect(()=>{const journey=journeyRef.current,stage=stageRef.current,canvas=canvasRef.current,hero=heroRef.current,ring=ringRef.current,flare=flareRef.current,message=messageRef.current,messageInner=messageInnerRef.current,fill=fillRef.current,chapter=chapterRef.current;if(!journey||!stage||!canvas||!hero||!ring||!flare||!message||!messageInner||!fill||!chapter)return;const ctx=canvas.getContext("2d");if(!ctx)return;
    let w=innerWidth,h=innerHeight,dpr=Math.min(devicePixelRatio||1,2),stars:SkyStar[]=[],target=0,current=0,last=performance.now(),frame=0,visible=false,currentChapter="";
    const clamp=(v:number,a=0,b=1)=>Math.min(b,Math.max(a,v)),range=(v:number,a:number,b:number)=>clamp((v-a)/(b-a)),smooth=(t:number)=>t*t*(3-2*t),ease=(t:number)=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    const random=(()=>{let s=73193;return()=>((s=s*16807%2147483647)-1)/2147483646})();
    const resize=()=>{const r=stage.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(780,Math.max(380,Math.round(w*h/2100)))},()=>{const d=random();return{x:random()*w,y:random()*h,r:.3+d*1.5,a:.15+random()*.7,phase:random()*6.28,speed:.35+random(),warm:random()>.88}})};
    const progress=()=>{const r=journey.getBoundingClientRect();target=clamp(-r.top/Math.max(journey.offsetHeight-innerHeight,1))};
    const draw=(time:number)=>{if(visible){ctx.clearRect(0,0,w,h);const fade=1-.88*smooth(range(current,.32,.72)),drift=current*46;for(const s of stars){const focus=Math.hypot(s.x-w*.5,s.y-h*.5)<Math.min(w,h)*.17?.5:1,a=s.a*(.8+Math.sin(time*.00065*s.speed+s.phase)*.2)*fade*focus;if(a<.01)continue;ctx.beginPath();ctx.fillStyle=s.warm?`rgba(255,218,170,${a})`:`rgba(225,235,255,${a})`;ctx.arc(s.x,(s.y-drift*s.r*.2+h)%h,s.r,0,6.283);ctx.fill()}}frame=requestAnimationFrame(draw)};
    const render=(p:number)=>{
      const move=ease(range(p,.04,.64)),x=20+30*move,y=82-32*move,base=1+3.8*move;
      const arrival=smooth(range(p,.62,.76)),release=smooth(range(p,.76,.88));
      const brand=smooth(range(p,.52,.72));
      hero.style.transform=`translate3d(${w*x/100}px,${h*y/100}px,0) translate(-50%,-50%) scale(${base*(1+arrival*4.2)})`;
      hero.style.filter=`blur(${arrival*7}px)`;
      hero.style.opacity=String(1-arrival*.72);
      hero.style.background=`rgb(${Math.round(255-15*brand)},${Math.round(250-184*brand)},${Math.round(240-206*brand)})`;
      hero.style.boxShadow=`0 0 ${8+arrival*12}px ${2+arrival*3}px rgba(255,255,255,${1-brand*.6}),0 0 ${24+arrival*28}px ${6+arrival*7}px rgba(240,66,34,${.46+brand*.42}),0 0 ${54+arrival*55}px ${12+arrival*12}px rgba(240,66,34,${.34+brand*.34})`;
      ring.style.opacity=String(arrival*(1-release*.35));
      ring.style.transform=`translate(-50%,-50%) scale(${.12+arrival*1.12})`;
      const fp=Math.sin(smooth(range(p,.67,.82))*Math.PI);
      flare.style.opacity=String(fp*.9);
      flare.style.transform=`translate(-50%,-50%) scaleX(${smooth(range(p,.66,.78))})`;
      const text=smooth(range(p,.74,.88));
      message.style.opacity=String(text);
      messageInner.style.transform=`translateY(${54*(1-text)}px)`;
      messageInner.style.filter=`blur(${9*(1-text)}px)`;
      fill.style.height=p*100+"%";
      const next=p<.3?"Unseen":p<.7?"The rise":"Unmissable";
      if(next!==currentChapter){currentChapter=next;chapter.textContent=next}
    };
    const tick=(now:number)=>{const dt=Math.min((now-last)/1000,.05);last=now;current+=(target-current)*(1-Math.exp(-6.5*dt));render(current);requestAnimationFrame(tick)};
    const io=new IntersectionObserver(([e])=>visible=e.isIntersecting,{rootMargin:"120px"});io.observe(stage);resize();progress();frame=requestAnimationFrame(draw);requestAnimationFrame(tick);addEventListener("scroll",progress,{passive:true});addEventListener("resize",resize,{passive:true});return()=>{cancelAnimationFrame(frame);io.disconnect();removeEventListener("scroll",progress);removeEventListener("resize",resize)};
  },[]);
  return <section ref={journeyRef} className="millions" aria-label="One among millions scroll experience"><div ref={stageRef} className="millions__stage"><canvas ref={canvasRef} className="millions__sky" aria-hidden="true"/><div className="millions__ambient"/><div className="millions__vignette"/><div className="millions__grain"/><header className="millions__top"><span>03 / One among millions</span><span>Scroll to rise</span></header><div className="millions__chapter"><small>Chapter</small><span ref={chapterRef}>Unseen</span></div><span ref={heroRef} className="millions__hero"/><span ref={ringRef} className="millions__ring"/><span ref={flareRef} className="millions__flare"/><div ref={messageRef} className="millions__message"><div ref={messageInnerRef}><h2>You deserve to <em>rise.</em></h2><p>Your expertise was always there. Now the world can see it.</p></div></div><div className="millions__progress" aria-hidden="true"><small>The rise</small><i><span ref={fillRef}/></i></div></div></section>;
}

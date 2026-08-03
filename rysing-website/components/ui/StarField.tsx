"use client";
import { useEffect, useRef } from "react";

export function StarField({ active }:{ active:boolean }) {
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;let w=0,h=0,ratio=1,frame=0,start=performance.now(),px=0,py=0,tx=0,ty=0;let stars:{x:number;y:number;r:number;a:number;p:number;d:number}[]=[];
    const resize=()=>{const b=canvas.getBoundingClientRect();w=b.width;h=b.height;ratio=Math.min(devicePixelRatio||1,2);canvas.width=w*ratio;canvas.height=h*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);stars=Array.from({length:Math.min(210,Math.max(100,Math.round(w*h/8500)))},()=>({x:Math.random()*w,y:Math.random()*h,r:.35+Math.random()*1.15,a:.12+Math.random()*.48,p:Math.random()*6.28,d:.2+Math.random()*.8}))};
    const move=(e:PointerEvent)=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5};
    const draw=(time:number)=>{px+=(tx-px)*.03;py+=(ty-py)*.03;ctx.clearRect(0,0,w,h);for(const s of stars){ctx.beginPath();ctx.fillStyle=`rgba(243,239,230,${s.a*(.8+Math.sin(time*.001+s.p)*.2)})`;ctx.arc(s.x+px*s.d*12,s.y+py*s.d*9,s.r,0,6.283);ctx.fill()}if(active){const p=Math.min((time-start)/2200,1),e=1-Math.pow(1-p,4),sx=w*.58,sy=h*1.06,ex=w*(w<700?.79:.82),ey=h*(w<700?.22:.29),x=sx+(ex-sx)*e+Math.sin(e*Math.PI)*w*.045,y=sy+(ey-sy)*e,g=ctx.createRadialGradient(x,y,0,x,y,54);g.addColorStop(0,"rgba(255,255,245,1)");g.addColorStop(.08,"rgba(240,66,34,.9)");g.addColorStop(.34,"rgba(240,66,34,.18)");g.addColorStop(1,"rgba(240,66,34,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,54,0,6.283);ctx.fill();ctx.fillStyle="#fffaf1";ctx.beginPath();ctx.arc(x,y,2.2,0,6.283);ctx.fill()}frame=requestAnimationFrame(draw)};
    start=performance.now();resize();frame=requestAnimationFrame(draw);addEventListener("resize",resize);addEventListener("pointermove",move,{passive:true});return()=>{cancelAnimationFrame(frame);removeEventListener("resize",resize);removeEventListener("pointermove",move)}} ,[active]);
  return <canvas ref={ref} className="hero__sky" aria-hidden="true"/>;
}

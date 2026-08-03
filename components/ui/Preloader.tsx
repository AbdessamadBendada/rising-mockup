"use client";

import { useEffect, useRef, useState } from "react";

type Dot = { x:number;y:number;tx:number;ty:number;vx:number;vy:number;r:number;red:boolean };
const WORDS = ["SEEN.", "HEARD.", "LOVED.", "RYSING."];

export function Preloader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    document.documentElement.classList.add("is-loading");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = innerWidth, height = innerHeight, dots: Dot[] = [], frame = 0, word = 0, finished = false;

    const targets = (text:string) => {
      const sample = document.createElement("canvas");
      sample.width = Math.max(1, Math.round(width)); sample.height = Math.max(1, Math.round(height));
      const sc = sample.getContext("2d", { willReadFrequently:true });
      if (!sc) return [] as {x:number;y:number;red:boolean}[];
      let size = Math.min(height*.25,width*.18,220);
      sc.font = `900 ${size}px Arial,Helvetica,sans-serif`;
      const max = width*(width<640?.86:.76), measured=sc.measureText(text).width;
      if(measured>max) size*=max/measured;
      sc.font=`900 ${Math.max(52,size)}px Arial,Helvetica,sans-serif`;sc.textAlign="center";sc.textBaseline="middle";sc.fillStyle="#f3efe6";sc.fillText(text,width/2,height/2);
      const data=sc.getImageData(0,0,sample.width,sample.height).data, step=width<640?5:4, out=[];
      const total=sc.measureText(text).width, prefix=sc.measureText("RY").width, sWidth=sc.measureText("S").width;
      const sLeft=width/2-total/2+prefix;
      for(let y=0;y<height;y+=step)for(let x=0;x<width;x+=step){if(data[(y*sample.width+x)*4+3]>90)out.push({x:x+(Math.random()-.5)*1.2,y:y+(Math.random()-.5)*1.2,red:text==="RYSING."&&x>sLeft&&x<sLeft+sWidth});}
      return out.sort(()=>Math.random()-.5).slice(0,width<640?2400:4800);
    };

    const show = (text:string) => {
      const next=targets(text);
      while(dots.length<next.length){const a=Math.random()*Math.PI*2,dist=Math.max(width,height)*(.4+Math.random()*.35);dots.push({x:width/2+Math.cos(a)*dist,y:height/2+Math.sin(a)*dist,tx:width/2,ty:height/2,vx:0,vy:0,r:Math.random()>.84?2.2:1.55,red:false});}
      dots.forEach((d,i)=>{const t=next[i];if(t){d.tx=t.x;d.ty=t.y;d.red=t.red;d.vx+=(Math.random()-.5)*2;d.vy+=(Math.random()-.5)*2}else{d.tx=width/2+(Math.random()-.5)*width*1.4;d.ty=-height*.2;}});
    };
    const resize=()=>{width=innerWidth;height=innerHeight;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);canvas.style.width=width+"px";canvas.style.height=height+"px";ctx.setTransform(ratio,0,0,ratio,0,0);show(WORDS[word]);};
    const draw=()=>{ctx.fillStyle="rgba(9,9,9,.28)";ctx.fillRect(0,0,width,height);for(const d of dots){d.vx+=(d.tx-d.x)*.026;d.vy+=(d.ty-d.y)*.026;d.vx*=.79;d.vy*=.79;d.x+=d.vx;d.y+=d.vy;ctx.fillStyle=d.red?"#f04222":"#f3efe6";ctx.fillRect(d.x,d.y,d.r,d.r)}frame=requestAnimationFrame(draw)};
    resize();frame=requestAnimationFrame(draw);
    const timers:number[]=[];
    if(reduced){timers.push(window.setTimeout(()=>finish(),120));}
    else {
      [700,1400,2100].forEach((delay,i)=>timers.push(window.setTimeout(()=>{word=i+1;show(WORDS[word])},delay)));
      timers.push(window.setTimeout(()=>finish(),3100));
    }
    function finish(){if(finished)return;finished=true;setLeaving(true);timers.push(window.setTimeout(()=>{setHidden(true);document.documentElement.classList.remove("is-loading");dispatchEvent(new CustomEvent("rysing:ready"));},720));}
    const failsafe=window.setTimeout(finish,4300);addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(frame);timers.forEach(clearTimeout);clearTimeout(failsafe);removeEventListener("resize",resize);document.documentElement.classList.remove("is-loading")};
  },[]);

  if(hidden)return null;
  return <div className={`loader${leaving?" loader--leaving":""}`} role="status" aria-label="Loading Rysing Studio"><canvas ref={canvasRef}/><div className="loader__meta"><span>Visibility</span><span>Authority</span><span>Recognition</span></div><div className="loader__progress"/></div>;
}

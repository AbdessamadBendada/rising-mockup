"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
  flicker: number;
  alpha: number;
  /** Hot sparks carry a pale core; cool ones are ash lit by the fire. */
  hot: boolean;
  /** A few rip up the frame far faster than the rest and leave a trail. */
  streak: boolean;
};

/** A soft radial sprite, drawn once and reused. Far cheaper than per-frame gradients. */
function makeGlow(r: number, g: number, b: number) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
  grad.addColorStop(0.22, `rgba(${r}, ${g}, ${b}, 0.7)`);
  grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.22)`);
  grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

/**
 * Embers climbing the dark floor. Drawn additively so overlapping sparks build
 * light the way real embers do, with a pale core, a wind that pushes the whole
 * field, per-spark flicker, and a handful of fast streakers.
 */
export function EmberRise({ count = 78 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const glowSignal = makeGlow(240, 82, 40);
    const glowCore = makeGlow(255, 208, 168);
    const glowAsh = makeGlow(255, 234, 210);

    let width = 0;
    let height = 0;
    let sparks: Spark[] = [];
    let frame = 0;
    let last = performance.now();
    let clock = 0;

    const seed = (() => {
      let s = 4222;
      return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
    })();

    const spawn = (fromBottom = false): Spark => {
      const streak = seed() > 0.87;
      const hot = streak || seed() > 0.4;
      return {
        x: seed() * width,
        y: fromBottom ? height + seed() * 80 : seed() * height,
        size: streak ? 1.6 + seed() * 1.4 : 0.9 + seed() * 2.6,
        // Streakers move roughly an order of magnitude faster than the field.
        speed: streak ? 520 + seed() * 680 : 26 + seed() * 78,
        drift: (seed() - 0.5) * (streak ? 10 : 34),
        phase: seed() * Math.PI * 2,
        flicker: 2.5 + seed() * 6,
        alpha: streak ? 0.85 + seed() * 0.15 : 0.45 + seed() * 0.5,
        hot,
        streak,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sparks = Array.from({ length: count }, () => spawn());
    };

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const step = Math.min((now - last) / 1000, 0.05);
      last = now;
      clock += step;

      // A slow gust pushes the whole field, so sparks share a common current.
      const wind = Math.sin(clock * 0.32) * 16 + Math.sin(clock * 0.11) * 9;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const spark of sparks) {
        spark.y -= spark.speed * step;
        spark.phase += step * spark.flicker;

        if (spark.y + 40 < 0) {
          Object.assign(spark, spawn(true));
          continue;
        }

        // Sparks burn steadily up the frame and only cool in the top third,
        // which keeps the field alive without dirtying the headline.
        const life = Math.min(Math.max(spark.y / height, 0), 1);
        const t = Math.min(life / 0.35, 1);
        const fade = t * t * (3 - 2 * t);
        const pulse = 0.7 + Math.sin(spark.phase) * 0.3;
        const alpha = spark.alpha * fade * pulse;
        if (alpha < 0.015) continue;

        const x = spark.x + Math.sin(spark.phase * 0.4) * spark.drift + wind * (1 - life) * 0.5;
        const body = spark.hot ? glowSignal : glowAsh;

        if (spark.streak) {
          // Trail is drawn behind the head and tapers off with distance.
          const trail = spark.speed * 0.12;
          const grad = ctx.createLinearGradient(x, spark.y, x, spark.y + trail);
          grad.addColorStop(0, `rgba(255, 190, 148, ${alpha})`);
          grad.addColorStop(0.35, `rgba(240, 82, 40, ${alpha * 0.6})`);
          grad.addColorStop(1, "rgba(240, 82, 40, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = spark.size;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(x, spark.y);
          ctx.lineTo(x, spark.y + trail);
          ctx.stroke();
        }

        const halo = spark.size * (spark.streak ? 8 : spark.hot ? 7 : 5.2);
        ctx.globalAlpha = alpha * 0.85;
        ctx.drawImage(body, x - halo / 2, spark.y - halo / 2, halo, halo);

        if (spark.hot) {
          const core = spark.size * 2.4;
          ctx.globalAlpha = Math.min(alpha * 1.2, 1);
          ctx.drawImage(glowCore, x - core / 2, spark.y - core / 2, core, core);
        }

        ctx.globalAlpha = 1;
      }

      ctx.globalCompositeOperation = "source-over";
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="embers" aria-hidden="true" />;
}

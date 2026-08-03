document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("hero-sky");
  const hero = document.querySelector(".hero");
  if (!(canvas instanceof HTMLCanvasElement) || !hero) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let ratio = 1;
  let frame = 0;
  let lastTime = performance.now();
  let revealStart = 0;
  let revealed = false;
  let pointerX = 0;
  let pointerY = 0;
  let targetPointerX = 0;
  let targetPointerY = 0;
  let stars = [];
  const trail = [];

  const makeStars = () => {
    const count = Math.min(190, Math.max(90, Math.round((width * height) / 9500)));
    stars = Array.from({ length: count }, (_, index) => {
      const bright = index % 17 === 0;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        depth: 0.18 + Math.random() * 0.82,
        radius: bright ? 1.35 + Math.random() : 0.4 + Math.random() * 0.75,
        alpha: bright ? 0.72 : 0.15 + Math.random() * 0.42,
        phase: Math.random() * Math.PI * 2,
      };
    });
  };

  const resize = () => {
    const bounds = hero.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    makeStars();
  };

  const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);

  const drawStarField = (time) => {
    pointerX += (targetPointerX - pointerX) * 0.035;
    pointerY += (targetPointerY - pointerY) * 0.035;

    for (const star of stars) {
      const x = star.x + pointerX * star.depth * 14;
      const y = star.y + pointerY * star.depth * 10;
      const twinkle = reducedMotion ? 1 : 0.74 + Math.sin(time * 0.0012 + star.phase) * 0.26;
      ctx.fillStyle = `rgba(244,240,232,${star.alpha * twinkle})`;
      ctx.beginPath();
      ctx.arc(x, y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawSignalStar = (time) => {
    const elapsed = revealed ? time - revealStart : 0;
    const progress = reducedMotion ? 1 : Math.min(elapsed / 2600, 1);
    const eased = easeOutQuart(progress);
    const startX = width * 0.58;
    const startY = height * 1.08;
    const endX = width < 760 ? width * 0.78 : width * 0.81;
    const endY = width < 760 ? height * 0.2 : height * 0.28;
    const bend = Math.sin(eased * Math.PI) * width * 0.055;
    const x = startX + (endX - startX) * eased + bend;
    const y = startY + (endY - startY) * eased;

    if (progress > 0 && progress < 1) {
      trail.push({ x, y, life: 1 });
      if (trail.length > 70) trail.shift();
    }

    trail.forEach((point) => {
      point.life *= 0.965;
    });

    for (let index = 1; index < trail.length; index++) {
      const point = trail[index];
      const previous = trail[index - 1];
      ctx.strokeStyle = `rgba(240,66,34,${point.life * index / trail.length * 0.52})`;
      ctx.lineWidth = 0.7 + (index / trail.length) * 1.5;
      ctx.beginPath();
      ctx.moveTo(previous.x, previous.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }

    const pulse = reducedMotion ? 1 : 1 + Math.sin(time * 0.003) * 0.08;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 54 * pulse);
    glow.addColorStop(0, "rgba(255,123,91,0.9)");
    glow.addColorStop(0.08, "rgba(240,66,34,0.75)");
    glow.addColorStop(0.34, "rgba(240,66,34,0.16)");
    glow.addColorStop(1, "rgba(240,66,34,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, 54 * pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f4f0e8";
    ctx.beginPath();
    ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fill();

    const label = document.querySelector(".star-label");
    if (label instanceof HTMLElement) {
      label.style.left = `${x + 22}px`;
      label.style.top = `${y - 10}px`;
      label.style.opacity = progress > 0.82 ? String(Math.min((progress - 0.82) / 0.18, 1)) : "0";
    }
  };

  const animate = (time) => {
    const delta = Math.min(time - lastTime, 40);
    lastTime = time;
    void delta;
    ctx.clearRect(0, 0, width, height);
    drawStarField(time);
    drawSignalStar(time);
    frame = requestAnimationFrame(animate);
  };

  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    targetPointerX = event.clientX / bounds.width - 0.5;
    targetPointerY = event.clientY / bounds.height - 0.5;
  });

  hero.addEventListener("pointerleave", () => {
    targetPointerX = 0;
    targetPointerY = 0;
  });

  const revealHero = () => {
    if (revealed) return;
    revealed = true;
    revealStart = performance.now();
    hero.classList.add("is-visible");
  };

  window.addEventListener("rysing:loader-complete", revealHero, { once: true });
  window.setTimeout(revealHero, 16000);
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    lastTime = performance.now();
  });

  resize();
  if (reducedMotion) revealHero();
  frame = requestAnimationFrame(animate);

  window.addEventListener("pagehide", () => cancelAnimationFrame(frame), { once: true });
});

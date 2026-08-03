document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const canvas = document.getElementById("loader-canvas");
  if (!loader || !(canvas instanceof HTMLCanvasElement)) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const words = [
    { text: "SEEN.", duration: 2200 },
    { text: "HEARD.", duration: 2200 },
    { text: "LOVED.", duration: 2600 },
    { text: "RYSING.", duration: 3000, final: true },
  ];

  const palette = {
    paper: [244, 240, 232],
    red: [240, 66, 34],
  };

  let pageReady = document.readyState === "complete";
  let sequenceReady = false;
  let exited = false;
  let animationFrame = 0;
  let resizeTimer = 0;
  let particles = [];
  let wordIndex = 0;
  let wordTimer = 0;
  let lastTime = performance.now();
  let cssWidth = window.innerWidth;
  let cssHeight = window.innerHeight;
  let context;

  class Particle {
    constructor(x, y) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.max(cssWidth, cssHeight) * (0.35 + Math.random() * 0.45);
      this.x = cssWidth / 2 + Math.cos(angle) * distance;
      this.y = cssHeight / 2 + Math.sin(angle) * distance;
      this.tx = x;
      this.ty = y;
      this.vx = 0;
      this.vy = 0;
      this.color = [...palette.red];
      this.targetColor = palette.paper;
      this.size = Math.random() < 0.16 ? 2.8 : 2;
      this.alpha = 0.72 + Math.random() * 0.28;
    }

    retarget(target, index) {
      this.tx = target.x;
      this.ty = target.y;
      this.targetColor = target.color;
      this.vx += (Math.random() - 0.5) * 2.4;
      this.vy += (Math.random() - 0.5) * 2.4;
      this.alpha = 0.78 + (index % 7) / 32;
    }

    update(delta) {
      const frameScale = Math.min(delta / 16.667, 2);
      this.vx += (this.tx - this.x) * 0.018 * frameScale;
      this.vy += (this.ty - this.y) * 0.018 * frameScale;
      this.vx *= Math.pow(0.84, frameScale);
      this.vy *= Math.pow(0.84, frameScale);
      this.x += this.vx * frameScale;
      this.y += this.vy * frameScale;
      this.color = this.color.map((channel, index) =>
        channel + (this.targetColor[index] - channel) * 0.075 * frameScale
      );
    }

    draw(ctx) {
      ctx.fillStyle = `rgba(${this.color[0] | 0},${this.color[1] | 0},${this.color[2] | 0},${this.alpha})`;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  const fitFontSize = (ctx, text) => {
    const maxWidth = cssWidth * (cssWidth < 620 ? 0.84 : 0.78);
    let size = Math.min(cssHeight * 0.29, cssWidth * 0.19, 230);
    ctx.font = `900 ${size}px Arial, Helvetica, sans-serif`;
    const measured = ctx.measureText(text).width;
    if (measured > maxWidth) size *= maxWidth / measured;
    return Math.max(size, 54);
  };

  const createTargets = ({ text, final }) => {
    const sampleCanvas = document.createElement("canvas");
    const sampleWidth = Math.max(1, Math.round(cssWidth));
    const sampleHeight = Math.max(1, Math.round(cssHeight));
    sampleCanvas.width = sampleWidth;
    sampleCanvas.height = sampleHeight;
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
    if (!sampleContext) return [];

    const fontSize = fitFontSize(sampleContext, text);
    sampleContext.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`;
    sampleContext.textAlign = "center";
    sampleContext.textBaseline = "middle";
    sampleContext.fillStyle = "rgb(244,240,232)";
    sampleContext.fillText(text, sampleWidth / 2, sampleHeight / 2);

    if (final) {
      const totalWidth = sampleContext.measureText(text).width;
      const prefixWidth = sampleContext.measureText("RY").width;
      const sWidth = sampleContext.measureText("S").width;
      const startX = sampleWidth / 2 - totalWidth / 2 + prefixWidth;
      sampleContext.save();
      sampleContext.beginPath();
      sampleContext.rect(startX - 2, 0, sWidth + 4, sampleHeight);
      sampleContext.clip();
      sampleContext.fillStyle = "rgb(240,66,34)";
      sampleContext.fillText(text, sampleWidth / 2, sampleHeight / 2);
      sampleContext.restore();
    }

    const data = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
    const step = 4;
    const targets = [];

    for (let y = 0; y < sampleHeight; y += step) {
      for (let x = 0; x < sampleWidth; x += step) {
        const pixel = (y * sampleWidth + x) * 4;
        if (data[pixel + 3] < 100) continue;
        const isRed = data[pixel] > 220 && data[pixel + 1] < 120;
        targets.push({
          x: x + (Math.random() - 0.5) * 1.4,
          y: y + (Math.random() - 0.5) * 1.4,
          color: isRed ? palette.red : palette.paper,
        });
      }
    }

    for (let i = targets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [targets[i], targets[j]] = [targets[j], targets[i]];
    }

    return targets.slice(0, cssWidth < 620 ? 3500 : 6000);
  };

  const showWord = (entry) => {
    const targets = createTargets(entry);
    while (particles.length < targets.length) {
      const target = targets[particles.length];
      particles.push(new Particle(target.x, target.y));
    }
    targets.forEach((target, index) => particles[index].retarget(target, index));

    for (let i = targets.length; i < particles.length; i++) {
      const angle = Math.random() * Math.PI * 2;
      particles[i].tx = cssWidth / 2 + Math.cos(angle) * cssWidth * 0.7;
      particles[i].ty = cssHeight / 2 + Math.sin(angle) * cssHeight * 0.7;
      particles[i].targetColor = palette.red;
      particles[i].alpha = 0.12;
    }
  };

  const sizeCanvas = () => {
    cssWidth = window.innerWidth;
    cssHeight = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cssWidth * ratio);
    canvas.height = Math.round(cssHeight * ratio);
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;
    context = canvas.getContext("2d");
    context?.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const finish = () => {
    if (exited || !pageReady || !sequenceReady) return;
    exited = true;
    loader.classList.add("departing");
    particles.forEach((particle) => {
      particle.ty -= cssHeight * (0.5 + Math.random() * 0.5);
      particle.vy -= 2 + Math.random() * 4;
    });
    window.setTimeout(() => loader.classList.add("done"), 280);
    window.setTimeout(() => {
      cancelAnimationFrame(animationFrame);
      loader.setAttribute("aria-hidden", "true");
      window.dispatchEvent(new CustomEvent("rysing:loader-complete"));
    }, 1100);
  };

  const animate = (now) => {
    const delta = Math.min(now - lastTime, 34);
    lastTime = now;
    if (!context) return;

    context.fillStyle = "rgba(10,10,10,0.34)";
    context.fillRect(0, 0, cssWidth, cssHeight);
    particles.forEach((particle) => {
      particle.update(delta);
      particle.draw(context);
    });

    if (!sequenceReady) {
      wordTimer += delta;
      if (wordTimer >= words[wordIndex].duration) {
        wordTimer = 0;
        if (wordIndex < words.length - 1) {
          wordIndex += 1;
          showWord(words[wordIndex]);
        } else {
          sequenceReady = true;
          finish();
        }
      }
    }

    animationFrame = requestAnimationFrame(animate);
  };

  const useFallback = () => {
    loader.classList.add("fallback");
    sequenceReady = true;
    window.setTimeout(finish, reducedMotion ? 350 : 900);
  };

  window.addEventListener("load", () => {
    pageReady = true;
    finish();
  }, { once: true });

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      sizeCanvas();
      if (!sequenceReady) showWord(words[wordIndex]);
    }, 150);
  });

  document.addEventListener("visibilitychange", () => {
    lastTime = performance.now();
  });

  window.setTimeout(() => {
    pageReady = true;
    sequenceReady = true;
    finish();
  }, 15000);

  if (reducedMotion) {
    useFallback();
    return;
  }

  try {
    sizeCanvas();
    if (!context) {
      useFallback();
      return;
    }
    showWord(words[0]);
    animationFrame = requestAnimationFrame(animate);
  } catch {
    useFallback();
  }
});

"use client";

import { useEffect } from "react";

const ITEM_SELECTOR = [
  ".social-proof article",
  ".rise-pathways__list article",
  ".case-spread__shift article",
  ".authority__chapter",
  ".proof__ledger article",
  ".testimonials-award blockquote",
  ".team__person",
  ".fudge__main",
  ".fudge__menu",
  ".fudge__signup",
  ".footer nav > div",
].join(",");

const PARALLAX_SELECTOR = [
  ".case-spread__portrait img",
  ".founder__portrait-frame img",
  ".team__image img",
].join(",");

export function AuthorityMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".authority-route");
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.classList.add("motion-reduced");
      return;
    }

    root.classList.add("motion-enabled");
    const items = Array.from(root.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
    const sections = Array.from(root.querySelectorAll<HTMLElement>("main > section"));
    const parallaxImages = Array.from(root.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR));
    const counters = Array.from(root.querySelectorAll<HTMLElement>(".social-proof strong, .proof__ledger strong"));

    items.forEach((item, index) => {
      item.classList.add("motion-rise-item");
      item.style.setProperty("--motion-delay", `${(index % 4) * 70}ms`);
    });
    sections.forEach((section) => section.classList.add("motion-rise-section"));
    parallaxImages.forEach((image) => image.classList.add("motion-parallax"));

    const countUp = (element: HTMLElement) => {
      if (element.dataset.counted) return;
      element.dataset.counted = "true";
      const original = element.textContent?.trim() || "";
      const match = original.match(/[\d,.]+/);
      if (!match) return;
      const value = Number(match[0].replace(/,/g, ""));
      if (!Number.isFinite(value)) return;
      const prefix = original.slice(0, match.index);
      const suffix = original.slice((match.index || 0) + match[0].length);
      const started = performance.now();
      const duration = 1250;
      const update = (time: number) => {
        const progress = Math.min((time - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(value * eased);
        element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("motion-in");
          if (target.matches(".social-proof strong, .proof__ledger strong")) countUp(target);
          observer.unobserve(target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    [...items, ...sections, ...counters].forEach((element) => observer.observe(element));

    const magnetic = Array.from(root.querySelectorAll<HTMLElement>("a:not(.wordmark):not(.final-cta__button), button"));
    const magneticCleanups = magnetic.map((element) => {
      const move = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.1;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.14;
        element.style.setProperty("--lift-x", `${x}px`);
        element.style.setProperty("--lift-y", `${y}px`);
      };
      const reset = () => {
        element.style.setProperty("--lift-x", "0px");
        element.style.setProperty("--lift-y", "0px");
      };
      element.classList.add("motion-magnetic");
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", reset);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
      };
    });

    let frame = 0;
    let running = true;
    const render = () => {
      if (!running) return;
      const scrollMax = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
      const progress = Math.min(Math.max(scrollY / scrollMax, 0), 1);
      root.style.setProperty("--authority-scroll", String(progress));
      root.style.setProperty("--authority-scroll-pct", `${progress * 100}%`);

      parallaxImages.forEach((image) => {
        const rect = image.parentElement?.getBoundingClientRect();
        if (!rect || rect.bottom < -150 || rect.top > innerHeight + 150) return;
        const local = (innerHeight / 2 - (rect.top + rect.height / 2)) / innerHeight;
        image.style.setProperty("--parallax-y", `${Math.max(-1, Math.min(1, local)) * 22}px`);
      });
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      magneticCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="authority-motion-signal" aria-hidden="true">
      <span />
      <i />
      <small>THE RISE</small>
    </div>
  );
}

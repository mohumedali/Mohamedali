"use client";

import { useEffect } from "react";

/**
 * Marks `[data-reveal]` elements with `data-inview` the first time they enter the viewport.
 *
 * Only IntersectionObserver is used — no getBoundingClientRect — so sections deferred with
 * `content-visibility: auto` are never forced into layout. Reveal styles switch on (`.reveal-ready`)
 * after the first observer callback has marked what's already on screen, so nothing visible on load
 * blinks out and back in. Without JS, everything simply stays visible.
 */
export function RevealTracker() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    let first = true;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.inview = "";
          observer.unobserve(entry.target);
        }
        if (first) {
          first = false;
          root.classList.add("reveal-ready");
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}

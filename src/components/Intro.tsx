"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/*
 * Opening sequence: the M and the A of the logo glide together, a red slash draws through the gap between them,
 * then the screen splits along that slash — the M leaves with one half, the A with the other — revealing the page.
 *
 * Built for performance (see `.intro` in globals.css):
 * - Server-rendered and CSS-only, so it starts on the first paint without waiting for JavaScript.
 * - Animates transform and opacity only, so it runs on the compositor and stays smooth while the main thread is busy hydrating.
 * - The page underneath is painted in full from the first frame, so it never delays LCP; `pointer-events: none` means it never blocks a click.
 * - Plays once per browser session (the inline script in the locale layout sets `data-intro="skip"` afterwards), never for
 *   deep links or reduced motion, and unmounts itself when done.
 */

// Traced from src/assets/logo-mark.png, in its 512×317 pixel space. Each piece gets its own <svg> so it can move independently.
const markPaths = {
  m: "M1 0H47L55 1L59 2L66 5L76 10L176.6 158.7L279 11L288 5L295 2L298 1H350L353.5 1.3L177.5 260.7L58 83.7V316.5H1Z",
  a: "M370 2.3L166 316.5H229.5L360 115.5L450 316.5H511.5Z",
  bar: "M316.5 208.5H374.5L397.5 261.5H282.5Z",
} as const;

/** Survives client-side navigations (e.g. switching language), so the intro never replays within one visit. */
let played = false;

type IntroWindow = Window & { __introSkip?: number };

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(() => played);

  useLayoutEffect(() => {
    // Client-side navigation after the intro already ran: drop the hero's entrance offset before this page paints.
    // Also re-applies the inline script's decision in development, where Strict Mode resets <html> attributes.
    if (played || (window as IntroWindow).__introSkip) document.documentElement.dataset.intro = "skip";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let alive = true;

    const finish = () => {
      played = true;
      if (alive) setDone(true);
      // Once the hero's delayed entrance has also finished, clear the offset for good (changing it earlier would make those animations jump).
      window.setTimeout(() => {
        document.documentElement.dataset.intro = "skip";
      }, 2600);
    };

    // Hidden by CSS (already seen, deep link, reduced motion) → no animations → finishes at once.
    const animations = el.getAnimations?.({ subtree: true }) ?? [];
    if (animations.length === 0) finish();
    else Promise.all(animations.map((a) => a.finished)).then(finish, finish);

    return () => {
      alive = false;
    };
  }, []);

  if (done) return null;

  return (
    <div ref={ref} aria-hidden dir="ltr" className="intro">
      <div className="intro-panel intro-panel-a">
        <div className="intro-face intro-face-a">
          <Piece d={markPaths.m} className="intro-piece-m" />
          <p className="intro-name">MOHAMED ALI</p>
        </div>
        <span className="intro-edge" />
      </div>
      <div className="intro-panel intro-panel-b">
        <div className="intro-face intro-face-b">
          <Piece d={markPaths.a} className="intro-piece-a" />
          <Piece d={markPaths.bar} className="intro-piece-bar" />
          <p className="intro-name">MOHAMED ALI</p>
        </div>
        <span className="intro-edge" />
      </div>
    </div>
  );
}

/** One piece of the mark, drawn in the shared 512×317 box so the pieces line up exactly when assembled. */
function Piece({ d, className }: { d: string; className: string }) {
  return (
    <span className="intro-mark">
      <svg viewBox="0 0 512 317" className={className}>
        <path fill="currentColor" d={d} />
      </svg>
    </span>
  );
}

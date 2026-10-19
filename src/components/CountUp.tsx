"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Renders the final value on the server (crawlers and no-JS see the real number),
 * then counts up from 0 the first time it scrolls into view.
 */
export function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el || reduceMotion) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, reduceMotion]);

  return <span ref={ref}>{to}</span>;
}

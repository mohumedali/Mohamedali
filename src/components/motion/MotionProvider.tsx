"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * LazyMotion + `m` components ship ~15kb of animation features instead of the full ~34kb bundle.
 * `strict` throws if a full `motion.*` component sneaks in.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

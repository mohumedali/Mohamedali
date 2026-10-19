import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Card with a cursor-following glow (see the `spotlight` utility). Plain server markup:
 * a single page-level <SpotlightTracker> feeds the pointer position, so cards add no hydration cost.
 */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("spotlight", className)}>{children}</div>;
}

import type { CSSProperties, ReactNode } from "react";

/*
 * Scroll-reveal primitives. Plain server markup + CSS transitions (see `[data-reveal]` in globals.css),
 * driven by one page-level <RevealTracker> IntersectionObserver — so dozens of animated cards add
 * zero hydration work. Framer Motion is reserved for the interactive pieces (hero badges, counters, menu).
 */

type Props = { children: ReactNode; className?: string };
/** Lets list semantics survive animation: <Stagger as="ol"> + <StaggerItem as="li">. */
type Tag = "div" | "ol" | "ul" | "li";

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: Props & { delay?: number }) {
  return (
    <div data-reveal="" className={className} style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}

/** Reveals its direct <StaggerItem> children one after another. */
export function Stagger({ children, className, stagger = 0.09, as: Tag = "div" }: Props & { stagger?: number; as?: Tag }) {
  return (
    <Tag data-stagger="" className={className} style={{ "--stagger": `${stagger}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, as: Tag = "div" }: Props & { as?: Tag }) {
  return (
    <Tag data-reveal="" className={className}>
      {children}
    </Tag>
  );
}

"use client";

import { m, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { PointerEvent } from "react";
import { BrandIcon } from "@/components/BrandIcon";
import type { BrandIconName } from "@/lib/brand-icons";
import { cn } from "@/lib/cn";

type Badge = {
  icon: BrandIconName;
  label: string;
  color: string;
  /**
   * Desktop placement around the code card. Physical (left/right) on purpose: the code is LTR in both
   * locales, so badges must stay clear of where lines start, never mirror onto them.
   */
  position: string;
  /** Parallax strength in px. */
  depth: number;
  /** Offsets the float loop so badges don't bob in sync. */
  phase: string;
};

// Floating from `xl` only: at `lg` the card is too narrow, so the side badges would cover the code and clip at the viewport edge.
const badges: Badge[] = [
  { icon: "nextjs", label: "Next.js", color: "#ffffff", position: "xl:-top-5 xl:left-[42%]", depth: 18, phase: "0s" },
  { icon: "supabase", label: "Supabase", color: "#3fcf8e", position: "xl:-top-4 xl:-right-2", depth: 22, phase: "-2.2s" },
  { icon: "dotnet", label: "ASP.NET Core", color: "#a78bfa", position: "xl:top-[27%] xl:-right-14", depth: 26, phase: "-1.6s" },
  { icon: "react", label: "React 19", color: "#61dafb", position: "xl:top-[47%] xl:-right-8", depth: 30, phase: "-3.2s" },
  { icon: "typescript", label: "TypeScript", color: "#4b9be8", position: "xl:-bottom-6 xl:left-2", depth: 16, phase: "-4.4s" },
  { icon: "tailwind", label: "Tailwind CSS", color: "#38bdf8", position: "xl:-bottom-7 xl:right-10", depth: 20, phase: "-1s" },
];

type Token = [kind: keyof typeof tokenColor, text: string];

const tokenColor = {
  k: "text-[#c4a7ff]", // keyword
  f: "text-glow-sky", // function
  p: "text-glow-teal", // property
  s: "text-[#86efac]", // string
  c: "text-mist-500 italic", // comment
  x: "text-mist-200", // punctuation / plain
} as const;

const code: Token[][] = [
  [["k", "const "], ["x", "site = "], ["k", "await "], ["f", "build"], ["x", "({"]],
  [["p", "  stack"], ["x", ": ["], ["s", '"next"'], ["x", ", "], ["s", '"dotnet"'], ["x", ", "], ["s", '"supabase"'], ["x", "],"]],
  [["p", "  locales"], ["x", ": ["], ["s", '"ar"'], ["x", ", "], ["s", '"en"'], ["x", "],"], ["c", " // RTL ⇄ LTR"]],
  [["p", "  rendering"], ["x", ": "], ["s", '"static"'], ["x", ","]],
  [["p", "  seo"], ["x", ": { "], ["p", "schema"], ["x", ": "], ["k", "true"], ["x", ", "], ["p", "hreflang"], ["x", ": "], ["k", "true"], ["x", " },"]],
  [["x", "});"]],
  [],
  [["x", "site."], ["p", "lighthouse"], ["x", ";"], ["c", " // → 100"]],
];

const ease = [0.22, 1, 0.36, 1] as const;

type Props = { stackLabel: string; auditLabel: string; scores: string[] };

export function HeroVisual({ stackLabel, auditLabel, scores }: Props) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.4 });
  const y = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.4 });

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-xl lg:max-w-none xl:px-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,rgb(45_212_191/0.16),transparent)]"
      />

      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.15 }}
        className="glass-solid @container overflow-hidden rounded-3xl"
      >
        <div dir="ltr" className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          <span className="ms-3 font-mono text-xs text-mist-400">deliver.ts</span>
        </div>

        {/* Font scales with the card (container query) so the longest line (40 mono chars ≈ 24em) always fits:
            10px on a 320px phone, capped at 13px on wider cards. */}
        <pre
          dir="ltr"
          className="overflow-x-auto px-4 py-5 font-mono text-[length:clamp(10px,calc((100cqi_-_2rem)/25),13px)] leading-[1.85] sm:px-5"
        >
          <code>
            {code.map((line, i) => (
              <span key={i} className="block min-h-[1.85em]">
                {line.map(([kind, text], j) => (
                  <span key={j} className={tokenColor[kind]}>
                    {text}
                  </span>
                ))}
              </span>
            ))}
          </code>
        </pre>

        <div className="border-t border-white/[0.06] px-4 py-5 sm:px-5">
          <p className="text-xs font-medium text-mist-400">{auditLabel}</p>
          <ul className="mt-4 grid grid-cols-4 gap-1 sm:gap-2">
            {scores.map((label, i) => (
              <li key={label}>
                <Gauge label={label} delay={0.5 + i * 0.12} />
              </li>
            ))}
          </ul>
        </div>
      </m.div>

      <ul aria-label={stackLabel} className="mt-6 flex flex-wrap justify-center gap-2.5 xl:mt-0">
        {badges.map((badge, i) => (
          <FloatingBadge key={badge.label} badge={badge} index={i} x={x} y={y} />
        ))}
      </ul>
    </div>
  );
}

function FloatingBadge({ badge, index, x, y }: { badge: Badge; index: number; x: MotionValue<number>; y: MotionValue<number> }) {
  const tx = useTransform(x, (v) => v * badge.depth);
  const ty = useTransform(y, (v) => v * badge.depth);

  return (
    // Three layers so each transform owns one element: parallax (li) → CSS float loop (span) → hover scale (m.span).
    <m.li
      style={{ x: tx, y: ty }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease, delay: 0.45 + index * 0.08 }}
      className={cn("xl:absolute", badge.position)}
    >
      <span className="block animate-float" style={{ animationDelay: badge.phase }}>
        <m.span
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          dir="ltr"
          // Opaque instead of backdrop-filter: these badges move constantly, and re-blurring the backdrop every frame is costly.
          className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-ink-850/95 px-3.5 py-2 text-xs font-medium whitespace-nowrap text-mist-100 shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_12px_30px_-14px_rgb(0_0_0/0.8)] sm:text-sm"
        >
          <BrandIcon name={badge.icon} className="size-4" style={{ color: badge.color }} />
          {badge.label}
        </m.span>
      </span>
    </m.li>
  );
}

function Gauge({ label, delay }: { label: string; delay: number }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative size-12 sm:size-14">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90" aria-hidden>
          <circle cx="32" cy="32" r="27" fill="rgb(52 211 153 / 0.08)" stroke="rgb(52 211 153 / 0.15)" strokeWidth="5" />
          <circle
            cx="32"
            cy="32"
            r="27"
            fill="none"
            stroke="var(--color-glow-green)"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            className="animate-gauge"
            style={{ animationDelay: `${delay}s` }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-mono text-sm font-semibold text-glow-green">100</span>
      </div>
      {/* Scales with the card so single long words ("Performance", "Accessibility") never touch on 320px phones. */}
      <span className="text-[length:clamp(9.5px,3.3cqi,11px)] leading-tight text-mist-400">{label}</span>
    </div>
  );
}

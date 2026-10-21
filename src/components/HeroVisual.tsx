"use client";

import { m, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import type { PointerEvent } from "react";
import portrait from "@/assets/mohamed-ali.webp";
import { BrandIcon } from "@/components/BrandIcon";
import type { BrandIconName } from "@/lib/brand-icons";
import { cn } from "@/lib/cn";

type Badge = {
  icon: BrandIconName;
  label: string;
  color: string;
  /**
   * Desktop placement around the portrait. Logical (start/end) so the composition mirrors with the page in RTL.
   * Badges sit on the side edges (clear of the face) and above the audit card.
   */
  position: string;
  /** Parallax strength in px. */
  depth: number;
  /** Offsets the float loop so badges don't bob in sync. */
  phase: string;
};

// Floating from `xl` only: at `lg` the column is too narrow, so the side badges would clip at the viewport edge.
const badges: Badge[] = [
  { icon: "supabase", label: "Supabase", color: "#3fcf8e", position: "xl:-top-4 xl:end-8", depth: 22, phase: "-2.2s" },
  { icon: "nextjs", label: "Next.js", color: "#ffffff", position: "xl:top-16 xl:-start-14", depth: 18, phase: "0s" },
  { icon: "dotnet", label: "ASP.NET Core", color: "#a78bfa", position: "xl:top-36 xl:-end-24", depth: 26, phase: "-1.6s" },
  { icon: "react", label: "React 19", color: "#61dafb", position: "xl:top-60 xl:-start-16", depth: 30, phase: "-3.2s" },
  { icon: "typescript", label: "TypeScript", color: "#4b9be8", position: "xl:top-76 xl:-end-20", depth: 16, phase: "-4.4s" },
  { icon: "tailwind", label: "Tailwind CSS", color: "#38bdf8", position: "xl:top-92 xl:-start-24", depth: 20, phase: "-1s" },
];

const ease = [0.22, 1, 0.36, 1] as const;

type Props = { portraitAlt: string; stackLabel: string; auditLabel: string; scores: string[] };

export function HeroVisual({ portraitAlt, stackLabel, auditLabel, scores }: Props) {
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
    <div onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="relative w-full">
      <div className="relative isolate mx-auto w-full max-w-[25rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-16 -z-10 bg-[radial-gradient(closest-side,rgb(254_12_15/0.16),transparent)]"
        />

        {/* `lift` moves without fading: the portrait can be the LCP element, so it must be visible from its first paint. */}
        <div className="relative isolate animate-lift [animation-delay:150ms]">
          <div
            aria-hidden
            className="pointer-events-none absolute -start-8 -top-8 -z-10 size-36 bg-[radial-gradient(rgb(254_12_15/0.5)_1.2px,transparent_1.6px)] bg-[length:14px_14px] [mask-image:radial-gradient(closest-side,#000,transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute start-3 -end-3 top-3 -bottom-3 -z-10 rounded-[2rem] border border-accent/35 sm:start-4 sm:-end-4 sm:top-4 sm:-bottom-4"
          />

          {/* Ring = 3px of padding showing the frame's own accent gradient, with the orbiting beam layered over it. */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-linear-to-br from-accent to-accent-deep p-[3px] shadow-[0_28px_80px_-30px_rgb(254_12_15/0.65)]">
            <div
              aria-hidden
              className="frame-beam pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-orbit"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem_-_3px)] bg-ink-950">
              <Image
                src={portrait}
                alt={portraitAlt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 30rem) 25rem, calc(100vw - 2.5rem)"
                className="object-cover object-[50%_18%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-t from-ink-950/75 via-transparent to-transparent shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]"
              />
            </div>
          </div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          className="glass-blur @container relative z-10 mx-3 -mt-16 rounded-2xl px-4 py-4 sm:mx-6 sm:px-5"
        >
          <p className="text-xs font-medium text-mist-400">{auditLabel}</p>
          <ul className="mt-3 grid grid-cols-4 gap-1 sm:gap-2">
            {scores.map((label, i) => (
              <li key={label}>
                <Gauge label={label} delay={0.5 + i * 0.12} />
              </li>
            ))}
          </ul>
        </m.div>

        <ul aria-label={stackLabel} className="mt-6 flex flex-wrap justify-center gap-2.5 xl:mt-0">
          {badges.map((badge, i) => (
            <FloatingBadge key={badge.label} badge={badge} index={i} x={x} y={y} />
          ))}
        </ul>
      </div>
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
      className={cn("xl:absolute xl:z-20", badge.position)}
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
          <circle cx="32" cy="32" r="27" fill="rgb(254 12 15 / 0.08)" stroke="rgb(254 12 15 / 0.18)" strokeWidth="5" />
          <circle
            cx="32"
            cy="32"
            r="27"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            className="animate-gauge"
            style={{ animationDelay: `${delay}s` }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-mono text-sm font-semibold text-accent">100</span>
      </div>
      {/* Scales with the card so single long words ("Performance", "Accessibility") never touch on 320px phones. */}
      <span className="text-[length:clamp(9.5px,3.3cqi,11px)] leading-tight text-mist-400">{label}</span>
    </div>
  );
}

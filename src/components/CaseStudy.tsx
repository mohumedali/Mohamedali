"use client";

import { ChevronDown, Zap } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Always expanded on desktop; collapsed behind a toggle on phones to keep project cards short.
 * Visibility is CSS-driven (`max-lg:hidden`), so there's no layout shift on hydration.
 */
export function CaseStudy({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const heading = (
    <>
      <Zap aria-hidden className="size-4 shrink-0" />
      {title}
    </>
  );

  return (
    <div className="mt-6 rounded-2xl border border-glow-teal/15 bg-glow-teal/[0.04] p-4">
      <p className="hidden items-center gap-2 text-sm font-semibold text-glow-teal lg:flex">{heading}</p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center gap-2 text-start text-sm font-semibold text-glow-teal lg:hidden"
      >
        {heading}
        <ChevronDown aria-hidden className={cn("ms-auto size-4 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      <div id={id} className={cn("mt-2 text-sm leading-relaxed text-mist-300", !open && "max-lg:hidden")}>
        {children}
      </div>
    </div>
  );
}

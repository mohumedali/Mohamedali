import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      dir="ltr"
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-glow-green to-glow-cyan font-mono text-[13px] font-bold text-ink-950 shadow-[0_8px_24px_-8px_rgb(45_212_191/0.7)]",
        className,
      )}
    >
      MA
    </span>
  );
}

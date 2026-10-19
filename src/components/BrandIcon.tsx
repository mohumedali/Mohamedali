import type { CSSProperties } from "react";
import { brandIcons, type BrandIconName } from "@/lib/brand-icons";

type Props = { name: BrandIconName; className?: string; style?: CSSProperties };

export function BrandIcon({ name, className, style }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className} style={style}>
      <path d={brandIcons[name].path} />
    </svg>
  );
}

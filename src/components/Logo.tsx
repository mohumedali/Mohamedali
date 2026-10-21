import Image from "next/image";
import mark from "@/assets/logo-mark.png";
import { cn } from "@/lib/cn";

// Navbar/footer tile. A `className` replaces it whole (size, radius, shadow): cn() concatenates, it doesn't merge.
const defaultTile = "size-9 rounded-xl shadow-[0_8px_24px_-8px_rgb(254_12_15/0.7)]";

/** The "MA" mark from the brand logo, white on the accent gradient. The mark scales with the tile. */
export function LogoMark({ className = defaultTile }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center bg-[radial-gradient(circle_at_50%_35%,var(--color-accent),var(--color-accent-deep)_70%,#4a0003)]",
        className,
      )}
    >
      <Image src={mark} alt="" sizes="56px" className="h-auto w-[68%]" />
    </span>
  );
}

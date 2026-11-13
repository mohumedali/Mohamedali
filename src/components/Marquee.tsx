import { Sparkle } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

/**
 * A large, endlessly scrolling band of what every build delivers. Two identical copies slide by exactly
 * one copy's width, so the loop is seamless. Decorative (the same promises are spelled out in the sections),
 * so it's hidden from assistive tech; it pauses under the cursor and stands still for reduced motion.
 */
export function Marquee() {
  const t = useTranslations("Marquee");
  const items = t.raw("items") as string[];

  return (
    <div aria-hidden className="marquee-mask mt-16 overflow-hidden py-3 select-none sm:mt-24">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none rtl:animate-marquee-rtl">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <li key={item} className="flex items-center">
                <span
                  className={cn(
                    "px-6 text-4xl leading-tight font-semibold whitespace-nowrap sm:px-10 sm:text-6xl lg:text-7xl ltr:tracking-tight",
                    i % 2 === 0 ? "text-white" : "text-mist-500/70",
                  )}
                >
                  {item}
                </span>
                <Sparkle className="size-6 shrink-0 fill-accent text-accent sm:size-9" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

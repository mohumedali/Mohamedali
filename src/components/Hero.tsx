import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { BrandIcon } from "@/components/BrandIcon";
import { HeroVisual } from "@/components/HeroVisual";
import { site, whatsappLink } from "@/lib/site";

const scoreKeys = ["performance", "accessibility", "bestPractices", "seo"] as const;

export function Hero() {
  const t = useTranslations("Hero");
  const wa = useTranslations("WhatsApp");

  return (
    // overflow-x-clip: the visual's glow and badges bleed past the edges by design, but must never cause sideways scroll on phones.
    <section id="top" className="relative overflow-x-clip pt-32 pb-16 sm:pt-40 lg:pb-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10" />

      {/* grid-cols-1 = minmax(0,1fr): otherwise a child's min-content width could set a track wider than small phones. */}
      <div className="shell grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.07] px-3.5 py-1.5 text-xs font-medium text-accent sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-success" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            {t("available")}
          </p>

          {/* Fluid below ~384px: the nowrap highlight ("high-performance,") must still fit a 320px phone. */}
          <h1 className="mt-6 animate-lift text-[length:clamp(2rem,10vw,2.4rem)] leading-[1.1] font-semibold text-balance text-white sm:text-5xl lg:text-[3.5rem] ltr:tracking-tight rtl:leading-[1.35]">
            {t.rich("title", {
              hl: (chunks) => <span className="text-gradient whitespace-nowrap">{chunks}</span>,
              nb: (chunks) => <span className="whitespace-nowrap">{chunks}</span>,
            })}
          </h1>

          <p className="mt-6 max-w-xl animate-lift text-base leading-relaxed text-mist-300 [animation-delay:120ms] sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:220ms]">
            <a href="#contact" className="btn btn-primary">
              {t("ctaPrimary")}
              <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" />
            </a>
            <a href="#projects" className="btn btn-ghost">
              {t("ctaSecondary")}
            </a>
          </div>

          <a
            href={whatsappLink(wa("message"))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex animate-rise items-center gap-3 text-sm text-mist-300 transition-colors [animation-delay:300ms] hover:text-white sm:gap-2"
          >
            {/* Phones: icon chip beside a label-over-number stack. From `sm` it collapses back to a single inline line. */}
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#25d366]/10 ring-1 ring-[#25d366]/25 sm:size-auto sm:bg-transparent sm:ring-0">
              <BrandIcon name="whatsapp" className="size-4 text-[#25d366]" />
            </span>
            <span className="flex flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-2">
              {t("whatsapp")}
              <span dir="ltr" className="font-mono whitespace-nowrap text-mist-400">
                {site.whatsapp.display}
              </span>
            </span>
          </a>
        </div>

        <HeroVisual
          portraitAlt={t("portraitAlt")}
          stackLabel={t("stackLabel")}
          auditLabel={t("auditLabel")}
          scores={scoreKeys.map((key) => t(`scores.${key}`))}
        />
      </div>
    </section>
  );
}

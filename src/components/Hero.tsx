import { ArrowUpRight, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { BrandIcon } from "@/components/BrandIcon";
import { HeroVisual } from "@/components/HeroVisual";
import { site, whatsappLink } from "@/lib/site";

const scoreKeys = ["performance", "accessibility", "bestPractices", "seo"] as const;

const profiles = [
  { href: site.github, label: "GitHub", icon: "github" },
  { href: site.linkedin, label: "LinkedIn", icon: "linkedin" },
] as const;

export function Hero() {
  const t = useTranslations("Hero");
  const wa = useTranslations("WhatsApp");

  return (
    // overflow-x-clip: the visual's glow and badges bleed past the edges by design, but must never cause sideways scroll on phones.
    <section id="top" className="relative overflow-x-clip pt-32 pb-16 sm:pt-40 lg:pb-24">
      {/* Two slow-drifting glows behind everything. Radial fades end inside each box, so no hard edges show. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 start-[-10%] size-[36rem] animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(254_12_15/0.16),transparent)]" />
        <div className="absolute top-24 end-[-14%] size-[42rem] animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(171_0_5/0.2),transparent)] [animation-delay:-11s] [animation-duration:26s]" />
      </div>

      {/* Light beams that run along the grid lines (multiples of the 56px tile); the grid's mask fades them at the edges. */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 motion-reduce:[&>*]:hidden">
        <span className="absolute top-[168px] left-0 h-px w-48 animate-beam-x bg-linear-to-r from-transparent via-accent to-transparent" />
        <span className="absolute top-[392px] left-0 h-px w-40 animate-beam-x bg-linear-to-r from-transparent via-[#ff8a8c] to-transparent [animation-delay:-4.5s] [animation-duration:11s]" />
        <span className="absolute top-0 left-[280px] h-48 w-px animate-beam-y bg-linear-to-b from-transparent via-accent to-transparent [animation-delay:-2s]" />
        <span className="absolute top-0 left-[1064px] h-40 w-px animate-beam-y bg-linear-to-b from-transparent via-[#ff8a8c] to-transparent [animation-delay:-7s] [animation-duration:13s]" />
      </div>

      {/* grid-cols-1 = minmax(0,1fr): otherwise a child's min-content width could set a track wider than small phones. */}
      <div className="shell grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          {/* intro-delay-*: entrance delays counted from the end of the opening intro (zero when it doesn't play).
              Never on the headline, subtitle or portrait: Chrome doesn't count an element as painted while its animation
              is still in its delay, so delaying them would push FCP/LCP back by the intro's length (measured: ~0.8s).
              They animate under the curtain from the first paint, and the split itself is their reveal. */}
          <p className="intro-delay-0 inline-flex animate-rise items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.07] px-3.5 py-1.5 text-xs font-medium text-accent sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-success" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            {t("available")}
          </p>

          {/* Fluid below ~384px: the nowrap highlight ("high-performance,") must still fit a 320px phone. */}
          <h1 className="mt-6 animate-lift text-[length:clamp(2rem,10vw,2.4rem)] leading-[1.1] font-semibold text-balance text-white sm:text-5xl lg:text-[3.5rem] ltr:tracking-tight rtl:leading-[1.35]">
            {t.rich("title", {
              hl: (chunks) => <span className="text-shine whitespace-nowrap">{chunks}</span>,
              nb: (chunks) => <span className="whitespace-nowrap">{chunks}</span>,
            })}
          </h1>

          <p className="mt-6 max-w-xl animate-lift text-base leading-relaxed text-mist-300 [animation-delay:120ms] sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="intro-delay-220 mt-9 flex animate-rise flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-primary">
              {t("ctaPrimary")}
              <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" />
            </a>
            <a href="#projects" className="btn btn-ghost">
              {t("ctaSecondary")}
            </a>
            <a href={site.cv} download className="btn btn-ghost">
              <Download aria-hidden className="size-4" />
              {t("ctaCv")}
            </a>
          </div>

          <div className="intro-delay-300 mt-6 flex animate-rise flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={whatsappLink(wa("message"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-mist-300 transition-colors hover:text-white sm:gap-2"
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

            <ul aria-label={t("profiles")} className="flex items-center gap-2">
              {profiles.map(({ href, label, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={label}
                    title={label}
                    className="grid size-10 place-items-center rounded-xl border border-white/10 text-mist-300 transition-colors hover:border-accent/40 hover:text-white"
                  >
                    <BrandIcon name={icon} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
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

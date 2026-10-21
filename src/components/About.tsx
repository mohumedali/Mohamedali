import { Check, MapPin, Stethoscope } from "lucide-react";
import { useTranslations } from "next-intl";
import { BrandIcon } from "@/components/BrandIcon";
import { CountUp } from "@/components/CountUp";
import { LogoMark } from "@/components/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { site, whatsappLink } from "@/lib/site";

export function About() {
  const t = useTranslations("About");
  const nav = useTranslations("Nav");
  const wa = useTranslations("WhatsApp");

  return (
    <section id="about" className="shell defer-render py-20 sm:py-28">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        {/* Profile card. To use a photo, swap the logo mark for <Image src={photo} … /> from src/assets. */}
        <Reveal className="glass h-fit rounded-3xl p-6 sm:p-8 lg:sticky lg:top-28">
          <div className="flex items-center gap-5">
            <LogoMark className="size-20 rounded-3xl shadow-[0_16px_40px_-12px_rgb(254_12_15/0.7)]" />
            <div>
              <p className="text-xl font-semibold text-white">{nav("name")}</p>
              <p className="text-sm text-mist-400">{nav("role")}</p>
            </div>
          </div>

          <ul className="mt-6 space-y-2.5 text-sm text-mist-300">
            <li className="flex items-center gap-2.5">
              <MapPin aria-hidden className="size-4 text-accent" />
              {t("location")}
            </li>
            <li className="flex items-center gap-2.5">
              <span className="relative ms-1 me-0.5 flex size-2">
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-success" />
                <span className="relative size-2 rounded-full bg-success" />
              </span>
              {t("available")}
            </li>
          </ul>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/[0.07] bg-ink-850/60 p-4">
              <dt className="sr-only">{t("websites")}</dt>
              <dd className="text-gradient text-3xl font-semibold" dir="ltr">
                +<CountUp to={site.websitesDelivered} />
              </dd>
              <dd className="mt-1 text-xs text-mist-400">{t("websites")}</dd>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-ink-850/60 p-4">
              <dt className="sr-only">{t("languages")}</dt>
              <dd className="text-gradient text-3xl font-semibold" dir="ltr">
                AR/EN
              </dd>
              <dd className="mt-1 text-xs text-mist-400">{t("languages")}</dd>
            </div>
          </dl>

          <a href={whatsappLink(wa("message"))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-6 w-full">
            <BrandIcon name="whatsapp" className="size-4" />
            {wa("label")}
          </a>
        </Reveal>

        <div>
          <Reveal>
            <p className="inline-flex items-center gap-3 text-sm font-medium text-accent">
              <span aria-hidden className="h-px w-8 bg-linear-to-r from-accent to-accent-deep rtl:bg-linear-to-l" />
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl leading-tight font-semibold text-balance text-white sm:text-4xl ltr:tracking-tight rtl:leading-snug">
              {t("title")}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-mist-300 sm:text-lg">
              {(t.raw("bio") as string[]).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <h3 className="text-sm font-medium text-mist-400">{t("principlesTitle")}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {(t.raw("principles") as string[]).map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-white/[0.07] bg-ink-850/50 p-4 text-sm text-mist-200">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-6 rounded-3xl border border-accent/20 bg-accent/[0.05] p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-accent to-accent-deep text-white">
                <Stethoscope aria-hidden className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">{t("niche.title")}</h3>
                <p className="mt-1 text-sm leading-relaxed text-mist-300">{t("niche.description")}</p>
              </div>
            </div>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {(t.raw("niche.points") as string[]).map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-mist-200">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

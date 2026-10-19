import { ArrowUpRight, Check, Database, Languages, Layers, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";

const services = [
  { id: "fullstack", icon: Layers },
  { id: "cms", icon: Database },
  { id: "seo", icon: Rocket },
  { id: "i18n", icon: Languages },
] as const;

export function Services() {
  const t = useTranslations("Services");

  return (
    <section id="services" className="shell defer-render py-20 sm:py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <Stagger className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map(({ id, icon: Icon }, i) => (
          <StaggerItem key={id} className="h-full">
            <Spotlight className="glass flex h-full flex-col rounded-3xl p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-glow-green to-glow-cyan text-ink-950 shadow-[0_10px_30px_-10px_rgb(45_212_191/0.6)]">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span aria-hidden className="font-mono text-sm text-mist-500">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{t(`items.${id}.title`)}</h3>
              <p className="mt-3 mb-6 text-sm leading-relaxed text-mist-300">{t(`items.${id}.description`)}</p>
              <ul className="mt-auto space-y-2.5 border-t border-white/[0.06] pt-5">
                {(t.raw(`items.${id}.points`) as string[]).map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm text-mist-200">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-glow-green" />
                    {point}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="glass mt-6 flex flex-col items-start gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <p className="text-mist-200">{t("ctaNote")}</p>
        <a href="#contact" className="btn btn-primary shrink-0">
          {t("cta")}
          <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" />
        </a>
      </Reveal>
    </section>
  );
}

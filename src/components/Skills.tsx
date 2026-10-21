import { ArrowLeftRight, Boxes, Braces, Database, Gauge, Globe, MonitorSmartphone, Server } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";

const groups = [
  { id: "frontend", icon: MonitorSmartphone },
  { id: "backend", icon: Server },
  { id: "performance", icon: Gauge },
  { id: "architecture", icon: Boxes },
] as const;

const flow = [
  { id: "client", icon: Globe },
  { id: "api", icon: Braces },
  { id: "data", icon: Database },
] as const;

export function Skills() {
  const t = useTranslations("Skills");

  return (
    <section id="skills" className="shell defer-render py-20 sm:py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
        {groups.map(({ id, icon: Icon }) => (
          <StaggerItem key={id} className="h-full">
            <Spotlight className="glass h-full rounded-3xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-accent/20 to-accent-deep/5 text-accent ring-1 ring-accent/25">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{t(`groups.${id}.title`)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-mist-400">{t(`groups.${id}.description`)}</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {(t.raw(`groups.${id}.items`) as string[]).map((item) => (
                  <li
                    key={item}
                    dir="auto"
                    className="rounded-lg border border-white/[0.08] bg-ink-850/60 px-3 py-1.5 text-sm text-mist-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Architecture breakdown: how the layers of a typical client build connect */}
      <Reveal className="glass mt-5 rounded-3xl p-6 sm:p-8">
        <h3 className="text-sm font-medium text-mist-400">{t("flow.title")}</h3>
        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          {flow.map(({ id, icon: Icon }, i) => (
            <Fragment key={id}>
              {i > 0 && (
                <div aria-hidden className="flex items-center justify-center text-accent/70">
                  <ArrowLeftRight className="size-5 rotate-90 md:rotate-0" />
                </div>
              )}
              <div className="rounded-2xl border border-white/[0.07] bg-ink-850/50 p-5">
                <div className="flex items-center gap-3">
                  <Icon aria-hidden className="size-5 text-accent" />
                  <p className="font-semibold text-white">{t(`flow.${id}.title`)}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-mist-400">{t(`flow.${id}.detail`)}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

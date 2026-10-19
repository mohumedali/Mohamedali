import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function MetricsBar() {
  const t = useTranslations("Metrics");

  const items: Array<{ key: string; value: ReactNode; label: string; detail: string }> = [
    {
      key: "projects",
      value: (
        <span dir="ltr">
          +<CountUp to={site.websitesDelivered} />
        </span>
      ),
      label: t("projects.label"),
      detail: t("projects.detail"),
    },
    {
      key: "performance",
      value: (
        <>
          <CountUp to={100} />
          <span className="text-mist-500">/100</span>
        </>
      ),
      label: t("performance.label"),
      detail: t("performance.detail"),
    },
    { key: "rendering", value: t("rendering.value"), label: t("rendering.label"), detail: t("rendering.detail") },
    { key: "i18n", value: t("i18n.value"), label: t("i18n.label"), detail: t("i18n.detail") },
  ];

  return (
    <section aria-label={t("label")} className="shell">
      <Reveal className="glass grid grid-cols-2 overflow-hidden rounded-3xl lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.key}
            className={cn(
              "border-white/[0.07] p-5 sm:p-8",
              // 2×2 grid on mobile, single row on desktop
              i % 2 === 0 && "border-e",
              i < 2 && "border-b lg:border-b-0",
              i === 1 && "lg:border-e",
              i === 3 && "lg:border-e-0",
            )}
          >
            <p className="text-gradient text-2xl font-semibold sm:text-3xl lg:text-4xl">{item.value}</p>
            <p className="mt-3 text-sm font-medium text-white sm:text-base">{item.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-mist-400 sm:text-sm">{item.detail}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

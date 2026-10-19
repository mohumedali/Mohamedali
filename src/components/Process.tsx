import { Code, LifeBuoy, PencilRuler, PhoneCall, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const steps = [
  { id: "call", icon: PhoneCall },
  { id: "plan", icon: PencilRuler },
  { id: "build", icon: Code },
  { id: "launch", icon: Rocket },
  { id: "support", icon: LifeBuoy },
] as const;

export function Process() {
  const t = useTranslations("Process");

  return (
    <section id="process" className="shell defer-render py-20 sm:py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <div className="relative mt-14">
        {/* Connector line behind the step badges (desktop row) */}
        <div
          aria-hidden
          className="absolute inset-x-[10%] top-7 hidden h-px bg-linear-to-r from-glow-green/0 via-glow-teal/40 to-glow-cyan/0 lg:block"
        />
        <Stagger as="ol" className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ id, icon: Icon }, i) => (
            <StaggerItem
              key={id}
              as="li"
              // The odd fifth step spans the full row in the 2-column tablet grid instead of sitting alone.
              className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-ink-850/60 p-5 sm:max-lg:last:col-span-2 lg:border-0 lg:bg-transparent lg:p-0 lg:text-center"
            >
              <div className="flex items-center gap-3 lg:flex-col lg:gap-4">
                <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-ink-900 text-glow-teal shadow-[0_0_30px_-8px_rgb(45_212_191/0.5)] ring-1 ring-glow-teal/30">
                  <Icon aria-hidden className="size-5" />
                  <span className="absolute -end-2 -top-2 grid size-6 place-items-center rounded-full bg-linear-to-br from-glow-green to-glow-cyan font-mono text-[11px] font-bold text-ink-950">
                    {i + 1}
                  </span>
                </span>
                <h3 className="font-semibold text-white">{t(`steps.${id}.title`)}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mist-400">{t(`steps.${id}.description`)}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

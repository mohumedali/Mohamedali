import { ArrowUpRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { hostname, projects } from "@/lib/projects";

// Drafted quotes — confirm the wording with each client before deploying (see messages/*.json → Testimonials).
export function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section id="testimonials" className="shell defer-render py-20 sm:py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
        {projects.map(({ id, url }) => {
          const name = t(`items.${id}.name`);
          // First letter of the name without the honorific ("Dr." / "د.").
          const initial = name.replace(/^(Dr\.|د\.)\s*/, "").charAt(0);

          return (
            <StaggerItem key={id} className="h-full">
              <Spotlight className="glass flex h-full flex-col rounded-3xl p-6 sm:p-8">
                <Quote aria-hidden className="size-8 text-glow-teal/60 rtl:-scale-x-100" />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-mist-100 sm:text-lg">
                  <p>{t(`items.${id}.quote`)}</p>
                </blockquote>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-white/[0.06] pt-6">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-glow-green/25 to-glow-cyan/10 text-lg font-semibold text-glow-teal ring-1 ring-glow-teal/30"
                    >
                      {initial}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{name}</p>
                      <p className="text-sm text-mist-400">{t(`items.${id}.role`)}</p>
                    </div>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={hostname(url)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs text-mist-300 transition-colors hover:border-glow-teal/40 hover:text-glow-teal"
                  >
                    {t("viewProject")}
                    <ArrowUpRight aria-hidden className="size-3.5 rtl:-scale-x-100" />
                  </a>
                </div>
              </Spotlight>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export const faqIds = ["edit", "own", "time", "cost", "google", "after"] as const;

export function Faq() {
  const t = useTranslations("Faq");

  return (
    <section id="faq" className="shell defer-render py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        {/* Native <details>: accessible, keyboard-friendly and works without JavaScript. */}
        <Reveal className="space-y-3">
          {faqIds.map((id, i) => (
            <details
              key={id}
              open={i === 0}
              className="group glass rounded-2xl p-5 transition-colors open:border-accent/25 sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
                {t(`items.${id}.q`)}
                <Plus aria-hidden className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 leading-relaxed text-mist-300">{t(`items.${id}.a`)}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

import { useTranslations } from "next-intl";
import { BrandIcon } from "@/components/BrandIcon";
import { whatsappLink } from "@/lib/site";

/** Floating WhatsApp shortcut — bottom-right in LTR, bottom-left in RTL (logical `end`). */
export function WhatsAppButton() {
  const t = useTranslations("WhatsApp");

  return (
    <a
      href={whatsappLink(t("message"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      className="group fixed end-4 bottom-4 z-40 flex animate-rise items-center gap-3 [animation-delay:1.2s] sm:end-6 sm:bottom-6"
    >
      <span className="glass-solid pointer-events-none hidden rounded-full px-3.5 py-2 text-sm font-medium text-mist-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
        {t("label")}
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.65)] transition-transform duration-300 group-hover:scale-105">
        <span aria-hidden className="absolute inset-0 animate-ring rounded-full bg-[#25d366]" />
        <BrandIcon name="whatsapp" className="relative size-7" />
      </span>
    </a>
  );
}

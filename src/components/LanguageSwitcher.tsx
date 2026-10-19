"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels = { ar: "عربي", en: "EN" } as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Nav");

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1 text-xs font-semibold"
    >
      {routing.locales.map((l) =>
        l === locale ? (
          <span key={l} lang={l} aria-current="true" className="rounded-full bg-white/10 px-3 py-1.5 text-white">
            {labels[l]}
          </span>
        ) : (
          <Link
            key={l}
            href="/"
            locale={l}
            lang={l}
            hrefLang={l}
            className="rounded-full px-3 py-1.5 text-mist-400 transition-colors hover:text-white"
          >
            {labels[l]}
          </Link>
        ),
      )}
    </div>
  );
}

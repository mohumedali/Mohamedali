import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Arabic first: it's the default and the x-default target.
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const localeDir = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

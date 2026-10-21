import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Readex_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { localeDir, routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
// Only used in small code/label text, so it isn't worth a preload on the critical path.
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });
const readex = Readex_Pro({ subsets: ["arabic"], variable: "--font-readex", display: "swap" });

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Meta" });
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}`]));

  return {
    metadataBase: new URL(site.url),
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    applicationName: t("name"),
    authors: [{ name: t("name"), url: site.url }],
    creator: t("name"),
    alternates: {
      canonical: `/${locale}`,
      // `/` negotiates the visitor's language, which is exactly what x-default is for.
      languages: { ...languages, "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      firstName: "Mohamed",
      lastName: "Ali",
      url: `/${locale}`,
      siteName: t("name"),
      title: t("title"),
      description: t("description"),
      locale: locale === "ar" ? "ar_AR" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_AR"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    formatDetection: { telephone: false, email: false, address: false },
    category: "technology",
    // Google Search Console ownership (HTML-tag method); omitted until the env var is set.
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for everything below this layout.
  setRequestLocale(locale);

  // Client components only need these namespaces — keep the rest out of the browser payload.
  const { Nav, Contact } = await getMessages();

  return (
    <html
      lang={locale}
      dir={localeDir(locale)}
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${readex.variable}`}
    >
      <body className="min-h-dvh bg-ink-900 font-sans text-mist-100 antialiased">
        <div aria-hidden className="bg-aurora pointer-events-none fixed inset-0 -z-10" />
        <NextIntlClientProvider messages={{ Nav, Contact }}>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
        {/* Visitor analytics + real-user Core Web Vitals; both are no-ops outside Vercel deployments. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

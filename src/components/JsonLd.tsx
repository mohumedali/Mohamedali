import { getTranslations } from "next-intl/server";
import { faqIds } from "@/components/Faq";
import type { Locale } from "@/i18n/routing";
import { site } from "@/lib/site";

/** ProfilePage + Person + WebSite + FAQPage graph — the structured data for a personal/portfolio page. */
export async function JsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Meta" });
  const faq = await getTranslations({ locale, namespace: "Faq" });
  const pageUrl = `${site.url}/${locale}`;
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: t("title"),
        description: t("description"),
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Mohamed Ali",
        alternateName: "محمد علي",
        jobTitle: t("role"),
        description: t("description"),
        url: pageUrl,
        email: `mailto:${site.email}`,
        telephone: `+${site.whatsapp.number}`,
        address: { "@type": "PostalAddress", addressCountry: "EG" },
        sameAs: [site.linkedin, site.github],
        knowsLanguage: ["ar", "en"],
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "ASP.NET Core",
          "C#",
          "Entity Framework Core",
          "SQL Server",
          "Supabase",
          "Technical SEO",
          "Core Web Vitals",
          "Internationalization",
          "Clean Architecture",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: t("name"),
        inLanguage: ["ar", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: locale,
        mainEntity: faqIds.map((id) => ({
          "@type": "Question",
          name: faq(`items.${id}.q`),
          acceptedAnswer: { "@type": "Answer", text: faq(`items.${id}.a`) },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape `<` so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

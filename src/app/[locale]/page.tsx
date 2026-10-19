import { getTranslations, setRequestLocale } from "next-intl/server";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { MetricsBar } from "@/components/MetricsBar";
import { RevealTracker } from "@/components/motion/RevealTracker";
import { SpotlightTracker } from "@/components/motion/SpotlightTracker";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  // The layout has already rejected unknown locales.
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("Nav");

  return (
    <>
      <JsonLd locale={locale} />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t("skip")}
      </a>
      <Navbar />
      {/* Order follows the client's questions: proof (work, clients) → offer → who → how → details → contact. */}
      <main id="main">
        <Hero />
        <MetricsBar />
        <Projects />
        <Testimonials />
        <Services />
        <About />
        <Process />
        <Skills />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <SpotlightTracker />
      <RevealTracker />
    </>
  );
}

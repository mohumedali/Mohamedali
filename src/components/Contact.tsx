import { useTranslations } from "next-intl";
import { BrandIcon } from "@/components/BrandIcon";
import { ContactForm, CopyEmailButton } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { site, whatsappLink } from "@/lib/site";

export function Contact() {
  const t = useTranslations("Contact");
  const wa = useTranslations("WhatsApp");

  return (
    <section id="contact" className="shell defer-render py-20 sm:py-28">
      <Reveal className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -end-24 -top-48 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(254_12_15/0.16),transparent)]"
        />

        <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-3 text-sm font-medium text-accent">
              <span aria-hidden className="h-px w-8 bg-linear-to-r from-accent to-accent-deep rtl:bg-linear-to-l" />
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl leading-tight font-semibold text-balance text-white sm:text-4xl ltr:tracking-tight rtl:leading-snug">
              {t("title")}
            </h2>
            <p className="mt-4 leading-relaxed text-mist-300 sm:text-lg">{t("subtitle")}</p>

            <div className="mt-10 space-y-8">
              <div>
                <p className="text-sm text-mist-400">{t("whatsappLabel")}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <a href={whatsappLink(wa("message"))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                    <BrandIcon name="whatsapp" className="size-5" />
                    {t("whatsappCta")}
                  </a>
                  <a
                    href={`tel:+${site.whatsapp.number}`}
                    dir="ltr"
                    className="font-mono text-sm text-mist-300 transition-colors hover:text-white"
                  >
                    {site.whatsapp.display}
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm text-mist-400">{t("emailLabel")}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${site.email}`}
                    dir="ltr"
                    className="text-lg font-semibold break-all text-white transition-colors hover:text-accent sm:text-xl"
                  >
                    {site.email}
                  </a>
                  <CopyEmailButton email={site.email} />
                </div>
              </div>

              <div>
                <p className="text-sm text-mist-400">{t("elsewhere")}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer me" className="btn btn-ghost px-4!">
                    <BrandIcon name="linkedin" className="size-4 text-[#4ba3ea]" />
                    LinkedIn
                  </a>
                  <a href={site.github} target="_blank" rel="noopener noreferrer me" className="btn btn-ghost px-4!">
                    <BrandIcon name="github" className="size-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}

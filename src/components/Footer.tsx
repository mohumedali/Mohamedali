import { ArrowUp, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { BrandIcon } from "@/components/BrandIcon";
import { LogoMark, LogoWordmark } from "@/components/Logo";
import { site, whatsappLink } from "@/lib/site";

const sections = ["projects", "testimonials", "services", "about", "skills", "process", "faq", "contact"] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  const socials = [
    { href: whatsappLink(), label: `WhatsApp ${site.whatsapp.display}`, icon: <BrandIcon name="whatsapp" className="size-4" /> },
    { href: `mailto:${site.email}`, label: site.email, icon: <Mail className="size-4" /> },
    { href: site.linkedin, label: "LinkedIn", icon: <BrandIcon name="linkedin" className="size-4" /> },
    { href: site.github, label: "GitHub", icon: <BrandIcon name="github" className="size-4" /> },
  ];

  return (
    <footer className="mt-8">
      <div className="shell">
        <div className="flex flex-col gap-10 border-t border-white/[0.06] py-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark />
              <LogoWordmark className="h-7" alt={nav("name")} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-mist-400">{t("tagline")}</p>
          </div>

          <nav aria-label={nav("primary")}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
              {sections.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-mist-300 transition-colors hover:text-white">
                    {nav(id)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-2">
            {socials.map(({ href, label, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer me" })}
                  className="grid size-10 place-items-center rounded-xl border border-white/10 text-mist-300 transition-colors hover:border-accent/40 hover:text-white"
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.06] py-6 text-xs text-mist-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year: String(new Date().getFullYear()) })}</p>
          <p>{t("built")}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            {t("top")}
            <ArrowUp aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

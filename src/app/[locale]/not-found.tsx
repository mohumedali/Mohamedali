import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <div>
        <p className="font-mono text-sm text-glow-teal">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-mist-300">{t("body")}</p>
        <Link href="/" className="btn btn-primary mt-8">
          {t("home")}
        </Link>
      </div>
    </main>
  );
}

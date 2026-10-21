"use client";

import { Check, ChevronDown, CircleCheck, Copy, LoaderCircle, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { BrandIcon } from "@/components/BrandIcon";
import { site, whatsappLink } from "@/lib/site";

const serviceOptions = ["fullstack", "cms", "seo", "i18n", "other"] as const;
type Service = (typeof serviceOptions)[number];
type Inquiry = { name: string; email: string; service: Service; message: string };
type Channel = "endpoint" | "whatsapp" | "email";
type Status = "idle" | "sending" | "sent" | "whatsapp" | "mailto" | "fallback";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-ink-850/70 px-4 py-3 text-mist-50 placeholder:text-mist-500 transition-colors outline-none focus:border-accent/60 focus:ring-4 focus:ring-accent/10 user-invalid:border-red-400/60";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<Status>("idle");

  function summary({ name, email, service, message }: Inquiry) {
    return `${message}\n\n—\n${t("mail.from")}: ${name} <${email}>\n${t("mail.service")}: ${t(`form.options.${service}`)}`;
  }

  const whatsappUrl = (inquiry: Inquiry) => whatsappLink(`${t("mail.intro")}\n\n${summary(inquiry)}`);

  function openMailto(inquiry: Inquiry) {
    const subject = encodeURIComponent(t("mail.subject", { name: inquiry.name }));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(summary(inquiry))}`;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = (submitter?.value ?? (site.contactEndpoint ? "endpoint" : "whatsapp")) as Channel;

    // Honeypot: real visitors never see or fill this field.
    if (data.get("company")) return setStatus("sent");

    const service = String(data.get("service"));
    const inquiry: Inquiry = {
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      service: (serviceOptions as readonly string[]).includes(service) ? (service as Service) : "other",
      message: String(data.get("message")).trim(),
    };

    if (channel === "whatsapp") {
      window.open(whatsappUrl(inquiry), "_blank", "noopener,noreferrer");
      return setStatus("whatsapp");
    }
    if (channel === "email" || !site.contactEndpoint) {
      openMailto(inquiry);
      return setStatus("mailto");
    }

    setStatus("sending");
    try {
      const res = await fetch(site.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(inquiry),
      });
      if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      // Same tab: a popup opened after an await would be blocked.
      window.location.href = whatsappUrl(inquiry);
      setStatus("fallback");
    }
  }

  const feedback =
    status === "sent" || status === "whatsapp" || status === "mailto" || status === "fallback" ? t(`form.${status}`) : "";

  return (
    <form onSubmit={onSubmit} className="glass-solid rounded-3xl p-5 sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t("form.name")}>
          <input id="name" name="name" required autoComplete="name" placeholder={t("form.namePlaceholder")} className={fieldClass} />
        </Field>
        <Field id="email" label={t("form.email")}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            dir="ltr"
            placeholder={t("form.emailPlaceholder")}
            className={`${fieldClass} rtl:text-right`}
          />
        </Field>
      </div>

      <Field id="service" label={t("form.service")} className="mt-5">
        <div className="relative">
          <select id="service" name="service" defaultValue="fullstack" className={`${fieldClass} appearance-none pe-11`}>
            {serviceOptions.map((option) => (
              <option key={option} value={option} className="bg-ink-850">
                {t(`form.options.${option}`)}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-mist-400" />
        </div>
      </Field>

      <Field id="message" label={t("form.message")} className="mt-5">
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder={t("form.messagePlaceholder")}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      <div aria-hidden className="hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        {site.contactEndpoint ? (
          <button type="submit" value="endpoint" disabled={status === "sending"} className="btn btn-primary">
            {status === "sending" ? (
              <>
                <LoaderCircle aria-hidden className="size-4 animate-spin" />
                {t("form.sending")}
              </>
            ) : (
              <>
                {t("form.submit")}
                <Send aria-hidden className="size-4 rtl:-scale-x-100" />
              </>
            )}
          </button>
        ) : (
          <button type="submit" value="whatsapp" className="btn btn-whatsapp">
            <BrandIcon name="whatsapp" className="size-4" />
            {t("form.submitWhatsapp")}
          </button>
        )}
        <button type="submit" value={site.contactEndpoint ? "whatsapp" : "email"} className="btn btn-ghost">
          {site.contactEndpoint ? (
            <>
              <BrandIcon name="whatsapp" className="size-4 text-[#25d366]" />
              {t("form.submitWhatsapp")}
            </>
          ) : (
            <>
              <Mail aria-hidden className="size-4" />
              {t("form.submitEmail")}
            </>
          )}
        </button>
      </div>

      <p role="status" aria-live="polite" className="mt-4 flex min-h-5 items-start gap-2 text-sm text-success">
        {feedback && <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0" />}
        {feedback}
      </p>
      <p className="mt-3 text-xs text-mist-500">{t("form.note")}</p>
    </form>
  );
}

function Field({ id, label, className, children }: { id: string; label: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-mist-200">
        {label}
      </label>
      {children}
    </div>
  );
}

export function CopyEmailButton({ email }: { email: string }) {
  const t = useTranslations("Contact");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked (permissions / insecure context) — the mailto link next to it still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-mist-300 transition-colors hover:border-accent/40 hover:text-white"
    >
      {copied ? <Check aria-hidden className="size-3.5 text-success" /> : <Copy aria-hidden className="size-3.5" />}
      <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
    </button>
  );
}

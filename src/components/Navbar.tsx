"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/cn";

const sections = ["projects", "services", "about", "process", "contact"] as const;

export function Navbar() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label={t("primary")}
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-[background-color,border-color,box-shadow] duration-300 sm:px-4",
          scrolled || open ? "glass-blur" : "border-transparent",
        )}
      >
        {/* The name stays in the accessible name on phones (sr-only) and becomes visible from `sm`. */}
        <a href="#top" className="flex items-center gap-3 rounded-xl">
          <LogoMark />
          <span className="sr-only leading-tight sm:not-sr-only">
            <span className="block text-sm font-semibold text-white">{t("name")}</span>
            <span className="block text-xs text-mist-400">{t("role")}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="rounded-full px-3.5 py-2 text-sm text-mist-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {t(id)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a href="#contact" className="btn btn-primary hidden px-4! py-2! text-sm! sm:inline-flex">
            {t("hire")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="grid size-10 place-items-center rounded-xl border border-white/10 text-mist-100 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="glass-blur mx-auto mt-2 max-w-6xl rounded-2xl p-3 lg:hidden"
          >
            <ul className="grid gap-1">
              {sections.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base text-mist-100 hover:bg-white/5"
                  >
                    {t(id)}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-2 w-full">
              {t("hire")}
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { Award, BriefcaseBusiness, Check, Download, GraduationCap, UsersRound, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CSSProperties, ReactNode } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { site } from "@/lib/site";

// Newest first, mirroring the CV. Copy lives in messages under Experience.roles.<id>; stacks are tech names, so they stay here.
const roles = [
  { id: "transition", current: true, stack: ["Next.js", "React", "TypeScript", "SSR / SSG"] },
  { id: "depi", current: false, stack: ["ASP.NET Core", "C#", "EF Core", "SQL Server", "JWT"] },
  { id: "nti", current: false, stack: ["MongoDB", "Express.js", "Angular", "Node.js"] },
  { id: "pathline", current: false, stack: ["HTML5", "CSS3", "JavaScript"] },
] as const;

type Entry = { name: string; detail: string };

export function Experience() {
  const t = useTranslations("Experience");

  return (
    <section id="experience" className="shell defer-render py-20 sm:py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
        <div>
          <Reveal>
            <h3 className="flex items-center gap-2.5 text-sm font-medium text-mist-400">
              <BriefcaseBusiness aria-hidden className="size-4 text-accent" />
              {t("work")}
            </h3>
          </Reveal>

          {/* Timeline: a rail down the start edge with one node per role; the current role's node pulses. */}
          <Stagger
            as="ol"
            className="relative mt-5 space-y-5 before:absolute before:inset-y-6 before:start-[7px] before:w-px before:bg-linear-to-b before:from-accent/60 before:via-white/10 before:to-white/[0.04]"
          >
            {roles.map(({ id, current, stack }) => (
              <StaggerItem as="li" key={id} className="relative ps-8">
                <span
                  aria-hidden
                  className="absolute start-0 top-7 grid size-[15px] place-items-center rounded-full border border-accent/50 bg-ink-950"
                >
                  {current ? (
                    <span className="relative flex size-1.5">
                      <span className="absolute inset-0 animate-ping-soft rounded-full bg-success" />
                      <span className="relative size-1.5 rounded-full bg-success" />
                    </span>
                  ) : (
                    <span className="size-1.5 rounded-full bg-accent/70" />
                  )}
                </span>

                <Spotlight className="glass rounded-3xl p-6 sm:p-7">
                  <article>
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                      <div className="min-w-0">
                        <h4 className="text-lg font-semibold text-white">{t(`roles.${id}.title`)}</h4>
                        <p className="mt-1 text-sm font-medium text-accent">{t(`roles.${id}.company`)}</p>
                      </div>
                      <div className="flex flex-col items-start gap-1.5 sm:items-end">
                        {current ? (
                          <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success ring-1 ring-success/30">
                            {t("current")}
                          </span>
                        ) : (
                          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-mist-300">
                            {t("internship")}
                          </span>
                        )}
                        <p className="text-xs text-mist-400 ltr:font-mono">{t(`roles.${id}.period`)}</p>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2">
                      {(t.raw(`roles.${id}.points`) as string[]).map((point) => (
                        <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-mist-200">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {stack.map((item, i) => (
                        <li
                          key={item}
                          dir="ltr"
                          style={{ "--i": i } as CSSProperties}
                          className="reveal-chip rounded-lg border border-white/[0.08] bg-ink-850/60 px-2.5 py-1 font-mono text-xs text-mist-300"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Spotlight>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Credentials: education, training and communities, then the CV itself. */}
        <div className="space-y-5 lg:pt-10">
          <CredentialCard icon={GraduationCap} title={t("education.title")}>
            <p className="font-semibold text-white">{t("education.degree")}</p>
            <p className="mt-1 text-sm font-medium text-accent">{t("education.school")}</p>
            <p className="mt-1 text-xs text-mist-400 ltr:font-mono">{t("education.period")}</p>
          </CredentialCard>

          <CredentialCard icon={Award} title={t("certifications.title")}>
            <EntryList entries={t.raw("certifications.items") as Entry[]} />
          </CredentialCard>

          <CredentialCard icon={UsersRound} title={t("community.title")}>
            <EntryList entries={t.raw("community.items") as Entry[]} />
          </CredentialCard>

          <Reveal className="rounded-3xl border border-accent/20 bg-accent/[0.05] p-6 sm:p-7">
            <p className="text-sm leading-relaxed text-mist-200">{t("cvNote")}</p>
            <a href={site.cv} download className="btn btn-primary mt-4 w-full">
              <Download aria-hidden className="size-4" />
              {t("cv")}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CredentialCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <Spotlight className="glass group rounded-3xl p-6 sm:p-7">
        <h3 className="flex items-center gap-3 text-sm font-medium text-mist-400">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-accent/20 to-accent-deep/5 text-accent ring-1 ring-accent/25 transition-[rotate,scale] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:rotate-6">
            <Icon aria-hidden className="size-4" />
          </span>
          {title}
        </h3>
        <div className="mt-5">{children}</div>
      </Spotlight>
    </Reveal>
  );
}

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="space-y-3.5">
      {entries.map(({ name, detail }) => (
        <li key={name} className="flex gap-3">
          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70" />
          <div>
            <p className="text-sm font-medium text-mist-100">{name}</p>
            <p className="mt-0.5 text-xs text-mist-400">{detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

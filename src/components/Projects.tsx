import { ArrowUpRight, Check, Lock } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { CaseStudy } from "@/components/CaseStudy";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { hostname, projects, type Project } from "@/lib/projects";

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="shell defer-render pt-24 pb-20 sm:pt-28 sm:pb-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      {/* grid-cols-1 = minmax(0,1fr): without it the nowrap window bar widens the implicit track past small phones. */}
      <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6" stagger={0.12}>
        {projects.map((project) => (
          // With an odd number of sites, the last card sits centred on its own row instead of hugging one side.
          <StaggerItem
            key={project.id}
            className="h-full md:last:odd:col-span-2 md:last:odd:w-[calc(50%-0.625rem)] md:last:odd:justify-self-center lg:last:odd:w-[calc(50%-0.75rem)]"
          >
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

/** The browser chrome above a card's screenshot. Its dots pick up their traffic-light colours while the card is hovered. */
function WindowBar({ label }: { label: string }) {
  return (
    <div dir="ltr" className="flex items-center gap-1.5 border-b border-white/[0.06] bg-ink-850 px-3 py-2">
      <span className="size-2 shrink-0 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-[#ff5f57]" />
      <span className="size-2 shrink-0 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-[#febc2e] group-hover:delay-75" />
      <span className="size-2 shrink-0 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-[#28c840] group-hover:delay-150" />
      <span className="ms-2 min-w-0 truncate rounded-md bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-mist-400 transition-colors duration-300 group-hover:text-mist-200">
        {label}
      </span>
    </div>
  );
}

/** Shared lower half of every card: category, name, summary, highlights, case study, tags and the action row. */
function CardBody({
  id,
  tags,
  children,
}: {
  id: Project["id"];
  tags: readonly string[];
  children: ReactNode;
}) {
  const t = useTranslations("Projects");
  const highlights = t.raw(`items.${id}.highlights`) as string[];

  return (
    <div className="flex flex-1 flex-col px-5 pt-4 pb-6 sm:px-7 sm:pb-7">
      <p className="text-xs text-accent ltr:font-mono ltr:tracking-wide ltr:uppercase">{t(`items.${id}.category`)}</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">{t(`items.${id}.name`)}</h3>
      <p className="mt-3 leading-relaxed text-mist-300">{t(`items.${id}.summary`)}</p>

      <ul className="mt-5 space-y-2">
        {highlights.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-mist-200">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
            {item}
          </li>
        ))}
      </ul>

      <CaseStudy title={t("caseStudy")}>{t(`items.${id}.caseStudy`)}</CaseStudy>

      <ul aria-label={t("tagsLabel")} className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            dir="auto"
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-mist-300"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">{children}</div>
    </div>
  );
}

/** The code belongs to the client, so there's no repo to link. */
function PrivateBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-mist-400">
      <Lock aria-hidden className="size-3.5 shrink-0" />
      {children}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const name = t(`items.${project.id}.name`);
  const tags = [...project.tags.map((tag) => t(`tags.${tag}`)), t(`items.${project.id}.tag`)];

  return (
    <Spotlight className="glass group h-full rounded-3xl">
      <article className="flex h-full flex-col">
        {/* Browser-framed screenshot */}
        <div className="m-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-950">
          <WindowBar label={hostname(project.url)} />
          <div className="reveal-media relative aspect-[16/10] overflow-hidden">
            <div className="reveal-media-zoom absolute inset-0">
              <Image
                src={project.image}
                alt={t("screenshotAlt", { name })}
                fill
                sizes="(min-width: 1216px) 576px, (min-width: 768px) 46vw, calc(100vw - 3rem)"
                placeholder="blur"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/60 via-transparent to-transparent" />
            <span className="absolute start-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-ink-950/80 px-2.5 py-1 text-xs font-medium text-success ring-1 ring-success/30">
              <span aria-hidden className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-success" />
                <span className="relative size-1.5 rounded-full bg-success" />
              </span>
              {t("liveBadge")}
            </span>
          </div>
        </div>

        <CardBody id={project.id} tags={tags}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("liveLabel", { name })}
            className="btn btn-ghost w-full sm:w-auto"
          >
            {t("live")}
            <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" />
          </a>
          <PrivateBadge>{t("privateClient")}</PrivateBadge>
        </CardBody>
      </article>
    </Spotlight>
  );
}

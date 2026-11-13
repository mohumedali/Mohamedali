import { ArrowUpRight, Check, Lock } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CSSProperties, ReactNode } from "react";
import { BrandIcon } from "@/components/BrandIcon";
import { CaseStudy } from "@/components/CaseStudy";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { cn } from "@/lib/cn";
import {
  engineeringProjects,
  hostname,
  projects,
  type EngineeringProject,
  type EngineeringProjectId,
  type Project,
  type ProjectId,
} from "@/lib/projects";

type FlowStep = { title: string; detail: string };

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="shell defer-render pt-24 pb-20 sm:pt-28 sm:pb-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      {/* Launched client sites first, then the engineering case studies behind the backend, payment and ML skills. */}
      <GroupHeading
        index="01"
        title={t("groups.client.title")}
        description={t("groups.client.description")}
        className="mt-14"
      />
      {/* grid-cols-1 = minmax(0,1fr): without it the nowrap window bar widens the implicit track past small phones. */}
      <Stagger className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6" stagger={0.12}>
        {projects.map((project) => (
          <StaggerItem key={project.id} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>

      <GroupHeading
        index="02"
        title={t("groups.engineering.title")}
        description={t("groups.engineering.description")}
        className="mt-20"
      />
      <Stagger className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6" stagger={0.12}>
        {engineeringProjects.map((project) => (
          <StaggerItem key={project.id} className="h-full">
            <EngineeringCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function GroupHeading({
  index,
  title,
  description,
  className,
}: {
  index: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-2 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8",
        className,
      )}
    >
      <h3 className="flex items-baseline gap-3 text-xl font-semibold text-white">
        <span aria-hidden className="font-mono text-sm text-accent">
          {index}
        </span>
        {title}
      </h3>
      <p className="text-sm text-mist-400 sm:max-w-sm sm:text-end">{description}</p>
    </Reveal>
  );
}

/** The browser/editor chrome above a card's visual. Its dots pick up their traffic-light colours while the card is hovered. */
function WindowBar({ label, icon }: { label: string; icon?: ReactNode }) {
  return (
    <div dir="ltr" className="flex items-center gap-1.5 border-b border-white/[0.06] bg-ink-850 px-3 py-2">
      <span className="size-2 shrink-0 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-[#ff5f57]" />
      <span className="size-2 shrink-0 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-[#febc2e] group-hover:delay-75" />
      <span className="size-2 shrink-0 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-[#28c840] group-hover:delay-150" />
      <span className="ms-2 flex min-w-0 items-center gap-1.5 rounded-md bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-mist-400 transition-colors duration-300 group-hover:text-mist-200">
        {icon}
        <span className="truncate">{label}</span>
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
  id: ProjectId | EngineeringProjectId;
  tags: readonly string[];
  children: ReactNode;
}) {
  const t = useTranslations("Projects");
  const highlights = t.raw(`items.${id}.highlights`) as string[];

  return (
    <div className="flex flex-1 flex-col px-5 pt-4 pb-6 sm:px-7 sm:pb-7">
      <p className="text-xs text-accent ltr:font-mono ltr:tracking-wide ltr:uppercase">{t(`items.${id}.category`)}</p>
      <h4 className="mt-2 text-2xl font-semibold text-white">{t(`items.${id}.name`)}</h4>
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

/** For work whose code can't be linked: client-owned repos, or personal ones not published yet. */
function PrivateBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-mist-400">
      <Lock aria-hidden className="size-3.5 shrink-0" />
      {children}
    </span>
  );
}

function EngineeringCard({ project }: { project: EngineeringProject }) {
  const t = useTranslations("Projects");
  const name = t(`items.${project.id}.name`);
  const flow = t.raw(`items.${project.id}.flow`) as FlowStep[];

  return (
    <Spotlight className="glass group h-full rounded-3xl">
      <article className="flex h-full flex-col">
        <div className="m-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-950">
          <WindowBar
            label={project.label}
            icon={
              project.repo ? (
                <BrandIcon name="github" className="size-3 shrink-0" />
              ) : (
                <Lock aria-hidden className="size-3 shrink-0" />
              )
            }
          />

          {/* The architecture in four steps, in place of a screenshot. Steps chip in one after another as the card reveals. */}
          <div className="relative px-4 pt-4 pb-5 sm:px-5">
            <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
            <p className="relative text-[11px] font-medium text-mist-400 ltr:font-mono ltr:tracking-wider ltr:uppercase">
              {t(`items.${project.id}.flowTitle`)}
            </p>
            <ol className="relative mt-3 space-y-2.5">
              {flow.map((step, i) => (
                <li
                  key={step.title}
                  style={{ "--i": i } as CSSProperties}
                  className="reveal-chip relative flex items-start gap-3 rounded-xl border border-white/[0.07] bg-ink-850/80 px-3.5 py-2.5 transition-colors duration-300 group-hover:border-white/[0.11] after:absolute after:start-[21px] after:top-full after:h-2.5 after:w-px after:bg-accent/40 last:after:hidden"
                >
                  <span aria-hidden className="pt-px font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-sm text-white">{step.title}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-mist-400">{step.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <CardBody id={project.id} tags={project.stack}>
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("sourceLabel", { name })}
              className="btn btn-ghost w-full sm:w-auto"
            >
              <BrandIcon name="github" className="size-4" />
              {t("source")}
              <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" />
            </a>
          ) : (
            <PrivateBadge>{t("privateRequest")}</PrivateBadge>
          )}
        </CardBody>
      </article>
    </Spotlight>
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

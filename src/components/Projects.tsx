import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CaseStudy } from "@/components/CaseStudy";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { hostname, projects, sharedTags, type Project } from "@/lib/projects";

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="shell defer-render pt-24 pb-20 sm:pt-28 sm:pb-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      {/* grid-cols-1 = minmax(0,1fr): without it the nowrap hostname bar widens the implicit track past small phones. */}
      <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6" stagger={0.12}>
        {projects.map((project) => (
          <StaggerItem key={project.id} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const name = t(`items.${project.id}.name`);
  const highlights = t.raw(`items.${project.id}.highlights`) as string[];
  const tags = [...sharedTags.map((tag) => t(`tags.${tag}`)), t(`items.${project.id}.tag`)];

  return (
    <Spotlight className="glass group h-full rounded-3xl">
      <article className="flex h-full flex-col">
        {/* Browser-framed screenshot */}
        <div className="m-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-950">
          <div dir="ltr" className="flex items-center gap-1.5 border-b border-white/[0.06] bg-ink-850 px-3 py-2">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="ms-2 truncate rounded-md bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-mist-400">
              {hostname(project.url)}
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.image}
              alt={t("screenshotAlt", { name })}
              fill
              sizes="(min-width: 1216px) 576px, (min-width: 768px) 46vw, calc(100vw - 3rem)"
              placeholder="blur"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/60 via-transparent to-transparent" />
            <span className="absolute start-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-ink-950/80 px-2.5 py-1 text-xs font-medium text-glow-green ring-1 ring-glow-green/30">
              <span aria-hidden className="size-1.5 rounded-full bg-glow-green" />
              {t("liveBadge")}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pt-4 pb-6 sm:px-7 sm:pb-7">
          <p className="text-xs text-glow-teal ltr:font-mono ltr:tracking-wide ltr:uppercase">
            {t(`items.${project.id}.category`)}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{name}</h3>
          <p className="mt-3 leading-relaxed text-mist-300">{t(`items.${project.id}.summary`)}</p>

          <ul className="mt-5 space-y-2">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-mist-200">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-glow-green" />
                {item}
              </li>
            ))}
          </ul>

          <CaseStudy title={t("caseStudy")}>{t(`items.${project.id}.caseStudy`)}</CaseStudy>

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

          <div className="mt-auto pt-7">
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
          </div>
        </div>
      </article>
    </Spotlight>
  );
}

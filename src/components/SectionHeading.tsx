import { Reveal } from "@/components/motion/Reveal";

type Props = { eyebrow: string; title: string; subtitle?: string };

/** Eyebrow, title and subtitle cascade in one after another; the eyebrow rule draws itself in. */
export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <Reveal variant="group" className="max-w-2xl">
      <p className="inline-flex items-center gap-3 text-sm font-medium text-accent">
        <span aria-hidden className="reveal-line-x h-px w-8 bg-linear-to-r from-accent to-accent-deep rtl:bg-linear-to-l" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl leading-tight font-semibold text-balance text-white sm:text-4xl lg:text-[2.6rem] ltr:tracking-tight rtl:leading-snug">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-mist-300 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

import { Reveal } from "@/components/motion/Reveal";

type Props = { eyebrow: string; title: string; subtitle?: string };

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <Reveal className="max-w-2xl">
      <p className="inline-flex items-center gap-3 text-sm font-medium text-accent">
        <span aria-hidden className="h-px w-8 bg-linear-to-r from-accent to-accent-deep rtl:bg-linear-to-l" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl leading-tight font-semibold text-balance text-white sm:text-4xl lg:text-[2.6rem] ltr:tracking-tight rtl:leading-snug">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-mist-300 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

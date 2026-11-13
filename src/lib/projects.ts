import type { StaticImageData } from "next/image";
import samehKasem from "@/assets/projects/dr-sameh-kasem.webp";
import mohamedSamy from "@/assets/projects/dr-mohamed-samy.webp";
import indigo from "@/assets/projects/indigo-interiors.webp";
import topPower from "@/assets/projects/top-power.webp";

// Copy (name, summary, highlights, case study) lives in messages/*.json under Projects.items.<id>.
export type ProjectId = "samehKasem" | "mohamedSamy" | "indigo" | "topPower";

/** Keys of Projects.tags in messages. */
export type TagId = "appRouter" | "supabase" | "seo" | "rtl";

export type Project = {
  id: ProjectId;
  url: string;
  image: StaticImageData;
  /** Shared tech tags shown on the card; the per-project tag from messages is appended after these. */
  tags: readonly TagId[];
};

const fullStack = ["appRouter", "supabase", "seo", "rtl"] as const;

export const projects: Project[] = [
  { id: "samehKasem", url: "https://dr-sameh-kasem.vercel.app/ar/", image: samehKasem, tags: fullStack },
  { id: "mohamedSamy", url: "https://www.dr-mohamedsamy.com/", image: mohamedSamy, tags: fullStack },
  // English-only site, so no RTL tag.
  { id: "indigo", url: "https://indigoegy.com/", image: indigo, tags: ["appRouter", "seo"] },
  { id: "topPower", url: "https://toppower-mep.com/", image: topPower, tags: fullStack },
];

export const hostname = (url: string) => new URL(url).hostname;

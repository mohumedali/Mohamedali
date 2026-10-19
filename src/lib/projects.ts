import type { StaticImageData } from "next/image";
import samehKasem from "@/assets/projects/dr-sameh-kasem.webp";
import mohamedSamy from "@/assets/projects/dr-mohamed-samy.webp";
import mahmoudHassaan from "@/assets/projects/dr-mahmoud-hassaan.webp";
import topPower from "@/assets/projects/top-power.webp";

// Copy (name, summary, highlights, case study) lives in messages/*.json under Projects.items.<id>.
export type ProjectId = "samehKasem" | "mohamedSamy" | "mahmoudHassaan" | "topPower";

export type Project = {
  id: ProjectId;
  url: string;
  image: StaticImageData;
};

export const projects: Project[] = [
  { id: "samehKasem", url: "https://dr-sameh-kasem.vercel.app/ar/", image: samehKasem },
  { id: "mohamedSamy", url: "https://www.dr-mohamedsamy.com/", image: mohamedSamy },
  { id: "mahmoudHassaan", url: "https://dr-mahmoud-hassaan-gilt.vercel.app/", image: mahmoudHassaan },
  { id: "topPower", url: "https://toppower-mep.com/", image: topPower },
];

// Every featured build shares these; the per-project tag comes from messages.
export const sharedTags = ["appRouter", "supabase", "seo", "rtl"] as const;

export const hostname = (url: string) => new URL(url).hostname;

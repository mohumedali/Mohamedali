import type { StaticImageData } from "next/image";
import samehKasem from "@/assets/projects/dr-sameh-kasem.webp";
import mohamedSamy from "@/assets/projects/dr-mohamed-samy.webp";
import indigo from "@/assets/projects/indigo-interiors.webp";
import topPower from "@/assets/projects/top-power.webp";

// Copy (name, summary, highlights, case study) lives in messages/*.json under Projects.items.<id>.

/** Live client sites. */
export type ProjectId = "samehKasem" | "mohamedSamy" | "indigo" | "topPower";
/** Engineering case studies: no live site, so the card shows the architecture instead of a screenshot. */
export type EngineeringProjectId = "ecommerceApi" | "paymob" | "lms" | "churn";

/** Keys of Projects.tags in messages. */
export type TagId = "appRouter" | "supabase" | "seo" | "rtl";

export type Project = {
  id: ProjectId;
  url: string;
  image: StaticImageData;
  /** Shared tech tags shown on the card; the per-project tag from messages is appended after these. */
  tags: readonly TagId[];
};

export type EngineeringProject = {
  id: EngineeringProjectId;
  /** Shown in the card's window bar: the repo path, or the project folder's name when the repo is private. */
  label: string;
  /** Public GitHub repository. Without one, the card shows a "private repo" badge instead of a source-code link. */
  repo?: string;
  /** Tech tags. They're names, so they aren't translated. */
  stack: readonly string[];
};

const fullStack = ["appRouter", "supabase", "seo", "rtl"] as const;

export const projects: Project[] = [
  { id: "samehKasem", url: "https://dr-sameh-kasem.vercel.app/ar/", image: samehKasem, tags: fullStack },
  { id: "mohamedSamy", url: "https://www.dr-mohamedsamy.com/", image: mohamedSamy, tags: fullStack },
  // English-only site, so no RTL tag.
  { id: "indigo", url: "https://indigoegy.com/", image: indigo, tags: ["appRouter", "supabase", "seo"] },
  { id: "topPower", url: "https://toppower-mep.com/", image: topPower, tags: fullStack },
];

// Shown below the client sites, as proof of backend, payment and ML depth.
// Push a private project to GitHub and set its `repo` to swap the badge for a "Source code" button.
export const engineeringProjects: EngineeringProject[] = [
  {
    id: "ecommerceApi",
    label: "mohumedali/E-Commerce-API",
    repo: "https://github.com/mohumedali/E-Commerce-API",
    stack: ["ASP.NET Core Web API", "C#", "EF Core", "SQL Server", "JWT", "Swagger"],
  },
  {
    id: "paymob",
    label: "paymob",
    stack: ["Next.js Route Handlers", "TypeScript", "Paymob API", "Webhooks", "HMAC-SHA512"],
  },
  {
    id: "lms",
    label: "mohumedali/LMS-DEPI",
    repo: "https://github.com/mohumedali/LMS-DEPI",
    stack: ["ASP.NET Core MVC", "C#", "ASP.NET Identity", "EF Core", "SQL Server", "Bootstrap 5"],
  },
  {
    id: "churn",
    label: "churn-model",
    stack: ["Python", "scikit-learn", "XGBoost", "CatBoost", "Optuna", "pandas"],
  },
];

export const hostname = (url: string) => new URL(url).hostname;

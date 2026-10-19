import { notFound } from "next/navigation";

// Unknown paths under a valid locale render the localized [locale]/not-found.tsx inside the locale layout.
export default function CatchAll() {
  notFound();
}

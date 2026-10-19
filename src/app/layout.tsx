import type { ReactNode } from "react";

// <html> and <body> live in app/[locale]/layout.tsx so `lang` and `dir` follow the locale.
// This pass-through root exists so app/not-found.tsx can catch requests outside any locale.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

// Latin-only on purpose: the OG renderer has no Arabic shaping, so the card stays English for both locales.
export const alt = "Mohamed Ali — Senior Full-Stack Engineer (.NET & Next.js)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Render at build time for every locale instead of on each request.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const chips = ["Next.js", "ASP.NET Core", "Supabase", "Lighthouse 95–100"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0e1418",
          backgroundImage:
            "radial-gradient(circle at 90% 0%, rgba(34,211,238,0.24), transparent 45%), radial-gradient(circle at 0% 100%, rgba(52,211,153,0.2), transparent 45%)",
          color: "#e3eeec",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: "linear-gradient(135deg, #34d399, #22d3ee)",
              color: "#090e11",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            MA
          </div>
          <div style={{ fontSize: 28, color: "#a8bbbd" }}>Senior Full-Stack Engineer · .NET & Next.js</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: "#ffffff", letterSpacing: -2 }}>Mohamed Ali</div>
          <div style={{ fontSize: 40, marginTop: 12, color: "#c7d6d6", maxWidth: 940, lineHeight: 1.25 }}>
            High-performance, SEO-driven full-stack web apps — Arabic first.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                backgroundColor: "rgba(255,255,255,0.04)",
                fontSize: 24,
                color: "#5eead4",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

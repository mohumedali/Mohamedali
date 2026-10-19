import "./globals.css";

// Fallback 404 for requests that never matched a locale (e.g. /fr). Localized 404s use [locale]/not-found.tsx.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="grid min-h-dvh place-items-center bg-ink-900 p-6 text-center font-sans text-mist-100">
        <main>
          <p className="font-mono text-sm text-glow-teal">404</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Page not found · الصفحة غير موجودة</h1>
          <a href="/" className="btn btn-primary mt-8">
            Home · الرئيسية
          </a>
        </main>
      </body>
    </html>
  );
}

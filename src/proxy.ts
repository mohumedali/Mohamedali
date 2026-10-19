import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirects `/` to `/ar` or `/en` (Accept-Language + cookie) and keeps the locale prefix on every route.
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, Vercel internals and anything with a file extension (sitemap.xml, robots.txt, images).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Retired legacy public routes
  if (pathname.startsWith("/blog")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/projects")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect legacy admin sub-routes to single unified admin
  if (
    pathname.startsWith("/admin/projects") ||
    pathname.startsWith("/admin/blog") ||
    pathname.startsWith("/admin/profile") ||
    pathname.startsWith("/admin/skills") ||
    pathname.startsWith("/admin/settings") ||
    pathname.startsWith("/admin/inbox") ||
    pathname.startsWith("/admin/health") ||
    pathname.startsWith("/admin/media") ||
    pathname.startsWith("/admin/operations")
  ) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

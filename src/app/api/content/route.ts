import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getSiteData, saveSiteData, SiteData } from "@/lib/content";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "admin123";

/**
 * Validates whether the caller has administrator privileges.
 */
async function isAuthenticated(req: NextRequest): Promise<boolean> {
  // 1. Check Bearer token in Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "").trim();
    if (token === ADMIN_PASSCODE) return true;
  }

  // 2. Check session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");
  if (sessionCookie?.value === "authenticated") {
    return true;
  }

  // 3. In local dev mode without strict requirements, allow convenience
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  return false;
}

/**
 * GET /api/content
 * Retrieves the current site content data.
 */
export async function GET() {
  try {
    const data = await getSiteData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/content
 * Updates site content data.
 * In local dev: Writes directly to src/data/site-content.json via fs/promises.
 * In production: Commits to GitHub repo main branch via REST API with GITHUB_TOKEN.
 */
export async function POST(req: NextRequest) {
  const authed = await isAuthenticated(req);
  if (!authed) {
    return NextResponse.json(
      { error: "Unauthorized. Provide valid admin credentials or session." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const data: SiteData = body.data || body;

    // Validate payload shape
    if (!data.profile || !data.profile.name) {
      return NextResponse.json(
        { error: "Invalid payload: profile object is required" },
        { status: 400 }
      );
    }

    const result = await saveSiteData(data);

    // Revalidate paths across the application
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/blog");
    revalidatePath("/contact");

    return NextResponse.json({
      success: true,
      persistedVia: result.method,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to persist site content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

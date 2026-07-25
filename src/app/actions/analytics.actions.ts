"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function logVisit(path: string) {
  try {
    const settings = await prisma.siteSettings.findFirst();
    if (!settings?.enableAnalytics) return;

    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "unknown";
    const forwardedFor = headersList.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    await prisma.visitorLog.create({
      data: {
        path,
        userAgent,
        ipAddress,
      },
    });
  } catch (e) {
    // Fail silently for analytics
  }
}

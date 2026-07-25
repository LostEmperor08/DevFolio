import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";

type AuditAction =
  "CREATE" | "UPDATE" | "DELETE" | "PUBLISH" | "UNPUBLISH" | "LOGIN" | "LOGOUT" | "PASSWORD_CHANGE";

export class AuditService {
  static async log(action: AuditAction, entity: string, entityId?: string) {
    try {
      const session = await auth();
      const user = session?.user?.email || "System";

      const headersList = await headers();
      const ipAddress =
        headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown";

      await prisma.auditLog.create({
        data: {
          user,
          action,
          entity,
          entityId,
          ipAddress,
        },
      });
    } catch (error) {
      console.error("Failed to write audit log:", error);
    }
  }
}

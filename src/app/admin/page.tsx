import { redirect } from "next/navigation";
import { checkIsAdmin } from "@/app/actions/admin.actions";
import { getSiteData } from "@/lib/content";
import { AdminDashboardClient } from "./AdminDashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Samarth Patil",
  description: "Manage portfolio content and writings",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    redirect("/admin/login");
  }

  const siteData = await getSiteData();

  return <AdminDashboardClient initialData={siteData} />;
}

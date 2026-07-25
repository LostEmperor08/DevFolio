"use client";

import { useState } from "react";
import {
  clearGlobalCache,
  getDatabaseBackup,
  toggleMaintenanceMode,
} from "@/app/actions/operations.actions";
import { AdminButton } from "../ui/AdminButton";
import { Database, RefreshCw, AlertTriangle, Download } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function OperationsClient({ initialMaintenanceMode }: { initialMaintenanceMode: boolean }) {
  const [isClearing, setIsClearing] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(initialMaintenanceMode);
  const [isToggling, setIsToggling] = useState(false);
  const router = useRouter();

  const handleClearCache = async () => {
    setIsClearing(true);
    try {
      await clearGlobalCache();
      toast.success("Global cache cleared successfully");
    } catch (e) {
      toast.error("Failed to clear cache");
    } finally {
      setIsClearing(false);
    }
  };

  const handleBackup = async () => {
    setIsBackingUp(true);
    try {
      const res = await getDatabaseBackup();
      if (res.success && res.backup) {
        // Trigger download
        const dataStr =
          "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res.backup, null, 2));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute(
          "download",
          `portfolio_backup_${new Date().toISOString().split("T")[0]}.json`
        );
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        toast.success("Backup downloaded successfully");
      } else {
        toast.error("Failed to generate backup");
      }
    } catch (e) {
      toast.error("Backup error");
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleToggleMaintenance = async () => {
    setIsToggling(true);
    try {
      const newState = !isMaintenance;
      await toggleMaintenanceMode(newState);
      setIsMaintenance(newState);
      toast.success(`Maintenance mode ${newState ? "enabled" : "disabled"}`);
      router.refresh();
    } catch (e) {
      toast.error("Failed to toggle maintenance mode");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Cache Card */}
      <div className="glass-panel flex flex-col space-y-4 rounded-3xl border border-white/5 p-6">
        <div className="bg-accent-blue/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
          <RefreshCw className="text-accent-blue h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-white">Cache Management</h3>
        <p className="text-muted-foreground flex-1 text-sm">
          Manually bust the Next.js App Router cache for the entire site. Useful if public pages
          aren't reflecting recent CMS changes.
        </p>
        <AdminButton
          onClick={handleClearCache}
          isLoading={isClearing}
          className="w-full justify-center"
        >
          Clear Global Cache
        </AdminButton>
      </div>

      {/* Backup Card */}
      <div className="glass-panel flex flex-col space-y-4 rounded-3xl border border-white/5 p-6">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
          <Database className="h-5 w-5 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-white">Database Backup</h3>
        <p className="text-muted-foreground flex-1 text-sm">
          Export all projects, blogs, skills, and settings into a single JSON file. Does not include
          raw media files stored in Vercel Blob.
        </p>
        <AdminButton
          onClick={handleBackup}
          isLoading={isBackingUp}
          className="w-full justify-center border border-emerald-500/20 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
        >
          <Download className="mr-2 h-4 w-4" /> Download JSON Dump
        </AdminButton>
      </div>

      {/* Maintenance Card */}
      <div
        className={`flex flex-col space-y-4 rounded-3xl border p-6 transition-colors ${isMaintenance ? "border-amber-500/20 bg-amber-500/10" : "glass-panel border-white/5"}`}
      >
        <div
          className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${isMaintenance ? "bg-amber-500/20" : "bg-white/5"}`}
        >
          <AlertTriangle
            className={`h-5 w-5 ${isMaintenance ? "text-amber-500" : "text-muted-foreground"}`}
          />
        </div>
        <h3 className={`text-lg font-bold ${isMaintenance ? "text-amber-500" : "text-white"}`}>
          Maintenance Mode
        </h3>
        <p className="text-muted-foreground flex-1 text-sm">
          Lock down the public site. Visitors will see a "Down for Maintenance" page. Admin
          dashboard remains accessible.
        </p>
        <AdminButton
          onClick={handleToggleMaintenance}
          isLoading={isToggling}
          variant={isMaintenance ? "primary" : "ghost"}
          className={`w-full justify-center ${isMaintenance ? "bg-amber-500 text-black hover:bg-amber-600" : "bg-white/5 hover:bg-white/10"}`}
        >
          {isMaintenance ? "Disable Maintenance Mode" : "Enable Maintenance Mode"}
        </AdminButton>
      </div>
    </div>
  );
}

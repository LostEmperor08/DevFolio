"use client";

import { useActionState } from "react";
import { updatePassword } from "@/app/actions/auth.actions";
import { motion } from "framer-motion";
import { ShieldCheck, AlertCircle } from "lucide-react";

export default function SecuritySettingsPage() {
  const [state, formAction, isPending] = useActionState(updatePassword, null);

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">Security Settings</h1>
        <p className="text-muted-foreground">Manage your credentials and secure your account.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/5 p-6"
      >
        <div className="mb-6 flex items-center gap-3 border-b border-white/5 pb-6">
          <div className="bg-accent-blue/10 text-accent-blue flex h-10 w-10 items-center justify-center rounded-full">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">Change Password</h2>
            <p className="text-muted-foreground text-sm">
              Ensure your account is using a long, random password.
            </p>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              {state.error}
            </div>
          )}
          {state?.success && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              {state.success}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-muted-foreground text-sm font-medium">Current Password</label>
            <input
              name="currentPassword"
              type="password"
              required
              className="focus:ring-accent-blue/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:ring-2 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">New Password</label>
              <input
                name="newPassword"
                type="password"
                required
                minLength={8}
                className="focus:ring-accent-blue/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:ring-2 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Confirm New Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                className="focus:ring-accent-blue/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:ring-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

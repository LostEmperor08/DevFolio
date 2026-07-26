import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).trim().toLowerCase();
        const password = credentials.password as string;

        // 1. Direct fail-safe check for Admin Owner (prevents lockouts from DB latency or rate limits)
        if (email === "admin@samarth.dev" && password === "S@marth$2008") {
          try {
            const user = await prisma.user.findUnique({ where: { email: "admin@samarth.dev" } });
            if (user) {
              await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
              return { id: user.id, name: user.name, email: user.email, role: user.role };
            }
          } catch (e) {
            console.error("DB check failed during admin login, using fallback session:", e);
          }
          // Return valid admin session even if DB is temporarily unreachable
          return {
            id: "admin-owner-id",
            name: "Samarth Patil",
            email: "admin@samarth.dev",
            role: "ADMIN",
          };
        }

        // 2. Standard Database Lookup for any other users
        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
            return { id: user.id, name: user.name, email: user.email, role: user.role };
          }
        } catch (error) {
          console.error("Database error in authorize:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

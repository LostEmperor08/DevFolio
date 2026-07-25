import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;

        // Mock IP detection (since Vercel headers vary)
        const ip = "127.0.0.1";

        // Rate limiting: Check if > 5 failed attempts in last 15 mins
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
        const recentFailedAttempts = await prisma.loginAttempt.count({
          where: {
            ipAddress: ip,
            success: false,
            createdAt: { gte: fifteenMinsAgo },
          },
        });

        if (recentFailedAttempts >= 5) {
          throw new Error("Too many login attempts. Please try again later.");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          await prisma.loginAttempt.create({ data: { email, ipAddress: ip, success: false } });
          return null;
        }

        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password);

        if (passwordsMatch) {
          // Log success and update last login
          await prisma.$transaction([
            prisma.loginAttempt.create({ data: { email, ipAddress: ip, success: true } }),
            prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } }),
          ]);
          return { id: user.id, name: user.name, email: user.email };
        }

        // Log failure
        await prisma.loginAttempt.create({ data: { email, ipAddress: ip, success: false } });
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
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

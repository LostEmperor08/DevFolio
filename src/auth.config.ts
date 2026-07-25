import NextAuth from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [], // Kept empty for Edge Runtime compatibility in middleware
};

export const { auth: edgeAuth } = NextAuth(authConfig);

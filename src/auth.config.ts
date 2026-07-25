import NextAuth from "next-auth";

export const authConfig = {
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "f9b4c39c8172db7b5c87e4118f6735db9d38c642b3a985223c6f491d9b1393f9",
  trustHost: true,
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [], // Kept empty for Edge Runtime compatibility in middleware
};

export const { auth: edgeAuth } = NextAuth(authConfig);

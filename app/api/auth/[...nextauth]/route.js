import AuthConfig from "@/lib/auth.config";
import NextAuth from "next-auth/next";

const handler = NextAuth(AuthConfig);

export { handler as GET, handler as POST };

import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db";
import bcrypt from "bcrypt";
const AuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Web Panel",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "Admin",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        
        if (!user) throw new Error("Akun Tidak Ditemukan");
        
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Password Atau Email Salah");
        
        return user;
      },
    }),
  ],
  session: {
    jwt: false,
    maxAge: 30 * 24 * 60 * 60, //! 30 days
    updateAge: 24 * 60 * 60, //! 24 hours
  }
};

export default AuthConfig;

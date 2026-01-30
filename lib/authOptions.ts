import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) return null;

        // NextAuth requires string id
        return {
          id: user.id.toString(), // 🔥 Int → string
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      // First login
      if (user) {
        token.id = user.id; // string
      }

      // Convert to number before Prisma query
      if (token.id) {
        const userId = Number(token.id);

        if (!Number.isNaN(userId)) {
          const dbUser = await prisma.user.findUnique({
            where: { id: userId }, // 🔥 must be Int
          });

          if (!dbUser) return token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = Number(token.id); // 🔥 back to Int
      }

      return session;
    },
  },

  pages: {
    signIn: "/admin/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

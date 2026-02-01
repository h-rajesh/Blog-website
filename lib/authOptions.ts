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
      // First login - set user id and other fields
      if (user) {
        token.id = user.id; // string (user.id is already a string from authorize)
        token.email = user.email;
        token.name = user.name;
        // Also set sub (standard NextAuth user ID field) as fallback
        token.sub = user.id;
      }

      // On subsequent requests, ensure id is preserved
      // If token.id exists, verify user still exists
      if (token.id) {
        const userId = Number(token.id);

        if (!Number.isNaN(userId)) {
          // Verify user still exists in database
          const dbUser = await prisma.user.findUnique({
            where: { id: userId },
          });

          if (!dbUser) {
            // User no longer exists, clear token
            token.id = undefined;
            token.sub = undefined;
            return token;
          }
          
          // Update email/name from database in case they changed
          token.email = dbUser.email;
          token.name = dbUser.name;
          // Ensure sub is also set
          token.sub = token.id;
        }
      } else if (token.sub) {
        // Fallback: if id is missing but sub exists, use sub as id
        token.id = token.sub;
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

  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only-change-in-production",
  
  // Ensure cookies work properly
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  
  // Set the base URL for NextAuth
  ...(process.env.NEXTAUTH_URL && { baseUrl: process.env.NEXTAUTH_URL }),
};

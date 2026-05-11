import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  pages: {
    signIn: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

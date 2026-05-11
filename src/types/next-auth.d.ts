import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
  }

  interface Session {
    user: {
      id: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
  }
}

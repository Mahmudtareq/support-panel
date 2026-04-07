import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    accessToken?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      accessToken?: string | null;
    } & DefaultSession["user"];
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
  }
}

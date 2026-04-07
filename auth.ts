import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsConfig = {
  email: { label: "Email", type: "email" },
  password: { label: "Password", type: "password" },
};

const buildAuthorize =
  (baseUrl: string) =>
  async (credentials: Partial<Record<string, unknown>>) => {
    const email = credentials.email as string;
    const password = credentials.password as string;

    if (!email || !password) return null;

    try {
      const res = await fetch(`${baseUrl}/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": process.env.API_KEY as string,
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      });

      const json = await res.json();

      console.log("API Response:", json);

      if (!res.ok || json?.status !== "success" || !json?.data) {
        throw new Error(
          json?.message ?? json?.error ?? "Invalid email or password",
        );
      }

      // ✅ Extract accessToken from response header
      const accessToken =
        res.headers.get("x-auth-token") ??
        res.headers.get("X-Auth-Token") ??
        null;

      const user = json.data;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken, // ✅ backend JWT from header
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  };

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "user-login",
      name: "User",
      credentials: credentialsConfig,
      authorize: buildAuthorize(process.env.USER_BASE_URL!),
    }),
    CredentialsProvider({
      id: "admin-login",
      name: "Admin",
      credentials: credentialsConfig,
      authorize: buildAuthorize(process.env.ADMIN_BASE_URL!),
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken; // ✅ store in JWT
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string; // ✅ on user object
        session.user.createdAt = token.createdAt as string;
        session.user.updatedAt = token.updatedAt as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/login`;
    },
  },

  session: {
    strategy: "jwt",
  },
});

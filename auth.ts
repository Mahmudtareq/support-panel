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
      if (!res.ok || json?.status !== "success" || !json?.data) return null;

      const user = json.data;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      console.error("AUTH ERROR:", error);
      return null;
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
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id!;
        session.user.role = token.role!;
        session.user.createdAt = token.createdAt!;
        session.user.updatedAt = token.updatedAt!;
      }
      return session;
    },

    // allow callbackUrls through, only catch NextAuth's own error redirects
    async redirect({ url, baseUrl }) {
      // Allow relative URLs (e.g. /user/dashboard, /admin/dashboard)
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Allow same-origin absolute URLs
      if (url.startsWith(baseUrl)) return url;

      // Fallback — should rarely hit this
      return `${baseUrl}/login`;
    },
  },

  session: {
    strategy: "jwt",
  },
});

"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { store } from "@/store";
import { setCredentials } from "@/store/features/authSlice";

// ── Syncs NextAuth session → RTK store ─────────────────────────
function SyncSession() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      store.dispatch(
        setCredentials({
          id: session.user.id,
          name: session.user.name ?? "",
          email: session.user.email ?? "",
          role: session.user.role as "admin" | "manager" | "user",
          createdAt: session.user.createdAt,
          updatedAt: session.user.updatedAt,
        }),
      );
    }
  }, [session, status]);

  return null;
}

// ── Single combined provider ────────────────────────────────────
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <SyncSession />
        {children}
      </Provider>
    </SessionProvider>
  );
}

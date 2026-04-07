"use client";
import { signOut, useSession } from "next-auth/react";

export default function Userdashboard() {
  const { data: session, status } = useSession();
  console.log("session", session);

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>Not authenticated</p>;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" }); // redirect after logout
  };
  return (
    <div>
      <div>
        <h1> Welcome {session.user?.name}</h1>
        <h1> Email: {session.user?.email}</h1>
        <h1> Role: {session.user?.role}</h1>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

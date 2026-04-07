export type Role = "admin" | "user";

// Each role lands on its own dashboard
export const ROLE_REDIRECTS: Record<Role, string> = {
  admin: "/admin",
  user: "/user",
};

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: ["/admin", "/user"],
  user: ["/user"],
};

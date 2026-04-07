// ROLE PERMISSIONS
// ============================================
export const rolePermissions: Record<string, string[]> = {
  admin: ["view_analytics", "manage_messages", "manage_users", "view_logs"],
  user: ["view_profile", "manage_profile"],
};

// ACTION PERMISSIONS — merged + organized

export const actionPermissions: Record<string, string[]> = {
  // ----- Analytics -----
  view_analytics: ["view_analytics"],
  view_reports: ["view_analytics"],
  export_analytics: ["view_analytics"],

  // ----- Messages -----
  view_messages: ["manage_messages"],
  reply_message: ["manage_messages"],
  edit_message: ["manage_messages"],
  delete_message: ["manage_messages"],

  // ----- Users -----
  manage_users: ["manage_users"],
  create_user: ["manage_users"],
  edit_user: ["manage_users"],
  delete_user: ["manage_users"],
  export_data: ["manage_users"],
  system_settings: ["manage_users"],
  system_maintenance: ["manage_users"],
  security_settings: ["manage_users"],

  // ----- Logs -----
  view_logs: ["view_logs"],
  audit_logs: ["view_logs"],
  export_logs: ["view_logs"],

  // ----- Settings -----
  view_settings: ["manage_users"],
  update_settings: ["manage_users"],

  // ----- Profile -----
  view_profile: ["view_profile"],
  edit_profile: ["manage_profile"],
};

// ============================================
export function hasPermission(
  role: string | undefined,
  permissions: string[] | undefined,
): boolean {
  if (!permissions || permissions.length === 0) return true;
  if (!role) return false;

  const allowed = rolePermissions[role] ?? [];
  return permissions.every((p) => allowed.includes(p));
}

export function canPerformAction(
  role: string | undefined,
  action: string,
): boolean {
  const required = actionPermissions[action];
  return hasPermission(role, required);
}

export function getPermissionsForRole(role: string): string[] {
  return rolePermissions[role] ?? [];
}

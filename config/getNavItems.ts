import { allNavItems } from "./navItems";
import { NavItem, SubNavItem } from "./navItemsTypes";
import { hasPermission } from "./permissions";

export function getNavItemsForRole(role: string | undefined): NavItem[] {
  return allNavItems
    .filter((item) => hasPermission(role, item.permissions))
    .map((item) => ({
      ...item,
      // ✅ also filter sub-items by permission
      items: item.items?.filter((sub: SubNavItem) =>
        hasPermission(role, sub.permissions),
      ),
    }));
}

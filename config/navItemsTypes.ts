export type NavItem = {
  title: string;
  href?: string;
  icon?: string; // ✅ string key, not React.ElementType
  permissions?: string[];
  items?: SubNavItem[];
};

export type SubNavItem = {
  title: string;
  href?: string;
  icon?: string; // ✅ string key
  permissions?: string[];
};

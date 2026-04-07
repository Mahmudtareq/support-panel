import { NavItem } from "./navItemsTypes";
import { routes } from "./routes";

export const allNavItems: NavItem[] = [
  {
    title: "Overview",
    href: routes.privateRoutes.admin.dashboard,
    icon: "LayoutDashboard",
    // permissions: ["view_dashboard"],
  },
  {
    title: "Analytics",
    href: routes.privateRoutes.admin.analytics,
    icon: "BarChart3",
    permissions: ["view_analytics"],
  },
  //   {
  //     title: "Showcase",
  //     icon: "Images",
  //     permissions: ["view_showcase"],
  //     items: [
  //       {
  //         title: "About Us",
  //         href: routes.privateRoutes.admin.dashboard,
  //         permissions: ["view_showcase"],
  //       },
  //     ],
  //   },
  {
    title: "Contact Messages",
    href: routes.privateRoutes.admin.contacts,
    icon: "MessageSquare",
    permissions: ["manage_messages"],
  },
  {
    title: "Super Users",
    href: routes.privateRoutes.admin.users,
    icon: "Users", // ✅ string
    permissions: ["manage_users"],
  },
  {
    title: "Admin Logs",
    href: routes.privateRoutes.admin.logs,
    icon: "Activity", // ✅ string
    permissions: ["view_logs"],
  },
  {
    title: "Settings",
    href: routes.privateRoutes.admin.settings,
    icon: "Cog",
    permissions: ["manage_users"],
  },
];

export const userNavItems: NavItem[] = [
  {
    title: "Profile",
    href: "/user/dashboard/profile",
    icon: "User",
    permissions: ["view_profile"],
  },
];

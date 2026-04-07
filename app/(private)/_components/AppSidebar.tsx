import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavItem } from "@/config/navItemsTypes";
import AppSidebarHeader from "./AppSidebarHeader";
import NavMenuItems from "./NavMenuItems";
type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  navItems: NavItem[];
  role?: string;
};

export default function AppSidebar({
  navItems,
  role,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppSidebarHeader role={role} />
      </SidebarHeader>
      <SidebarContent>
        <NavMenuItems items={navItems} />
      </SidebarContent>
      {/* <SidebarFooter>
        <AppSidebarFooter user={adminDashboardMenu.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
}

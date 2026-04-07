import { auth } from "@/auth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getNavItemsForRole } from "@/config/getNavItems";
import AppSidebar from "./_components/AppSidebar";
import Header from "./_components/Header";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.user?.role;
  const navItems = getNavItemsForRole(role);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar navItems={navItems} role={role} />

        <SidebarInset className="overflow-auto h-screen">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

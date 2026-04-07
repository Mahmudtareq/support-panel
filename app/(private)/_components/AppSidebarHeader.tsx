"use client";

import { Badge } from "@/components/ui/badge";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Crown, Shield, ShieldCheck } from "lucide-react";

type AppSidebarHeaderProps = {
  role?: string;
};

export default function AppSidebarHeader({ role }: AppSidebarHeaderProps) {
  const isAdmin = role === "admin";
  const isUser = role === "user";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent active:bg-transparent cursor-default h-auto flex-col items-start"
        >
          {/* Title row */}
          <div className="flex items-center gap-3 w-full px-1 pt-1">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">
                Support Panel
              </h1>
              <p className="text-xs text-muted-foreground">
                {isAdmin ? "Admin Dashboard" : "User Dashboard"}
              </p>
            </div>
          </div>

          {/* Badge row */}
          <div className="px-1 pb-1 pt-2 w-full">
            {isAdmin && (
              <>
                <Badge className="bg-linear-to-r from-pink-500 to-rose-500 text-white border-0 text-xs font-bold px-3 py-1">
                  <Crown className="h-3 w-3 mr-1" />
                  SUPER ADMIN
                </Badge>
                <p className="text-xs text-muted-foreground mt-1 pl-1">
                  ✓ Full System Access
                </p>
              </>
            )}

            {isUser && (
              <>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-bold px-3 py-1">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  USER
                </Badge>
                <p className="text-xs text-muted-foreground mt-1 pl-1">
                  ✓ User Access
                </p>
              </>
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

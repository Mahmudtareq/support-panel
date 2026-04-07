"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { getIcon } from "@/config/icons"; // ✅ resolve here on client
import { NavItem } from "@/config/navItemsTypes";
import { isRouteActive } from "@/lib/utils";

export default function NavMenuItems({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-2">
        {items.map((item) => {
          const Icon = getIcon(item.icon); // ✅ component resolved here
          const hasChildren = !!item.items?.length;
          const isActive = item.href && isRouteActive(pathname, item.href);
          const isChildActive =
            hasChildren &&
            item.items!.some(
              (sub) => sub.href && isRouteActive(pathname, sub.href),
            );
          const isParentActive = isActive || isChildActive;

          return (
            <SidebarMenuItem key={item.title}>
              {hasChildren ? (
                <Collapsible defaultOpen={!!isChildActive}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`flex items-center gap-2 ${
                        isParentActive ? "text-primary" : "hover:bg-accent"
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items!.map((sub) => {
                        const SubIcon = getIcon(sub.icon); // ✅
                        return sub.href ? (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={sub.href}
                                className={
                                  isRouteActive(pathname, sub.href)
                                    ? "bg-primary text-white px-4"
                                    : "hover:bg-accent"
                                }
                              >
                                {SubIcon && <SubIcon className="h-4 w-4" />}
                                {sub.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ) : null;
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                item.href && (
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 ${
                        isActive ? "bg-primary text-white" : "hover:bg-accent"
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                )
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

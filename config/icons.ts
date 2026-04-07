import {
  Activity,
  BarChart3,
  Bell,
  Cog,
  Crown,
  FileText,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  MessageSquare,
  Settings,
  Shield,
  ShieldCheck,
  UserIcon,
  Users,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Settings,
  LogOut,
  UserIcon,
  Bell,
  Shield,
  MessageSquare,
  Users,
  BarChart3,
  FileText,
  Cog,
  Activity,
  ShieldCheck,
  Crown,
};

export function getIcon(name?: string): LucideIcon | null {
  if (!name) return null;
  return iconMap[name] ?? null;
}

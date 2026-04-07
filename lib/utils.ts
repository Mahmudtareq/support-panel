import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type NestedRoutes =
  | string
  | {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: NestedRoutes | ((...args: any[]) => string);
    };

export function extractRoutes(obj: NestedRoutes): string[] {
  const links: string[] = [];

  for (const value of Object.values(obj as Record<string, NestedRoutes>)) {
    if (typeof value === "string") {
      links.push(value);
    } else if (typeof value === "function") {
      continue;
    } else if (typeof value === "object" && value !== null) {
      links.push(...extractRoutes(value));
    }
  }

  return links;
}

export const isRouteActive = (pathname: string, url: string) => {
  const current = pathname.split("/").filter(Boolean);
  const target = url.split("/").filter(Boolean);

  // Dashboard must match EXACTLY
  if (url === "/admin/dashboard") {
    return pathname === url;
  }

  // Exact match
  if (target.length === current.length) {
    return target.every((seg, i) => seg === current[i]);
  }

  // Section match (products -> products/edit/123)
  return (
    target.length < current.length &&
    target.every((seg, i) => seg === current[i])
  );
};

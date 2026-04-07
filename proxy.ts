import { NextResponse } from "next/server";
import { auth } from "./auth";
import { routes } from "./config/routes";
import { extractRoutes } from "./lib/utils";

//  Helpers
function isAdminRoute(pathname: string): boolean {
  const adminRoutes = extractRoutes(routes.privateRoutes.admin);
  return adminRoutes.some((route) => pathname.startsWith(route));
}

function isUserRoute(pathname: string): boolean {
  const userRoutes = extractRoutes(routes.privateRoutes.user);
  return userRoutes.some((route) => pathname.startsWith(route));
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // session data from NextAuth
  const session = req.auth;
  const user = session?.user;
  const role = user?.role;
  const token = user?.accessToken as string | undefined;

  const isLoggedIn = !!user && !!token;

  const isAdmin = isAdminRoute(pathname);
  const isUser = isUserRoute(pathname);

  // PROTECT ADMIN ROUTES

  if (isAdmin) {
    // not logged in → admin login
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(routes.publicRoutes.adminLogin, req.url),
      );
    }

    // logged in but not admin
    if (role !== "admin") {
      return NextResponse.redirect(
        new URL(routes.privateRoutes.user.dashboard, req.url),
      );
    }
  }

  //  PROTECT USER ROUTES

  if (isUser) {
    //  not logged in → user login
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(routes.publicRoutes.userLogin, req.url),
      );
    }

    //  admin trying to access user routes (optional rule)
    if (role !== "user") {
      return NextResponse.redirect(
        new URL(routes.privateRoutes.admin.dashboard, req.url),
      );
    }
  }

  // PREVENT LOGIN ACCESS AFTER LOGIN

  const isLoginPage =
    pathname === routes.publicRoutes.adminLogin ||
    pathname === routes.publicRoutes.userLogin;

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(
      new URL(
        role === "admin"
          ? routes.privateRoutes.admin.dashboard
          : routes.privateRoutes.user.dashboard,
        req.url,
      ),
    );
  }

  return NextResponse.next();
});
export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/admin/login", "/login"],
};

export const routes = {
  publicRoutes: {
    home: "/",
    adminLogin: "/admin/login",
    userLogin: "/login",
  },
  privateRoutes: {
    admin: {
      dashboard: "/admin/dashboard",
      banner: {
        home: "/admin/dashboard/banner",
        create: "/admin/dashboard/banner/create",
        edit: (id: string) => `/admin/dashboard/banner/edit/${id}`,
      },
      services: "/admin/dashboard/services",

      chef: "/admin/dashboard/chef",
      settings: `/admin/dashboard/settings`,
    },
    user: {
      dashboard: "/user/dashboard",
    },
  },
};

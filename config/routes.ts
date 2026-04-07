export const routes = {
  publicRoutes: {
    home: "/",
    services: "/services",
    projects: "/projects",
    about: "/about",
    contact: "/contact",
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
      siteProjects: "/admin/dashboard/site-projects",

      products: {
        home: "/admin/dashboard/products",
        create: "/admin/dashboard/products/create",
        edit: (id: string) => `/admin/dashboard/products/edit/${id}`,
      },
      projects: "/admin/dashboard/projects",

      subscribe: "/admin/dashboard/subscribe",
      contacts: "/admin/dashboard/contacts",
      reserve: "/admin/dashboard/reserve",
      chef: "/admin/dashboard/chef",

      showcase: {
        aboutShowcase: "/admin/dashboard/about-showcase",
        ourWorkShowcase: "/admin/dashboard/our-work",
        ourStrengthShowcase: "/admin/dashboard/our-strength",
        serviceBannerShowcase: "/admin/dashboard/service-banner",
        homeBannerShowcase: "/admin/dashboard/home-banner",
      },
      notification: `/admin/notification`,
      contact: `/admin/contact`,
      newsletter: `/admin/newsletter`,
      settings: `/admin/dashboard/settings`,
    },
    user: {
      dashboard: "/user/dashboard",
    },
  },
};
